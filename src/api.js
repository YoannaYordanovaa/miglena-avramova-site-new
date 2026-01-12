// Променяме URL-а към твоя сървър
const BASE_URL = "http://localhost:3010"; 

export const fetchProducts = async (category) => {
  const endpoints = {
    'drinks': '/getDrinks',
    'supplements': '/getSupplements',
    'face': '/getFace',
    'body': '/getBody',
    'hygiene': '/getPersonalhygiene',
    'weight-loss': '/getWeightcontrol',
    'cosmetics': '/getCosmetics',
    'packages': '/getPackages',
    'shop': '/getProducts' 
  };

  const path = endpoints[category] || '/getProducts';
  try {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const getOrderUrl = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/getProductDetails/${productId}`);
    const data = await response.json();
    
    // Сглобяваме линка с твоя FBO ID
    const baseUrl = "https://foreverliving.com/shop/bgr/bg-BG/products/";
    const params = "?fboId=359100008314&purchaseFlowType=PERSONAL&languageCode=bg-BG&memberTitleId=8&storeId=74&countryCode=bgr&isBots=true&discountConfigType=11&uniqueExtRefID=4729ffc1-e225-4e04-a56e-f54ecf9e1dac&shortenUrl=thealoeveraco.shop/CZNu1yA4&referralUuid=b77a9075-fbc8-4d85-a029-37ea2d45b79b";
    
    return `${baseUrl}${data.forever_name}${params}`;
  } catch (error) {
    console.error("Order URL error:", error);
    return "#";
  }
};