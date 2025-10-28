import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FlowForge AI",
  description:
    "Open-source AI workflow studio for designing, testing, and sharing multi-agent prompt pipelines.",
  openGraph: {
    title: "FlowForge AI",
    description:
      "Open-source AI workflow studio for designing, testing, and sharing multi-agent prompt pipelines.",
    url: "https://github.com/your-handle/flowforge-ai",
    siteName: "FlowForge AI",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@flowforge_ai"
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-12 pt-10 sm:px-10">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">FlowForge AI</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-300">
                Design, execute, and collaborate on AI agent workflows with an open-source, self-hostable studio.
              </p>
            </div>
            <nav className="flex gap-3 text-sm">
              <a
                href="https://github.com/your-handle/flowforge-ai"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/10 px-3 py-2 font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
              >
                GitHub Repo
              </a>
              <a
                href="https://github.com/your-handle/flowforge-ai/issues"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-brand-500/40 bg-brand-500/20 px-3 py-2 font-medium text-brand-100 transition hover:bg-brand-500/40 hover:text-white"
              >
                Open Issues
              </a>
            </nav>
          </header>
          <main className="flex-1 py-10">{children}</main>
          <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
            MIT Licensed. Built with ❤️ by the FlowForge AI community.
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
