import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import useCartStore from "../../store/cartStore";
import { getProduct } from "../../api/productsApi";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";
import RecommendItems from "../../components/cart/RecommendItems";
import Modal from "../../components/common/Modal";
import PaymentModal from "../../components/common/PaymentModal";
import FailToast from "../../components/common/FailToast";
import SuccessToast from "../../components/common/SuccessToast";
import useLoadingStore from "../../store/UseLoadingStore";
import {
  CartContainer,
  TitleWrapper,
  Course,
  BreadcrumbLink,
  PageTitle,
  ActionBar,
  SelectAllLabel,
  SelectAllCheckbox,
  ClearAllButton,
  ItemListSection,
  LeftActionGroup,
  SelectedDeleteButton,
} from "../../styles/CartStyles/CartPage.styles";

const CartPage = () => {
  const {
    cartItems,
    error,
    fetchCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    removeSelectedItems,
  } = useCartStore();

  const { pathname } = useLocation();

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const [checkedItems, setCheckedItems] = useState([]);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [productInfoMap, setProductInfoMap] = useState({});

  // 최초 장바구니 조회 완료 여부
  const [cartLoaded, setCartLoaded] = useState(false);

  // soldOut / Best / New 정보 조회 완료 여부
  const [productInfoReady, setProductInfoReady] = useState(false);

  // 최초 체크박스 설정 완료 여부
  const [initialChecksReady, setInitialChecksReady] = useState(false);

  // 최초 서버에서 장바구니 조회
  /*useEffect(() => {
    fetchCart();
  }, [fetchCart]);*/
  useEffect(() => {
    let alive = true;

    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (error) {
        console.error("장바구니 로딩 실패:", error);
      } finally {
        if (alive) {
          setCartLoaded(true);
        }
      }
    };

    loadCart();

    return () => {
      alive = false;
    };
  }, [fetchCart]);
  // 결제 모달
  const confirmPayment = async () => {
    try {
      if (checkedItems.length > 0) {
        await removeSelectedItems(checkedItems);
        setCheckedItems([]);
      }

      setIsPaymentModalOpen(false);
      showSuccessToast("결제가 완료되었습니다.");
    } catch (err) {
      showFailToast(
        err.message || "결제는 완료되었으나 장바구니 비우기에 실패했습니다.",
      );
    }
  };

  // 장바구니 상품들의 최신 품절/뱃지 상태를 상품 상세 API로 조회
  const productIdsKey = [...new Set(cartItems.map((item) => item.productId))]
    .sort()
    .join(",");

  /*useEffect(() => {
    if (!productIdsKey) return;
    const productIds = productIdsKey.split(",").map(Number);

    Promise.all(
      productIds.map((id) =>
        getProduct(id)
          .then((product) => [id, product])
          .catch(() => [id, null]),
      ),
    ).then((results) => {
      setProductInfoMap(Object.fromEntries(results));
    });
  }, [productIdsKey]);*/
  useEffect(() => {
    if (!cartLoaded) return;

    let alive = true;

    async function loadProductInfo() {
      setProductInfoReady(false);

      // 장바구니가 비어있으면 별도로 조회할 상품이 없음
      if (!productIdsKey) {
        if (alive) {
          setProductInfoMap({});
          setProductInfoReady(true);
        }

        return;
      }

      const productIds = productIdsKey.split(",").map(Number);

      try {
        const results = await Promise.all(
          productIds.map((id) =>
            getProduct(id)
              .then((product) => [id, product])
              .catch((error) => {
                console.error(`상품 ${id} 정보 조회 실패:`, error);

                // 하나의 상품 조회가 실패해도
                // 페이지 전체 Loading은 끝날 수 있도록 처리
                return [id, null];
              }),
          ),
        );

        if (!alive) return;

        setProductInfoMap(Object.fromEntries(results));
      } finally {
        if (alive) {
          setProductInfoReady(true);
        }
      }
    }

    loadProductInfo();

    return () => {
      alive = false;
    };
  }, [cartLoaded, productIdsKey]);

  const isSoldOutProduct = (productId) =>
    Boolean(productInfoMap[productId]?.soldOut);

  // 품절 정보(productInfoMap) 조회가 끝났는지 여부 - 끝나기 전엔 체크 초기화를 미룬다
  /*const productInfoLoaded = cartItems.every(
    (item) => item.productId in productInfoMap,
  );*/

  // 체크 초기화 (cartItems + 품절 정보가 로드된 후 1회)
  /*useEffect(() => {
    if (
      cartItems.length > 0 &&
      productInfoLoaded &&
      checkedItems.length === 0
    ) {
      setCheckedItems(
        cartItems
          .filter((item) => !isSoldOutProduct(item.productId))
          .map((item) => item.cartItemId),
      );
    }
  }, [cartItems, productInfoLoaded]);*/

  // 최초 체크박스 설정, 품절 상품을 제외한 상품들을 기본 선택
  useEffect(() => {
    if (!productInfoReady || initialChecksReady) {
      return;
    }

    setCheckedItems(
      cartItems
        .filter((item) => !isSoldOutProduct(item.productId))
        .map((item) => item.cartItemId),
    );

    setInitialChecksReady(true);
  }, [productInfoReady, initialChecksReady, cartItems]);

  // 장바구니 + 최신 상품 정보 + 체크 상태까지 준비되면 App의 전역 Loading 종료
  useEffect(() => {
    if (!cartLoaded || !productInfoReady || !initialChecksReady) {
      return;
    }

    finishPageLoading(pathname);
  }, [
    cartLoaded,
    productInfoReady,
    initialChecksReady,
    pathname,
    finishPageLoading,
  ]);

  // 토스트 공통 헬퍼
  const showFailToast = (message) => toast(<FailToast message={message} />);
  const showSuccessToast = (message) =>
    toast(<SuccessToast message={message} />);

  // 에러 발생 시 알림
  useEffect(() => {
    if (error) {
      showFailToast(error);
    }
  }, [error]);

  // 개별 체크박스
  const handleToggleCheck = (id) => {
    setCheckedItems((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((itemId) => itemId !== id)
        : [...prevChecked, id],
    );
  };

  // 전체 선택 계산)
  const availableItems = cartItems.filter(
    (item) => !isSoldOutProduct(item.productId),
  );

  const isAllChecked =
    availableItems.length > 0 && availableItems.length === checkedItems.length;

  // 전체 선택 체크박스 동작
  const handleToggleAllCheck = () => {
    if (isAllChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(availableItems.map((item) => item.cartItemId));
    }
  };

  // 개별 삭제
  const handleDelete = async (id) => {
    try {
      await removeItem(id);
      setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
      showSuccessToast("장바구니에서 삭제했습니다.");
    } catch (err) {
      showFailToast(err.message || "삭제에 실패했습니다.");
    }
  };

  // 선택 삭제
  const handleRemoveSelected = async () => {
    if (checkedItems.length === 0) {
      showFailToast("삭제할 상품을 선택해주세요.");
      return;
    }
    try {
      await removeSelectedItems(checkedItems);
      setCheckedItems([]);
      showSuccessToast("선택한 상품을 삭제했습니다.");
    } catch (err) {
      showFailToast(err.message || "선택 삭제에 실패했습니다.");
    }
  };

  // 전체 삭제
  const confirmClearAll = async () => {
    try {
      await clearCart();
      setCheckedItems([]);
      showSuccessToast("장바구니를 비웠습니다.");
    } catch (err) {
      showFailToast(err.message || "전체 삭제에 실패했습니다.");
    } finally {
      setIsClearModalOpen(false);
    }
  };

  // 수량 증가/감소
  const handleIncrease = async (id) => {
    try {
      await increaseQuantity(id);
    } catch (err) {
      showFailToast(err.message || "수량 변경에 실패했습니다.");
    }
  };

  const handleDecrease = async (id) => {
    try {
      await decreaseQuantity(id);
    } catch (err) {
      showFailToast(err.message || "수량 변경에 실패했습니다.");
    }
  };

  // 결제 금액 계산
  const subtotal = cartItems
    .filter((item) => checkedItems.includes(item.cartItemId))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 80000 ? 0 : 3000;
  const total = subtotal + deliveryFee;

  const isAllSoldOut =
    cartItems.length > 0 &&
    cartItems.every((item) => isSoldOutProduct(item.productId));

  /*if (isLoading) {
    return (
      <CartContainer>
        <TitleWrapper>
          <Course>
            <BreadcrumbLink to="/">Home</BreadcrumbLink> &gt; Cart
          </Course>
          <PageTitle>Cart</PageTitle>
        </TitleWrapper>
        <div>불러오는 중...</div>
      </CartContainer>
    );
  }*/

  return (
    <>
      <CartContainer>
        <TitleWrapper>
          <Course>
            {/* 🌟 2. as={Link} 를 써서 껍데기는 a태그, 기능은 라우터 Link로 합체! */}
            <BreadcrumbLink as={Link} to="/" title="홈으로 이동">
              Home
            </BreadcrumbLink>{" "}
            &gt; Cart
          </Course>
          <PageTitle>Cart</PageTitle>
        </TitleWrapper>

        {cartItems.length > 0 && (
          <ActionBar>
            <LeftActionGroup>
              <SelectAllLabel>
                <SelectAllCheckbox
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={handleToggleAllCheck}
                />
                Selected All
              </SelectAllLabel>

              <SelectedDeleteButton onClick={handleRemoveSelected}>
                Selected Delete
              </SelectedDeleteButton>
            </LeftActionGroup>

            <ClearAllButton onClick={() => setIsClearModalOpen(true)}>
              All Delete
            </ClearAllButton>
          </ActionBar>
        )}

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <ItemListSection>
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartItemId}
                  item={item}
                  isChecked={checkedItems.includes(item.cartItemId)}
                  isSoldOut={isSoldOutProduct(item.productId)}
                  isBest={Boolean(productInfoMap[item.productId]?.isBest)}
                  isNew={Boolean(productInfoMap[item.productId]?.isNew)}
                  onToggleCheck={handleToggleCheck}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onDelete={handleDelete}
                />
              ))}
            </ItemListSection>

            <CartSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              isAllSoldOut={isAllSoldOut}
              onCheckout={() => setIsPaymentModalOpen(true)}
            />
          </div>
        )}
      </CartContainer>
      <RecommendItems />
      {isClearModalOpen && (
        <Modal
          title="All Delete?"
          description="정말 모두 지우시겠습니까?"
          confirmText="Delete"
          onClose={() => setIsClearModalOpen(false)}
          onConfirm={confirmClearAll}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentModal
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={confirmPayment}
        />
      )}
    </>
  );
};

export default CartPage;
