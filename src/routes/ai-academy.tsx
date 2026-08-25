import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../components/service-detail";
export const Route = createFileRoute("/ai-academy")({
  head: () => ({
    meta: [
      { title: "AI Academy | Seeds4Clix" },
      { name: "description", content: "Build confident AI capability across your team." },
    ],
  }),
  component: () => (
    <ServiceDetail
      eyebrow="AI Academy"
      title="Turn curiosity into confident capability."
      intro="A practical learning environment for teams who need to use AI safely, creatively and consistently — on the real work already on their desks."
      cta="Build your learning path"
      examples={[
        {
          title: "Sales that prepares",
          body: "Reps turn call notes into next actions, account briefs and tailored follow-ups without losing their voice.",
        },
        {
          title: "Operations that teaches",
          body: "Teams document the process once, then practice improving it with an AI tutor that understands the context.",
        },
        {
          title: "Leaders who see",
          body: "Decision-makers learn where automation creates leverage, where it creates risk, and what to prioritize next.",
        },
      ]}
      steps={[
        "We map roles, friction and the decisions your people make every week.",
        "We create role-specific sessions around your own documents, customers and processes.",
        "Your team keeps learning with an AI tutor and a library that evolves with the business.",
      ]}
    />
  ),
});
