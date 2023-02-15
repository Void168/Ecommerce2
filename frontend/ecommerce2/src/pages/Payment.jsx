import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'

function Payment() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  return (
    <div className="big-phone:container big-phone:mx-auto">
      {loading ? (
        <div className="h-screen flex justify-center items-center absolute text-center w-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="p-12">
            <p className="text-4xl my-4">Phương thức thanh toán</p>
            <p>
              Với tiêu chí không ngừng nỗ lực để trải nghiệm mua hàng của Quý
              khách diễn ra thuận tiện và nhanh chóng nhất, WeirdShop hiện hỗ
              trợ tất cả các phương thức thanh toán tiên tiến tại Việt Nam, áp
              dụng tại tất cả các showroom bán hàng và website online
              weirdshop.vn
            </p>
            <p className="text-2xl my-4">Thanh toán tiền mặt</p>
            <p>
              Quý khách có thể thanh toán tiền mặt trực tiếp khi mua hàng tại Hệ
              thống siêu thị WeirdShop, hoặc thanh toán cho nhân viên chuyển
              phát đối với hình thức chuyển phát COD khi mua hàng online qua
              website weirdshop.vn
            </p>
            <p className="text-2xl my-4">Thanh toán quét mã VNPAY-QR</p>
            <p>
              Thanh toán VNPAY-QR là hình thức thanh toán tiên phong cho xu thế
              tiêu dùng không dùng tiền mặt tương lai. Thao tác thanh toán an
              toàn, đơn giản, nhanh chóng và bảo mật cấp cao. Chỉ cần sử dụng
              app Mobile Banking ngân hàng của Quý khách và quét mã VNPAY-QR để
              thanh toán. Bên cạnh đó, thanh toán bằng VNPAY-QR, Quý khách sẽ
              luôn được hưởng những ưu đãi giảm giá đặc biệt. Chi tiết ưu đãi và
              hướng dẫn thanh toán VNPAY-QR Quý khách có thể tham khảo TẠI ĐÂY.
              VNPAY-QR được áp dụng thanh toán tại tất cả hệ thống showroom
              WeirdShop toàn quốc và website weirdshop.vn
            </p>
            <p className="text-2xl my-4">
              Thanh toán thẻ ATM nội địa - Internet Banking
            </p>
            <p>
              Quý khách có thể quẹt thanh toán bằng thẻ ATM của tất cả các Ngân
              hàng nội địa Việt Nam trực tiếp khi mua hàng tại Hệ thống showroom
              WeirdShop toàn quốc, hoặc thanh toán qua cổng Internet Banking khi
              mua hàng online qua website weirdshop.vn
            </p>
            <p className="text-2xl my-4">
              Thanh toán thẻ quốc tế Visa, Master, JCB​
            </p>
            <p>
              WeirdShop hỗ trợ thanh toán bằng các loại thẻ thanh toán quốc tế
              Visa, Mastercard, JCB tại tất cả hệ thống showroom WeirdShop toàn
              quốc và website weirdshop.vn, đem đến sự thuận tiện và trải nghiệm
              tốt nhất cho Quý khách.
            </p>
            <p className="text-2xl my-4">Thanh toán trả góp</p>
            Quý khách có thể thanh toán trả góp qua thẻ tín dụng khi mua hàng
            online tại website weirdshop.vn, hoặc thanh toán trả góp qua thẻ tín
            dụng/trả góp qua công ty tài chính tại hệ thống showroom WeirdShop
            toàn quốc.
          </div>
        </>
      )}
    </div>
  );
}

export default Payment
