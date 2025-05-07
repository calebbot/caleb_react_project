import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    // Dynamic Counters
    const [carCount, setCarCount] = useState(0); // Number of cars
    const [clientCount, setClientCount] = useState(0); // Number of clients

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
    // Simulate rolling counters with slower animation
    useEffect(() => {
        let carInterval = setInterval(() => {
            setCarCount((prev) => {
                if (prev < products.length) return prev + 1;
                clearInterval(carInterval);
                return prev;
            });
        }, 100); // Slower animation (100ms)

        let clientInterval = setInterval(() => {
            setClientCount((prev) => {
                if (prev < 50) return prev + 1; // Assuming 50 clients
                clearInterval(clientInterval);
                return prev;
            });
        }, 100); // Slower animation (100ms)

        return () => {
            clearInterval(carInterval);
            clearInterval(clientInterval);
        };
    }, [products]);
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
                </div>
            </div>
            {/* Dynamic Icons Section */}
            <div className="container text-center my-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card shadow p-3">
                            <h5>Number of Cars</h5>
                            <div className="display-4 text-primary">
                                🚗 {carCount}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow p-3">
                            <h5>Number of Clients</h5>
                            <div className="display-4 text-success">
                                👥 {clientCount}
                            </div>
                        </div>
                    </div>
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
                <button className="btn btn-info mb-3">
                    Cart Items: {cart.length}
                </button>
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
             {/* Services We Offer Section */}
             <div className="container mt-5">
                <h3 className="mb-4 text-center">Services We Offer</h3>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light text-center">
                            <div className="icon mb-3">
                                <img src="images/car-parts.png" alt="Car Parts" width="60" height="60" />
                            </div>
                            <h5>Car Parts</h5>
                            <p className="text-muted">We provide high-quality car parts for all vehicle models.</p>
                            <button className="btn btn-primary" onClick={() => navigate("/services/car-parts")}>
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light text-center">
                            <div className="icon mb-3">
                                <img src="images/oil-change.png" alt="Oil Change" width="60" height="60" />
                            </div>
                            <h5>Oil Change</h5>
                            <p className="text-muted">Keep your car running smoothly with our oil change services.</p>
                            <button className="btn btn-primary" onClick={() => navigate("/services/oil-change")}>
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light text-center">
                            <div className="icon mb-3">
                                <img src="images/general-service.png" alt="General Service" width="60" height="60" />
                            </div>
                            <h5>General Service</h5>
                            <p className="text-muted">Comprehensive car servicing to ensure your vehicle is best.</p>
                            <button className="btn btn-primary" onClick={() => navigate("/services/general-service")}>
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Clients Reviews Section */}
            <div className="container mt-5">
                <h3 className="mb-4">Clients Reviews</h3>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light">
                            <div className="d-flex align-items-center">
                                <img
                                    src="images/john-mwangi.jpg"
                                    alt="John Mwangi"
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                />
                                <div className="ms-3">
                                    <h5 className="card-title mb-1">John Mwangi</h5>
                                    <p className="card-text text-muted">Excellent service and quality cars!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light">
                            <div className="d-flex align-items-center">
                                <img
                                    src="images/mary-wanjiku.jpg"
                                    alt="Mary Wanjiku"
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                />
                                <div className="ms-3">
                                    <h5 className="card-title mb-1">Mary Wanjiku</h5>
                                    <p className="card-text text-muted">I love my new car. Highly recommend Caleb Motors!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light">
                            <div className="d-flex align-items-center">
                                <img
                                    src="images/peter-otieno.jpg"
                                    alt="Peter Otieno"
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                />
                                <div className="ms-3">
                                    <h5 className="card-title mb-1">Peter Otieno</h5>
                                    <p className="card-text text-muted">Great customer service and affordable prices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light">
                            <div className="d-flex align-items-center">
                                <img
                                    src="images/grace-njeri.jpg"
                                    alt="Grace Njeri"
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                />
                                <div className="ms-3">
                                    <h5 className="card-title mb-1">Grace Njeri</h5>
                                    <p className="card-text text-muted">The process was smooth, and the car is amazing!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light">
                            <div className="d-flex align-items-center">
                                <img
                                    src="images/james-ochieng.jpg"
                                    alt="James Ochieng"
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                />
                                <div className="ms-3">
                                    <h5 className="card-title mb-1">James Ochieng</h5>
                                    <p className="card-text text-muted">I am very satisfied with my purchase. Thank you!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow p-3 mb-5 bg-light">
                            <div className="d-flex align-items-center">
                                <img
                                    src="images/lucy-akinyi.jpg"
                                    alt="Lucy Akinyi"
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                />
                                <div className="ms-3">
                                    <h5 className="card-title mb-1">Lucy Akinyi</h5>
                                    <p className="card-text text-muted">Best car dealership in Kenya. Highly recommend!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GetProducts;