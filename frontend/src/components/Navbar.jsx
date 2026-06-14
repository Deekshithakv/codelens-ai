import { Link } from "react-router-dom";

export default function Navbar() {
return ( <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800"> <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">

    <Link
      to="/"
      className="text-2xl font-bold"
    >
      <span className="text-blue-400">
        CodeLens
      </span>{" "}
      <span className="text-cyan-30">
        AI
      </span>
    </Link>

    <div className="hidden md:flex items-center gap-8 text-slate-300">
      <a
        href="#features"
        className="hover:text-white transition"
      >
        Features
      </a>

      <a
        href="#how"
        className="hover:text-white transition"
      >
        How It Works
      </a>
    </div>

    <Link
      to="/analyzer"
      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium"
    >
      Launch Analyzer
    </Link>

  </div>
</nav>


);
}
