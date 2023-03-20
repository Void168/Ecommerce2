import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Aos from "aos";
import "aos/dist/aos.css";

function Payment() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div className="">
      {loading ? (
        <div className="h-screen flex justify-center items-center text-center w-full">
          <Loading />
        </div>
      ) : (
        <div>
          <div
            className="bg-cover text-white p-8 shadow-sm mb-20 h-256"
            style={{
              backgroundImage: `url('https://wallpaperaccess.com/full/4597135.jpg')`,
            }}
            data-aos="fade-up"
          >
            <div className="text-6xl text-center mt-4 mb-20 drop-shadow-2xl">
              Phương thức thanh toán
            </div>
            <div className="flex justify-end items-end">
              <div className="leading-8 bg-black bg-opacity-60 p-12 w-5/12 text-lg shadow-sm">
                <p className="text-4xl text-center mb-20">
                  Hướng dẫn thanh toán
                </p>
                <p>
                  Với tiêu chí không ngừng nỗ lực để trải nghiệm mua hàng của
                  Quý khách diễn ra thuận tiện và nhanh chóng nhất, WeirdShop
                  hiện hỗ trợ tất cả các phương thức thanh toán tiên tiến tại
                  Việt Nam, áp dụng tại tất cả các showroom bán hàng và website
                  online weirdshop.vn
                </p>
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex justify-between">
              <div
                className="bg-cover p-8 shadow-sm w-4/12 max-h-max"
                style={{
                  backgroundImage: `url('https://www.shutterstock.com/shutterstock/videos/1066066966/thumb/12.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl mb-8 text-center text-black">
                  Thanh toán tiền mặt
                </p>
                <div className="flex justify-end items-end">
                  <p className="text-white leading-8 bg-black bg-opacity-60 p-12 text-lg w-full">
                    Quý khách có thể thanh toán tiền mặt trực tiếp khi mua hàng
                    tại Hệ thống siêu thị WeirdShop, hoặc thanh toán cho nhân
                    viên chuyển phát đối với hình thức chuyển phát COD khi mua
                    hàng online qua website weirdshop.vn
                  </p>
                </div>
              </div>
              <div
                className="p-8 shadow-sm w-4/12 bg-cover"
                style={{
                  backgroundImage: `url('https://www.shutterstock.com/image-photo/credit-card-close-shot-selective-260nw-567634105.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl mb-8 text-center text-black">
                  Thanh toán thẻ ATM nội địa - Internet Banking
                </p>
                <p className="text-white leading-8 bg-black bg-opacity-60 p-12 text-lg w-full">
                  Quý khách có thể quẹt thanh toán bằng thẻ ATM của tất cả các
                  Ngân hàng nội địa Việt Nam trực tiếp khi mua hàng tại Hệ thống
                  showroom WeirdShop toàn quốc, hoặc thanh toán qua cổng
                  Internet Banking khi mua hàng online qua website weirdshop.vn
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className="bg-cover p-8 shadow-sm w-4/12"
                style={{
                  backgroundImage: `url('https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl mb-8 text-center text-black">
                  Thanh toán quét mã VNPAY-QR
                </p>
                <p className="text-white leading-8 bg-black bg-opacity-60 p-12 text-lg w-full">
                  Thanh toán VNPAY-QR là hình thức thanh toán tiên phong cho xu
                  thế tiêu dùng không dùng tiền mặt tương lai. Thao tác thanh
                  toán an toàn, đơn giản, nhanh chóng và bảo mật cấp cao. Chỉ
                  cần sử dụng app Mobile Banking ngân hàng của Quý khách và quét
                  mã VNPAY-QR để thanh toán.
                </p>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <div
                className="bg-cover p-8 shadow-sm w-4/12"
                style={{
                  backgroundImage: `url('https://magicpay.net/wp-content/uploads/2013/03/iStock_000009824865_ExtraSmall.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl mb-8 text-center text-black">
                  Thanh toán thẻ quốc tế Visa, Master, JCB​
                </p>
                <p className="text-white leading-8 bg-black bg-opacity-60 p-12 text-lg w-full">
                  WeirdShop hỗ trợ thanh toán bằng các loại thẻ thanh toán quốc
                  tế Visa, Mastercard, JCB tại tất cả hệ thống showroom
                  WeirdShop toàn quốc và website weirdshop.vn, đem đến sự thuận
                  tiện và trải nghiệm tốt nhất cho Quý khách.
                </p>
              </div>
              <div
                className="bg-cover p-8 shadow-sm w-4/12"
                style={{
                  backgroundImage: `url('https://thumbs.dreamstime.com/b/icon-payment-installment-red-rectangular-frame-vector-illustration-installments-border-loan-zero-percent-drawing-picture-79979560.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl mb-8 text-center text-black">
                  Thanh toán trả góp
                </p>
                <p className="text-white leading-8 bg-black bg-opacity-60 p-12 text-lg w-full">
                  Quý khách có thể thanh toán trả góp qua thẻ tín dụng khi mua
                  hàng online tại website weirdshop.vn, hoặc thanh toán trả góp
                  qua thẻ tín dụng/trả góp qua công ty tài chính tại hệ thống
                  showroom WeirdShop toàn quốc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
