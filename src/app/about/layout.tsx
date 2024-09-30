import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Juan Tate",
  description: "Juan Tate's online portfolio",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
