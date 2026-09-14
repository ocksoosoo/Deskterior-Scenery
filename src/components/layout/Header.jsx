import useAuthStore from "../../store/UseAuthStore";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router";
import { logout } from "../../api/authApi";
import {
  BasketIcon,
  LoginIcon,
  LogoutIcon,
  PersonIcon,
  CloseIcon,
  MenuIcon,
} from "../icons/Icons";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import useCategoriesStore from "../../store/categoriesStore";
import { showFailToast, showSuccessToast } from "../common/ShowToast";
import { useNavigate } from "react-router";
import {
  HeaderSection,
  Logo,
  Navigation,
  NavList,
  NavItem,
  NavButton,
  IconContainer,
  IconButton,
  AuthIconButton,
  MenuButton,
  CartIconWrapper,
  CartBadge,
  MobileMenuOverlay,
  MobileMenuPanel,
  MobileMenuHeader,
  MobileMenuLogo,
  MobileMenuCloseButton,
  MobileMenuAuthRow,
  MobileMenuAuthButton,
  MobileMenuCartButton,
  MobileMenuDivider,
  MobileMenuCategoryList,
  MobileMenuCategoryLink,
} from "../../styles/Header.styles";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const MENU_TRANSITION_MS = 280;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeMenuTimeoutRef = useRef(null);

  const openMenu = () => {
    // 닫는 도중(언마운트 타이머 대기 중)에 다시 열면, 예약돼있던 언마운트가
    // 뒤늦게 발동해서 방금 다시 연 메뉴를 꺼버리는 문제가 있어 먼저 취소함
    if (closeMenuTimeoutRef.current) {
      clearTimeout(closeMenuTimeoutRef.current);
      closeMenuTimeoutRef.current = null;
    }
    setIsMenuRendered(true);
    // 마운트 직후 바로 open을 켜면 transition이 안 먹으므로 한 프레임 뒤에 켠다
    requestAnimationFrame(() => setIsMenuOpen(true));
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    closeMenuTimeoutRef.current = setTimeout(() => {
      setIsMenuRendered(false);
      closeMenuTimeoutRef.current = null;
    }, MENU_TRANSITION_MS);
  };

  useEffect(() => {
    return () => {
      if (closeMenuTimeoutRef.current)
        clearTimeout(closeMenuTimeoutRef.current);
    };
  }, []);

  // 메뉴 열려있는 동안 배경 스크롤 잠금 + ESC로 닫기 + 포커스 이동
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const menuButtonEl = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      menuButtonEl?.focus();
    };
  }, [isMenuOpen]);
  // 스토어에서 cartiTRem 가져옴
  const { cartItems, syncCartWithServer, clearLocalCart } = useCartStore();

  // 로그인 확인
  const user = useAuthStore((state) => state.user);

  const clearUser = useAuthStore((state) => state.clearUser);
  // 뱃지 갯수 계산
  const cartCount = cartItems.length;
  const likedCount = useWishlistStore((state) => state.likedIds.size);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  // 스토어가 앱 전체에서 딱 한 번만 요청/캐시하므로, 다른 페이지에서 이미
  // 불러왔다면 여기선 다시 요청하지 않고 캐시된 값을 그대로 씀
  const categories = useCategoriesStore((state) => state.categories) ?? [];
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 로그인 상태일 때, 다른 탭/기기에서 장바구니가 바뀌었을 수 있으니 서버와
  // 개수를 맞춰본다 (syncCartWithServer 자체가 비회원이면 아무것도 안 하는
  // 가드를 갖고 있지만, 불필요한 호출 자체를 줄이려고 여기서도 한 번 더 확인)
  useEffect(() => {
    if (!user) return;
    syncCartWithServer();
  }, [user, syncCartWithServer]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 API 실패:", error);
      showFailToast("Logout Fail");
    } finally {
      // 서버 요청 성공/실패와 상관없이 로컬(토큰·유저·장바구니·찜)은 항상 정리한다
      localStorage.removeItem("token");
      clearUser();
      clearLocalCart();
      clearWishlist();

      showSuccessToast("Logout successful");
      navigate("/");
    }
  };

  return (
    <HeaderSection>
      <MenuButton
        ref={menuButtonRef}
        type="button"
        aria-label="메뉴 열기"
        onClick={openMenu}
      >
        <MenuIcon width={44} height={44} />
      </MenuButton>

      <Logo>
        <Link to="/" aria-label="타이틀 메인화면 버튼">
          SCENERY
        </Link>
      </Logo>

      <Navigation>
        <NavList>
          {categories.map((category) => (
            <NavItem key={category.id}>
              <NavButton
                as={Link}
                to={category.path}
                isActive={category.path === pathname}
                aria-label={`${category.name} 버튼`}
              >
                {category.name}
              </NavButton>
            </NavItem>
          ))}
        </NavList>
      </Navigation>

      <IconContainer>
        {user ? (
          <AuthIconButton
            type="button"
            aria-label="로그아웃 버튼"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </AuthIconButton>
        ) : (
          <AuthIconButton as={Link} to="/login" aria-label="로그인 버튼">
            <LoginIcon />
          </AuthIconButton>
        )}

        <IconButton as={Link} to="/cartpage" aria-label="장바구니 버튼">
          <CartIconWrapper>
            <BasketIcon width={30} height={30} />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </CartIconWrapper>
        </IconButton>

        <IconButton
          as={Link}
          to={user ? "/mypage" : "/login"}
          aria-label={user ? "로그인 시 마이페이지" : "비로그인 시 로그인"}
        >
          <CartIconWrapper>
            <PersonIcon width={30} height={30} />
            {likedCount > 0 && <CartBadge>{likedCount}</CartBadge>}
          </CartIconWrapper>
        </IconButton>
      </IconContainer>

      {isMenuRendered &&
        createPortal(
          <>
            <MobileMenuOverlay data-open={isMenuOpen} onClick={closeMenu} />
            <MobileMenuPanel data-open={isMenuOpen}>
              <MobileMenuHeader>
                <MobileMenuLogo>SCENERY</MobileMenuLogo>
                <MobileMenuCloseButton
                  ref={closeButtonRef}
                  type="button"
                  aria-label="메뉴 닫기"
                  onClick={closeMenu}
                >
                  <CloseIcon width={24} height={24} style={{ flexShrink: 0 }} />
                </MobileMenuCloseButton>
              </MobileMenuHeader>

              <MobileMenuAuthRow>
                {user ? (
                  <MobileMenuAuthButton
                    as="button"
                    type="button"
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                  >
                    Logout
                  </MobileMenuAuthButton>
                ) : (
                  <>
                    <MobileMenuAuthButton to="/login" onClick={closeMenu}>
                      Login
                    </MobileMenuAuthButton>
                    <MobileMenuAuthButton to="/signup" onClick={closeMenu}>
                      Sign Up
                    </MobileMenuAuthButton>
                  </>
                )}
                <MobileMenuCartButton
                  to="/cartpage"
                  aria-label="장바구니 버튼"
                  onClick={closeMenu}
                >
                  <BasketIcon width={20} height={20} />
                </MobileMenuCartButton>
              </MobileMenuAuthRow>

              <MobileMenuDivider />

              <MobileMenuCategoryList>
                {categories.map((category) => (
                  <MobileMenuCategoryLink
                    key={category.id}
                    to={category.path}
                    onClick={closeMenu}
                  >
                    {category.name}
                  </MobileMenuCategoryLink>
                ))}
              </MobileMenuCategoryList>
            </MobileMenuPanel>
          </>,
          document.body,
        )}
    </HeaderSection>
  );
};

export default Header;
