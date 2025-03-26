import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  //   const user = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <section class="row">
      <div class="col-md-12">
        <div class="navbar navbar-expand-md navbar-dark text-ght">
          
        <nav className="m-4">
                <Link className="btn btn-dark mx-2"  to={"/addproducts"}>Add Products</Link>
                <Link className="btn btn-dark mx-2" to={"/SignIn"}>Sign In</Link>
                <Link className="btn btn-dark mx-2" to={"SignUp"}>Sign Up</Link>
                <Link className="btn btn-dark mx-2"  to={"/"}>Home</Link>
            </nav>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
