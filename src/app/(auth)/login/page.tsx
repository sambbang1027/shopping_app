"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth.schema";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.error)
      return alert("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-8">
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
          Clot Studio
        </p>
        <h1 className="text-xl font-medium text-gray-900">Sign In</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
            Email
          </label>
          <input
            {...register("email")}
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
            {...register("password")}
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
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-[10px] tracking-[0.1em] text-gray-400">
        계정이 없으신가요?{" "}
        <Link href="/register" className="text-gray-900 border-b border-gray-400 pb-px hover:border-gray-900 transition-colors">
          회원가입
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
