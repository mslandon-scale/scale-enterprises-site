import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import QuestionnaireForm from "@/components/QuestionnaireForm";

export const metadata: Metadata = {
  title: "Pre-Call Questionnaire | Scale Enterprises",
  description: "Complete your pre-call questionnaire before your Commitment Call with Scale Enterprises.",
};

export default function Questionnaire() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[100px] pb-12">
        <div className="max-w-[640px] mx-auto px-6">
          <QuestionnaireForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
