import useAuthStore from "../store/UseAuthStore";
import useWishlistStore from "../store/wishlistStore";
import { z } from "zod";
import { signupSchema } from "../schema/AuthSchema";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import useLoadingStore from "../store/UseLoadingStore";
import { logout, getMe, updateMe } from "../api/authApi";
import {
  showSuccessToast,
  showFailToast,
} from "../components/common/ShowToast";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router";
import { IconPencil, IconCircleX } from "@tabler/icons-react";
import { WishlistSection } from "./WishListSection";

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
  SaveArea,
  ErrorText,
  SaveButton,
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
  const [errors, setErrors] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shakingButton, setShakingButton] = useState(false);

  useEffect(() => {
    finishPageLoading(pathname);
  }, [pathname, finishPageLoading]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [savedFirstName, setSavedFirstName] = useState("");
  const [savedLastName, setSavedLastName] = useState("");
  const [contact, setContact] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const contactRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await getMe();

        setFirstName(result.userInfo.firstName);
        setLastName(result.userInfo.lastName);
        setSavedFirstName(result.userInfo.firstName);
        setSavedLastName(result.userInfo.lastName);
        setContact(result.userInfo.contact);
        setAddress(result.userInfo.address);
        setId(result.userInfo.id);
      } catch (error) {
        showFailToast(
          "회원정보를 불러오기 실패하였습니다. 다시 시도 해주세요.",
        );
        navigate("/");
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserInfo = MyPageSchema.safeParse({
      firstName,
      lastName,
      id,
      contact,
      address,
    });

    if (!updatedUserInfo.success) {
      const ErrorsMsg = z.flattenError(updatedUserInfo.error).fieldErrors;
      setErrors(Object.values(ErrorsMsg).flat()[0]);
      setShakingButton(true);

      const firstErrorField = updatedUserInfo.error.issues[0]?.path[0];

      const inputRefs = {
        firstName: firstNameRef,
        lastName: lastNameRef,
        contact: contactRef,
        address: addressRef,
      };

      inputRefs[firstErrorField]?.current?.focus();

      return;
    }

    try {
      await updateMe(updatedUserInfo.data);
      setSavedFirstName(updatedUserInfo.data.firstName);
      setSavedLastName(updatedUserInfo.data.lastName);
      showSuccessToast("회원정보 수정 완료!");
      setShakingButton(false);
      setErrors("");
    } catch (error) {
      setShakingButton(true);
      showFailToast("회원정보 수정이 실패하였습니다. 다시 시도해주세요.");
    }
  };

  const MyPageSchema = signupSchema.pick({
    firstName: true,
    lastName: true,
    contact: true,
    address: true,
  });

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors("");
    setShakingButton(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      clearUser();
      clearWishlist();
      setIsLogOutModalOpen(false);
      showSuccessToast("로그아웃되었습니다.");
      navigate("/");
    } catch (error) {
      showFailToast("로그아웃에 실패했습니다.");
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

  const formatPhoneNumber = (phone) => {
    const numbers = phone.replace(/\D/g, "");

    if (numbers.length !== 11) return phone;

    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  };

  return (
    <>
      <MypageBox>
        <MypageTitle>My Page</MypageTitle>

        <CardBox>
          <UserCard>
            <UserHead>
              <UserName>
                {savedLastName}
                {savedFirstName}
              </UserName>
              <UserLogOut
                type="button"
                aria-label="로그아웃 버튼"
                onClick={() => setIsLogOutModalOpen(true)}
              >
                Log out
              </UserLogOut>
            </UserHead>
            <UserId>{id}</UserId>
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
                    ref={firstNameRef}
                    id="firstName"
                    type="text"
                    value={firstName}
                    placeholder="ex)길동"
                    onChange={handleInputChange(setFirstName)}
                  />
                </AccountField>

                <AccountField>
                  <AccountLabel>
                    Last Name<Required>*</Required>
                  </AccountLabel>

                  <AccountInput
                    ref={lastNameRef}
                    id="lastName"
                    placeholder="ex)홍"
                    type="text"
                    value={lastName}
                    onChange={handleInputChange(setLastName)}
                  />
                </AccountField>

                <AccountField>
                  <AccountLabel>ID</AccountLabel>

                  <AccountInput id="userId" type="text" value={id} readOnly />
                </AccountField>

                <AccountField>
                  <AccountLabel>Contact</AccountLabel>

                  <AccountInput
                    ref={contactRef}
                    id="contact"
                    type="tel"
                    placeholder="ex)010-0000-0000"
                    value={contact}
                    onChange={handleInputChange(setContact)}
                    onBlur={() => {
                      setContact(formatPhoneNumber(contact));
                    }}
                  />
                </AccountField>

                <AddressField>
                  <AccountLabel>Address</AccountLabel>

                  <AccountInput
                    ref={addressRef}
                    id="address"
                    type="text"
                    value={address}
                    onChange={handleInputChange(setAddress)}
                  />
                </AddressField>
              </AccountGrid>

              <SaveArea>
                {errors && (
                  <ErrorText>
                    <IconCircleX size={18} stroke={1.5} color="#e64b3c" />
                    {errors}
                  </ErrorText>
                )}

                <SaveButton
                  className={shakingButton ? "shake" : ""}
                  type="submit"
                  onAnimationEnd={() => setShakingButton(false)}
                >
                  Save Changes
                </SaveButton>
              </SaveArea>
            </AccountForm>
          </AccountCard>

          <WishlistSection />

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
