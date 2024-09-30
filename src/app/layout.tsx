import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/index.scss";
import Navbar from "@components/navigation/navBar";
import { Providers } from "@app/providers";
import { Skeletons } from "@components/themeButton/skeletonTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juan Tate",
  description: "Juan Tate's online portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <div className={"app"}>
          <Providers>
            <Skeletons>
              <Navbar />
              {children}
            </Skeletons>
          </Providers>
        </div>
      </body>
    </html>
  );
}
