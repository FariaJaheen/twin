import Twin from '@/components/twin';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <header className="text-center mb-10">
            <p className="text-sm font-medium text-gray-500">
              PhD at uOttawa • Research Assistant in AI at METRICS Lab • GenAI • AgenticAI
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              Digital Twin of Faria Jaheen
            </h1>

            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              An AI-powered conversational twin designed to answer questions about my background.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#twin"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
              >
                Start chatting
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 transition"
              >
                About Faria
              </a>
              <a
                href="https://scholar.google.ca/citations?user=w92696kAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 transition"
              >
                Publications
              </a>
            </div>
          </header>

          {/* Twin */}
          <section
            id="twin"
            className="h-[650px] rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden"
          >
            <Twin />
          </section>

          {/* About + Links */}
          <section id="about" className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">About</h2>
              <p className="text-gray-600 mt-3 leading-relaxed text-justify hyphens-auto">
                Faria Jaheen is a Artificial Intelligence Researcher (PhD) at the University of Ottawa, distinguished for 
                pioneering research at the nexus of agentic intelligence, generative modeling, and cloud-native computational systems.
                A vision-driven innovator with over 12 years of interdisciplinary and global experience, she unites computational rigor 
                with translational impact, architecting autonomous data ecosystems that fuse multi-agent learning, scalable MLOps infrastructures, 
                and retrieval-augmented reasoning frameworks to address complex, real-world challenges across healthcare, robotics, and enterprise automation.
                She is specialized in kinematic modeling, inverse kinematics, and learning-based methods for complex robotic systems. 
                Renowned for orchestrating cross-functional teams through high-impact innovation cycles, she consistently transforms theoretical 
                constructs into production-grade, ethically aligned AI solutions yielding demonstrable gains in predictive fidelity, inference efficiency, 
                and organizational intelligence. She is the author of six peer-reviewed publications featured in leading venues including IEEE Access, 
                Frontiers in Robotics and AI, and PIERS, advancing the frontiers of kinematic modeling, agentic architectures, interpretable machine 
                learning, antenna design and microwave engineering. Demonstrated record of translating advanced research into production-grade solutions 
                achieving measurable gains in model accuracy, inference latency, and business impact. In a nutshell, she is passionate about 
                translating rigorous, publication-quality research into real-world impact.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Connect</h2>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li>
                  <a
                    href="https://scholar.google.ca/citations?user=w92696kAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition"
                  >
                    📚 Google Scholar
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/fariajaheen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition"
                  >
                    💼 LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/FariaJaheen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition"
                  >
                    💻 GitHub
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <footer className="mt-10 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Faria Jaheen • AI Digital Twin</p>
          </footer>
        </div>
      </div>
    </main>
  );
}