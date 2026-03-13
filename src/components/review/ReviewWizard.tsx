import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { reviewSchema, type ReviewFormData, PHASE_A_FIELDS, PHASE_B_FIELDS, PHASE_C_FIELDS, PHASE_D_FIELDS, CONSENT_FIELDS } from "@/schemas/reviewSchema";
import { submitReview } from "@/lib/submitReview";
import ProgressBar from "./ProgressBar";
import StepPhaseA from "./steps/StepPhaseA";
import StepPhaseB from "./steps/StepPhaseB";
import StepPhaseC from "./steps/StepPhaseC";
import StepPhaseD from "./steps/StepPhaseD";
import StepConfirm from "./steps/StepConfirm";
import CTAButton from "@/components/ui/CTAButton";

const STEPS = [
  { component: StepPhaseA, fields: PHASE_A_FIELDS },
  { component: StepPhaseB, fields: PHASE_B_FIELDS },
  { component: StepPhaseC, fields: PHASE_C_FIELDS },
  { component: StepPhaseD, fields: PHASE_D_FIELDS },
  { component: StepConfirm, fields: CONSENT_FIELDS },
];

export default function ReviewWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const methods = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    mode: "onBlur",
    defaultValues: {
      q4_compared_services: [],
      q5_selection_reasons: [],
      q13_concerns: [],
      q13_good_points: [],
      q14_improvements: [],
      consent_privacy: false,
      consent_guideline: false,
    },
  });

  const { handleSubmit, trigger, formState: { isSubmitting } } = methods;

  const handleNext = async () => {
    const fields = STEPS[currentStep].fields;
    const valid = await trigger([...fields]);
    if (valid) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setSubmitError(null);
      await submitReview(data);
      navigate("/review/complete");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "送信に失敗しました。時間をおいて再度お試しください。");
    }
  };

  const StepComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProgressBar currentStep={currentStep} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>

        {/* Error message */}
        {submitError && (
          <div style={{
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: "0.75rem", padding: "1rem",
            marginTop: "1rem", color: "#DC2626",
            fontSize: "0.875rem",
          }}>
            {submitError}
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: "2rem", paddingTop: "1.5rem",
          borderTop: "1px solid #DDE5F0",
        }}>
          {currentStep > 0 ? (
            <CTAButton
              variant="outline"
              size="md"
              onClick={handlePrev}
              type="button"
              icon={
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              }
            >
              戻る
            </CTAButton>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <CTAButton
              variant="secondary"
              size="lg"
              type="submit"
              loading={isSubmitting}
            >
              {isSubmitting ? "送信中..." : "回答を送信する"}
            </CTAButton>
          ) : (
            <CTAButton
              variant="primary"
              size="md"
              onClick={handleNext}
              type="button"
            >
              次へ進む
            </CTAButton>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
