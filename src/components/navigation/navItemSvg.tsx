export const NavItemSVG = ({ svg, href, className }) => {
  return (
    <a href={href} target="_blank" className={className}>
      <div>{svg}</div>
    </a>
  );
};
