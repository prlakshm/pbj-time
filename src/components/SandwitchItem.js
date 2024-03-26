// TODO: create a component that displays a single sandwitch item
import "../styles/SandwitchItem.css";

export default function SandwitchItem(props) {
  const { name, price, image, category, cart, setCart } = props;

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
        if (cart[existingItemIndex].name == name) {
          // If the same topping exists, update its quantity
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += 1;
          setCart(updatedCart);
        } else {
            // If not same topping, add seperatly
          setCart((prevCart) => [
            ...prevCart,
            { name, price, quantity: 1, category },
          ]);
        }
      } else {
        // If the topping doesn't exist or one topping, add it to the cart
        setCart((prevCart) => [
          ...prevCart,
          { name, price, quantity: 1, category },
        ]);
      }
    } else {
      if (existingItemIndex !== -1) {
        // If the item exists, update it in the cart
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = { name, price, quantity: 1, category };
        setCart(updatedCart);
      } else {
        // If the item doesn't exist, add it to the cart
        setCart((prevCart) => [
          ...prevCart,
          { name, price, quantity: 1, category },
        ]);
      }
    }
  };

  return (
    <div class="item">
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
