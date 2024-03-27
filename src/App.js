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
  const [selectedSort, setSelectedSort] = useState("Reset Sort");
  const [selectedFilter, setSelectedFilter] = useState("Reset Filter");
  const [sortedData, setSortedData] = useState(sandwitchData);

  const categories = Array.from(
    new Set(sandwitchData.map((item) => item.category))
  ); // Extract unique categories

  const sortItemsByCategory = (category) => {
    // Set selected sort
    setSelectedSort(category);
  
    // Apply sorting
    let sorted;
    if (category === "Reset Sort") {
      sorted = [...sandwitchData];
    } else {
      sorted = sandwitchData.filter((item) => item.category === category);
    }

    setSortedData(sorted)
  
    // Apply existing filter along with sort
    switch (selectedFilter) {
      case "Reset Filter":
        setCurrentData(sorted);
        break;
      case "Low to High":
        setCurrentData([...sorted].sort((a, b) => a.price - b.price));
        break;
      case "High to Low":
        setCurrentData([...sorted].sort((a, b) => b.price - a.price));
        break;
      case "A to Z":
        setCurrentData([...sorted].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "Z to A":
        setCurrentData([...sorted].sort((a, b) => b.name.localeCompare(a.name)));
        break;
      default:
        setCurrentData(sorted);
    }
  };

  const filterItems = (category) => {
    setSelectedFilter(category);

    switch (category) {
      case "Reset Filter":
        setCurrentData(sortedData);
        break;
      case "Low to High":
        setCurrentData([...currentData].sort((a, b) => a.price - b.price));
        break;
      case "High to Low":
        setCurrentData([...currentData].sort((a, b) => b.price - a.price));
        break;
      case "A to Z":
        setCurrentData(
          [...currentData].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Z to A":
        setCurrentData(
          [...currentData].sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      default:
        setCurrentData(sandwitchData);
    }
  };

  // Remove items from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    const itemToRemove = updatedCart[index];

    // Decrement quantity
    itemToRemove.quantity--;

    // If quantity becomes zero, remove the item from the cart
    if (itemToRemove.quantity === 0) {
      updatedCart.splice(index, 1);
    }
    // Update the cart state
    setCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="App">
      <body>
        <div className="left">
          <h1>PB&J Time</h1> {/* Sort dropdowns */}
          <div className="sort-dropdowns">
            <select
              value={selectedSort}
              onChange={(e) => sortItemsByCategory(e.target.value)}
              style={{
                backgroundColor:
                  selectedSort === "Reset Sort" ? "#f9ecec" : "#ffbeae",
              }}
            >
              <option value="Reset Sort">Reset Sort</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedFilter}
              onChange={(e) => filterItems(e.target.value)}
              style={{
                backgroundColor:
                  selectedFilter === "Reset Filter" ? "#f9ecec" : "#ffbeae",
              }}
            >
              <option value="Reset Filter">Reset Filter</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
            </select>
          </div>
          {/* TODO: personalize your sandwitch (if you want) */}
          <div className="sandwitch-items">
            {currentData.map(
              (
                item,
                index // TODO: map sandwitchData to sandwitchItem components
              ) => (
                <SandwitchItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  category={item.category}
                  photo={item.photo}
                  cart={cart}
                  setCart={setCart}
                /> // replace with sandwitchItem component
              )
            )}
          </div>
        </div>
        <div className="right">
          <div className="top">
            <div className="instructions">
              <h2>Instructions</h2>
              <ul>
                <li>
                  <span className="numering">1</span>. Choose a nut butter
                </li>
                <li>
                  <span className="numering">2</span>. Choose a jam
                </li>
                <li>
                  <span className="numering">3</span>. Choose up to two toppings
                </li>
              </ul>
            </div>
            <div className="cart-container">
              <div className="cart">
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
                          {item.name}{" "}
                          {item.category === "Toppings" && `× ${item.quantity}`}
                        </p>
                        <div className="price">
                          <p>${parseFloat(item.price).toFixed(2)} </p>
                          <span
                            className="clicker"
                            onClick={() => removeFromCart(index)}
                          >
                            &times;
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="total">
                      <p>
                        Total (
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                        ):
                      </p>
                      <p className="trash">
                        ${parseFloat(totalPrice).toFixed(2)}{" "}
                        <button onClick={() => setCart([])}>
                          <img src="icons/trash.png" alt="Trash Can Icon" />
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="build">
              <div className="img-container">
                <img src={"ps_photos/bread.png"} alt="Sandwich Base" />
                {cart.map((item, index) => (
                  <img
                    key={item.name}
                    src={item.photo}
                    alt={`Added Item ${index}`}
                    className="added-photo"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
