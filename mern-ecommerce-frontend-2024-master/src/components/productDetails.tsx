import  { Fragment, useState ,useEffect} from 'react'
import "./productDetails.css"
import star_icon from "../assets/images/star_icon.png"
import { useNavigate , useParams  } from "react-router-dom";
import { server } from "../redux/store";
import { BiArrowBack } from "react-icons/bi";
import { useProductDetailsQuery,} from "../redux/api/productAPI";

import DescriptionBox from './descriptionBox'


const ProductDetails = () => {
  
  const params = useParams();
  
  const { data, isLoading } = useProductDetailsQuery(params.id!);

  console.log("dara",data);
  const [quantity, setQuantity] = useState(1);
 
  
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

  const addToCartHandler = () => {
    // Implement add to cart logic
  };

  const navigate = useNavigate();
  

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
            <div className="description">{data?.product && data?.product?.description}:{}</div>
            <div className="product-sizes">
              <h1>Select Size</h1>
              <div className='sizes'>
                <div> XS </div>
                <div> S </div>
                <div> M </div>
                <div> L </div>
                <div> XL </div>
              </div>

            </div>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
              {data?.product && <button disabled={data?.product?.stock < 1} onClick={addToCartHandler}>
                Add to Cart
              </button> }:{}
            </div>
            <p>
              Status:{' '}
             {data?.product &&  <b className={data?.product?.stock < 1 ? 'redColor' : 'greenColor'}> 
                {data?.product?.stock < 1 ? 'OutOfStock' : 'InStock'} :{}
              </b>
}:{}
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