import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../icons/Icons";
import * as S from "../../styles/ListPageStyles/ProductToolbar.styles";

export const SORT_OPTIONS = [
  { value: "name", label: "이름순" },
  { value: "priceHigh", label: "가격높은순" },
  { value: "priceLow", label: "가격낮은순" },
  { value: "reviewCount", label: "리뷰많은순" },
];

const SEARCH_DEBOUNCE_MS = 400;

const ProductToolbar = ({
  search,
  onSearchChange,
  sortBy = "name",
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortBoxRef = useRef(null);

  // 검색어 입력은 즉시 화면에 반영하고, 실제 검색(API 호출)은 타이핑이 멈춘 후에만 실행
  const [inputValue, setInputValue] = useState(search);
  const [syncedSearch, setSyncedSearch] = useState(search);
  const [lastSent, setLastSent] = useState(search);
  const debounceRef = useRef(null);

  // 외부에서 검색어가 바뀌면(예: 브라우저 뒤로가기) 입력창도 동기화 — 렌더 중 조정
  // 단, 우리가 방금 보낸 검색어 때문에 바뀐 거라면(디바운스 응답 반영) 입력창은 건드리지 않음 —
  // 그 사이 사용자가 계속 타이핑했을 수 있어서 덮어쓰면 글자가 지워질 수 있음
  if (search !== syncedSearch) {
    setSyncedSearch(search);
    if (search !== lastSent) {
      setInputValue(search);
    }
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSearchInputChange = (value) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setLastSent(value);
      onSearchChange?.(value);
    }, SEARCH_DEBOUNCE_MS);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (sortBoxRef.current && !sortBoxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const currentOption =
    SORT_OPTIONS.find((option) => option.value === sortBy) ?? SORT_OPTIONS[0];

  // 메뉴를 닫을 때, 안의 옵션에 가 있던 포커스가 사라지지 않도록 트리거로 되돌림
  const closeMenu = () => {
    setIsOpen(false);
    sortBoxRef.current?.focus();
  };

  const handleSelect = (event, value) => {
    event.stopPropagation();
    onSortChange?.(value);
    closeMenu();
  };

  // 키보드(Tab 으로 포커스 → Enter / Space 로 열고 닫기, Esc 로 닫기)
  const handleSortBoxKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (event.key === "Escape") {
      closeMenu();
    }
  };

  // 옵션도 Tab 으로 이동 → Enter / Space 로 선택
  const handleOptionKeyDown = (event, value) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(event, value);
    } else if (event.key === "Escape") {
      event.stopPropagation();
      closeMenu();
    }
  };

  // Tab 으로 트리거/옵션을 벗어나 위젯 밖으로 완전히 포커스가 이동하면 메뉴 닫기
  const handleSortBoxBlur = (event) => {
    if (!sortBoxRef.current?.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <S.ToolbarWrapper>
      <S.SearchBox>
        <S.SearchInput
          value={inputValue}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          placeholder="search..."
        />
        <S.StyledSearchIcon />
      </S.SearchBox>

      <S.SortBox
        ref={sortBoxRef}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleSortBoxKeyDown}
        onBlur={handleSortBoxBlur}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <S.SortLabel>정렬</S.SortLabel>
        <strong>{currentOption.label}</strong>
        <ChevronDownIcon width={14} height={14} />

        {isOpen && (
          <S.SortMenu role="listbox">
            {SORT_OPTIONS.map((option) => (
              <S.SortMenuItem
                key={option.value}
                $active={option.value === sortBy}
                onClick={(event) => handleSelect(event, option.value)}
                onKeyDown={(event) => handleOptionKeyDown(event, option.value)}
                role="option"
                aria-selected={option.value === sortBy}
                tabIndex={0}
              >
                {option.label}
              </S.SortMenuItem>
            ))}
          </S.SortMenu>
        )}
      </S.SortBox>
    </S.ToolbarWrapper>
  );
};

export default ProductToolbar;
