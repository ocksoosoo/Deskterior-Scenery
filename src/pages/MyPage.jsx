import useAuthStore from "../store/UseAuthStore";
import useWishlistStore from "../store/wishlistStore";
import { signupSchema } from "../schema/AuthSchema";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import useLoadingStore from "../store/UseLoadingStore";
import { logout } from "../api/authApi";
import {
  showSuccessToast,
  showFailToast,
} from "../components/common/ShowToast";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router";
import { IconPencil, IconCircleX } from "@tabler/icons-react";

import {
  MypageBox,
  MypageTitle,
  CardBox,
  UserCard,
  UserHead,
  UserName,
  UserLogOut,
  UserId,
  AccountCard,
  AccountTitle,
  AccountForm,
  AccountGrid,
  AccountField,
  AccountLabel,
  Required,
  AccountInput,
  AddressField,
  SaveButton,
  WishlistCard,
  WishlistTitle,
  SettingsCard,
  SettingsTitle,
  Settingstext,
  SettingsBtnGroup,
  SettingsDeleteBtn,
  SettingsChangeBtn,
  PasswordFormBox,
  PasswordField,
  PasswordLabel,
  PasswordInput,
  PasswordError,
} from "../styles/MyPage.styles";

function Mypage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const clearUser = useAuthStore((state) => state.clearUser);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    finishPageLoading(pathname);
  }, [pathname, finishPageLoading]);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [contact, setContact] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUserInfo = {
      first,
      last,
      id,
      contact,
      address,
    };

    console.log("수정할 회원정보:", updatedUserInfo);
  };

  const MyPageSchema = signupSchema.pick({
    firstName: true,
    lastName: true,
    contact: true,
    address: true,
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 API 실패:", error);
      showFailToast("로그아웃에 실패했습니다.");
    } finally {
      // 서버 요청 성공/실패와 상관없이 로컬(토큰·유저·장바구니·찜)은 항상 정리한다
      localStorage.removeItem("token");
      clearUser();
      clearWishlist();
      setIsLogOutModalOpen(false);
      showSuccessToast("로그아웃되었습니다.");
      navigate("/");
    }
  };

  const handleDeleteUser = () => {
    setIsDeleteUserModalOpen(false);
    showSuccessToast("회원 탈퇴가 완료되었습니다.");
    navigate("/");
  };

  const handlePasswordChange = () => {
    console.log("현재 비밀번호:", currentPassword);
    console.log("새 비밀번호:", newPassword);
    setIsPasswordChangeModalOpen(false);
    showSuccessToast("비밀번호가 성공적으로 변경되었습니다.");
    navigate("/");
  };

  return (
    <>
      <MypageBox>
        <MypageTitle>My Page</MypageTitle>

        <CardBox>
          <UserCard>
            <UserHead>
              <UserName>홍길동</UserName>
              <UserLogOut
                type="button"
                aria-label="로그아웃 버튼"
                onClick={() => setIsLogOutModalOpen(true)}
              >
                Log out
              </UserLogOut>
            </UserHead>
            <UserId>hong</UserId>
          </UserCard>

          <AccountCard>
            <AccountTitle>Account Information</AccountTitle>
            <AccountForm onSubmit={handleSubmit}>
              <AccountGrid>
                <AccountField>
                  <AccountLabel>
                    First Name<Required>*</Required>
                  </AccountLabel>

                  <AccountInput
                    id="first"
                    type="text"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                  />
                </AccountField>

                <AccountField>
                  <AccountLabel>
                    Last Name<Required>*</Required>
                  </AccountLabel>

                  <AccountInput
                    id="last"
                    type="text"
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                  />
                </AccountField>

                <AccountField>
                  <AccountLabel>ID</AccountLabel>

                  <AccountInput id="userId" type="text" value={id} readOnly />
                </AccountField>

                <AccountField>
                  <AccountLabel>Contact</AccountLabel>

                  <AccountInput
                    id="contact"
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </AccountField>

                <AddressField>
                  <AccountLabel>Address</AccountLabel>

                  <AccountInput
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </AddressField>
              </AccountGrid>

              <SaveButton type="submit">Save Changes</SaveButton>
            </AccountForm>
          </AccountCard>

          <WishlistCard>
            <WishlistTitle>Wish List</WishlistTitle>
          </WishlistCard>

          <SettingsCard>
            <SettingsTitle>Account Settings</SettingsTitle>
            <Settingstext>
              회원 탈퇴시 모든 계정 정보와 활동 내역이 영구적으로 삭제되며,
              복구할 수 없습니다. <br /> 비말번호 변경은 보안을 위해 주기적으로
              권장드립니다.
            </Settingstext>
            <SettingsBtnGroup>
              <SettingsDeleteBtn onClick={() => setIsDeleteUserModalOpen(true)}>
                Delete account
              </SettingsDeleteBtn>
              <SettingsChangeBtn
                onClick={() => setIsPasswordChangeModalOpen(true)}
              >
                Change Password
              </SettingsChangeBtn>
            </SettingsBtnGroup>
          </SettingsCard>
          {isLogOutModalOpen && (
            <Modal
              title="Logout?"
              description="정말 로그아웃 하시겠습니까?"
              confirmText="Log out"
              onClose={() => setIsLogOutModalOpen(false)}
              onConfirm={handleLogout}
            />
          )}
          {isDeleteUserModalOpen && (
            <Modal
              title="Withdrawal Confirmation"
              description={
                "회원 탈퇴를 진행하시겠습니까?\n탈퇴 후 계정 정보와 작성하신 리뷰가 모두 삭제되며 복구가 불가능 합니다."
              }
              confirmText="Confirm"
              onClose={() => setIsDeleteUserModalOpen(false)}
              onConfirm={handleDeleteUser}
            />
          )}
          {isPasswordChangeModalOpen && (
            <Modal
              title="Change Password"
              description="현재 비밀번호와 변경할 비밀번호를 입력해 주세요."
              confirmText="Save"
              icon={<IconPencil size={24} stroke={1.5} color="#ff5a2f" />}
              onClose={() => setIsPasswordChangeModalOpen(false)}
              onConfirm={handlePasswordChange}
            >
              <PasswordFormBox>
                <PasswordField>
                  <PasswordLabel htmlFor="currentPassword">
                    Current Password
                  </PasswordLabel>

                  <PasswordInput
                    id="currentPassword"
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </PasswordField>

                <PasswordField>
                  <PasswordLabel htmlFor="newPassword">
                    New Password
                  </PasswordLabel>

                  <PasswordInput
                    id="newPassword"
                    type="password"
                    placeholder="New Password (4자 이상)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  {passwordError && (
                    <PasswordError>
                      <IconCircleX size={18} stroke={1.5} color="#e64b3c" />
                      {passwordError}
                    </PasswordError>
                  )}
                </PasswordField>
              </PasswordFormBox>
            </Modal>
          )}
        </CardBox>
      </MypageBox>
    </>
  );
}

export default Mypage;
