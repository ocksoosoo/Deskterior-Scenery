import { useState } from "react";

/**
 * 로딩에 실패하거나 src 가 없으면 fallback 을 대신 렌더한다.
 * "어떤 src 가 실패했는지"를 저장해서, src 가 바뀌면 별도 초기화 없이
 * 자동으로 다시 시도한다.
 */
const SafeImage = ({
  src,
  alt = "",
  fallback = null,
  onError,
  ...imgProps
}) => {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) return fallback;

  const handleError = (e) => {
    setFailedSrc(src);
    onError?.(e);
  };

  // 핸들러가 붙기 전에 이미 실패한 경우(캐시된 에러 등)를 잡는다.
  const handleRef = (node) => {
    if (node && node.complete && node.naturalWidth === 0) {
      setFailedSrc(src);
    }
  };

  return (
    <img
      {...imgProps}
      ref={handleRef}
      src={src}
      alt={alt}
      onError={handleError}
    />
  );
};

export default SafeImage;
