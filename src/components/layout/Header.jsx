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
import {
  fetchCategoryProducts,
  CATEGORY_PAGE_SIZE,
} from "../../utils/categoryProductsCache";
import { readLastPageMap } from "../../utils/categoryLastPage";
import { DEFAULT_SORT } from "../../data/sortOptions";
import { showFailToast, showSuccessToast } from "../common/ShowToast";
import Modal from "../common/Modal";
import { useNavigate } from "react-router";
import {
  HeaderSection,
  Logo,
  Navigation,
  NavList,
  NavItem,
  NavButton,
  IconContainer,
  AuthIconButton,
  CartIconButton,
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
  MobileMenuAuthActionButton,
  MobileMenuPersonButton,
  MobileMenuDivider,
  MobileMenuCategoryList,
  MobileMenuCategoryLink,
} from "../../styles/Header.styles";

// 카테고리 데이터(정적 목록/API 둘 다)에 한글 이름이 없어서, 호버 툴팁용으로만 따로 매핑
const CATEGORY_NAME_KO = {
  lighting: "조명",
  organization: "수납/정리",
  "digital-electronics": "디지털/전자기기",
  "desk-accessories": "데스크 액세서리",
  "objects-stationery": "문구",
};

// 메뉴 hover 시 카테고리 페이지 청크와 상품 목록을 미리 받아둬서 클릭 후
// 지연을 줄인다 (실제 이동 시 CategoryPage와 useCategoryProducts가 재사용)
function prefetchCategory(categoryId) {
  import("../../pages/Category/CategoryPage").catch(() => {});

  const page = readLastPageMap()[categoryId] ?? 1;
  fetchCategoryProducts({
    categoryId,
    page,
    sort: DEFAULT_SORT,
    search: "",
    pageSize: CATEGORY_PAGE_SIZE,
  }).catch(() => {});
}

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const MENU_TRANSITION_MS = 280;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeMenuTimeoutRef = useRef(null);
  // ESC 핸들러 안에서 최신 값만 읽기 위한 ref - 의존성 배열에 isLogoutModalOpen을
  // 직접 넣으면, 모달을 열고 닫을 때마다 아래 effect 전체(스크롤 잠금·포커스 이동)가
  // 다시 실행되면서 포커스가 모달이 아니라 드로어의 닫기 버튼으로 튕겨가 버린다.
  // (렌더 중에 ref를 직접 갱신하면 안 되는 프로젝트 lint 규칙 때문에 effect로 동기화)
  const isLogoutModalOpenRef = useRef(isLogoutModalOpen);
  useEffect(() => {
    isLogoutModalOpenRef.current = isLogoutModalOpen;
  }, [isLogoutModalOpen]);

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
      if (e.key !== "Escape") return;
      // 로그아웃 확인 모달이 메뉴 위에 떠 있는 동안은, ESC가 뒤에 있는 메뉴를
      // 조용히 닫아버리지 않고 지금 실제로 보고 있는 모달을 닫게 한다
      if (isLogoutModalOpenRef.current) {
        setIsLogoutModalOpen(false);
        return;
      }
      closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      menuButtonEl?.focus();
    };
  }, [isMenuOpen]);
  // 스토어에서 cartiTRem 가져옴
  const cartItems = useCartStore((s) => s.cartItems);
  const syncCartWithServer = useCartStore((s) => s.syncCartWithServer);
  const clearLocalCart = useCartStore((s) => s.clearLocalCart);

  // 로그인 확인
  const user = useAuthStore((state) => state.user);

  const clearUser = useAuthStore((state) => state.clearUser);
  // 뱃지 갯수 계산
  const cartCount = cartItems.length;
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

  const requestLogout = () => {
    // 모바일 햄버거 메뉴를 여기서 같이 닫아버리면, 메뉴가 닫힐 때 실행되는
    // 포커스 복귀 로직(menuButtonEl.focus())이 모달이 뜨는 순간과 겹쳐서
    // 포커스가 모달이 아니라 햄버거 버튼으로 가버린다. 실제로 로그아웃이
    // 확정된 뒤에만 메뉴를 닫아서 이 문제를 피한다 (햄버거에서 안 눌렀다면 열려있지도 않으니 무해함)
    setIsLogoutModalOpen(true);
  };

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    closeMenu();

    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 API 실패:", error);
      showFailToast("로그아웃에 실패했습니다.");
    } finally {
      // 서버 요청 성공/실패와 상관없이 로컬(토큰·유저·장바구니·찜)은 항상 정리한다
      localStorage.removeItem("token");
      clearUser();
      clearLocalCart();
      clearWishlist();

      showSuccessToast("로그아웃되었습니다.");
      navigate("/");
    }
  };

  return (
    <HeaderSection>
      <MenuButton
        ref={menuButtonRef}
        type="button"
        aria-label="메뉴 열기"
        title="메뉴 열기"
        onClick={openMenu}
      >
        <MenuIcon width={44} height={44} />
      </MenuButton>

      <Logo>
        <Link
          to="/"
          aria-label="타이틀 메인화면 버튼"
          title="SCENERY 홈페이지로 이동"
        >
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
                title={CATEGORY_NAME_KO[category.id]}
                onMouseEnter={() =>
                  category.path !== pathname && prefetchCategory(category.id)
                }
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
            title="로그아웃"
            onClick={requestLogout}
          >
            <LogoutIcon width={30} height={30} />
          </AuthIconButton>
        ) : (
          <AuthIconButton
            as={Link}
            to="/login"
            aria-label="로그인 버튼"
            title="로그인"
          >
            <LoginIcon width={30} height={30} />
          </AuthIconButton>
        )}

        <CartIconButton
          as={Link}
          to="/cartpage"
          aria-label="장바구니 버튼"
          title="장바구니"
        >
          <CartIconWrapper>
            <BasketIcon width={30} height={30} />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </CartIconWrapper>
        </CartIconButton>

        <AuthIconButton
          as={Link}
          to={user ? "/mypage" : "/login"}
          aria-label={user ? "로그인 시 마이페이지" : "비로그인 시 로그인"}
          title="마이페이지"
        >
          <CartIconWrapper>
            <PersonIcon width={30} height={30} />
          </CartIconWrapper>
        </AuthIconButton>
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
                  title="메뉴 닫기"
                  onClick={closeMenu}
                >
                  <CloseIcon width={24} height={24} style={{ flexShrink: 0 }} />
                </MobileMenuCloseButton>
              </MobileMenuHeader>

              <MobileMenuAuthRow>
                {user ? (
                  <MobileMenuAuthActionButton
                    type="button"
                    title="로그아웃"
                    onClick={requestLogout}
                  >
                    Log out
                  </MobileMenuAuthActionButton>
                ) : (
                  <>
                    <MobileMenuAuthButton
                      to="/login"
                      title="로그인"
                      onClick={closeMenu}
                    >
                      Login
                    </MobileMenuAuthButton>
                    <MobileMenuAuthButton
                      to="/signup"
                      title="회원가입"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </MobileMenuAuthButton>
                  </>
                )}
                <MobileMenuPersonButton
                  to={user ? "/mypage" : "/login"}
                  aria-label={
                    user ? "로그인 시 마이페이지" : "비로그인 시 로그인"
                  }
                  title="마이페이지"
                  onClick={closeMenu}
                >
                  <PersonIcon width={20} height={20} />
                </MobileMenuPersonButton>
              </MobileMenuAuthRow>

              <MobileMenuDivider />

              <MobileMenuCategoryList>
                {categories.map((category) => (
                  <MobileMenuCategoryLink
                    key={category.id}
                    to={category.path}
                    isActive={category.path === pathname}
                    title={CATEGORY_NAME_KO[category.id]}
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

      {isLogoutModalOpen &&
        // 헤더의 backdrop-filter가 position:fixed 자식의 기준(containing block)을
        // 뷰포트가 아닌 헤더 박스로 바꿔버려서, 모달이 화면 중앙이 아니라 헤더
        // 안에 갇혀 보이는 문제가 있었다. 햄버거 메뉴와 같은 방식으로 body에 포탈.
        createPortal(
          <Modal
            title="Log out?"
            description="정말 로그아웃 하시겠습니까?"
            confirmText="Log out"
            confirmTitle="로그아웃"
            onClose={() => setIsLogoutModalOpen(false)}
            onConfirm={handleLogout}
          />,
          document.body,
        )}
    </HeaderSection>
  );
};

export default Header;
