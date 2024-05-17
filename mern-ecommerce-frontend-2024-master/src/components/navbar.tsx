import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { User } from "../types/types";
import { MdDashboardCustomize } from "react-icons/md";
import { userNotExist } from "../redux/reducer/userReducer";
import "./Navbar.scss";
import { useState } from "react";

interface PropsType {
  user: User | null;
}

const Navbar = ({ user }: PropsType) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      localStorage.removeItem("user");
      console.log("User logged out");
      dispatch(userNotExist());
      toast.success("Sign Out Successfully");
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <Link className="link" to="/">LUXURY RAPHELS</Link>
        </div>
        <div className="right">
          <div className="items">
            <div className="item">
              <Link to="/">HOME</Link>
            </div>
            {user?._id ? (
              <>
                <div className="item">
                  <Link to="/admin/dashboard">
                    <MdDashboardCustomize />
                  </Link>
                </div>
                <div className="item">
                  <Link className="link" to="/orders">My Orders</Link>
                </div>
                <div className="item">
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <FaSignInAlt />
              </Link>
            )}
            <div className="icons">
              <Link to="/search">
                <FaSearch />
              </Link>
              <div className="cartIcon">
                <Link to="/cart">
                  <FaShoppingBag />
                </Link>
                <span>{1}</span>
              </div>
            </div>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="mobileMenu">
          <div className="item">
            <Link onClick={toggleMenu} to="/">HOME</Link>
          </div>
          <div className="item">
            <Link onClick={toggleMenu} to="/search">
              <FaSearch /> Search
            </Link>
          </div>
          <div className="item">
            <Link onClick={toggleMenu} to="/cart">
              <FaShoppingBag /> Cart
            </Link>
          </div>
          <div className="item">
            <Link onClick={toggleMenu} to="/search">Women</Link>
          </div>
          <div className="item">
            <Link onClick={toggleMenu} to="/search">Men</Link>
          </div>
          <div className="item">
            <Link onClick={toggleMenu} to="/products/3">Children</Link>
          </div>
          {user?._id && (
            <>
              <div className="item">
                <Link onClick={toggleMenu} to="/admin/dashboard">
                  <MdDashboardCustomize /> Admin
                </Link>
              </div>
              <div className="item">
                <Link onClick={toggleMenu} to="/orders">My Orders</Link>
              </div>
              <div className="item">
                <button onClick={() => { logoutHandler(); toggleMenu(); }}>Logout</button>
              </div>
            </>
          )}
          {!user?._id && (
            <div className="item">
              <Link onClick={toggleMenu} to="/login">
                <FaSignInAlt /> Login
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
