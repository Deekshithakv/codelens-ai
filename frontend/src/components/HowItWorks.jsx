import {
Code2,
BrainCircuit,
Sparkles,
} from "lucide-react";

export default function HowItWorks() {
const steps = [
{
icon: Code2,
title: "Paste Your Code",
description:
"Upload or paste code in the Monaco editor.",
},
{
icon: BrainCircuit,
title: "AI Analysis",
description:
"CodeLens AI analyzes complexity, security and logic.",
},
{
icon: Sparkles,
title: "Get Insights",
description:
"Receive explanations, fixes and recommendations instantly.",
},
];

return ( <section
   id="how"
   className="max-w-7xl mx-auto px-6 lg:px-8 py-24"
 > <div className="text-center">


    <h2 className="text-5xl font-bold text-white">
      How It Works
    </h2>

    <p className="mt-4 text-slate-400">
      Three simple steps to understand any code.
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-8 mt-16">

    {steps.map((step) => {
      const Icon = step.icon;

      return (
        <div
          key={step.title}
          className="relative rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <Icon
              className="text-blue-400"
              size={28}
            />
          </div>

          <h3 className="text-2xl font-semibold text-white mt-6">
            {step.title}
          </h3>

          <p className="text-slate-400 mt-4 leading-7">
            {step.description}
          </p>
        </div>
      );
    })}

  </div>
</section>

);
}
