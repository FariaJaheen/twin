from pypdf import PdfReader
import json

# Read LinkedIn PDF
try:
    reader = PdfReader("./data/linkedin.pdf")
    linkedin = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            linkedin += text
except FileNotFoundError:
    linkedin = "LinkedIn profile not available"

# Read Resume PDF
try:
    reader = PdfReader("./data/resume.pdf")
    resume = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            resume += text
except FileNotFoundError:
    resume = "Resume not available"

# Read Thesis PDF ✅ (replaces thesis.html)
try:
    reader = PdfReader("./data/thesis.pdf")
    thesis = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            thesis += text
except FileNotFoundError:
    thesis = "Thesis not available"

# Thesis handling (excerpt for prompt)
THESIS_EXCERPT_CHARS = 8000
thesis_excerpt = thesis[:THESIS_EXCERPT_CHARS] if thesis else "Thesis not available"

# Read other data files
with open("./data/summary.txt", "r", encoding="utf-8") as f:
    summary = f.read()

with open("./data/style.txt", "r", encoding="utf-8") as f:
    style = f.read()

with open("./data/facts.json", "r", encoding="utf-8") as f:
    facts = json.load(f)