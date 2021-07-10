import React, {useEffect,useState} from 'react'
import {NavBar,Products} from './Componets'
import {commerce} from './lib/commerce';


const App = () => {

    const [products,setProducts]=useState([]); 

    const fetchProducts = async() =>{

        const {data} =await commerce.products.list();
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts();
    }, []);

console.log(products);

    return (
        <div>
            <NavBar/>
            <Products products={products}/>
        </div>
    )
}

export default App
