import { Link } from "react-router-dom";

export default function Footer() {
return ( <footer className="border-t border-slate-800 mt-20">


  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

    <div className="flex flex-col md:flex-row justify-between items-center gap-8">

      <div>

        <h2 className="text-2xl font-bold">
          <span className="text-blue-400">
            CodeLens
          </span>{" "}
          <span className="text-white">
            AI
          </span>
        </h2>

        <p className="text-slate-400 mt-3">
          Explain Any Code. Detect Bugs. Improve Security.
        </p>

      </div>

      <div className="flex gap-8 text-slate-400">

        <a href="#features">
          Features
        </a>

        <a href="#how">
          How It Works
        </a>

        <Link to="/analyzer">
          Analyzer
        </Link>

      </div>

    </div>

    <div className="mt-10 border-t border-slate-800 pt-6 text-center text-slate-500">
      © 2026 CodeLens AI. Built with React, FastAPI, Groq and Monaco Editor.
    </div>

  </div>

</footer>


);
}
