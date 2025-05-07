import { getRoles } from "@testing-library/dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Carousel from "./carousel";

const GetProducts = () => {
    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState("");
    let [filteredProducts, setFilteredProducts] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Default to light mode
    const [cart, setCart] = useState([]); // State for cart
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    const img_url = "https://calebmwaura.pythonanywhere.com/static/images/";
    const navigate = useNavigate();

    const getProducts = async () => {
        setError("");
        setLoading("Please wait.....Receiving Product");
        try {
            const response = await axios.get("https://calebmwaura.pythonanywhere.com/api/getproducts");
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading("");
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        const filtered = products && products.filter((product) =>
            product.product_name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save theme to localStorage
    };

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const index = prevCart.findIndex((item) => item.id === productId);
            if (index !== -1) {
                const updatedCart = [...prevCart];
                updatedCart.splice(index, 1); // Remove one item at the found index
                return updatedCart;
            }
            return prevCart;
        });
    };

    const handleVoiceSearch = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Voice search is not supported in this browser. Please use Chrome.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const voiceQuery = event.results[0][0].transcript;
            setSearchQuery(voiceQuery);
            handleSearch(voiceQuery);
        };

        recognition.onerror = (event) => {
            console.error("Voice search error:", event.error);
        };
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        // Apply the theme class to the body
        document.body.className = theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";
    }, [theme]);

    return (
        <div className={`row ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <Navbar />
            <Carousel />
            <div className="text-end m-3">
                {/* Theme Toggle Button */}
                <button className="btn btn-secondary" onClick={toggleTheme}>
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </button>
            </div>
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
            <div className="justify-content-center m-3">
                <div className="col-md-6 d-flex">
                    <input
                        type="text"
                        placeholder="Search for product by name"
                        className={`form-control ${theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button
                        className="btn btn-primary ms-2"
                        onClick={handleVoiceSearch}
                        title="Click to search by voice"
                    >
                        🎤
                    </button>
                </div>
            </div>
            {filteredProducts.map((product) => (
                <div className={`col-md-4 justify-content-center ${theme === "dark" ? "bg-secondary" : "bg-light"}`} key={product.id}>
                    <div className="card shadow">
                        <img src={img_url + product.product_photo} className={`product_img ${theme === "dark" ? "bg-secondary" : "bg-light"}`} alt="" />
                        <div className={`card-body ${theme === "dark" ? "bg-secondary" : "bg-light"}`}>
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_desc.slice(0, 10)}</p>
                            <b className="text-danger">{product.product_cost}ksh</b>
                            <button
                                className="btn btn-primary w-100 my-2"
                                onClick={() => navigate("/singleproduct", { state: { product } })}
                            >
                                View Product
                            </button>
                            <button
                                className="btn btn-success w-100 my-2"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Cart Section */}
            <div className="container mt-5">
                <h3>Cart</h3>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className={`card my-2 ${theme === "dark" ? "bg-secondary" : "bg-light"}`}>
                            <div className="card-body">
                                <h5>{item.product_name}</h5>
                                <p className="text-muted">{item.product_desc}</p>
                                <b className="text-danger">{item.product_cost}ksh</b>
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items in the cart.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default GetProducts;