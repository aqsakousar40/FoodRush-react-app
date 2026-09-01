// src/data/products.js
// Categories aur product customization options — ye static rehte hain,
// Firestore mein save karne ki zaroorat nahi (kam badalte hain).
//
// Note: Actual products (dishes) ab Firestore ke "products" collection
// mein save hote hain — dekho src/firebase/productsService.js

export const categories = [
  { id: 'all', name: 'All', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80' },
  { id: 'burgers', name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
  { id: 'pizza', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80' },
  { id: 'chicken', name: 'Chicken', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&q=80' },
  { id: 'pasta', name: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&q=80' },
  { id: 'asian', name: 'Asian', image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=200&q=80' },
  { id: 'sandwiches', name: 'Sandwiches', image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=200&q=80' },
  { id: 'desserts', name: 'Desserts', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200&q=80' },
  { id: 'drinks', name: 'Drinks', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&q=80' },
]

export const sizeOptions = [
  { id: 'regular', name: 'Regular', priceDelta: 0 },
  { id: 'large', name: 'Large', priceDelta: 150 },
  { id: 'xl', name: 'Extra Large', priceDelta: 280 },
]

export const extraOptions = [
  { id: 'cheese', name: 'Extra Cheese', price: 100 },
  { id: 'jalapenos', name: 'Jalapenos', price: 50 },
  { id: 'sauce', name: 'Extra Sauce', price: 70 },
] 