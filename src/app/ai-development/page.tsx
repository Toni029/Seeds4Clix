import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Custom AI solutions | Seeds4Clix",
  description: "Practical AI systems designed around the way your company works.",
};

export default function AiDevelopmentPage() {
  return (
    <ServiceDetail
      eyebrow="Custom solutions"
      title="Build AI that fits the work already happening."
      intro="We turn repetitive processes, scattered knowledge, and ambitious ideas into focused AI capabilities your team can actually use."
      examples={[
        {
          title: "Automated operations",
          body: "Connect the tools your team already uses and remove the manual handoffs slowing work down.",
        },
        {
          title: "Decision support",
          body: "Give leaders a clearer view of the signals, risks, and opportunities inside the business.",
        },
        {
          title: "Customer experience",
          body: "Create helpful, consistent touchpoints without losing the human judgment that makes your brand distinct.",
        },
      ]}
      steps={[
        "Map the highest-value friction points and define the outcome that matters.",
        "Prototype a focused solution against real workflows and real constraints.",
        "Launch, measure adoption, and expand only where the value is proven.",
      ]}
      cta="Explore a custom solution"
    />
  );
}
