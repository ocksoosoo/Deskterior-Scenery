import * as S from "../../styles/ListPageStyles/Pagination.styles";

const getPageList = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [1];

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  // 1과 start 사이에 숨겨진 페이지가 1개면 숫자로, 2개 이상이면 "..."
  if (start === 3) {
    pages.push(2);
  } else if (start > 2) {
    pages.push("...");
  }

  for (let page = start; page <= end; page++) pages.push(page);

  // end와 totalPages 사이에 숨겨진 페이지가 1개면 숫자로, 2개 이상이면 "..."
  if (end === totalPages - 2) {
    pages.push(totalPages - 1);
  } else if (end < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
};

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const pages = getPageList(currentPage, totalPages);

  const goToPrev = () => currentPage > 1 && onPageChange?.(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages && onPageChange?.(currentPage + 1);

  const handleKeyDown = (action) => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <S.PaginationWrapper role="navigation" aria-label="페이지네이션">
      <S.StyledChevronLeftIcon
        role="button"
        tabIndex={currentPage <= 1 ? -1 : 0}
        aria-disabled={currentPage <= 1}
        aria-label="이전 페이지"
        $disabled={currentPage <= 1}
        onClick={goToPrev}
        onKeyDown={handleKeyDown(goToPrev)}
      />

      {pages.map((page, idx) =>
        page === "..." ? (
          <S.Ellipsis key={`ellipsis-${idx}`}>…</S.Ellipsis>
        ) : (
          <S.PageButton
            key={page}
            $active={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </S.PageButton>
        ),
      )}

      <S.StyledChevronRightIcon
        role="button"
        tabIndex={currentPage >= totalPages ? -1 : 0}
        aria-disabled={currentPage >= totalPages}
        aria-label="다음 페이지"
        $disabled={currentPage >= totalPages}
        onClick={goToNext}
        onKeyDown={handleKeyDown(goToNext)}
      />
    </S.PaginationWrapper>
  );
};

export default Pagination;
