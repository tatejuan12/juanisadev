export const NavItemSvg = ({ svg, href, className }) => {
  return (
    <a href={href} target="_blank" className={className}>
      <div>{svg}</div>
    </a>
  );
};
