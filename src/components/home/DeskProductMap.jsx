import {
  DeskArea,
  DeskImage,
  HotspotButton,
} from "../../styles/MainStyles/DeskCurationSection.styles";

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
  };

    return (
          <DeskArea>
            {selectedStyle && (
              <>
                <DeskImage
                src={selectedStyle.imageUrl}
                alt={`${selectedStyle.name} style desk`}
                style={{objectPosition: selectedStyle.objectPosition ?? "center",}}
                />
                {/* coordinate(좌표 정보)가 있으면 해당 배열을 사용하고 없으면 빈 배열을 사용함 */}
                {(selectedStyle.coordinate ?? []).map((product, index) => (
                  <HotspotButton
                    key={product.productId}
                    type="button"
                    isSelected={product.productId === activeProductNumber}
                    aria-pressed={product.productId === activeProductNumber}
                    aria-label={`${index + 1}번 상품 보기`}
                    style={{
                      left: `${product.x}%`,
                      top: `${product.y}%`,
                    }}
                    onClick={() => onProductSelect(product.productId)}                    >
                      {index + 1}
                  </HotspotButton>
                ))}
              </>
            )}
          </DeskArea>
    )
}

export { DeskProductMap };