import type { Metadata } from "next";
import "../styles.css";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { NeuralField } from "../components/neural-field";
import { ScrollReveal } from "../components/scroll-reveal";
import { ThemeProvider } from "../components/theme-provider";
import { CookieConsent } from "../components/cookie-consent";
import { ChatWidget } from "../components/chat-widget";

export const metadata: Metadata = {
  title: { default: "Seeds4Clix", template: "%s | Seeds4Clix" },
  description: "Structure, automate and scale your company with practical AI.",
};

const THEME_INIT_SCRIPT = `
  try {
    var stored = window.localStorage.getItem("seeds4clix-theme");
    if (stored === "light") {
      document.documentElement.classList.add("light");
    }
  } catch (error) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <NeuralField />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <ScrollReveal />
          <CookieConsent />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
