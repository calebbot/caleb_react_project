import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Carousel from "./carousel";

const SingleProduct = () => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [rating, setRating] = useState(0); // State for product rating

    const { product } = useLocation().state || {};
    const img_url = "https://calebmwaura.pythonanywhere.com/static/images/";

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        setLoading("please wait as we process payment ...");
        try {
            const data = new FormData();
            data.append("phone", phone);
            data.append("amount", product.product_cost * quantity);

            const response = await axios.post("https://calebmwaura.pythonanywhere.com/api/mpesa_payment", data);
            setLoading("");
            setSuccess(response.data.message);
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    const submitReview = (e) => {
        e.preventDefault();
        if (newReview.trim()) {
            setReviews(prev => [...prev, newReview]);
            setNewReview('');
        }
    };

    const handleRating = (star) => {
        setRating(star); // Update the rating for the current product
    };

    useEffect(() => {
        // Fetch related products here if needed
    }, []);

    if (!product) {
        return <p className="text-center text-danger mt-5">No product data available.</p>;
    }

    return (
        <div className="">
            <Navbar />
            <Carousel />
            <div className="row justify-content-center mt-3 bg-secondary">
                <div className="col-md-3 card shadow bg-secondary">
                    <img src={img_url + product.product_photo} alt="" />
                </div>
                <div className="col-md-3 card shadow bg-secondary">
                    <h3>{product.product_name}</h3>
                    <h4 className="text-warning">{product.product_cost}</h4>
                    <h5 className="text-muted">{product.product_desc}</h5>

                    <b className="text-warning">{loading}</b>
                    <b className="text-danger">{error}</b>
                    <b className="text-success">{success}</b>

                    {/* Functional Five-Star Rating */}
                    <div className="mt-3">
                        <h5>Rate this Product</h5>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`text-${rating >= star ? "warning" : "success"} fw-bold`}
                                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <form onSubmit={submitForm} className="mt-3">
                        <input
                            type="number"
                            className="form-control bg-secondary"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                        /><br />
                        <input
                            type="number"
                            readOnly
                            value={product.product_cost * quantity}
                            className="form-control bg-secondary"
                        /><br />
                        <input
                            type="tel"
                            className="form-control bg-secondary"
                            placeholder="Enter Mpesa No 254XXXXXXXXX"
                            onChange={(e) => setPhone(e.target.value)}
                        /><br />
                        <button className="btn btn-primary">Pay Now</button>
                    </form>

                    {/* Reviews Section */}
                    <div className="mt-4">
                        <h5>Reviews</h5>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <p key={index} className="text-muted">{review}</p>
                            ))
                        ) : (
                            <p className="text-muted">No reviews yet.</p>
                        )}
                        <form onSubmit={submitReview}>
                            <textarea
                                className="form-control bg-secondary"
                                placeholder="Write a review..."
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                            ></textarea><br />
                            <button className="btn btn-primary">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-4">
                <h5>Related Products</h5>
                <div className="row">
                    {relatedProducts.map((prod, index) => (
                        <div key={index} className="col-md-3 card shadow bg-secondary">
                            <img src={img_url + prod.product_photo} alt="" />
                            <h5>{prod.product_name}</h5>
                            <h6 className="text-warning">{prod.product_cost}</h6>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SingleProduct;