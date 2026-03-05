const STEPS = [
  {
    number: 1,
    title: "Sign up",
    description: "Create a free KAAST account in seconds",
  },
  {
    number: 2,
    title: "Add your device",
    description:
      "Set up smart or compatible TVs with the KAAST TV Player app installed",
  },
  {
    number: 3,
    title: "Download the app",
    description: "Install KAAST on your phone to control those TV Player apps",
  },
  {
    number: 4,
    title: "Control from your phone",
    description:
      "Control every screen from your fingertips and keep your brand locked in across locations",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-base py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          How it works
        </h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-xl font-bold text-primary">
                {step.number}
              </div>
              <h3 className="font-display mb-2 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="font-display text-sm text-zinc-200">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
