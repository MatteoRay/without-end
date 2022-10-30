import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
import { useTelegram } from "./hooks/useTelegram";
const { getData } = require("./db/db");
const products = getData();

function App() {
  const [cartItems, setCartItems, tg] = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  const onAdd = (products) => {
    const exist = cartItems.find((x) => x.id === products.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === products.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...products, quantity: 1 }]);
    }
  };

  const onRemove = (products) => {
    const exist = cartItems.find((x) => x.id === products.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== products.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === products.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    tg.MainButton.text = "Pay :)";
    tg.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">Order products</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {products.map((products) => {
          return (
            <Route
              index
              element={<Card />}
              food={products}
              key={products.id}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
