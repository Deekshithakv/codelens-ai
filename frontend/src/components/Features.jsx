import {
ShieldCheck,
Brain,
Activity,
Bug,
TestTube2,
Wand2,
} from "lucide-react";

export default function Features() {
const features = [
{
icon: Brain,
title: "Code Explanation",
description:
"Get line-by-line AI explanations for any source code.",
},
{
icon: Activity,
title: "Complexity Analysis",
description:
"Instant time and space complexity insights.",
},
{
icon: ShieldCheck,
title: "Security Scanner",
description:
"Detect vulnerabilities and receive secure fixes.",
},
{
icon: Bug,
title: "Bug Detection",
description:
"Identify logical issues and hidden defects.",
},
{
icon: TestTube2,
title: "Unit Test Generation",
description:
"Automatically generate meaningful test cases.",
},
{
icon: Wand2,
title: "Refactoring Suggestions",
description:
"Improve readability and maintainability.",
},
];

return ( <section
   id="features"
   className="max-w-7xl mx-auto px-6 lg:px-8 py-24"
 > <div className="text-center">
    <h2 className="text-5xl font-bold text-white">
      Powerful AI Features
    </h2>

    <p className="mt-4 text-slate-400">
      Everything you need to understand and improve code.
    </p>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

    {features.map((feature) => {
      const Icon = feature.icon;

      return (
        <div
          key={feature.title}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 hover:border-blue-500/40 transition"
        >
          <Icon
            className="text-blue-400 mb-5"
            size={32}
          />

          <h3 className="text-xl font-semibold text-white">
            {feature.title}
          </h3>

          <p className="text-slate-400 mt-3 leading-7">
            {feature.description}
          </p>
        </div>
      );
    })}

  </div>
</section>


);
}
