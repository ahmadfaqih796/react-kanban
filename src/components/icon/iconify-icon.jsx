import { Icon } from "@iconify/react";
import styled from "styled-components";

export default function Iconify({
  icon,
  size = "1em",
  className = "",
  ...other
}) {
  return (
    <StyledIconify className="anticon">
      <Icon
        icon={icon}
        width={size}
        height={size}
        className={`m-auto ${className}`}
        {...other}
      />
    </StyledIconify>
  );
}

const StyledIconify = styled.div`
  display: inline-flex;
  vertical-align: middle;
  svg {
    display: inline-block;
  }
`;
