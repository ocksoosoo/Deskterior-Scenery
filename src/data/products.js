const products = [
  {
    id: 1,
    name: "Minimal Mushroom Wireless Lamp",
    categoryId: "lighting",
    price: 38000,
    isBest: true,
    imageUrl: "https://i.ibb.co/Nnxv35Z9/whaudwprj1.webp",
    description: "곡선 쉐이드와 3단 터치 디밍이 돋보이는 모던 무선 무드등",
  },
  {
    id: 2,
    name: "Slim Monitor Light Bar",
    categoryId: "lighting",
    price: 42000,
    imageUrl: "https://i.ibb.co/8nZPXKDW/whaudwprj4.webp",
    description: "눈부심 없이 데스크 작업 영역만 미니멀하게 밝히는 스크린바",
  },
  {
    id: 3,
    name: "Matte Metal Desk Lamp",
    categoryId: "lighting",
    price: 54000,
    imageUrl: "https://i.ibb.co/0p6ZRKzV/whaudwprj3.webp",
    description:
      "직선적인 알루미늄 바디와 정교한 각도 조절이 가능한 작업용 조명",
  },
  {
    id: 4,
    name: "Ambient Sunset Lamp",
    categoryId: "lighting",
    price: 26000,
    imageUrl: "https://i.ibb.co/TnszRpc/whaud2wprj.webp",
    description: "벽면에 은은한 빛을 투사해 공간의 무드를 바꾸는 감성 램프",
  },
  {
    id: 5,
    name: "Magnetic Mini Sensor Light",
    categoryId: "lighting",
    price: 19000,
    isNew: true,
    imageUrl: "https://i.ibb.co/d4d2nxGh/whaudwprj.webp",
    description: "선반이나 프레임에 자석으로 부착해 사용하는 충전식 큐브 조명",
  },
  {
    id: 6,
    name: "Glass Globe Table Lamp",
    categoryId: "lighting",
    price: 46000,
    isBest: true,
    imageUrl:
      "https://i.ibb.co/mr4BfqwL/e965dcb2-980a-4ee3-9470-8b9fd4b57198.webp",
    description: "미니멀한 구형 유리 쉐이드로 부드러운 빛을 내는 오브제 조명",
  },
  {
    id: 7,
    name: "Arch Head LED Desk Lamp",
    categoryId: "lighting",
    price: 58000,
    imageUrl: "https://i.ibb.co/r8HHBmg/Lighting.webp",
    description:
      "유려한 곡선의 화이트 아치 프레임과 균일하게 빛을 분산시키는 원형 플랫 헤드가 미니멀한 무드를 완성하는 데스크 스탠드",
  },
  {
    id: 8,
    name: "Wood Shade Articulated Desk Lamp",
    categoryId: "lighting",
    price: 64000,
    isNew: true,
    imageUrl: "https://i.ibb.co/0RHtKS1c/lamp.webp",
    description:
      "따뜻한 내추럴 우드 헤드와 견고한 매트 블랙 관절 바디가 조화를 이루며 정밀한 각도 조절이 가능한 작업용 램프",
  },
  {
    id: 9,
    name: "Clear Acrylic 3-Drawer Organizer",
    categoryId: "organization",
    price: 28000,
    isNew: true,
    imageUrl: "https://i.ibb.co/w8M6hk0/Chat-GPT-Image-2026-8-26-03-26-55.webp",
    description: "군더더기 없는 투명한 구조로 데스크 소품을 정돈하는 미니 서랍",
  },
  {
    id: 10,
    name: "Aluminum Slim File Rack",
    categoryId: "organization",
    price: 22000,
    imageUrl: "https://i.ibb.co/4Zt0P0jJ/file-lag.webp",
    description: "태블릿과 서류, 노트를 간결하게 수직 수납하는 메탈 스탠드",
  },
  {
    id: 11,
    name: "Modular Desk Tray",
    categoryId: "organization",
    price: 15000,
    imageUrl:
      "https://i.ibb.co/whfP5jRv/Chat-GPT-Image-2026-8-26-03-25-27.webp",
    description:
      "분리와 적층이 자유로워 필기도구를 단정하게 나누는 모던 트레이",
  },
  {
    id: 12,
    name: "Steel Cable Management Box",
    categoryId: "organization",
    price: 24000,
    imageUrl: "https://i.ibb.co/VWv7T0Fc/cable.webp",
    description: "엉킨 전선과 멀티탭을 깔끔하게 숨겨주는 미니멀 스틸 수납함",
  },
  {
    id: 13,
    name: "Foldable Felt Desk Basket",
    categoryId: "organization",
    price: 16000,
    imageUrl:
      "https://i.ibb.co/mF5j4B6P/Chat-GPT-Image-2026-8-26-03-27-12.webp",
    description:
      "부드러운 질감으로 일상 소품을 간편하게 담아두는 패브릭 바구니",
  },
  {
    id: 14,
    name: "Minimal Desk Pegboard",
    categoryId: "organization",
    price: 36000,
    isBest: true,
    soldOut: true,
    imageUrl:
      "https://i.ibb.co/TDYWK1WH/Chat-GPT-Image-2026-8-26-03-24-13.webp",
    description:
      "자주 쓰는 도구를 자석과 홀더로 공중에 띄워 정리하는 미니 타공판",
  },
  {
    id: 15,
    name: "Terracotta Module Desk Caddy",
    categoryId: "organization",
    price: 26000,
    isBest: true,
    imageUrl: "https://i.ibb.co/Fb4bjXL7/Organization.webp",
    description:
      "감각적인 톤다운 테라코타 컬러와 핸들 일체형 다분할 수납 구조로 소품을 한 번에 이동하고 정리할 수 있는 데스크 캐디",
  },
  {
    id: 16,
    name: "Matte Gray Wireless Headphones",
    categoryId: "digital-electronics",
    price: 129000,
    imageUrl: "https://i.ibb.co/60k4MX5Z/headphone.webp",
    description:
      "미니멀한 매트 그레이 바디와 편안한 이어쿠션으로 몰입감 넘치는 사운드 환경을 만들어주는 블루투스 헤드폰",
  },
  {
    id: 17,
    name: "3-in-1 Foldable Wireless Charger",
    categoryId: "digital-electronics",
    price: 48000,
    imageUrl: "https://i.ibb.co/b5GN3N48/Charger.webp",
    description:
      "폰, 워치, 이어폰을 슬림하게 거치하며 동시 충전하는 무선 스테이션",
  },
  {
    id: 18,
    name: "Minimal Bluetooth Mechanical Keyboard",
    categoryId: "digital-electronics",
    price: 79000,
    isNew: true,
    imageUrl: "https://i.ibb.co/9mQNqKtd/image.webp",
    description: "절제된 키캡 컬러와 정갈한 타건감을 갖춘 텐키리스 무선 키보드",
  },
  {
    id: 19,
    name: "Silent Wireless Mouse",
    categoryId: "digital-electronics",
    price: 34000,
    imageUrl: "https://i.ibb.co/c78MZwG/image.webp",
    description: "손목 부담을 덜어주는 슬림한 쉘과 조용한 클릭감의 마우스",
  },
  {
    id: 20,
    name: "Aluminum Cube Bluetooth Speaker",
    categoryId: "digital-electronics",
    price: 45000,
    isBest: true,
    imageUrl: "https://i.ibb.co/gZKyKDhh/1.webp",
    description:
      "미니멀 메탈 바디에서 나오는 깊은 사운드로 공간을 채우는 스피커",
  },
  {
    id: 21,
    name: "Ultra-Slim Magnetic Power Bank",
    categoryId: "digital-electronics",
    price: 32000,
    isNew: true,
    imageUrl: "https://i.ibb.co/fzQMM1C2/image.webp",
    description:
      "디바이스 후면에 밀착되는 군더더기 없는 맥세이프 일체형 배터리",
  },
  {
    id: 22,
    name: "Rotary Dial Desk Timer",
    categoryId: "digital-electronics",
    price: 21000,
    isNew: true,
    imageUrl: "https://i.ibb.co/rKvCnSwL/image.webp",
    description:
      "직관적인 휠 다이얼로 작업과 집중 시간을 관리하는 미니멀 타이머",
  },
  {
    id: 23,
    name: "Minimal 2-Way Speaker",
    categoryId: "digital-electronics",
    price: 89000,
    isBest: true,
    imageUrl: "https://i.ibb.co/xqTLTbwc/Digital-Electronics.webp",
    description:
      "화이트 바디와 블랙 듀얼 드라이버의 모던한 대비로 풍성한 데스크 사운드를 채워주는 컴팩트 스피커",
  },
  {
    id: 24,
    name: "Vegan Leather Wide Desk Mat",
    categoryId: "desk-accessories",
    price: 24000,
    imageUrl: "https://i.ibb.co/4Rhk90c0/wprj1.webp",
    description:
      "매트한 가죽 질감으로 데스크 톤을 정돈하고 방수성을 갖춘 장패드",
  },
  {
    id: 25,
    name: "Solid Aluminum Laptop Stand",
    categoryId: "desk-accessories",
    price: 38000,
    isBest: true,
    imageUrl: "https://i.ibb.co/NgHYqp3b/2.webp",
    description: "미니멀한 알루미늄 판재로 시선 높이와 쿨링을 확보하는 거치대",
  },
  {
    id: 26,
    name: "Walnut Wood Palm Rest",
    categoryId: "desk-accessories",
    price: 19000,
    imageUrl: "https://i.ibb.co/s9cTWhhy/wprj3.webp",
    description:
      "자연스러운 원목 질감으로 장시간 타이핑 시 손목을 받쳐주는 팜레스트",
  },
  {
    id: 27,
    name: "Magnetic Cable Drop Holder",
    categoryId: "desk-accessories",
    price: 12000,
    isBest: true,
    imageUrl: "https://i.ibb.co/gFJKygJm/wprj4.webp",
    description:
      "케이블 단자가 흘러내리지 않도록 자석으로 책상에 고정하는 홀더",
  },
  {
    id: 28,
    name: "Ceramic Incense Tray",
    categoryId: "desk-accessories",
    price: 23000,
    imageUrl: "https://i.ibb.co/xSNMvzD7/wprj5.webp",
    description: "정적인 도자기 오브제로 작업 전 기분 전환을 돕는 인센스 홀더",
  },
  {
    id: 29,
    name: "Stainless Steel Coaster Set",
    categoryId: "desk-accessories",
    price: 14000,
    imageUrl: "https://i.ibb.co/PGgvKWC4/wprj6.webp",
    description: "차가운 금속 감성으로 컵 표면의 물기를 방지하는 모던 코스터",
  },
  {
    id: 30,
    name: "Clear Cylinder Glass Vase",
    categoryId: "desk-accessories",
    price: 22000,
    isNew: true,
    imageUrl: "https://i.ibb.co/60QJ1NMM/glass.webp",
    description:
      "투명한 원통형 유리 실린더로 책상 위에 싱그러운 생기와 우아한 내추럴 포인트를 더해주는 플랜트 오브제",
  },
  {
    id: 31,
    name: "Minimal Grid Hardcover Journal",
    categoryId: "objects-stationery",
    price: 14000,
    imageUrl:
      "https://i.ibb.co/S4K96dNY/Chat-GPT-Image-2026-8-27-02-08-36.webp",
    description:
      "깔끔한 격자 내지로 생각과 아이디어를 자유롭게 기록하는 양장 노트",
  },
  {
    id: 32,
    name: "Matte Metal Gel Ink Pen",
    categoryId: "objects-stationery",
    price: 18000,
    isBest: true,
    imageUrl:
      "https://i.ibb.co/VcgQMN59/Chat-GPT-Image-2026-8-27-02-10-39.webp",
    description: "정밀 가공된 알루미늄 바디로 흔들림 없이 써지는 미니멀 볼펜",
  },
  {
    id: 33,
    name: "Neutral Index Sticky Tabs",
    categoryId: "objects-stationery",
    price: 6500,
    imageUrl: "https://i.ibb.co/KdWFmnb/Chat-GPT-Image-2026-8-27-02-18-27.webp",
    description: "차분한 뉴트럴 톤으로 서류와 책의 위치를 정돈하는 점착 플래그",
  },
  {
    id: 34,
    name: "Aluminum Cutting Ruler",
    categoryId: "objects-stationery",
    price: 9500,
    isNew: true,
    imageUrl:
      "https://i.ibb.co/ksrnZ5Tt/Chat-GPT-Image-2026-8-27-02-09-45.webp",
    description:
      "군더더기 없는 레이저 각인 눈금과 미끄럼 방지 패드가 들어간 금속 자",
  },
  {
    id: 35,
    name: "One-Touch Mini Tape Dispenser",
    categoryId: "objects-stationery",
    price: 13000,
    imageUrl:
      "https://i.ibb.co/bRXF6NNq/Chat-GPT-Image-2026-8-27-02-13-25.webp",
    description: "묵직한 베이스로 테이프를 한 손으로 깔끔하게 끊어 쓰는 절단기",
  },
  {
    id: 36,
    name: "Acrylic Pen Rest & Paperweight",
    categoryId: "objects-stationery",
    price: 11000,
    imageUrl:
      "https://i.ibb.co/8DX18QbM/Chat-GPT-Image-2026-8-27-02-17-16.webp",
    description: "펜을 거치하고 흩어지는 메모를 눌러두는 투명 아크릴 오브제",
  },
  {
    id: 37,
    name: "Peach Orange Metallic Hardcover Diary",
    categoryId: "objects-stationery",
    price: 18000,
    isNew: true,
    imageUrl: "https://i.ibb.co/W4rv8Y16/Orange-Note.webp",
    description:
      "부드러운 피치 오렌지 컬러와 은은한 메탈릭 광택이 조화를 이루는 세련된 하드커버 노트 다이어리",
  },
  {
    id: 38,
    name: "Matte Black 3-Tier Pen Organizer",
    categoryId: "organization",
    price: 19000,
    imageUrl: "https://i.ibb.co/hw8bS2y/Desk-Accessories.webp",
    description:
      "높낮이가 다른 3개의 원통 실린더와 하단 트레이가 결합되어 필기구와 클립을 단정하게 정돈하는 메탈 펜꽂이",
  },
  {
    id: 39,
    name: "Gunmetal Aluminum Pen Tray",
    categoryId: "objects-stationery",
    price: 24000,
    imageUrl: "https://i.ibb.co/v6spYjJL/tray.webp",
    description:
      "묵직한 건메탈 트레이에 슬림한 금속 자와 자주 쓰는 펜을 미니멀하게 거치하는 스테이셔너리 세트",
  },
  {
    id: 40,
    name: "Classic Gold Fountain Pen",
    categoryId: "objects-stationery",
    price: 45000,
    isBest: true,
    imageUrl: "https://i.ibb.co/pjD1MDss/pen.webp",
    description:
      "고급스러운 골드 포인트와 부드러운 필기감으로 데스크 위 깊이 있는 아날로그 기록을 완성하는 만년필",
  },
];

export default products;
