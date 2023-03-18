import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAddToCartMutation } from "../services/appApi";

function SearchProducts(props) {
  const { product } = props;
  const [addToCart, { isSuccess }] = useAddToCartMutation();
    const { user, USD_VND_EXCHANGE_RATE, exchangePrice } =
      useContext(AppContext);
  const price = exchangePrice(product.price * USD_VND_EXCHANGE_RATE);

  return (
    <Link to={`/san-pham/${product._id}`}>
      <div className="relative card p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full small-phone:text-xs big-phone:text-base">
        {/* Search product Image */}
        <img
          variant="top"
          className="shadow-sm rounded-lg mb-4 w-full hover:scale-105 ease-in-out duration-300"
          src={product.pictures[0]?.url}
          alt="product-pic"
        />

        {/* Search product name */}
        <p className="font-bold truncate">{product.name}</p>

        {/* Search product category */}
        <div
          bg="warning"
          text="dark"
          className="galaxy-fold:truncate
        "
        >
          {product.category}
        </div>
        <div className="truncate">{price}</div>

        <div className="laptop:block small-phone:hidden">
          <Link to={`/san-pham/${product._id}`}>
            <div className="add-to-cart container mx-auto absolute top-0 left-0 w-full h-full bg-black rounded-lg inset-4 opacity-50 hover:duration-150 hover:shadow-slate-100 hover:shadow-xl ease-in-out"></div>
          </Link>

          {/* Add to cart button */}
          <button
            className="button1 absolute inset-x-10 inset-y-36 max-h-max"
            onClick={(e) =>
              addToCart({
                userId: user._id,
                productId: product._id,
                price: product.price,
                image: product.pictures[0].url,
              })
            }
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </Link>
  );
}

export default SearchProducts;
