import useAuthStore from "../store/UseAuthStore";
import useWishlistStore from "../store/wishlistStore";
import { z } from "zod";
import { signupSchema } from "../schema/AuthSchema";
import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router";
import useLoadingStore from "../store/UseLoadingStore";
import useCartStore from "../store/cartStore";
import {
  logout,
  getMe,
  updateMe,
  updatePassword,
  deleteMe,
} from "../api/authApi";
import {
  showSuccessToast,
  showFailToast,
} from "../components/common/ShowToast";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router";
import {
  IconPencil,
  IconCircleX,
  IconEye,
  IconEyeClosed,
} from "@tabler/icons-react";
import { WishlistSection } from "./WishListSection";

import {
  MypageBox,
  MypageTitle,
  CardBox,
  UserCard,
  UserName,
  UserBottom,
  UserId,
  UserLogOut,
  AccountCard,
  AccountTitle,
  AccountForm,
  AccountGrid,
  AccountField,
  AccountLabel,
  ReadonlyText,
  Required,
  AccountInput,
  AddressField,
  SaveArea,
  ErrorIconWrapper,
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
  CurrentPasswordGroup,
  CurrentPasswordHidenButton,
  NewPasswordGroup,
  NewPasswordHidenButton,
  PasswordError,
  MypageInner,
  MypageBreadcrumb,
  MypageBreadcrumbLink,
} from "../styles/MyPage.styles";

const ChangePasswordSchema = z.object({
  newPassword: signupSchema.shape.password,
});

function Mypage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const clearUser = useAuthStore((state) => state.clearUser);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const clearLocalCart = useCartStore((s) => s.clearLocalCart);

  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shakingButton, setShakingButton] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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

        setFirstName(result.userInfo.firstName ?? "");
        setLastName(result.userInfo.lastName ?? "");
        setSavedFirstName(result.userInfo.firstName ?? "");
        setSavedLastName(result.userInfo.lastName ?? "");
        setContact(result.userInfo.contact ?? "");
        setAddress(result.userInfo.address ?? "");
        setId(result.userInfo.id ?? "");
        finishPageLoading(pathname);
      } catch (error) {
        showFailToast(
          "회원정보를 불러오기 실패하였습니다. 다시 시도 해주세요.",
        );
        navigate("/");
      }
    };

    fetchUserInfo();
  }, [pathname, finishPageLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSaving) return;

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
      setIsSaving(true);

      const formattedUserInfo = {
        ...updatedUserInfo.data,
        contact: formatPhoneNumber(updatedUserInfo.data.contact),
      };

      await updateMe(formattedUserInfo);
      setSavedFirstName(formattedUserInfo.firstName);
      setSavedLastName(formattedUserInfo.lastName);
      setContact(formattedUserInfo.contact);
      setAddress(formattedUserInfo.address);
      setSavedFirstName(formattedUserInfo.firstName);
      setSavedLastName(formattedUserInfo.lastName);
      showSuccessToast("회원정보 수정 완료!");
      setShakingButton(false);
      setErrors("");
    } catch (error) {
      setShakingButton(true);
      showFailToast("회원정보 수정이 실패하였습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
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
      clearLocalCart();
      setIsLogOutModalOpen(false);
      showSuccessToast("로그아웃되었습니다.");
      navigate("/");
    } catch (error) {
      showFailToast("로그아웃에 실패했습니다.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteMe();
      localStorage.removeItem("token");
      clearUser();
      clearWishlist();
      clearLocalCart();
      showSuccessToast("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      showFailToast("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleteUserModalOpen(false);
    }
  };

  const handlePasswordChange = async () => {
    if (isPasswordSaving) return;

    if (!currentPassword) {
      setPasswordError("현재 비밀번호를 입력해주세요.");
      return;
    }

    const passwordCheck = ChangePasswordSchema.safeParse({
      newPassword,
    });

    if (!passwordCheck.success) {
      setPasswordError(passwordCheck.error.issues[0].message);
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("현재 비밀번호와 변경할 비밀번호가 일치합니다.");
      return;
    }

    try {
      setIsPasswordSaving(true);

      await updatePassword({
        currentPassword,
        newPassword,
      });

      resetPasswordModal();
      setIsPasswordChangeModalOpen(false);
      showSuccessToast("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setIsPasswordSaving(false);
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!/^010\d{8}$/.test(phone)) return phone;

    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
  };

  const resetPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setPasswordError("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
  };

  const handlePasswordModalClose = () => {
    if (isPasswordSaving) return;
    resetPasswordModal();
    setIsPasswordChangeModalOpen(false);
  };

  return (
    <>
      <MypageBox>
        <MypageInner>
          <MypageBreadcrumb aria-label="현재 위치">
            <MypageBreadcrumbLink to="/" title="홈으로 이동">
              Home
            </MypageBreadcrumbLink>
            {" > "}
            <span aria-current="page">My Page</span>
          </MypageBreadcrumb>

          <MypageTitle>My Page</MypageTitle>

          <CardBox>
            <UserCard>
              <UserName>
                {savedLastName} {savedFirstName}
              </UserName>

              <UserBottom>
                <UserId>{id}</UserId>

                <UserLogOut
                  type="button"
                  aria-label="로그아웃 버튼"
                  title="로그아웃"
                  onClick={() => setIsLogOutModalOpen(true)}
                >
                  Log out
                </UserLogOut>
              </UserBottom>
            </UserCard>

            <AccountCard>
              <AccountTitle>Account Information</AccountTitle>
              <AccountForm onSubmit={handleSubmit}>
                <AccountGrid>
                  <AccountField>
                    <AccountLabel htmlFor="firstName">
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
                    <AccountLabel htmlFor="lastName">
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
                    <AccountLabel htmlFor="userId">
                      ID<ReadonlyText>(readOnly)</ReadonlyText>
                    </AccountLabel>

                    <AccountInput id="userId" type="text" value={id} readOnly />
                  </AccountField>

                  <AccountField>
                    <AccountLabel htmlFor="contact">Contact</AccountLabel>

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
                    <AccountLabel htmlFor="address">Address</AccountLabel>

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
                      <ErrorIconWrapper>
                        <IconCircleX stroke={1.5} color="#e64b3c" />
                      </ErrorIconWrapper>
                      {errors}
                    </ErrorText>
                  )}

                  <SaveButton
                    className={shakingButton ? "shake" : ""}
                    type="submit"
                    disabled={isSaving}
                    title={isSaving ? "저장 중" : "회원정보 저장"}
                    onAnimationEnd={() => setShakingButton(false)}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </SaveButton>
                </SaveArea>
              </AccountForm>
            </AccountCard>

            <WishlistSection />

            <SettingsCard>
              <SettingsTitle>Account Settings</SettingsTitle>
              <Settingstext>
                회원 탈퇴시 모든 계정 정보가 영구적으로 삭제되며, 복구할 수
                없습니다. <br /> 비말번호 변경은 보안을 위해 주기적으로
                권장드립니다.
              </Settingstext>
              <SettingsBtnGroup>
                <SettingsDeleteBtn
                  title="회원 탈퇴"
                  onClick={() => setIsDeleteUserModalOpen(true)}
                >
                  Delete account
                </SettingsDeleteBtn>
                <SettingsChangeBtn
                  title="비밀번호 변경"
                  onClick={() => setIsPasswordChangeModalOpen(true)}
                >
                  Change Password
                </SettingsChangeBtn>
              </SettingsBtnGroup>
            </SettingsCard>
            {isLogOutModalOpen && (
              <Modal
                title="Log out?"
                description="정말 로그아웃 하시겠습니까?"
                confirmText="Log out"
                confirmTitle="로그아웃"
                onClose={() => setIsLogOutModalOpen(false)}
                onConfirm={handleLogout}
              />
            )}
            {isDeleteUserModalOpen && (
              <Modal
                title="Withdrawal Confirmation"
                description={
                  "회원 탈퇴를 진행하시겠습니까?\n탈퇴 후 계정 정보가 모두 삭제되며 복구가 불가능 합니다."
                }
                confirmText="Confirm"
                confirmTitle="회원 탈퇴"
                onClose={() => setIsDeleteUserModalOpen(false)}
                onConfirm={handleDeleteUser}
              />
            )}
            {isPasswordChangeModalOpen && (
              <Modal
                title="Change Password"
                description="현재 비밀번호와 변경할 비밀번호를 입력해 주세요."
                confirmText="Save"
                confirmTitle="저장"
                icon={<IconPencil size={24} stroke={1.5} color="#ff5a2f" />}
                onClose={handlePasswordModalClose}
                onConfirm={handlePasswordChange}
              >
                <PasswordFormBox
                  as="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePasswordChange();
                  }}
                >
                  <PasswordField>
                    <PasswordLabel htmlFor="currentPassword">
                      Current Password
                    </PasswordLabel>
                    <CurrentPasswordGroup>
                      <PasswordInput
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          setPasswordError("");
                        }}
                      />

                      <CurrentPasswordHidenButton
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        aria-label={
                          showCurrentPassword
                            ? "비밀번호 숨기기"
                            : "비밀번호 보기"
                        }
                        title={
                          showCurrentPassword
                            ? "비밀번호 숨기기"
                            : "비밀번호 보기"
                        }
                      >
                        {showCurrentPassword ? (
                          <IconEyeClosed size={25} />
                        ) : (
                          <IconEye size={25} />
                        )}
                      </CurrentPasswordHidenButton>
                    </CurrentPasswordGroup>
                  </PasswordField>

                  <PasswordField>
                    <PasswordLabel htmlFor="newPassword">
                      New Password
                    </PasswordLabel>

                    <NewPasswordGroup>
                      <PasswordInput
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password (4자 이상)"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordError("");
                        }}
                      />

                      <NewPasswordHidenButton
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={
                          showNewPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                        }
                        title={
                          showNewPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                        }
                      >
                        {showNewPassword ? (
                          <IconEyeClosed size={25} />
                        ) : (
                          <IconEye size={25} />
                        )}
                      </NewPasswordHidenButton>
                    </NewPasswordGroup>

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
        </MypageInner>
      </MypageBox>
    </>
  );
}

export default Mypage;
