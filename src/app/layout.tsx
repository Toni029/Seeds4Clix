import type { Metadata } from "next";
import "../styles.css";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { NeuralField } from "../components/neural-field";
import { ScrollReveal } from "../components/scroll-reveal";

export const metadata: Metadata = {
  title: { default: "Seeds4Clix", template: "%s | Seeds4Clix" },
  description: "Structure, automate and scale your company with practical AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NeuralField />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
