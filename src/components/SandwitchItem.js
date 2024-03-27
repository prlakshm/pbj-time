import "../styles/SandwitchItem.css";

export default function SandwitchItem(props) {
  const { name, price, image, category, photo, cart, setCart } = props;

  const addToCart = () => {
    // Check if the item already exists in the cart based on its category
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.category === category
    );
  
    // Check if the category is 'Toppings'
    if (category === "Toppings") {
      // Calculate the number of existing toppings in the cart
      const existingToppingsCount = cart.reduce((total, cartItem) => {
        // Check if the item is a topping and add its quantity to the total count
        if (cartItem.category === "Toppings") {
          return total + cartItem.quantity;
        }
        return total;
      }, 0);
  
      // If there are already 2 toppings in the cart, display an error message and return
      if (existingToppingsCount === 2) {
        alert("You can only add up to two toppings!");
        return;
      } else if (existingToppingsCount === 1) {
        if (cart[existingItemIndex].name === name) {
          // If the same topping exists, update its quantity
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += 1;
          setCart(updatedCart);
        } else {
            // If not same topping, add seperatly
          setCart((prevCart) => [
            ...prevCart,
            { name, price, quantity: 1, category, photo },
          ]);
        }
      } else {
        // If there's only one or no topping, add the new topping to the cart
        setCart((prevCart) => [
          ...prevCart,
          { name, price, quantity: 1, category, photo },
        ]);
      }
    } else {
      // Check if there's an item of the same category in the cart
      if (existingItemIndex !== -1) {
        // If the item exists of the same category, replace it in the cart
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = { name, price, quantity: 1, category, photo };
        setCart(updatedCart);
      } else {
        // If the item doesn't exist, find the index to insert based on the category order
        let insertIndex = cart.length;
  
        if (category === "Jams") {
          // Find the index of the first occurrence of "Toppings"
          const toppingsIndex = cart.findIndex((item) => item.category === "Toppings");
          insertIndex = toppingsIndex !== -1 ? toppingsIndex : cart.length;
        } else if (category === "Nut Butters") {
          // Find the index of the first occurrence of "Jams" or "Toppings"
          const jamsIndex = cart.findIndex((item) => item.category === "Jams");
          const toppingsIndex = cart.findIndex((item) => item.category === "Toppings");
          const firstIndex = Math.min(jamsIndex !== -1 ? jamsIndex : cart.length, toppingsIndex !== -1 ? toppingsIndex : cart.length);
          insertIndex = firstIndex !== -1 ? firstIndex : cart.length;
        }
  
        // Insert the new item at the determined index
        const updatedCart = [...cart];
        updatedCart.splice(insertIndex, 0, { name, price, quantity: 1, category, photo });
        setCart(updatedCart);
      }
    }
  };
  

  return (
    <div class="item">
        {/* Sandwitch Item Card */}
      <div class="img-wrapper">
        <img src={image} alt={name + "Image"} />
      </div>
      <h3>{name}</h3>

      <div class="bottom-nav">
        <p>${parseFloat(price).toFixed(2)}</p>
        <button class="cart-button" onClick={addToCart}>
          Add
        </button>
      </div>
    </div>
  );
}
