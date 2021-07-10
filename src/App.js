import React, {useEffect,useState} from 'react'
import {NavBar,Products} from './Componets'
import {commerce} from './lib/commerce';


const App = () => {

    const [products,setProducts]=useState([]); 
    const [cart, setCart] = useState({});

    const fetchProducts = async() =>{
        const {data} =await commerce.products.list();
        setProducts(data);
    }

    const handleAddToCart =async(productId,quantity) =>{
        const item = await commerce.cart.add(productId,quantity);
        setCart(item.cart);
    }

    const fetchCart = async() =>{
       
        setCart(await commerce.cart.retrieve());
    }


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    

console.log(cart);

    return (
        <div>
            <NavBar totalItems={cart.total_items}/>
            <Products products={products} onAddtoCart={handleAddToCart}/>
        </div>
    )
}

export default App
