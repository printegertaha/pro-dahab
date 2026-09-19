"use client";

import { Toaster, toast, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";

export default function CustomToastProvider() {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 2;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // הרسايل الظاهرة بس
      .filter((_, i) => i >= TOAST_LIMIT) // اللي تخطوا الحد الأقصى (القديم)
      .forEach((t) => toast.dismiss(t.id)); // نمسحهم
  }, [toasts]);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#18181b",
          color: "#f4f4f5",
          border: "1px solid #3f3f46",
        },
      }}
    />
  );
}
