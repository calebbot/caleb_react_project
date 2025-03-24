import axios, { Axios } from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const SignIn=()=>{

    let[username,setUsername]=useState("")
    let[password,setPassword]=useState("")
    let[loading,setLoading]=useState("")
    let[error,setError]=useState("")
    let navigate = useNavigate()
    const submitForm = async (e)=>{
        e.preventDefault();
        try {
            setError("")
            setLoading("Please wait ...")

            const data=new FormData()
            data.append("username",username)
            data.append("password",password)

            const response=await axios.post("https://calebmwaura.pythonanywhere.com/api/signin",data)
            if (response.data.user){
                localStorage.setItem("user",JSON.stringify(response.data.user))
                navigate("/")
            }else{
                setLoading("")
                setError(response.data.message)
            }
        } catch (error) {
            setLoading("")
            setError("something went wrong");
            
        }
    }
    return(
       <div className="row justify-content-center mt-4 bg-success">
        <div className="col-md-6 card shadow p-4 bg-success">
            <h2>Sign In</h2>
            <b className="text-danger">{error}</b>
            <b className="text-warning">{loading}</b>
            <form onSubmit={submitForm}> 
                <input type="text"  placeholder="Enter Username" className="form-control bg-success text-white"  required onChange={(e)=>setUsername(e.target.value)}/><br />
                <input type="text" className="form-control bg-success text-white" placeholder="Enter Password" required onChange={(e)=>setPassword(e.target.value)}/><br />
                <button className="btn btn-primary" type="submit">Sign In</button>
            </form>
            <p>Don't have an Account? <Link to="/SignUp">Sign Up</Link> </p>
        </div>
       </div>
    );
}
export default SignIn;