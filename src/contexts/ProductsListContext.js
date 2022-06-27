import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { productReducer, addCartReducer, wishListReducer } from "./ReducerFunc";

const productContext = createContext();

const ProductListProvider = ({ children }) => {

    const [productState, productDispatch] = useReducer(productReducer, {
        sort: null,
        byStock: false,
        byFastDelivery: false,
        byHomeCategory: null,
        byNikon: null,
        bySony: null,
        byCanon: null,
        byPanasonic: null,
        bySamsung: null,
        byRating: null,
        bySearch: "",
        byRange: null,
        byCategory: []
    });

    const [addCartState, addCartDispatch] = useReducer(addCartReducer, { addCart: [] });

    const [wishListState, wishListDispatch] = useReducer(wishListReducer, { addWishList: [] });

    const [cartItemLength, setCartItemLength] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [hideCard, setHideCard] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/products");
                setProduct(response.data.products);
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, []);

    return (
        <productContext.Provider value={{ product, productState, cartItemLength, setCartItemLength, totalPrice, setTotalPrice, hideCard, setHideCard, productDispatch, addCartState, addCartDispatch, wishListState, wishListDispatch }}>
            {children}
        </productContext.Provider>
    );
};

const useProductContext = () => useContext(productContext);

export { useProductContext, ProductListProvider }