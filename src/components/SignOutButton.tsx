"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className=" text-red-500 hover:text-red-700
                text-xs tracking-widest uppercase transition-colors"
    >
      Logout
    </button>
  );
}
