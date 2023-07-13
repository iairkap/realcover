import React, { useContext } from "react";

function Checkout() {
  const { cart } = useContext(GlobalContext);

  return (
    <div>
      <h1>Checkout</h1>
      <Cart cart={cart} />
    </div>
  );
}

export default Checkout;
