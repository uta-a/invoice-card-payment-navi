import type { ReviewFormData } from "@/schemas/reviewSchema";

const API_URL = import.meta.env.VITE_API_URL || "/api/submit-review.php";

export interface SubmitReviewResponse {
  success: boolean;
  id?: string;
  error?: string;
}

export async function submitReview(data: ReviewFormData): Promise<SubmitReviewResponse> {
  // In development, log the data and simulate success
  if (import.meta.env.DEV) {
    console.log("[DEV] Review form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, id: "dev-" + Date.now() };
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error || `送信に失敗しました（${res.status}）`;
    throw new Error(message);
  }

  const body = await res.json().catch(() => null);
  if (!body) {
    throw new Error("レスポンスの解析に失敗しました");
  }
  return body;
}
