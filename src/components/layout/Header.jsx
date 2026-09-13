import useAuthStore from "../../store/UseAuthStore";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { getCategories } from "../../api/categoriesApi";
import staticCategories from "../../data/categories";
import { logout } from "../../api/authApi";
import { BasketIcon, LoginIcon, LogoutIcon, PersonIcon } from "../icons/Icons";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
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
  MenuButton,
  CartIconWrapper,
  CartBadge,
} from "../../styles/Header.styles";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // 스토어에서 cartiTRem 가져옴
  const { cartItems, syncCartWithServer, clearLocalCart } = useCartStore();

  // 로그인 확인
  const user = useAuthStore((state) => state.user);

  const clearUser = useAuthStore((state) => state.clearUser);
  // 뱃지 갯수 계산
  const cartCount = cartItems.length;
  const likedCount = useWishlistStore((state) => state.likedIds.size);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => {
        console.error("카테고리 로딩 실패:", err);
        // API가 실패해도 페이지 라우트 자체는 항상 존재하니, 메뉴가 통째로 사라지지 않게 정적 목록으로 대체
        setCategories(staticCategories);
      });
  }, []);

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
      <MenuButton type="button" aria-label="메뉴 열기">
        <span />
        <span />
        <span />
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
          <IconButton
            type="button"
            aria-label="로그아웃 버튼"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton as={Link} to="/login" aria-label="로그인 버튼">
            <LoginIcon />
          </IconButton>
        )}

        <IconButton as={Link} to="/cartpage" aria-label="장바구니 버튼">
          <CartIconWrapper>
            <BasketIcon width={30} height={30} />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </CartIconWrapper>
        </IconButton>

        <IconButton as={Link} to="/mypage" aria-label="마이페이지 버튼">
          <CartIconWrapper>
            <PersonIcon width={30} height={30} />
            {likedCount > 0 && <CartBadge>{likedCount}</CartBadge>}
          </CartIconWrapper>
        </IconButton>
      </IconContainer>
    </HeaderSection>
  );
};

export default Header;
