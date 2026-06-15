import { Braces } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-12 xl:px-0">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17191c] text-white">
                <Braces size={18} strokeWidth={1.8} />
              </span>
              <span className="text-[18px] font-medium tracking-[-0.03em]">
                CodeLens <span className="text-[#777b86]">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-[14px] text-[#777b86]">
              Explain code. Detect bugs. Improve security.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-[14px] text-[#4c4c4c]">
            <a className="transition hover:text-[#17191c]" href="#features">
              Product
            </a>
            <a className="transition hover:text-[#17191c]" href="#how">
              How it works
            </a>
            <Link className="transition hover:text-[#17191c]" to="/analyzer">
              Analyzer
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-black/5 pt-6 text-[12px] text-[#777b86]">
          © 2026 CodeLens AI. Built with React, FastAPI, Groq.
        </div>
      </div>
    </footer>
  );
}
