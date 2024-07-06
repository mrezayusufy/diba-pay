import { MainLayout } from "@/components";
import {Suspense} from "react"
import {LoadingEmoji} from "@/components"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<LoadingEmoji/>}>
      <MainLayout>
        {children}
      </MainLayout>
    </Suspense>
  );
}
