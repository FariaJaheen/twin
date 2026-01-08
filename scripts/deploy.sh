# 2. Terraform workspace & apply
cd terraform

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Prefer AWS_REGION/AWS_DEFAULT_REGION from CI, fallback to DEFAULT_AWS_REGION, then us-east-1
AWS_REGION="${AWS_REGION:-${AWS_DEFAULT_REGION:-${DEFAULT_AWS_REGION:-us-east-1}}}"

# Get environment from script argument or default to dev
ENVIRONMENT="${ENVIRONMENT:-${1:-dev}}"
if [[ -z "$ENVIRONMENT" ]]; then
  echo "ERROR: ENVIRONMENT is empty"
  exit 1
fi
ENVIRONMENT="${ENVIRONMENT#/}"   # strip accidental leading slash
ENVIRONMENT="${ENVIRONMENT%/}"   # strip accidental trailing slash


TF_STATE_BUCKET="twin-terraform-state-${AWS_ACCOUNT_ID}"
TF_STATE_KEY="${ENVIRONMENT}/terraform.tfstate"
TF_LOCK_TABLE="twin-terraform-locks"

echo "🪣 Ensuring Terraform state bucket exists: ${TF_STATE_BUCKET} (${AWS_REGION})"

# Create bucket if missing (works in us-east-1 and other regions)
if ! aws s3api head-bucket --bucket "$TF_STATE_BUCKET" 2>/dev/null; then
  if [ "$AWS_REGION" = "us-east-1" ]; then
    aws s3api create-bucket --bucket "$TF_STATE_BUCKET" --region "$AWS_REGION"
  else
    aws s3api create-bucket \
      --bucket "$TF_STATE_BUCKET" \
      --region "$AWS_REGION" \
      --create-bucket-configuration LocationConstraint="$AWS_REGION"
  fi
fi

# Optional but recommended: enable versioning for TF state safety
aws s3api put-bucket-versioning \
  --bucket "$TF_STATE_BUCKET" \
  --versioning-configuration Status=Enabled >/dev/null || true

echo "🔒 Ensuring DynamoDB lock table exists: ${TF_LOCK_TABLE}"

if ! aws dynamodb describe-table --table-name "$TF_LOCK_TABLE" --region "$AWS_REGION" >/dev/null 2>&1; then
  aws dynamodb create-table \
    --table-name "$TF_LOCK_TABLE" \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "$AWS_REGION" >/dev/null

  # Wait until it is ready
  aws dynamodb wait table-exists --table-name "$TF_LOCK_TABLE" --region "$AWS_REGION"
fi

echo "🧱 Terraform init (remote state)..."
terraform init -input=false \
  -backend-config="bucket=${TF_STATE_BUCKET}" \
  -backend-config="key=${TF_STATE_KEY}" \
  -backend-config="region=${AWS_REGION}" \
  -backend-config="dynamodb_table=${TF_LOCK_TABLE}" \
  -backend-config="encrypt=true"