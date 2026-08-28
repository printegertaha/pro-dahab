"use client";

import { useQuery } from "@tanstack/react-query";

export default function AllThreads() {
  const {data, isError, error} = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await fetch("api/threads");
      if (!res.ok) throw new Error("حصل خطأ في تحضير التغريدات");
      const data = await res.json();
      return data.data
    },
  });
  console.log(data)
  return <div>hi</div>;
}
