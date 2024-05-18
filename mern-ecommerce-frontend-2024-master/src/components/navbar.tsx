import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { User } from "../types/types";
import { MdKeyboardArrowDown, MdDashboardCustomize } from "react-icons/md";
import { IoListCircle } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
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

  const authItems = user?._id ? (
    <>
      <div className="item">
        <Link to="/admin/dashboard">
          <MdDashboardCustomize />
        </Link>
      </div>
      <div className="item">
        <Link className="link" to="/orders"><IoListCircle /></Link>
      </div>
      <div className="item">
        <button onClick={logoutHandler}><IoMdLogOut /></button>
      </div>
    </>
  ) : (
    <Link to="/login">
      <FaSignInAlt />
    </Link>
  );

  const mobileAuthItems = user?._id ? (
    <>
      <div className="item">
        <Link onClick={toggleMenu} to="/admin/dashboard">
          <MdDashboardCustomize /> Admin
        </Link>
      </div>
      <div className="item">
        <Link onClick={toggleMenu} to="/orders"><IoListCircle /></Link>
      </div>
      <div className="item">
        <button onClick={() => { logoutHandler(); toggleMenu(); }}><IoMdLogOut /></button>
      </div>
    </>
  ) : (
    <div className="item">
      <Link onClick={toggleMenu} to="/login">
        <FaSignInAlt /> Login
      </Link>
    </div>
  );

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="/img/en.png" alt="" />
          </div>
          <div className="item">
            <span>USD</span>
            <MdKeyboardArrowDown />
          </div>
          <div className="item">
            <Link className="link" to="/search">Women</Link>
          </div>
          <div className="item">
            <Link className="link" to="/search">Men</Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/3">Children</Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">FIFTHAVENUEHUB </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link onClick={() => setMenuOpen(false)} to="/">
              HOME
            </Link>
          </div>
          {authItems}
          <div className="icons">
            <Link onClick={() => setMenuOpen(false)} to="/search">
              <FaSearch />
            </Link>
            <div className="cartIcon">
              <Link onClick={() => setMenuOpen(false)} to="/cart">
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
          {mobileAuthItems}
        </div>
      )}
    </div>
  );
};

export default Navbar;
