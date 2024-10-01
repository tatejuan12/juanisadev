import Link from "next/link";

export const NavItemPage = ({ href, className }) => {
  return (
    <Link href={href} className={className}>
      {href}
    </Link>
  );
};
