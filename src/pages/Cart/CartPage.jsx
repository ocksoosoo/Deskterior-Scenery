import { useState, useEffect } from "react";
import useAuthStore from "../../store/UseAuthStore";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import { FailToastStyle } from "../../styles/FailToast.styles";
import { SuccessToastStyle } from "../../styles/SuccessToast.styles";
import useCartStore from "../../store/cartStore";
import { getProduct } from "../../api/productsApi";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";
import Modal from "../../components/common/Modal";
import PaymentModal from "../../components/common/PaymentModal";
import RecommendItems from "../../components/cart/RecommendItems";
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
  const user = useAuthStore((s) => s.user);
  const cartItems = useCartStore((s) => s.cartItems);
  const error = useCartStore((s) => s.error);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const removeSelectedItems = useCartStore((s) => s.removeSelectedItems);
  const clearError = useCartStore((s) => s.clearError);

  const unselectedItemIds = useCartStore((s) => s.unselectedItemIds);
  const toggleItemSelection = useCartStore((s) => s.toggleItemSelection);
  const setAllSelected = useCartStore((s) => s.setAllSelected);

  const { pathname } = useLocation();
  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [productInfoMap, setProductInfoMap] = useState({});

  const [cartLoaded, setCartLoaded] = useState(false);
  const [productInfoReady, setProductInfoReady] = useState(false);

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

  const isSoldOutProduct = (productId) =>
    Boolean(productInfoMap[productId]?.soldOut);

  useEffect(() => {
    if (!cartLoaded || !productInfoReady) return;
    finishPageLoading(pathname);
  }, [cartLoaded, productInfoReady, pathname, finishPageLoading]);

  const showFailToast = (message) =>
    toast(<FailToast message={message} />, { style: FailToastStyle });
  const showSuccessToast = (message) =>
    toast(<SuccessToast message={message} />, { style: SuccessToastStyle });

  useEffect(() => {
    if (error) {
      showFailToast(error);
      clearError();
    }
  }, [error, clearError]);

  // 로컬 State 대신 실시간 상태로 렌더링
  const availableItems = cartItems.filter(
    (item) => !isSoldOutProduct(item.productId),
  );

  // 전체 활성 상품 중에서 '해제 리스트'에 없는 것들만 '체크된 상태'로 간주
  const checkedItems = availableItems
    .map((i) => i.cartItemId)
    .filter((id) => !unselectedItemIds.includes(id));

  const isAllChecked =
    availableItems.length > 0 && checkedItems.length === availableItems.length;

  const handleToggleCheck = (id) => {
    toggleItemSelection(id); // Zustand 호출
  };

  const handleToggleAllCheck = () => {
    if (isAllChecked) {
      // 모두 해제
      setAllSelected(
        false,
        availableItems.map((i) => i.cartItemId),
      );
    } else {
      // 모두 선택
      setAllSelected(true);
    }
  };

  // 삭제 로직
  const handleDelete = async (id) => {
    try {
      await removeItem(id);
      showSuccessToast("장바구니에서 삭제했습니다.");
    } catch (err) {
      showFailToast(err.message || "삭제에 실패했습니다.");
    }
  };

  const handleRemoveSelected = async () => {
    if (checkedItems.length === 0) {
      showFailToast("삭제할 상품을 선택해주세요.");
      return;
    }
    try {
      await removeSelectedItems(checkedItems);
      showSuccessToast("선택한 상품을 삭제했습니다.");
    } catch (err) {
      showFailToast(err.message || "선택 삭제에 실패했습니다.");
    }
  };

  const confirmClearAll = async () => {
    try {
      await clearCart();
      showSuccessToast("장바구니를 비웠습니다.");
    } catch (err) {
      showFailToast(err.message || "전체 삭제에 실패했습니다.");
    } finally {
      setIsClearModalOpen(false);
    }
  };

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

  const confirmPayment = async () => {
    if (checkedItems.length === 0) {
      setIsPaymentModalOpen(false);
      return;
    }
    try {
      await removeSelectedItems(checkedItems);
      setIsPaymentModalOpen(false);
      showSuccessToast("결제가 완료되었습니다.");
    } catch (err) {
      showFailToast(
        err.message || "결제는 완료되었으나 장바구니 비우기에 실패했습니다.",
      );
    }
  };

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
                  aria-label="전체 상품 선택"
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
              {cartItems.map((item, index) => (
                <CartItem
                  key={item.cartItemId}
                  item={item}
                  isChecked={checkedItems.includes(item.cartItemId)}
                  isPriority={index === 0}
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
                if (!user) {
                  showFailToast("로그인이 필요한 서비스입니다.");
                  return;
                }
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
