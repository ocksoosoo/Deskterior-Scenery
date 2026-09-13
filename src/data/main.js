import products from "./products";

const main = [
  {
    id: 1,
    categoryId: "lighting",
    imageUrl: "https://i.ibb.co/Qv7Zd4gm/Lighting.webp",
  },
  {
    id: 2,
    categoryId: "organization",
    imageUrl: "https://i.ibb.co/VWwLgVjM/Organization.webp",
  },
  {
    id: 3,
    categoryId: "digital-electronics",
    imageUrl: "https://i.ibb.co/rf7XMB8c/Digital-Electronics.webp",
  },
  {
    id: 4,
    categoryId: "desk-accessories",
    imageUrl: "https://i.ibb.co/jKzWGzh/Desk-Accessories.webp",
  },
  {
    id: 5,
    categoryId: "objects-stationery",
    imageUrl: "https://i.ibb.co/W4rv8Y16/Orange-Note.webp",
  },
  {
    id: 6,
    styleId: "minimal",
    name: "Minimal",
    imageUrl: "https://i.ibb.co/XZwBHb6M/minimal-2.webp",
    coordinate: [
      {
        productId: 7, 
        x: 20.7,
        y: 16.9,
      },
      {productId: 39, 
        x: 19.1,
        y: 48.2,
      },
      {productId: 16, 
        x: 62.1,
        y: 41.6,
      },
      {productId: 31, 
        x: 49.9,
        y: 70.3,
      },      
    ],
},
  {
    id: 7,
    styleId: "natural",
    name: "Natural",
    imageUrl: "https://i.ibb.co/5WmKLLt1/natural.webp",
    coordinate: [
      {
        productId: 7,
        x: 19.3,
        y: 18.3,
      },
      {
        productId: 28,
        x: 18.8,
        y: 56.8,
      },
      {
        productId: 30,
        x: 87.8,
        y: 45.6,
      },
      {
        productId: 17,
        x: 83.7,
        y: 68.5,
      },
    ],
  },
  {
    id: 8,
    styleId: "hip",
    name: "Hip",
    imageUrl: "https://i.ibb.co/C3SKrd3p/hip.webp",
    coordinate: [
      {
        productId: 19,
        x: 46.4,
        y: 73.3,
      },
      {
        productId: 38,
        x: 77.4,
        y: 40.5,
      }
    ],
  },
  {
    id: 9,
    styleId: "metallic",
    name: "Metallic",
    imageUrl: "https://i.ibb.co/G4xmxMTR/metallic.webp",
    objectPosition: "center top",
    coordinate: [
      {
        productId: 2,
        x: 43.1,
        y: 6.3,
      },
      {
        productId: 29,
        x: 19.6,
        y: 63.3,
      },
      {
        productId: 20,
        x: 74.4,
        y: 50.2,
      },
      {
        productId: 27,
        x: 76.2,
        y: 86.6,
      }
    ]
  },
  {
    id: 10,
    styleId: "vintage",
    name: "Vintage",
    imageUrl: "https://i.ibb.co/svLS7jCq/vintage.webp",
    coordinate: [
      {
        productId: 26,
        x: 38.4,
        y: 81.3,
      },
      {
        productId: 14,
        x: 74.7,
        y: 16.5,
      },
      {
        productId: 13,
        x: 84.9,
        y: 77.3,
      },
    ],
  },
  {
    id: 11,
    styleId: "cozy",
    name: "Cozy",
    imageUrl: "https://i.ibb.co/prG57hG4/cozy.webp",
    coordinate: [
      {
        productId: 9,
        x: 14.1,
        y: 23.2,
      },
      {
        productId: 37,
        x: 42.9,
        y: 49.1,
      },
      {
        productId: 22,
        x: 83.6,
        y: 40.5,
      },
      {
        productId: 35,
        x: 90.9,
        y: 62.8,
      },
    ],
  },
  {
    id: 12,
    styleId: "pastel",
    name: "Pastel",
    imageUrl: "https://i.ibb.co/qMqDjnKS/pastel.webp",
    coordinate: [
      {
        productId: 23,
        x: 20.5,
        y: 52.2,
      },
      {
        productId: 12,
        x: 62,
        y: 65.1,
      },
      {
        productId: 18,
        x: 33.4,
        y: 78.9,
      },
      {
        productId: 2,
        x: 50.9,
        y: 23.9,
      }
    ],
  },
];

export default main;
