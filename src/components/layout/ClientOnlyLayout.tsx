// // src/components/layout/ClientOnlyLayout.tsx
// "use client";

// import { useState, useEffect, ReactNode } from "react";

// export default function ClientOnlyLayout({ children }: { children: ReactNode }) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null; // Render nothing on server
//   return <>{children}</>;
// }
