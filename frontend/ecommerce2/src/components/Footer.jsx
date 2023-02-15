import React from 'react'
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation()
  return (
    <div
      className={
        location === "/login" || location === "/register" || location === "/dashboard"
          ? "bg-[#126E82]"
          : "bg-[#126E82] big-tablet:block small-phone:hidden"
      }
    >
      <div className="container mx-auto">
        <div>
          <div xl={3} lg={3} md={12}>
            <h2>
              CÔNG TY CỔ PHẦN HFOOD © 2021 - 2100 Công Ty Cổ Phần Thương Mại
              HFOOD
            </h2>
            <h3>
              Giấy chứng nhận đăng ký doanh nghiệp: 0280920130 do Sở KH-ĐT
              TP.HCM cấp lần đầu ngày 16 tháng 08 năm 2021
            </h3>
            <br />
            <h4>Chính sách vận chuyển</h4>
            <h4>Chăm Sóc Khách Hàng</h4>
            <h4>Thanh Toán</h4>
            <br />
          </div>
          <div xl={4} lg={4} md={12}>
            <h3>
              Địa chỉ trụ sở chính: 279 Nguyễn Tri Phương, phường 5, quận 10,
              TP. Hồ Chí Minh
              <br />
              Văn phòng điều hành miền Bắc: Tầng 6, Số 1 Phố Mai Động, Phường
              Kim Ngưu, Quận Hoàng Mai, Hà Nội
              <br />
              Văn phòng điều hành miền Nam: Tầng 3, số 5/3 Đồ Sơn, Phường 4,
              Quận Tân Bình, TP. Hồ Chí Minh
              <br />
              <br />
              <br />
              <br />
              <br />
              <strong>
                &emsp; &emsp; &emsp; &emsp; All rights reserved &emsp; &emsp;
                &emsp; &emsp; CopyRight © 2021
              </strong>
            </h3>
            <br />
          </div>
          <div
            xl={5}
            lg={5}
            md={12}
            className="left-3"
            style={{ textAlign: "center" }}
          >
            {/* <Map /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer
