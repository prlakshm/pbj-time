import "./styles/App.css";
import { useState } from "react";
import sandwitchData from "./assets/sandwitch-data.json";
import SandwitchItem from "./components/SandwitchItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
sandwitchData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart

  // Use useState to create a state variable to hold the state of the cart
  const [cart, setCart] = useState([]);

  const [currentData, setCurrentData] = useState(sandwitchData); 
  const [selectedCategory, setSelectedCategory] = useState("Reset Sort");

  const categories = Array.from(new Set(sandwitchData.map(item => item.category))); // Extract unique categories

  const sortItemsByCategory = (category) => {
    setSelectedCategory(category)

    if (category === "Reset Sort") {
      setCurrentData(sandwitchData);
    } else {
      setCurrentData(sandwitchData.filter(item => item.category === category));
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  

  return (
    <div className="App">
      <body>
        <div class="left">
          <h1>PB&J Time</h1>{" "}
          {/* Sort dropdowns */}
          <div className="sort-dropdowns">
          <select 
          value={selectedCategory}
          onChange={(e) => sortItemsByCategory(e.target.value)} 
          style={{
            backgroundColor:
              selectedCategory === "Reset Sort"
                ? "#f9ecec"
                : "#ffbeae",
          }}>
              <option value="Reset Sort">Reset Sort</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          {/* TODO: personalize your sandwitch (if you want) */}
          <div class="sandwitch-items">
            {currentData.map(
              (
                item,
                index // TODO: map sandwitchData to sandwitchItem components
              ) => (
                <SandwitchItem
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  cart={cart}
                  setCart={setCart}
                /> // replace with sandwitchItem component
              )
            )}
          </div>
        </div>
        <div className="right">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            // If cart is empty, display a message
            <div className="message">
            <p>Nothing here just yet!</p>
            </div>
          ) : (
            // If cart is not empty, render cart items and total price
            <>
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <p>
                    {item.name} &times; {item.quantity}
                  </p>
                  <p>${item.price}</p>
                </div>
              ))}
              <div className="total">
                <p>Total:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </>
          )}
        </div>
      </body>
    </div>
  );
}

export default App;
