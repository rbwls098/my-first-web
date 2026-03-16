// 활성 링크 컴포넌트
// 현재 URL과 href를 비교하여 활성 상태를 표시한다
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded ${
        isActive
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:bg-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}
