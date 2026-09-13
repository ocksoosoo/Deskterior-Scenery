import {
  FooterContainer,
  FooterInner,
  FooterInfo,
  FooterLogo,
  FooterDescription,
  FooterSupport,
  SupportTitle,
  SupportText,
  Copyright,
} from "../../styles/Footer.styles";

function Footer() {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterInfo>
          <FooterLogo>SCENERY</FooterLogo>

          <FooterDescription>
            A better scene for your everyday desk.
            <br />
            취향을 발견하고 공간을 완성하세요.
          </FooterDescription>
        </FooterInfo>

        <FooterSupport>
          <SupportTitle>SUPPORT</SupportTitle>

          <SupportText>FAQ</SupportText>
          <SupportText>Shipping</SupportText>
          <SupportText>Contact</SupportText>
        </FooterSupport>
      </FooterInner>
      <Copyright>© 2026 SCENERY</Copyright>
    </FooterContainer>
  );
}

export default Footer;
