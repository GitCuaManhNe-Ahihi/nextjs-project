import { LayoutProps } from "@/models/index";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/common/header"),{ssr: false});

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header/>
      <div>{children}</div>
    </div>
  );
}
