import { Box, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAddToCartMutation } from "../services/appApi";
import Rating from "./Rating";
import ToastMessage from "./ToastMessage";

function ProductPreview({
  _id,
  name,
  description,
  price,
  pictures,
  discount,
  rating,
  status,
  reviews,
  brand,
}) {
  const { user, USD_VND_EXCHANGE_RATE, exchangePrice } = useContext(AppContext);
  const priceByVND = exchangePrice(price * USD_VND_EXCHANGE_RATE);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [isShown, setIsShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true)

  // Handle close menu
  const handleClose = () => {
    setOpen(false);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Toast message when add to cart successfully */}
      {isSuccess && (
        <ToastMessage
          bg="info"
          title="Thông báo"
          body={`${name} đã được thêm vào giỏ hàng`}
        >
          <Link to="/cart"></Link>
        </ToastMessage>
      )}

      {/* Card product */}
      <div
        className="relative card p-4 shadow-sm rounded-lg bg-[#D8E3E7] w-full small-phone:text-xs big-phone:text-base"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <Link to={`/san-pham/${_id}`}>
          {/* Product image */}
          <div className="relative">
            <img
              variant="top"
              className={
                !isShown
                  ? "shadow-sm rounded-lg max-h-max mb-4 w-full bg-white ease-in-out duration-200"
                  : "shadow-sm rounded-lg max-h-max mb-4 w-full bg-white scale-105 ease-in-out duration-200"
              }
              src={!isShown ? pictures[0]?.url : pictures[1]?.url}
              alt="product-pic"
            />
          </div>

          {/* Product name */}
          <p className="font-bold truncate">{name}</p>

          {/* Product description */}
          <div
            bg="warning"
            text="dark"
            className="galaxy-fold:truncate
        "
          >
            {description}
          </div>

          {/* Product price change to VND */}
          <div className="flex big-desktop:flex-row big-tablet:flex-col tablet:flex-row small-phone:flex-col tablet:justify-between small-phone:justify-start small-phone:items-center">
            <div className="big-desktop:py-4 flex flex-col big-desktop:justify-start big-tablet:justify-center big-tablet:items-center big-desktop:text-base small-phone:text-lg">
              <div className="truncate line-through">{priceByVND}</div>
              <div className="truncate text-red-500">
                {(
                  (price * USD_VND_EXCHANGE_RATE * (100 - discount)) /
                  100
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              {/* Product rating */}
              <Rating rating={rating}></Rating>
              {/* Product discount */}
              {discount > 0 ? (
                <div className="p-1 text-xs border-t border-[#132C33]">
                  Giảm giá {discount}%
                </div>
              ) : null}
            </div>
          </div>
        </Link>

        <div className="laptop:block small-phone:hidden">
          <Link to={`/san-pham/${_id}`}>
            <div
              className={
                !isShown
                  ? "duration-100 ease-in-out"
                  : "add-to-cart container mx-auto absolute top-0 left-0 w-full h-full bg-black rounded-lg inset-4 opacity-50 duration-100 hover:shadow-slate-100 hover:shadow-xl ease-in-out"
              }
            ></div>
          </Link>

          {/* Add to cart button */}
          {status === "Hết hàng" ? (
            <div className="flex justify-center">
              <button className="button1 absolute desktop:inset-x-10 laptop:inset-x-5 inset-y-36 max-h-max big-desktop:text-base laptop:text-xs">
                Hết hàng
              </button>
              <button
                className="button1 absolute bottom-5"
                onClick={handleOpen}
              >
                Xem trước &nbsp;
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                className="button1 absolute desktop:inset-x-10 laptop:inset-x-5 inset-y-36 max-h-max big-desktop:text-base laptop:text-xs"
                onClick={(e) =>
                  addToCart({
                    userId: user._id,
                    productId: _id,
                    price: price,
                    image: pictures[0].url,
                  })
                }
              >
                Thêm vào giỏ
              </button>
              <button
                className="button1 absolute bottom-5"
                onClick={handleOpen}
              >
                Xem trước &nbsp;
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="duration-300 flex justify-center items-center"
      >
        <Box className="container mx-auto w-full rounded-lg tablet:overflow-hidden small-phone:overflow-y-scroll">
          <Typography id="modal-modal-description">
            <div className="tablet:grid tablet:grid-cols-3 p-2 small-phone:flex small-phone:flex-col bg-watched border-none rounded-xl shadow-sm text-white">
              <div className="tablet:col-span-1">
                <div className="container mx-auto">
                  <div className="tablet:p-4 big-phone:grid-cols-1 small-phone:grid small-phone:grid-cols-5 small-phone:gap-10">
                    <div className="flex big-phone:flex-row justify-between big-phone:col-span-4 small-phone:col-span-5 ">
                      {/* Display images of product */}
                      <Carousel
                        className="w-8/12 mx-auto"
                        autoPlay={true}
                        infiniteLoop={true}
                      >
                        {pictures.map((img, index) => (
                          <div>
                            <img
                              key={index}
                              src={img.url}
                              alt="gallery"
                              style={{
                                border:
                                  selected === img ? "2px solid #51C4D3" : "",
                              }}
                              className="w-full bg-[#fff] ease-in-out duration-300 small-phone:col-span-4 rounded-lg"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tablet:col-span-2 flex flex-col justify-center items-center">
                <p className="big-phone:text-4xl small-phone:text-2xl text-center mb-4">
                  Thông tin sản phẩm
                </p>
                <div className="flex flex-col big-tablet:justify-around laptop:justify-start galaxy-fold:justify-start py-4 big-phone:px-8 small-phone:px-0 h-full">
                  <div className="text-xl">
                    <div className="flex flex-col big-phone:py-4 px-2 small-phone:py-0">
                      {/* Product's name */}
                      <p className="big-phone:text-2xl small-phone:text-xl">
                        {name}
                      </p>

                      {/* Product's rating */}
                      <div className="flex flex-row big-phone:text-xl small-phone:text-sm">
                        (<span>Đánh giá</span>
                        &nbsp;
                        <Rating
                          rating={
                            reviews.length > 0
                              ? (
                                  reviews.reduce((a, c) => c.rating + a, 0) /
                                  reviews.length
                                ).toFixed(1)
                              : 0
                          }
                          caption=" "
                        ></Rating>
                        &nbsp;
                        <span>
                          {reviews.length > 0
                            ? (
                                reviews.reduce((a, c) => c.rating + a, 0) /
                                reviews.length
                              ).toFixed(1)
                            : 0}
                          )
                        </span>
                      </div>
                    </div>
                    {/* Product's price change to VND */}
                    <span className="my-4 text-xl">Giá gốc: </span>
                    <span className="laptop:text-3xl tablet:text-2xl my-4 text-[#51C4D3] line-through">
                      {(price * USD_VND_EXCHANGE_RATE).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <p className="laptop:text-3xl tablet:text-2xl my-4 text-red-500">
                      <span className="my-4 text-xl">Còn: </span>
                      {(
                        ((price * (100 - discount)) / 100) *
                        USD_VND_EXCHANGE_RATE
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}

                      {/* Product's discount */}
                      <span className="my-4 text-xl text-white">
                        {" "}
                        (Giảm {discount}%)
                      </span>
                    </p>
                    {/* Product's description */}
                    <p>{description}</p>
                    <br />
                    {/* Product's brand */}
                    <p>Nhà phân phối: {brand}</p>
                    <br />
                    {/* Product's status */}
                    <p>
                      Trạng thái:
                      <span
                        className={
                          status === "Còn hàng"
                            ? "text-lime-500"
                            : "text-rose-500"
                        }
                      >
                        {" "}
                        {status}
                      </span>
                    </p>
                    <br />
                  </div>

                  <div className="my-4 flex flex-col">
                    {/* Not logged in yet */}
                    {!user ? (
                      <button
                        className="laptop:w-8/12 big-tablet:w-10/12 small-phone:w-full big-tablet:justify-around small-phone:justify-center shadow-sm rounded-md my-4 text-center px-4 py-2 button"
                        onClick={navigateToLogin}
                      >
                        Đăng nhập để mua hàng
                      </button>
                    ) : (
                      <>
                        {/* Logged in */}
                        {/* Add to cart button */}
                        {status === "Còn hàng" ? (
                          <button
                            className="small-phone:w-full flex flex-row big-tablet:justify-around small-phone:justify-center shadow-sm rounded-md my-4 text-center px-4 py-2 button"
                            onClick={(e) =>
                              addToCart({
                                userId: user._id,
                                productId: _id,
                                price: price,
                                image: pictures[0].url,
                              })
                            }
                          >
                            Thêm vào giỏ
                          </button>
                        ) : (
                          <div className="small-phone:w-full flex flex-row big-tablet:justify-around small-phone:justify-center bg-rose-500 shadow-sm rounded-md my-4 text-center px-4 py-2">
                            <i className="fa-solid fa-phone text-4xl big-tablet:text-2xl small-phone:hidden"></i>
                            <div>
                              <p className="desktop:text-base small-phone:text-xs">
                                Liên hệ số điện thoại 0123456789
                              </p>
                              <p className="desktop:text-base small-phone:text-xs">
                                {" "}
                                để nhận thông báo khi có hàng
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* User is admin */}
                    {user && user.isAdmin && (
                      // Edit product button -> navigate to edit product page
                      <button className="small-phone:w-full flex flex-row big-tablet:justify-around small-phone:justify-center shadow-sm rounded-md my-4 text-center px-4 py-2 button small-phone:text-sm big-phone:text-base">
                        <Link to={`/san-pham/${_id}/chinh-sua`}>
                          Sửa thông tin sản phẩm
                        </Link>
                      </button>
                    )}
                  </div>
                </div>

                {/* Toast message if add to cart successfully */}
                {isSuccess && (
                  <ToastMessage
                    bg="info"
                    title="Thông báo"
                    body={`${name} đã được thêm vào giỏ hàng`}
                  >
                    <Link to="/cart"></Link>
                  </ToastMessage>
                )}
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ProductPreview;
