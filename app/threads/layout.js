import Navbar_threads from "@/components_threads/Navbar_threads";
import Tanstack_threads_provider from "@/lib/Tanstack_threads_provider";
import React from "react";

export default function Threads_layout_page({ children }) {
  return (
    <div>
      <Tanstack_threads_provider>
       <Navbar_threads />
        {children}
      </Tanstack_threads_provider>
    </div>
  );
}
