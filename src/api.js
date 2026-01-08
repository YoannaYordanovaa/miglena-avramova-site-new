const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3010";

export const fetchProducts = async (category) => {
  // Напасване на категориите от твоето меню към ендпоинтите на сървъра
  const endpoints = {
    'drinks': '/getDrinks',
    'supplements': '/getSupplements',
    'face': '/getFace',
    'body': '/getBody',
    'hygiene': '/getPersonalhygiene',
    'weight-loss': '/getWeightcontrol',
    'cosmetics': '/getCosmetics',
    'packages': '/getPackages',
    'shop': '/getProducts' // Всички продукти
  };

  const path = endpoints[category] || '/getProducts';
  const response = await fetch(`${BASE_URL}${path}`);
  return await response.json();
};

export const getOrderUrl = async (productId) => {
  // Взимаме forever_name от сървъра
  const response = await fetch(`${BASE_URL}/getProductDetails/${productId}`);
  const data = await response.json();
  
  // Сглобяваме линка с твоя FBO ID
  const baseUrl = "https://foreverliving.com/shop/bgr/bg-BG/products/";
  const params = "?fboId=359100008314&purchaseFlowType=PERSONAL&languageCode=bg-BG";
  
  return `${baseUrl}${data.forever_name}${params}`;
};