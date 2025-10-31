export interface SocialLoading {
  linkedin: boolean;
  google: boolean;
}

export interface SubmitStatus {
  type: "success" | "error" | "pending" | null;
  message: string;
}
