import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function LandingPage() {
return ( <div className="relative min-h-screen bg-slate-950 overflow-hidden">


  <div className="absolute inset-0">

    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[180px]" />

    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[180px]" />

  </div>

  <div className="relative z-10">

    <Navbar />

    <Hero />

    <Features />

    <HowItWorks />

    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

      <div className="rounded-[40px] border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-12 text-center">

        <h2 className="text-5xl font-bold text-white">
          Ready to Analyze Your Code?
        </h2>

        <p className="mt-5 text-slate-400 text-lg">
          Start using AI-powered code intelligence today.
        </p>

        <a
          href="/analyzer"
          className="inline-block mt-8 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold"
        >
          Launch Analyzer
        </a>

      </div>

    </section>

    <Footer />

  </div>

</div>


);
}
