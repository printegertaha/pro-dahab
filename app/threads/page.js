import Link from "next/link";
import AllThreads from "./components_threads/AllThreads";
import ThreadsList from "@/components_threads/ThreadsList";

export default async function Threads_home_page() {
  return (
    <div>
      <ThreadsList />
    </div>
  );
}
