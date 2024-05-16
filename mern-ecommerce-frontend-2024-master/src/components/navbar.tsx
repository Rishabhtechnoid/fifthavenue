import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,

} from "react-icons/fa";
import toast from "react-hot-toast";
import { User } from "../types/types";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { userNotExist } from "../redux/reducer/userReducer";
import "./Navbar.scss"
import { useState } from "react";


interface PropsType {
  user: User | null;
}

const Navbar = ({ user }: PropsType) => {



  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correctly call useNavigate at the top level of the component

  const logoutHandler = () => {
    try {
      localStorage.removeItem('user');
      console.log("User logged out");
      dispatch(userNotExist()); // Dispatch the action to update Redux state
      toast.success("Sign Out Successfully");
      setIsOpen(false); // Assuming setIsOpen is defined in your component
      navigate("/"); // Use navigate function here
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };
  //   const products = useSelector((state) => state.cart.products);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="/img/en.png" alt="" />
            <MdKeyboardArrowDown />
          </div>
          <div className="item">
            <span>USD</span>
            <MdKeyboardArrowDown />
          </div>
          <div className="item">

            <Link
              className="link" to="/search">Women</Link>
          </div>
          <div className="item">
            <Link className="link" to="/search">Men</Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/3">Children</Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">LUXURY RAPHELS</Link>
        </div>

        <div className="right">
          <div className="item">
            <Link onClick={() => setIsOpen(false)} to={"/"}>
              HOME
            </Link>
          </div>
          {user?._id ? (
            <>
              <div className="item">
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  <MdDashboardCustomize />
                </Link>
              </div>
            </>
          ) : (
            <Link to={"/login"}>

            </Link>
          )}
          <div className="item">
            <Link className="link" to="/orders">My Orders</Link>
          </div>

          <div className="icons">
            <Link onClick={() => setIsOpen(false)} to={"/search"}>
              <FaSearch />
            </Link>




            <div className="cartIcon">

              <Link onClick={() => setIsOpen(false)} to={"/cart"}>
                <FaShoppingBag />
              </Link>


              <span>{1}</span>
            </div>


          </div>

          {user?._id ? (
            <div>
              <button onClick={() => logoutHandler()}>
                Logout
              </button>
            </div>
          ) : null}

          {user?._id ? (
            <>
              <button>
                <FaUser />
              </button>
              <dialog open={isOpen}>
                <div>
                  {user.role === "admin" && (
                    <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                      Admin
                    </Link>
                  )}

                  <Link onClick={() => setIsOpen(false)} to="/orders">
                    Orders
                  </Link>
                  <button onClick={logoutHandler}>
                    Logout
                  </button>
                </div>
              </dialog>
            </>
          ) : (
            <Link to={"/login"}>
              <FaSignInAlt />
            </Link>
          )}

        </div>
      </div>


    </div>
  );
};

export default Navbar;



