import { ArrowUpRight, Braces } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-5 xl:px-0">
        <Link to="/" className="flex items-center gap-2.5 text-[#17191c]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17191c] text-white">
            <Braces size={18} strokeWidth={1.8} />
          </span>
          <span className="text-[18px] font-medium tracking-[-0.03em]">
            CodeLens <span className="text-[#777b86]">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-[15px] text-[#4c4c4c] md:flex">
          <a className="transition hover:text-[#17191c]" href="#features">
            Product
          </a>
          <a className="transition hover:text-[#17191c]" href="#how">
            How it works
          </a>
          <a className="transition hover:text-[#17191c]" href="#capabilities">
            Capabilities
          </a>
        </div>

        <Link
          to="/analyzer"
          className="group flex items-center gap-2 rounded-full bg-[#17191c] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#34373b]"
        >
          Open analyzer
          <ArrowUpRight
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            size={15}
          />
        </Link>
      </div>
    </nav>
  );
}
