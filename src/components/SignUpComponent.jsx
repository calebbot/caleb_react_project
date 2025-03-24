import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp=()=>{
    // create variable

    let [username,setUsername]=useState("");
    let[email,setEmail]=useState("");
    let[phone,setPhone]=useState("");
    let[password,setPassword]=useState("");
    let[loading,setLoading]=useState("")
    let[success,setSuccess]=useState("")
    let [error,setError]=useState("")

    const submitform =async (e)=>{
        e.preventDefault();

        try {
            setLoading("please wait while we submit your data")
            const data = new FormData();
            data.append("username",username);
            data.append("email",email);
            data.append("phone",phone);
            data.append("password",password);

            const response=await axios.post("https://calebmwaura.pythonanywhere.com/api/signup",data)
            setLoading("");
            setSuccess(response.data.success);


        } catch (error) {
            setLoading("")
            setError("something went wrong")

        }
    }

    return(
       <div className="row justify-content-center mt-4 bg-success">
        <div className="col-md-6 card shadow p-4 bg-success">
            <h2>Sign Up</h2>
            <b className="text-danger">{error}</b>
             <b className="text-warning">{loading}</b>
             <b className="text-success">{success}</b>
            <form onSubmit={submitform}>

            <input type="text" className="form-control text-white bg-success" placeholder="Enter Username" required onChange={(e)=>setUsername(e.target.value)}/>
            <br />
            <input type="email" required placeholder="Enter Email" className="form-control text-white bg-success" onChange={(e) =>setEmail(e.target.value)}/>
            <br />
            <input type="tel" required placeholder="Enter Phone No" className="form-control text-white bg-success" onChange={(e)=>setPhone(e.target.value)}/>
            <br />
            <input type="password" required placeholder="Enter Password" className="form-control text-white bg-success" onChange={(e)=>setPassword(e.target.value)}/>
            <br />
            <button className="btn btn-primary">Sign Up</button>
            </form>
            <p>
                Already have an Account? <Link to="/SignIn">Sign In</Link>

            </p>
        </div>
       </div>
    );
}
export default SignUp;