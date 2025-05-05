import { getRoles } from "@testing-library/dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Carousel from "./carousel";

const GetProducts=()=>{
    let [products,setProducts]=useState([])//error
    let [error,setError]=useState("")
    let[loading,setLoading]=useState("")
    let[filteredProducts,setFilteredProducts]=useState([])

    const img_url="https://calebmwaura.pythonanywhere.com/static/images/";
    const navigate=useNavigate();
    
    const getProducts= async()=>{
        setError("")
        setLoading("Please wait.....Receiving Product")
        try {
            const response= await axios.get("https://calebmwaura.pythonanywhere.com/api/getproducts")
            setProducts(response.data)
            setFilteredProducts(response.data)
            setLoading("")
        } catch (error) {
            setLoading("")
            setError(error.message);
        }
    };

    const handleSearch=(value)=>{
        const filtered=products &&products.filter((product)=>
            product.product_name.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredProducts(filtered)
    }

    // useEffect(function,dependancy)
    useEffect(()=>{
        getProducts();
    },[])
    return(
        <div className="row">
            <Navbar/>
            <Carousel/>
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
            {/* navbar */}
            
            {/* carousel */}
            {/* content */}
            <div className="justify-content-center m-3 bg-light">
                <div className="col-md-6">
                    <input type="text" placeholder="Search for product by name" className="form-control bg-success" onChange={(e)=>handleSearch(e.target.value)}/>
                </div>
            </div>
            {filteredProducts.map((product)=>(
               <div className="col-md-4 justify-content-center  bg-light">
               <div className="card shadow">
                   <img src={img_url + product.product_photo} className="product_img bg-success" alt="" />
                   <div className="card-body bg-light">
                       <h5 className="mt-2">{product.product_name}</h5>
                       <p className="text-muted">{product.product_desc.slice(0,10)}</p>
                       <b className="text-danger">{product.product_cost}ksh</b>

                       <button className="btn btn-primary w-100" onClick={()=>navigate("/singleproduct",{state:{product}})} >View Product</button>
                   </div>
               </div>
           </div> 
            ))}
            
            {/* footer */}
            <Footer/>
        </div>
    );
}
export default GetProducts;
