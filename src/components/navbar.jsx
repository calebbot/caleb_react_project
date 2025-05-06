import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <section className="row bg-secondary">
      <div className="col-md-12">
        <div className="navbar navbar-expand-md navbar-dark text-light d-flex align-items-center">
          {/* Car Logo */}
          <img
            src="images/car-logo.png"
            alt="Car Logo"
            width="50"
            height="50"
            className="mx-3"
          />

          {/* Finish Line Poles */}
          <img
            src="images/finish-line.png"
            alt="Finish Line"
            width="50"
            height="50"
            className="mx-2"
          />

          <nav className="m-4 bg-secondary">
            <Link className="btn btn-dark mx-2" to={"/addproducts"}>
              Add Products
            </Link>
            <Link className="btn btn-dark mx-2" to={"/SignIn"}>
              Sign In
            </Link>
            <Link className="btn btn-dark mx-2" to={"/SignUp"}>
              Sign Up
            </Link>
            <Link className="btn btn-dark mx-2" to={"/"}>
              Home
            </Link>
          </nav>

          {/* Finish Line Poles */}
          <img
            src="images/finish-line.png"
            alt="Finish Line"
            width="50"
            height="50"
            className="mx-2"
          />

          {/* Logout Button (if user is logged in) */}
          {user && (
            <button
              className="btn btn-danger mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;