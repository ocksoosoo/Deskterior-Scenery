import { useState, useEffect, useRef } from "react";
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

//주스탠드 개별 분할
const CartPage = () => {
  const cartItems = useCartStore((s) => s.cartItems);
  const error = useCartStore((s) => s.error);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const removeSelectedItems = useCartStore((s) => s.removeSelectedItems);
  const clearError = useCartStore((s) => s.clearError);

  // 라우팅
  const { pathname } = useLocation();
  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  // 컴포넌트 로컬 상태
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

  // 체크박스 자동화
  const seenIdsRef = useRef(new Set());

  // 장바구니 서버에서 불러오기
  useEffect(() => {
    let alive = true;
    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (error) {
        console.error("장바구니 로딩 실패:", error);
      } finally {
        if (alive) setCartLoaded(true);
      }
    };
    loadCart();
    return () => {
      alive = false;
    };
  }, [fetchCart]);

  // 장바구니 뱃지 조회
  const productIdsKey = [...new Set(cartItems.map((item) => item.productId))]
    .sort()
    .join(",");

  useEffect(() => {
    if (!cartLoaded) return;
    let alive = true;

    async function loadProductInfo() {
      setProductInfoReady(false);
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
                return [id, null];
              }),
          ),
        );
        if (!alive) return;
        setProductInfoMap(Object.fromEntries(results));
      } finally {
        if (alive) setProductInfoReady(true);
      }
    }
    loadProductInfo();
    return () => {
      alive = false;
    };
  }, [cartLoaded, productIdsKey]);

  // 품절 여부
  const isSoldOutProduct = (productId) =>
    Boolean(productInfoMap[productId]?.soldOut);

  // 체크박스 동기화
  const cartIdsKey = cartItems.map((i) => i.cartItemId).join(","); // 수량 변경 막기
  useEffect(() => {
    if (!productInfoReady) return;

    const selectable = cartItems.filter((i) => !isSoldOutProduct(i.productId));

    setCheckedItems((prev) => {
      const prevSet = new Set(prev);
      return selectable
        .filter(
          (i) =>
            !seenIdsRef.current.has(i.cartItemId) || prevSet.has(i.cartItemId), // 새상품, 기존상품 체크
        )
        .map((i) => i.cartItemId);
    });

    seenIdsRef.current = new Set(cartItems.map((i) => i.cartItemId)); // 방금 본 상품 기록
    setInitialChecksReady(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfoReady, cartIdsKey, productInfoMap]);

  // 데이터 로딩 완료 종료
  useEffect(() => {
    if (!cartLoaded || !productInfoReady || !initialChecksReady) return;
    finishPageLoading(pathname);
  }, [
    cartLoaded,
    productInfoReady,
    initialChecksReady,
    pathname,
    finishPageLoading,
  ]);

  // 토스트
  const showFailToast = (message) => toast(<FailToast message={message} />);
  const showSuccessToast = (message) =>
    toast(<SuccessToast message={message} />);

  // 에러 발생 알림 후 초기화
  useEffect(() => {
    if (error) {
      showFailToast(error);
      clearError();
    }
  }, [error, clearError]);

  // 개별 체크박스
  const handleToggleCheck = (id) => {
    setCheckedItems((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((itemId) => itemId !== id)
        : [...prevChecked, id],
    );
  };

  // 전체 선택 체크 토글
  const availableItems = cartItems.filter(
    (item) => !isSoldOutProduct(item.productId),
  );
  const isAllChecked =
    availableItems.length > 0 &&
    availableItems.every((item) => checkedItems.includes(item.cartItemId));

  const handleToggleAllCheck = () => {
    if (isAllChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(availableItems.map((item) => item.cartItemId));
    }
  };

  // 개별 상품 삭제
  const handleDelete = async (id) => {
    try {
      await removeItem(id);
      setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
      showSuccessToast("장바구니에서 삭제했습니다.");
    } catch (err) {
      showFailToast(err.message || "삭제에 실패했습니다.");
    }
  };

  // 선택 상품 삭제
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

  // 장바구니 비우기
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

  // 결제 확인
  const confirmPayment = async () => {
    if (checkedItems.length === 0) {
      setIsPaymentModalOpen(false);
      return;
    }
    try {
      await removeSelectedItems(checkedItems);
      setCheckedItems([]);
      setIsPaymentModalOpen(false);
      showSuccessToast("결제가 완료되었습니다.");
    } catch (err) {
      showFailToast(
        err.message || "결제는 완료되었으나 장바구니 비우기에 실패했습니다.",
      );
    }
  };

  // 결제 금액 및 배송비 계산
  const subtotal = cartItems
    .filter((item) => checkedItems.includes(item.cartItemId))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 80000 ? 0 : 3000;
  const total = subtotal + deliveryFee;

  const isAllSoldOut =
    cartItems.length > 0 &&
    cartItems.every((item) => isSoldOutProduct(item.productId));

  return (
    <>
      <CartContainer>
        <TitleWrapper>
          <Course>
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
              isCheckoutDisabled={isAllSoldOut || checkedItems.length === 0}
              onCheckout={() => {
                // 🌟 강력한 방어 코드: 클릭 시 무조건 검증하여 모달 자체를 막습니다!
                if (isAllSoldOut) {
                  showFailToast("품절된 상품은 결제할 수 없습니다.");
                  return;
                }
                if (checkedItems.length === 0) {
                  showFailToast("결제할 상품을 선택해주세요.");
                  return;
                }
                setIsPaymentModalOpen(true);
              }}
            />
          </div>
        )}
      </CartContainer>

      <RecommendItems cartLoaded={cartLoaded} />

      {isClearModalOpen && (
        <Modal
          title="All Delete?"
          description="정말 모두 지우시겠습니까?"
          confirmText="Delete"
          confirmTitle="전체 삭제"
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
