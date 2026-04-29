import type { Metadata } from "next";
import QuestionnaireForm from "@/components/QuestionnaireForm";

export const metadata: Metadata = {
  title: "Pre-Call Questionnaire | Scale Enterprises",
  robots: "noindex, nofollow",
};

export default function QuestionnaireEmbed() {
  return (
    <main className="min-h-screen bg-transparent py-8">
      <div className="max-w-[640px] mx-auto px-6">
        <QuestionnaireForm />
      </div>
    </main>
  );
}
