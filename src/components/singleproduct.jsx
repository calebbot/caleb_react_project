import axios from "axios";
import { useState} from "react";
import { Form, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const  SingleProduct= () => {
    let [phone,setPhone]=useState("");
    let[loading,setLoading]=useState("");
    let[success,setSuccess]=useState("");
    let [error,setError]=useState("");

    const{product}=useLocation().state||{}
    const img_url="https://calebmwaura.pythonanywhere.com/static/images/"
    const submitForm=async(e)=>{
        e.preventDefault()
        setError("")
        setLoading("please wait as we process payment ...");
        try {
            const data=new FormData()
            data.append("phone",phone)
            data.append("amount",product.product_cost)

            const response=await axios.post("https://calebmwaura.pythonanywhere.com/api/mpesa_payment",data);
            setLoading("")
            setSuccess(response.data.message)
        } catch (error) {
            setLoading("")
            setError(error.message)
        }

    }

    return (
        <div className="">
            <div className="row justify-content-center mt-3">
            
                <div className="col-md-3 card shadow">
                    <img src={img_url + product.product_photo } alt="" />
                </div>
                <div className="col-md-3 card shadow">
                    <h3 >{product.product_name}</h3>
                    <h4 className="text-warning">{product.product_cost}</h4>
                    <h5 className="text-muted">{product.product_desc}</h5>

                    <b className="text-warning">{loading}</b>
                    <b className="text-danger">{error}</b>
                    <b className="text-success">{success}</b>
                    <form onSubmit={submitForm}> 
                <input type="number" readOnly value={product.product_cost}  className="form-control"  /><br />
                <input type="tel" className="form-control" placeholder="Enter Mpesa No 254XXXXXXXXX" onChange={(e)=>setPhone(e.target.value)} /><br />
                <button className="btn btn-primary">pay now</button>
            </form>
                </div>
            </div>
        </div>
    );
}
 
export default SingleProduct;