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
          <Link to="/" class=" navbar-brand"> <img src="images/LOGO.jpg" alt="" width="50%" height="80px"/>
            Lily's bags
          </Link>
          <button
            class="navbar-toggler"
            data-bs-target="#muturi"
            data-bs-toggle="collapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="muturi">
            <div class="navbar-nav">
              <Link to="/" class="nav-link">
                Home
              </Link>
              <Link to="/addproduct" class="nav-link">
                Add Product
              </Link>
              
            </div>

            <div class="">
              {user && (
                <div className="navbar-nav ms-auto">
                  <b className="text-success nav-link">Hello {user.username}</b>
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}

              {!user && (
                <div className="navbar-nav ms-auto">
                  <Link to="/signin" class="nav-link">
                    Login
                  </Link>
                  <Link to="/signup" class="nav-link">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
