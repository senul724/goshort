"use client";

import { signOut } from "next-auth/react";

export default function SignOut(props: { label: string }) {
  const { label } = props;
  return (
    <button
      className="p-2 w-1/3 text-2xl font-bold text-center text-white rounded-xl border shadow-lg hover:scale-105 border-sky-100 bg-sky-600"
      onClick={() => void signOut()}
    >
      {label}
    </button>
  );
}
