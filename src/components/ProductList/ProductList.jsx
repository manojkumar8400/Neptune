import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { useProductContext } from "../../contexts/ProductsListContext";

const ProductList = () => {

    const { product, productState: { sort, byStock, byFastDelivery, byHomeCategory, byNikon, bySony, byCanon, bySamsung, byPanasonic, byRating, bySearch, byRange, byCategory }, addCartState: { addCart }, addCartDispatch, wishListState: { addWishList }, wishListDispatch } = useProductContext()

    const transformProducts = () => {
        let sortedProducts = product;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                sort === "LOW_TO_HIGH" ? a.price - b.price : b.price - a.price
            )
        }
        if (byStock) {
            sortedProducts = sortedProducts.filter((prod) => prod.stock);
        }
        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.delivery);
        }
        if (byNikon) {
            sortedProducts = sortedProducts.filter((prod) => prod.brand === byNikon || prod.brand === bySony || prod.brand === byCanon || prod.brand === bySamsung || prod.brand === byPanasonic);
        }
        if (bySony) {
            sortedProducts = sortedProducts.filter((prod) => prod.brand === bySony || prod.brand === byNikon || prod.brand === byCanon || prod.brand === bySamsung || prod.brand === byPanasonic);
        }
        if (byCanon) {
            sortedProducts = sortedProducts.filter((prod) => prod.brand === byCanon || prod.brand === bySony || prod.brand === byNikon || prod.brand === bySamsung || prod.brand === byPanasonic);
        }
        if (bySamsung) {
            sortedProducts = sortedProducts.filter((prod) => prod.brand === bySamsung || prod.brand === bySony || prod.brand === byCanon || prod.brand === byNikon || prod.brand === byPanasonic);
        }
        if (byPanasonic) {
            sortedProducts = sortedProducts.filter((prod) => prod.brand === byPanasonic || prod.brand === bySony || prod.brand === byCanon || prod.brand === bySamsung || prod.brand === byNikon);
        }
        if (byHomeCategory) {
            sortedProducts = sortedProducts.filter((prod) => prod.brand === byHomeCategory)
        }
        if (byRating) {
            sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating)
        }
        if (bySearch) {
            sortedProducts = sortedProducts.filter((prod) => prod.brand.toLowerCase().includes(bySearch))
        }
        if (byRange) {
            sortedProducts = sortedProducts.filter((prod) => prod.price >= byRange)
        }
        if (byCategory[0] !== undefined) {
            sortedProducts = sortedProducts.filter((prod) => byCategory.includes(prod.brand));
        }
        return sortedProducts
    }

    const addCartHandler = (items) => {
        addCartDispatch({ type: "ADD_TO_CART", payload: items });
        toast.success("Item added in Cart");
    }

    const addWishlistHandler = (items) => {
        wishListDispatch({ type: "ADD_TO_WISHLIST", payload: items });
        toast.success("Item added in Wishlist");
    }

    return (
        <div className="main-container relative">
            <h3 className="m-8">Showing {transformProducts().length} of 22 products</h3>
            {
                transformProducts().map(items => {
                    return (
                        <>
                            <div className="wishlist grid m-tb-16">
                                <section className="flex justify-center relative">
                                    <img className="camera-images text-align" src={items.imgURL}
                                        alt="camera image" />
                                    {
                                        addWishList.some(item => item.id === items.id) ? (
                                            <button className="like-btn wishlist-icon setColor">&#10084;</button>
                                        ) : (
                                            <button onClick={() => addWishlistHandler(items)} className="like-btn wishlist-icon">&#10084;</button>
                                        )
                                    }
                                </section>
                                <div className="flex justify-between">
                                    <section>
                                        <p className="camera-title">{items.title}</p>
                                        <p className="rating">{items.rating}⭐ 65 Ratings & 472 Reviews</p>
                                        <ul className="features">
                                            <li>{items.mpixel}</li>
                                            <li>{items.zoom}</li>
                                            <li>{items.display_size}</li>
                                            <li>2 Year Warranty</li>
                                            <li>{items.stock ? <div>InStock</div> : <div>Out Of Stock</div>}</li>
                                            <li>Brand : {items.brand}</li>
                                        </ul>
                                        <section className="btn-container grid m-t-16">
                                            {
                                                addCart.some(i => i.id === items.id) ? (
                                                    <Link to="/mycart">
                                                        <button className="add-to-cart-btn go-btn-style">Go to Cart</button>
                                                    </Link>
                                                ) : (
                                                    <button disabled={!items.stock} className="add-to-cart-btn btn-style" onClick={_ => addCartHandler(items)}>
                                                        {items.stock ? "Add To Cart" : "Out Of Stock"}</button>
                                                )
                                            }
                                        </section>
                                    </section>
                                    <section className="price-section">
                                        <h3>₹{items.price}</h3>
                                        <small className="price-off">₹{items.offPrice}</small>
                                        <small className="percent-off">5% off</small>
                                        <br />
                                        <small>Free delivery</small>
                                        <p>{items.delivery ? <div>FastDelivary</div> : <div>3-4 Days</div>}</p>
                                    </section>
                                </div>
                            </div>
                            <hr />
                        </>
                    )
                })
            }
        </div>
    )
}

export { ProductList }