import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
return ( <section className="relative overflow-hidden">


  <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[140px]" />

  <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[140px]" />

  <div className="max-w-7xl mx-auto px-6 lg:px-8 min-h-[65vh] flex items-center">

    <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

      <div>

        <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-800 bg-slate-900/60 text-blue-400 mb-8">
          AI Powered Code Intelligence
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">

  <span className="text-white">
    Explain Any
  </span>{" "}

  <span className="text-blue-400">
    Code
  </span>

  <span className="text-white">
    .
  </span>

  <br />

  <span className="text-white">
    Detect
  </span>{" "}

  <span className="text-violet-400">
    Bugs
  </span>

  <span className="text-white">
    .
  </span>

  <br />

  <span className="text-white">
    Improve
  </span>{" "}

  <span className="text-cyan-400">
    Security
  </span>

  <span className="text-white">
    .
  </span>

</h1>
        <p className="mt-8 text-lg text-slate-300 max-w-xl leading-8">
          Understand complex codebases instantly with
          AI-powered explanations, complexity analysis,
          security detection and actionable developer insights.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">

          <Link
            to="/analyzer"
            className="px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-semibold"
          >
            Launch Analyzer
          </Link>

          <a
            href="#features"
            className="px-7 py-4 rounded-2xl border border-slate-700 text-slate-200 hover:border-slate-500 transition"
          >
            Explore Features
          </a>

        </div>

      </div>

      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="relative hidden lg:block"
      >

        <div className="absolute top-0 right-0 w-80 p-6 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
          <h3 className="text-green-400 font-semibold text-lg">
            Security Analysis
          </h3>

          <p className="mt-3 text-slate-400">
            SQL Injection detected and secure fix suggested.
          </p>
        </div>

        <div className="absolute top-40 left-0 w-80 p-6 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
          <h3 className="text-violet-400 font-semibold text-lg">
            Complexity Detection
          </h3>

          <p className="mt-3 text-slate-400">
            Time Complexity: O(n log n)
          </p>
        </div>

        <div className="absolute top-80 right-10 w-80 p-6 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
          <h3 className="text-cyan-400 font-semibold text-lg">
            AI Explanation
          </h3>

          <p className="mt-3 text-slate-400">
            Understand every line instantly.
          </p>
        </div>

        <div className="h-[500px]" />

      </motion.div>

    </div>

  </div>
</section>


);
}
