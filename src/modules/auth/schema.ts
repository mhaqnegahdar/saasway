import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SigninFormData = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password should be at least 8 characters"),
    passwordConfirm: z.string().min(8, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password and its confirm don't match",
    path: ["passwordConfirm"], // This will attach the error to the passwordConfirm field
  });

export type SignupFormData = z.infer<typeof signupSchema>;
