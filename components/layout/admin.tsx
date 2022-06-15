import React from "react";
import Link from "next/link";
import { LayoutProps } from "@/models/common";

export function AdminLayout({ children }: LayoutProps) {
  return (
    <>
      <div>admin</div>
      <div> sidebar </div>
      <ul>
        <li>
          <Link href={"/"}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={"/about"}>
            <a>Home</a>
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
}
