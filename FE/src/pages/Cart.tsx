import React from 'react';

const Cart = () => {
  const { user } = localStorage.getItem("user", {})
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="mt-4 p-4 border border-gray-300 rounded">
        <p>No items in your cart.</p>
      </div>
    </div>
  );
}

export default Cart;
