let foodDatabase = [];

export const initFoodDatabase = () => {
  foodDatabase = [
    {
      id: 1,
      barcode: '123456789012',
      name: 'Organic Almond Milk',
      brand: 'NutriWell',
      calories: 60,
      protein: 1,
      carbs: 8,
      fat: 2.5,
      sugar: 5,
      sodium: 150,
      preservatives: ['citric acid'],
      allergens: ['tree nuts'],
      ingredients: ['water', 'almonds', 'sea salt', 'vitamin D', 'vitamin B12'],
      rating: 4
    },
    {
      id: 2,
      barcode: '223456789012',
      name: 'Whole Grain Bread',
      brand: 'HealthyBake',
      calories: 80,
      protein: 4,
      carbs: 15,
      fat: 1,
      sugar: 2,
      sodium: 170,
      preservatives: [],
      allergens: ['wheat', 'gluten'],
      ingredients: ['whole wheat flour', 'water', 'yeast', 'salt', 'sugar'],
      rating: 5
    },
    {
      id: 3,
      barcode: '323456789012',
      name: 'Greek Yogurt',
      brand: 'ProBio',
      calories: 100,
      protein: 15,
      carbs: 5,
      fat: 2,
      sugar: 4,
      sodium: 50,
      preservatives: [],
      allergens: ['milk'],
      ingredients: ['milk', 'live active cultures'],
      rating: 5
    },
    {
      id: 4,
      barcode: '423456789012',
      name: 'Chocolate Chip Cookies',
      brand: 'SweetTreats',
      calories: 180,
      protein: 2,
      carbs: 24,
      fat: 9,
      sugar: 15,
      sodium: 110,
      preservatives: ['TBHQ', 'corn syrup'],
      allergens: ['wheat', 'milk', 'eggs'],
      ingredients: ['sugar', 'flour', 'chocolate chips', 'butter', 'eggs'],
      rating: 2
    },
    {
      id: 5,
      barcode: '523456789012',
      name: 'Tomato Sauce',
      brand: 'GardenFresh',
      calories: 40,
      protein: 1,
      carbs: 8,
      fat: 0.5,
      sugar: 6,
      sodium: 400,
      preservatives: ['citric acid'],
      allergens: [],
      ingredients: ['tomatoes', 'onion', 'garlic', 'herbs', 'olive oil'],
      rating: 3
    }
  ];
};

export const getFoodItemByBarcode = (barcode) => {
  return foodDatabase.find(item => item.barcode === barcode) || null;
};

export const searchFoodItems = (query) => {
  if (!query) {
    return foodDatabase;
  }
  
  query = query.toLowerCase();
  return foodDatabase.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.brand.toLowerCase().includes(query)
  );
};

export const getCategories = () => {
  return [
    { id: 1, name: 'Dairy Products' },
    { id: 2, name: 'Bread & Bakery' },
    { id: 3, name: 'Fruits & Vegetables' },
    { id: 4, name: 'Snacks & Sweets' },
    { id: 5, name: 'Beverages' },
    { id: 6, name: 'Canned Goods' }
  ];
};

export const getEssentials = () => {
  return foodDatabase.slice(0, 5);
};
