import React from "react";
import { Link, LinkProps } from "react-router-dom";

const LinkBehavior = React.forwardRef<
  any,
  Omit<LinkProps, "to"> & { href: LinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material-UI) -> to (react-router)
  return <Link ref={ref} to={href} {...other} />;
});

export default LinkBehavior;
