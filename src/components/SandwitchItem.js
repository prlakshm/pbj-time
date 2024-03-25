// TODO: create a component that displays a single sandwitch item
import "../styles/SandwitchItem.css";
import { useState } from "react";


export default function SandwitchItem(props) {
    const {name, price, image, cart, setCart} = props;

    const [quantity, setQuantity] = useState(1); // Assuming the initial quantity is 1

    const addToCart = () => {
        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(item => item.name === name);
    
        if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            // If the item doesn't exist, add it to the cart with a quantity of 1
            setCart(prevCart => [...prevCart, { name, price, quantity: 1 }]);
        }
    
        // Increase quantity by 1 (optional)
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    return(
        <div class="item">
            <div class="img-wrapper">
            <img src={image} alt={name + "Image"}/>
            </div>
            <h3>{name}</h3>

            <div class="bottom-nav">
            <p>${price}</p>
            <button class="cart-button" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
}