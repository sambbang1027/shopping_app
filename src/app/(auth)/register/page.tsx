"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/auth.schema";
import { register } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);

    const result = await register(formData);
    if (result?.error) return alert(result.error);

    alert("회원가입 완료! 로그인 페이지로 이동합니다.");
    router.push("/login");
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-8">
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
            Clot Studio
          </p>
          <h1 className="text-xl font-medium text-gray-900">Create Account</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
              Name
            </label>
            <input
              {...formRegister("name")}
              placeholder="홍길동"
              className="w-full border-b border-gray-200 pb-2 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-900 transition-colors bg-transparent"
            />
            {errors.name && (
              <p className="text-red-400 text-[10px] mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
              Email
            </label>
            <input
              {...formRegister("email")}
              type="email"
              placeholder="hello@example.com"
              className="w-full border-b border-gray-200 pb-2 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-900 transition-colors bg-transparent"
            />
            {errors.email && (
              <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
              Password
            </label>
            <input
              {...formRegister("password")}
              type="password"
              placeholder="••••••••"
              className="w-full border-b border-gray-200 pb-2 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-900 transition-colors bg-transparent"
            />
            {errors.password && (
              <p className="text-red-400 text-[10px] mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gray-900 text-white text-[11px] tracking-[0.3em] uppercase hover:bg-gray-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Create Account"}
        </button>

        <p className="text-center text-[10px] tracking-[0.1em] text-gray-400">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-gray-900 border-b border-gray-400 pb-px hover:border-gray-900 transition-colors">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
