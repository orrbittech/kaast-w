import { KaastText } from "@/components/KaastText";

const STEPS = [
  {
    number: 1,
    title: "Sign up",
    description: "Start your free trial on kaast.app",
  },
  {
    number: 2,
    title: "Connect screens",
    description:
      "Download KAAST on iOS or Android, install KAAST TV on every screen, and pair with the 6-digit code from the TV",
  },
  {
    number: 3,
    title: "Add content",
    description:
      "Upload video, images, or audio and build a playlist for each screen",
  },
  {
    number: 4,
    title: "Go live",
    description: "Push a playlist to any TV from your phone",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-base py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          How to Kaast
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
              <h3 className="mb-2 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-200">
                <KaastText>{step.description}</KaastText>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
