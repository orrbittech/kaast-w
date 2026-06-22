import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type AuthShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

export function AuthShell({ children, title, subtitle }: AuthShellProps) {
  return (
    <div className="font-sans min-h-screen bg-base">
      <Header />
      <main
        id="main-content"
        role="main"
        className="mx-auto flex min-h-screen max-w-4xl flex-col items-center px-6 pb-24 pt-28"
      >
        <div className="mb-8 w-full max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-white md:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-zinc-400">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex w-full max-w-lg flex-1 flex-col items-center justify-start">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
