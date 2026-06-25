import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type AuthShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Tailwind max-width class for the content area (default: max-w-lg). */
  contentMaxWidth?: string;
};

export function AuthShell({
  children,
  title,
  subtitle,
  contentMaxWidth = "max-w-lg",
}: AuthShellProps) {
  return (
    <div className="font-sans min-h-screen bg-base">
      <Header />
      <main
        id="main-content"
        role="main"
        className="mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 pb-24 pt-28"
      >
        <div className={`mb-8 w-full ${contentMaxWidth} text-center`}>
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div
          className={`flex w-full ${contentMaxWidth} flex-1 flex-col items-center justify-start`}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
