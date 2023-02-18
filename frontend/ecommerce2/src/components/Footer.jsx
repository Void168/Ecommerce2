import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return (
    <div
      className={
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/dashboard" ||
        location.pathname === "/cart"
          ? "bg-[#D8E3E7] big-tablet:block small-phone:hidden"
          : "bg-[#D8E3E7]"
      }
    >
      <div className="container mx-auto p-4">
        <div>
          <div>
            <p className="text-2xl">
              CÔNG TY CỔ PHẦN WEIRDSHOP © 2023 - 2100 Công Ty Cổ Phần Thương Mại
              weirdshop
            </p>
            <p className="text-lg my-4">
              Giấy chứng nhận đăng ký doanh nghiệp: 0280920130 do Sở KH-ĐT
              TP.HCM cấp lần đầu ngày 16 tháng 08 năm 2023
            </p>
            <br />
            <div className="grid big-tablet:grid-cols-3 small-phone:grid-cols-1 gap-8">
              <div className="grid grid-cols-3 big-phone:col-span-2 small-phone:col-span-3 gap-4 tablet:text-base small-phone:text-sm">
                <div>
                  <p>Chính sách vận chuyển</p>
                  <p>Chăm Sóc Khách Hàng</p>
                  <p>Thanh Toán</p>
                </div>
                <div>
                  <p>Chính sách vận chuyển</p>
                  <p>Chăm Sóc Khách Hàng</p>
                  <p>Thanh Toán</p>
                </div>
                <div>
                  <p>Chính sách vận chuyển</p>
                  <p>Chăm Sóc Khách Hàng</p>
                  <p>Thanh Toán</p>
                </div>
                <div>
                  <p>Chính sách vận chuyển</p>
                  <p>Chăm Sóc Khách Hàng</p>
                  <p>Thanh Toán</p>
                </div>
                <div>
                  <p>Chính sách vận chuyển</p>
                  <p>Chăm Sóc Khách Hàng</p>
                  <p>Thanh Toán</p>
                </div>
                <div>
                  <p>Chính sách vận chuyển</p>
                  <p>Chăm Sóc Khách Hàng</p>
                  <p>Thanh Toán</p>
                </div>
              </div>
              <div className="big-phone:col-span-1 small-phone:col-span-3 flex flex-col justify-center big-phone:p-0 small-phone:px-4">
                <p>
                  Địa chỉ trụ sở chính: 279 Nguyễn Tri Phương, phường 5, quận
                  10, TP. Hồ Chí Minh
                </p>
                <p>
                  Văn phòng điều hành miền Bắc: Tầng 6, Số 1 Phố Mai Động,
                  Phường Kim Ngưu, Quận Hoàng Mai, Hà Nội
                </p>
                <p>
                  Văn phòng điều hành miền Nam: Tầng 3, số 5/3 Đồ Sơn, Phường 4,
                  Quận Tân Bình, TP. Hồ Chí Minh
                </p>
                <br />
                <br />
              </div>
            </div>

            <br />
          </div>
          <div>
            <div class="flex big-phone:flex-row small-phone:flex-col text-center justify-evenly big-tablet:m-0 small-phone:mb-20 text-xl">
              <p>All rights reserved</p>
              <p>CopyRight © 2023</p>
            </div>
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

export default Footer;
