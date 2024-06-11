import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};


const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <Link to={`/product/${productId}`}>

      <div className="product-card">

        <img src={`${server}/${photo}`} alt={name} />
        <p>{name}</p>
        <span>${price}</span>

        <div>
          <button
            onClick={() =>
              handler({ productId, price, name, photo, stock, size: null, quantity: 1 })
            }
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
