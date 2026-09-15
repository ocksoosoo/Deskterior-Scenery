import styled from "@emotion/styled";

export const SuccessToastStyle = {
  border: "1px solid #18a83b",
  borderRadius: "10px",
};

export const SuccessBox = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: 0,
  "& svg": {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#18a83b",
    flexShrink: 0,
  },
});

export const ToastText = styled.p(({ theme }) => ({
  margin: 0,
  width: "100%",
  // 아이콘이 absolute로 왼쪽에 고정돼있어서, 텍스트를 박스 전체 기준으로
  // 가운데 정렬하면 토스트가 좁아졌을 때(모바일) 아이콘과 겹친다. 양쪽에
  // 아이콘 폭만큼 여백을 줘서 아이콘을 피한 영역 안에서 가운데 정렬되게 함
  padding: "0 32px",
  boxSizing: "border-box",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  textAlign: "center",
  color: "#222",

  // 좁은 화면에서 메시지가 두 줄로 꺾이는 것을 막기 위해 폰트를 살짝 줄임
  // (워딩 자체도 최대한 짧게 맞춰서 이 크기에서 한 줄에 들어가게 함)
  [theme.media.mobile]: {
    fontSize: "14px",
  },
}));
