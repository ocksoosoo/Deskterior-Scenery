import { z } from "zod";

export const loginSchema = z.object({
  id: z.string().min(1, "아이디를 입력해주세요."),

  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const signupSchema = z.object({
  firstName: z.string().trim().min(1, "First Name을 입력해주세요."),

  lastName: z.string().trim().min(1, "Last Name을 입력해주세요."),

  id: z
    .string()
    .min(1, "아이디를 입력해주세요.")
    .min(4, "아이디는 4자 이상 입력해주세요.")
    .regex(/^[a-zA-Z0-9]+$/, "아이디는 영문과 숫자만 사용할 수 있습니다."),

  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요.")
    .min(4, "비밀번호는 4자 이상 입력해주세요.")
    .refine((data) => !/\s/.test(data), {
      message: "비밀번호에 공백을 입력할 수 없습니다.",
    }),

  contact: z
    .string()
    .refine(
      (data) =>
        data === "" ||
        /^010\d{8}$/.test(data) ||
        /^010-\d{4}-\d{4}$/.test(data),
      {
        message: "전화번호를 010-0000-0000 형식으로 입력해주세요.",
      },
    ),

  address: z.string(),

  terms: z.boolean(),
  privacy: z.boolean(),
  marketing: z.boolean(),
});
