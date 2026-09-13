import { StyledBadge } from "../../styles/CommonStyles/Badge.styles";

const Badge = ({ text, top, left, background, size }) => {
  return (
    <StyledBadge top={top} left={left} background={background} size={size}>
      {text}
    </StyledBadge>
  );
};

export default Badge;
