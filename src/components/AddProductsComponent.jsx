import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProducts=()=>{
    let [product_name,setProductName]=useState("");
    let [product_desc,setProductDesc]=useState("");
    let [product_cost,setProductCost]=useState("");
    let [product_photo,setProductPhoto]=useState("");
    const navigate=useNavigate()

    const user =localStorage.getItem("user");

    const checkUser=()=>{
        if(!user){
            localStorage.clear();
            return navigate("/signin");
        }
    }

    useEffect(()=>checkUser(),[user])

    let[loading,setLoading]=useState("")
    let[success,setSuccess]=useState("")
    let [error,setError]=useState("")

    const submitForm= async (e)=>{
        e.preventDefault()
        try{ 
            setError("")
            setSuccess("")
            setLoading("please wait as we submit your data")  

            const data=new FormData();
            data.append("product_name", product_name);
            data.append("product_desc", product_desc);
            data.append("product_cost", product_cost);
            data.append("product_photo", product_photo);
 
            const response=await axios.post("https://calebmwaura.pythonanywhere.com/api/addproduct",data)

            setLoading("");
            setSuccess(response.data.success);
            setProductCost("");
            setProductDesc("");
            setProductName("");
            

        }catch(error){
            setLoading("")
            setError(error.message);
        }

    }
    return(
        <div className="row justify-content-center mt-4 bg-secondary">
        <nav className="m-4">
                <Link className="btn btn-dark mx-2"  to={"/addproducts"}>Add Products</Link>
                <Link className="btn btn-dark mx-2" to={"/SignIn"}>Sign In</Link>
                <Link className="btn btn-dark mx-2" to={"SignUp"}>Sign Up</Link>
                <Link className="btn btn-dark mx-2"  to={"/"}>Home</Link>
            </nav>
            <div className="col-md-6 card shadow p-4 bg-secondary">
                <h2>Add Product</h2>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <b className="text-success">{success}</b>
                <form onSubmit={submitForm}>
                    <input type="text" className="form-control bg-secondary text-white" placeholder="Enter Product Name" required onChange={(e)=>setProductName(e.target.value)} value={product_name}/><br />
                    <textarea name="" id="" className="form-control bg-secondary text-white" required  placeholder="Product description"  onChange={(e)=>setProductDesc(e.target.value)} value={product_desc}></textarea><br />
                    <input type="number" placeholder="Product Cost"  className="form-control bg-secondary text-white" required onChange={(e)=>setProductCost(e.target.value)} value={product_cost}/><br />
                    <label htmlFor="" className="form-label bg-secondary text-white" required >Car Photo</label><br />
                    <input type="file" className="form-control bg-secondary text-white" onChange={(e)=>setProductPhoto(e.target.files[0])}/><br />
                    <button className="btn btn-primary">Add Product</button>

                    
                </form>
            </div>

        </div>
    );
}
export default AddProducts;