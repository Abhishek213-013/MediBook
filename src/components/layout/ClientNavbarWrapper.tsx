"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function ClientNavbarWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null during SSR to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return <Navbar />;
}