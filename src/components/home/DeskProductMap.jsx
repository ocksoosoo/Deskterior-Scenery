import {
  DeskArea,
  DeskImage,
  HotspotButton,
} from "../../styles/MainStyles/DeskCurationSection.styles";
import { toResizedImageUrl } from "../../utils/imageProxy";

// 큐레이션 섹션에서 이 데스크 사진이 차지하는 실제 표시 폭보다 넉넉하게 -
// DeskCurationSection.jsx의 미리 불러오기(preload)도 이 값을 그대로 써서
// 실제 <img>가 요청할 주소와 똑같은 주소를 미리 받아두게 한다
export const DESK_IMAGE_WIDTH = 900;

function DeskProductMap({
    selectedStyle,
    activeProductNumber,
    onProductSelect,
}) {
    // handleCoordinate(): 클릭 좌표를 %로 계산하는 함수, getBoundingClientRect()로 상대적인 위치 정보를 제공하는 객체를 반환
  const handleCoordinate = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    console.log({
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
    });
  };

    return (
          <DeskArea onClick={handleCoordinate}>
            {selectedStyle && (
              <>
                <DeskImage
                src={toResizedImageUrl(selectedStyle.imageUrl, DESK_IMAGE_WIDTH)}
                alt={`${selectedStyle.name} style desk`}
                style={{objectPosition: selectedStyle.objectPosition ?? "center",}}
                />
                {/* coordinate(좌표 정보)가 있으면 해당 배열을 사용하고 없으면 빈 배열을 사용함 */}
                {(selectedStyle.coordinate ?? []).map((product, index) => (
                  <HotspotButton
                    key={product.productId}
                    type="button"
                    isSelected={product.productId === activeProductNumber}
                    aria-label={`${index + 1}번 상품 보기`}
                    style={{
                      left: `${product.x}%`,
                      top: `${product.y}%`,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onProductSelect(product.productId);
                    }}
                    >
                      {index + 1}
                  </HotspotButton>
                ))}
              </>
            )}
          </DeskArea>
    )
}

export { DeskProductMap };