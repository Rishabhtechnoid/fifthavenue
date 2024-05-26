import { Fragment, useState, useEffect } from 'react'
import "./productDetails.css"
import star_icon from "../assets/images/star_icon.png"
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../redux/store";
import { BiArrowBack } from "react-icons/bi";
import { useProductDetailsQuery, } from "../redux/api/productAPI";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import DescriptionBox from './descriptionBox'
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";


const ProductDetails = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { data, isLoading } = useProductDetailsQuery(params.id!);

  console.log("dara", data);
  const [quantity, setQuantity] = useState(1);
  const sizes = data?.product?.sizes || [];

  const [size, setSize] = useState("");


  useEffect(() => {

  }, [params.id]);

  const increaseQuantity = () => {
    if (data?.product && data?.product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const handleButtonClick = () => {
    if (data?.product) {
      const cartItem: CartItem = {
        productId: data.product._id,
        photo: data.product.photo,
        name: data.product.name,
        price: data.product.price,
        size: size,
        quantity: quantity,
        stock: data.product.stock,
      };
      addToCartHandler(cartItem);
    }
  };

  const handleSizeClick = (size: string) => {
    setSize(size);
  };

  const navigate = useNavigate();
  console.log('====================================');
  console.log("data", data);
  console.log('====================================');
  return (
    <Fragment>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <button className="back-btn" onClick={() => navigate('/')}>
              <BiArrowBack />
            </button>
            <div>
              <img className="CarouselImage" src={`${server}/${data?.product.photo}`} alt={data?.product.name} />

            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{data?.product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <div className="Ratings"> <img
                  className="RatingImage"
                  key={data?.product._id}
                  src={star_icon}
                  alt={""}
                />
                  <img
                    className="RatingImage"
                    key={data?.product._id}
                    src={star_icon}
                    alt={""}
                  />
                  <img
                    className="RatingImage"
                    key={data?.product._id}
                    src={star_icon}
                    alt={""}
                  />
                  <img
                    className="RatingImage"
                    key={data?.product._id}
                    src={star_icon}
                    alt={""}
                  />
                </div>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${data?.product.price}`}</h1>
                <div className="description">{data?.product && data?.product?.description}:{ }</div>

                {sizes.length > 0 ? (
                  <div className="product-sizes">
                    <h1>Select Size</h1>
                    <div className='sizes'>
                      {sizes.map((s, index) => (
                        <div
                          key={`${s}-${index}`}
                          onClick={() => handleSizeClick(s)}
                          style={{
                            cursor: 'pointer',
                            padding: '10px',
                            border: size === s ? '2px solid blue' : '1px solid gray'
                          }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                {/* {size && (
                  <div>
                    <h2>Selected Size: {size}</h2>
                  </div>
                )} */}
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  {data?.product && (
                    <button
                      disabled={data.product.stock < 1}
                      onClick={handleButtonClick}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
                <p>
                  Status:{' '}
                  {data?.product && <b className={data?.product?.stock < 1 ? 'redColor' : 'greenColor'}>
                    {data?.product?.stock < 1 ? 'OutOfStock' : 'InStock'} :{ }
                  </b>
                  }:{ }
                </p>
              </div>
              <div className="detailsBlock-4">
                <p className="product-category">
                  <span>Category : </span>
                  {data?.product.category}
                </p>
              </div>
            </div>
          </div>
          <DescriptionBox />
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails