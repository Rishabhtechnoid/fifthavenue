
;
import { Link,   useNavigate } from "react-router-dom";
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

import "./Navbar.scss"
import { useState } from "react";
import axios from "axios";

interface PropsType {
    user: User | null;
  }

const Navbar = ({ user }: PropsType) => {
  


  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/logout") 
      
       console.log("shi")
      const Navigate = useNavigate();
      console.log("res",res);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
      Navigate("/");
    } catch (error) {
      toast.error("Sign Out Fail");
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
 className ="link" to="/search">Women</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/search">Men</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/3">Children</Link>
          </div>
        </div>
        <div className="center">
          <Link className ="link" to="/">LUXURY RAPHELS</Link>
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
            <Link className ="link" to="/orders">My Orders</Link>
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
        <>
          <button onClick={logoutHandler}>
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



    