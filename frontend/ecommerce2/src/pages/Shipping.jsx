import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";

function Shipping() {
  const [loading, setLoading] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const shippingPolicy = useRef(null);
  const deliveryService = useRef(null);
  const setupService = useRef(null);
  const receiveAtStore = useRef(null);
  const noteReceipt = useRef(null);
  const cod = useRef(null);
  const priceList1 = useRef(null);
  const priceList2 = useRef(null);
  const scopeDelivery = useRef(null);
  const installationOnsite = useRef(null);
  const cameraSetup = useRef(null);

  const endPoint = useRef(null);

  const gotoShippingPolicySection = () => {
    window.scrollTo({
      top: shippingPolicy.current.offsetTop,
      behavior: "smooth",
    });
  };

  const gotoDeliveryService = () => {
    window.scrollTo({
      top: deliveryService.current.offsetTop,
      behavior: "smooth",
    });
  };

  const gotoSetupService = () => {
    window.scrollTo({
      top: setupService.current.offsetTop,
      behavior: "smooth",
    });
  };

  const gotoReceiveAtStore = () => {
    window.scrollTo({
      top: receiveAtStore.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gotoNoteReceipt = () => {
    window.scrollTo({
      top: noteReceipt.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gotoCod = () => {
    window.scrollTo({
      top: cod.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gotoPriceList1 = () => {
    window.scrollTo({
      top: priceList1.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gotoPriceList2 = () => {
    window.scrollTo({
      top: priceList2.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gotoScopeDelivery = () => {
    window.scrollTo({
      top: scopeDelivery.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gotoInstallationOnsite = () => {
    window.scrollTo({
      top: installationOnsite.current.offsetTop,
      behavior: "smooth",
    });
  };
  const gotoCameraSetup = () => {
    window.scrollTo({
      top: cameraSetup.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const setFixed = () => {
    if (window.scrollY >= 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", setFixed);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      <div className="big-phone:container big-phone:mx-auto">
        {loading ? (
          <div className="h-screen flex justify-center items-center w-full">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-5">
            <div className="col-span-1 text-white big-tablet:block small-phone:hidden">
              <div
                className={
                  navbar
                    ? "sticky bg-[#132C33] shadow-sm p-4 big-desktop:h-256 big-tablet:h-200 bottom-8 top-48 overflow-y-auto"
                    : "bg-[#132C33] shadow-sm p-4 h-256 overflow-y-auto"
                }
              >
                <p
                  onClick={gotoShippingPolicySection}
                  className="laptop:text-xl big-tablet:text-base cursor-pointer "
                >
                  Chính sách vận chuyển
                </p>
                <ul className="p-4">
                  <li
                    onClick={gotoReceiveAtStore}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Nhận hàng tại Cửa hàng
                  </li>
                  <li
                    onClick={gotoCod}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Giao hàng tận nơi
                  </li>
                  <li
                    onClick={gotoPriceList1}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Bảng giá dịch vụ vận chuyển hàng hóa
                  </li>
                  <li
                    onClick={gotoNoteReceipt}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Một số lưu ý khi nhận hàng
                  </li>
                </ul>

                <p
                  className="laptop:text-xl big-tablet:text-base cursor-pointer"
                  onClick={gotoDeliveryService}
                >
                  Dịch vụ giao hàng cùng cài đặt và hỗ trợ sử dụng sản phẩm
                </p>
                <ul className="p-4">
                  <li
                    onClick={gotoPriceList2}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Bảng giá dịch vụ giao hàng cùng cài đặt và hỗ trợ sử dụng
                    sản phẩm
                  </li>
                  <li
                    onClick={gotoScopeDelivery}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Phạm vi của dịch vụ giao hàng cùng cài đặt và hỗ trợ sử
                    dụng sản phẩm
                  </li>
                </ul>

                <p
                  className="laptop:text-xl big-tablet:text-base cursor-pointer"
                  onClick={gotoSetupService}
                >
                  Dịch vụ giao hàng cùng thi công, lắp đặt tận nơi và chính sách
                  lắp đặt camera
                </p>
                <ul className="p-4">
                  <li
                    onClick={gotoInstallationOnsite}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Dịch vụ giao hàng cùng thi công, lắp đặt tận nơi
                  </li>
                  <li
                    onClick={gotoCameraSetup}
                    className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                  >
                    - Chính sách lắp đặt Camera
                  </li>
                </ul>
              </div>
            </div>
            <div className="big-tablet:col-span-4 small-phone:col-span-5 p-12">
              <p className="text-4xl mb-4">
                Vận chuyển, lắp đặt, thi công và hỗ trợ kỹ thuật tận nơi
              </p>
              <p className="text-xl mb-2">
                Biểu phí vận chuyển và lắp đặt cụ thể cho ngành hàng ICT và
                Ngành hàng điện máy tại WeirdShop
              </p>
              <p className="text-2xl my-8" ref={shippingPolicy}>
                Chính sách vận chuyển
              </p>
              <div className="pl-4">
                <p className="text-xl mb-2" ref={receiveAtStore}>
                  Nhận hàng tại Cửa hàng
                </p>
                <p>
                  Sau khi đặt hàng Online tại website https://weirdshop.vn, Quý
                  khách có thể lựa chọn nhận hàng tại cửa hàng của WeirdShop mà
                  Quý khách thấy thuận tiện. Chúng tôi sẽ chuẩn bị hàng trước và
                  thông báo cho Quý khách về thời gian dự kiến hàng về. Ngay khi
                  hàng về tới cửa hàng, WeirdShop sẽ báo cho Quý khách và hướng
                  dẫn đầu mối tiếp đón khách hàng tại cửa hàng.
                </p>
                <p className="text-xl mt-4 mb-2" ref={cod}>
                  Giao hàng tận nơi
                </p>
                <p>
                  Giao hàng tận nơi: WeirdShop cung cấp dịch vụ giao hàng toàn
                  quốc, gửi hàng tận nơi đến địa chỉ cung cấp của Quý khách.
                  Thời gian giao hàng dự kiến phụ thuộc vào kho có hàng và địa
                  chỉ nhận hàng của Quý khách. Bảng thời gian dự kiến như sau:
                </p>
                <div className="flex justify-center overflow-auto">
                  <table className="my-4 table-fixed">
                    <thead>
                      <tr>
                        <th>Tuyến</th>
                        <th>Khu vực</th>
                        <th>Thời gian dự kiến</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-left">
                          <p>Hà Nội - Hà Nội</p>
                          <p>Đà Nẵng - Đà Nẵng</p>
                          <p>Hồ Chí Minh - Hồ Chí Minh</p>
                        </td>
                        <td>Nội thành</td>
                        <td>1 - 2 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Ngoại thành</td>
                        <td>2 - 3 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td>
                          <p>Hà Nội - miền Bắc</p>
                          <p>Đà Nẵng - miền Trung</p>
                          <p>Hồ Chí Minh - miền Nam</p>
                        </td>
                        <td>Trung tâm Tỉnh</td>
                        <td>2 - 3 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Huyện, thị xã lân cận</td>
                        <td>3 - 5 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Huyện, thị xã vùng ven</td>
                        <td>4 - 6 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td>
                          <p>Hà Nội - miền Trung</p>
                          <p>Hồ Chí Minh - miền Trung</p>
                          <p>Đà Nẵng - miền Bắc</p>
                        </td>
                        <td>Trung tâm Tỉnh</td>
                        <td>3 - 5 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Huyện, thị xã lân cận</td>
                        <td>4 - 6 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td>Đà Nẵng - miền Nam</td>
                        <td>Huyện, thị xã vùng ven</td>
                        <td>5 - 7 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td>
                          <p>Hà Nội - miền Nam</p>
                          <p>Hồ Chí Minh - miền Bắc</p>
                        </td>
                        <td>Trung tâm Tỉnh</td>
                        <td>6 - 8 ngày làm việc</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Huyện, thị xã xung quanh</td>
                        <td>8 - 10 ngày làm việc</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="my-4">
                  *Lưu ý: Thời gian này chỉ tính cho thời gian vận chuyển khi
                  hàng đã có sẵn kho. Trong trường hợp cần cộng thêm thời gian
                  lấy hàng, WeirdShop sẽ thông báo với Quý khách về thời gian
                  cần cộng thêm cho việc lấy hàng. Ngày làm việc là từ thứ hai
                  đến thứ sau, không tính thứ bảy, chủ nhật và ngày nghỉ lễ,
                  tết, nghỉ bù...
                </p>
                <p className="my-4 text-xl" ref={priceList1}>
                  Bảng giá dịch vụ vận chuyển hàng hóa
                </p>
                <div className="flex justify-center overflow-auto">
                  <table className="my-4">
                    <thead>
                      <tr>
                        <th>Giá trị đơn hàng</th>
                        <th>Địa chỉ nhận hàng</th>
                        <th>Phí vận chuyển</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dưới 800.000Đ</td>
                        <td>Toàn quốc</td>
                        <td>11.000Đ</td>
                      </tr>
                      <tr>
                        <td>Từ 800.000Đ trở lên</td>
                        <td>Toàn quốc</td>
                        <td>Miễn phí</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="my-4 text-xl" ref={noteReceipt}>
                  Một số lưu ý khi nhận hàng
                </p>
                <p className="big-phone:px-12 small-phone:px-4">
                  Nếu Quý khách không thể có mặt trong đợt nhận hàng thứ nhất,
                  WeirdShop sẽ liên lạc lại để sắp xếp thời gian giao hàng hoặc
                  hướng dẫn Quý khách tới khu vực điều phối hàng của đơn vị vận
                  chuyển để nhận hàng.
                  <br />
                  <br />
                  Nếu chúng tôi không thể liên lạc được với Quý khách trong vòng
                  03 (ba ngày), WeirdShop sẽ thông báo cho Quý khách về việc hủy
                  đơn hàng và hoàn trả tiền hàng mà Quý khách đã thanh toán (các
                  chi phí liên quan đến việc dàn xếp hàng, chi phí vận chuyển,
                  chi phí thi công, lắp đặt, và/hoặc các tổn thất phát sinh từ
                  việc giao hàng không thành công… sẽ không được hoàn lại). Tiền
                  hoàn lại sẽ được ngân hàng ghi có vào tài khoản của Quý khách
                  trong vòng 5 - 7 ngày làm việc.
                  <br />
                  <br />
                  Trong trường hợp không có nhu cầu nhận hàng, Quý khách có thể
                  báo với bên vận chuyển và/hoặc CSKH (qua Hotline) về việc này.
                  Đơn hàng của Quý khách sẽ được hoàn lại cho chúng tôi và được
                  hủy trên hệ thống. Trong trường hợp Quý khách đã thanh toán
                  trước cho đơn hàng, Quý khách sẽ nhận lại tiền vào tài khoản
                  trong vòng 5 - 7 ngày làm việc, phụ thuộc vào tiến độ xử lý
                  của ngân hàng. Số tiền Quý khách nhận lại sẽ trừ lại các chi
                  phí liên quan đến việc dàn xếp hàng, chi phí vận chuyển, chi
                  phí thi công, lắp đặt, và/hoặc các tổn thất phát sinh từ việc
                  giao hàng nhưng Quý khách không nhận….
                  <br />
                  <br />
                  WeirdShop sẽ báo ngay đến Quý khách nếu có sự chậm chễ về thời
                  gian giao hàng so với thời gian dự kiến ở trên. Và trong phạm
                  vi pháp luật cho phép, chúng tôi sẽ không chịu trách nhệm cho
                  bất cứ tổn thất nào, các khoản nợ, thiệt hại hoặc chi phí phát
                  sinh từ việc giao hàng trễ.
                  <br />
                  <br />
                  Sản phẩm được đóng gói theo tiêu chuẩn đóng gói của WeirdShop,
                  nếu Quý khách có nhu cầu đóng gói đặc biệt khác, vui lòng báo
                  trước cho chúng tôi khi đặt hàng hàng và cho phép chúng tôi
                  được tính thêm phí cho nhu cầu đặc biệt này.
                  <br />
                  <br />
                  Mọi thông tin về việc thay đổi sản phẩm hay hủy bỏ đơn hàng,
                  đề nghị Quý khách thông báo sớm để WeirdShop có thể điều chỉnh
                  lại đơn hàng. Quý khách có thể liên hệ với chúng tôi qua số
                  điện thoại hotline: 1800 6865 hoặc qua địa chỉ email:
                  cskh@weirdshop.vn
                </p>
              </div>

              <p className="text-2xl my-8" ref={deliveryService}>
                Dịch vụ giao hàng cùng cài đặt và hỗ trợ sử dụng sản phẩm
              </p>

              <div className=" pl-4">
                <p className="text-xl my-8" ref={priceList2}>
                  Bảng giá dịch vụ giao hàng cùng cài đặt và hỗ trợ sử dụng sản
                  phẩm
                </p>
                <div className="overflow-auto">
                  <table className="my-4">
                    <thead>
                      <tr>
                        <th>Giá trị đơn hàng</th>
                        <th>Địa chỉ nhận hàng</th>
                        <th>Phí vận chuyển</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dưới 5.000.000đ</td>
                        <td>Hà Nội, Hồ Chí Minh, Đà Nẵng</td>
                        <td>55.000đ</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          Các khu vực mà WeirdShop có cửa hàng (chỉ tính trong
                          bán kính 10km từ vị trí cửa hàng)
                        </td>
                        <td>55.000đ</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Khu vực còn lại</td>
                        <td>Không áp dụng</td>
                      </tr>
                      <tr>
                        <td>Từ 5.000.000đ trở lên</td>
                        <td>Hà Nội, Hồ Chí Minh, Đà Nẵng</td>
                        <td>Miễn phí</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          Các khu vực mà WeirdShop có cửa hàng (chỉ tính trong
                          bán kính 10km từ vị trí cửa hàng)
                        </td>
                        <td>Miễn phí</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Khu vực còn lại</td>
                        <td>Không áp dụng</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xl my-8" ref={scopeDelivery}>
                  Phạm vi của dịch vụ giao hàng cùng cài đặt và hỗ trợ sử dụng
                  sản phẩm
                </p>
                <div className="overflow-auto">
                  <table className="my-4">
                    <thead>
                      <tr>
                        <th>Nhóm sản phẩm</th>
                        <th>Nội dung thực hiện</th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>PC / Laptop</td>
                        <td>
                          Kết nối với các thiết bị ngoại vi (*) Bung phần mềm
                          mặc định cài sẵn trong máy Hỗ trợ cài đặt windows (bản
                          nền) (nếu khách có yêu cầu), không crack phần mềm
                          Hướng dẫn sử dụng cơ bản
                        </td>
                        <td>
                          Kết nối với màn hình, máy in/máy quét, kết nối mạng
                          Internet cho máy tính
                        </td>
                      </tr>
                      <tr>
                        <td>LCD / Monitor</td>
                        <td>
                          Lắp ráp chân đế, kết nối với thiết bị phát, như PC /
                          Laptop và cài đặt hiển thị.
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Máy in / Máy quét</td>
                        <td>
                          Kết nối với máy tính (hoặc mạng nếu máy in qua mạng)
                          và cài đặt driver (nếu cần) để sử dụng. Hướng dẫn sử
                          dụng cơ bản.
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Thiết bị ngoại vi (khác)</td>
                        <td>
                          Kết nối với thiết bị hiện có và hướng dẫn sử dụng cơ
                          bản
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Linh kiện máy tính</td>
                        <td>
                          Lắp ráp vào với thiết bị hiện có và cài đặt driver
                          (nếu cần)
                        </td>
                        <td>
                          Không lắp ráp PC nguyên bộ tận nơi (WeirdShop sẽ lắp
                          ráp nguyên bộ tại kho). Trường hợp Quý khách muốn lắp
                          ráp PC nguyên bộ tại nhà,Quý khách có thể sử dụng dịch
                          vụ Hỗ trợ tận nơi (WeirdShop sẽ cử nhân sự kỹ thuật
                          chuyên trách đến hỗ trợ sau cho Quý khách). Không cài
                          đặt lại phần mềm hoặc chuyển đổi dữ liệu từ ổ cứng cũ
                          qua ổ cứng mới.
                        </td>
                      </tr>
                      <tr>
                        <td>Router và các thiết bị bắt, phát lại mạng</td>
                        <td>
                          Cài đặt ban đầu nếu có đầy đủ thông tin về quyền truy
                          cập và thông số của nhà mạng. Kết nối với một, hai
                          thiết bị đang dùng sẵn để kiểm tra
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Thiết bị âm thanh</td>
                        <td>
                          Kết nối nguồn phát hiện có và hướng dẫn sử dụng cơ bản
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Điện máy, điện gia dụng</td>
                        <td>
                          Lắp ráp các bộ phận của thiết bị theo hướng dẫn của
                          Nhà sản xuất và hướng dẫn sử dụng cơ bản
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Tivi</td>
                        <td>Lắp ráp với chân đế và hướng dẫn sử dụng cơ bản</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Các thiết bị khác</td>
                        <td>
                          Lắp ráp các bộ phận của thiết bị theo hướng dẫn của
                          Nhà sản xuất (nếu có) và hướng dẫn sử dụng cơ bản
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Phần mềm</td>
                        <td>
                          Cài đặt phần mềm vào thiết bị sử dụng phù hợp và hướng
                          dẫn sử dụng cơ bản
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Không áp dụng</td>
                        <td>
                          Thiết bị mạng, thiết bị an ninh, Smart-home devices
                          (robot lau kính), máy chấm công, máy chiếu, tổng đài
                          điện thoại, các thiết bị phục vụ cho giải pháp doanh
                          nghiệp (server, network, thiết bị hội nghị...).
                        </td>
                        <td>
                          Quý khác có thể sử dụng gói dịch vụ riêng cho các sản
                          phẩm này. Khi có nhu cầu, Quý khách liên hệ với nhân
                          viên bán hàng để khảo sát phạm vi thi công và báo giá.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-2xl my-8" ref={setupService}>
                Dịch vụ giao hàng cùng thi công, lắp đặt tận nơi và chính sách
                lắp đặt camera
              </p>
              <p className="text-xl my-8" ref={installationOnsite}>
                Dịch vụ giao hàng cùng thi công, lắp đặt tận nơi
              </p>
              <p>
                WeirdShop cung cấp dịch vụ giao hàng cùng thi công và lắp đặt
                tận nơi đối với các sản phẩm bao gồm nhưng không giới hạn ở các
                sản phẩm sau: Thiết bị mạng, thiết bị an ninh, Smart-home
                devices (robot lau kính), máy chấm công, máy chiếu, tổng đài
                điện thoại, các thiết bị phục vụ cho giải pháp doanh nghiệp
                (server, network, thiết bị hội nghị...).
                <br />
                <br />
                Quý khách có thể lựa chọn chỉ nhận hàng từ chúng tôi còn việc
                thi công và lắp đặt sẽ do Quý khách quyết định.
                <br />
                <br />
                Dịch vụ giao hàng cùng thi công và lắp đặt tận nơi bao gồm:
                <br />
                <br />
                Chi phí vận chuyển: Quý khách tham khảo phần Chính sách vận
                chuyển tại Mục 1c.
                <br />
                Chi phí thi công, lắp đặt
                <br />
                Chi phí vật tư
                <br />
                Chi phí dịch vụ phụ khác (nếu có).
                <br />
                Trường hợp Quý khách có nhu cầu muốn sử dụng dịch vụ của
                WeirdShop, Quý khách liên hệ với nhân viên bán hàng để được tư
                vấn cụ thể và báo giá.
              </p>
              <p className="text-xl my-8" ref={cameraSetup}>
                Chính sách lắp đặt Camera
              </p>
              <div className="overflow-auto">
                <table className="my-4">
                  <thead>
                    <tr>
                      <th>Sản phẩm áp dụng lắp đặt tận nơi</th>
                      <th>Phạm vi áp dụng</th>
                      <th>Mã dịch vụ</th>
                      <th>Đơn vị tính</th>
                      <th>Số lượng</th>
                      <th>Phí lắp đặt (VND)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Đối với Camera Wifi</td>
                      <td>Phạm vi dưới 10km</td>
                      <td>201200658</td>
                      <td>Cái</td>
                      <td>1</td>
                      <td>100.000</td>
                    </tr>
                    <tr>
                      <td>Đối với Camera IP/ Analog</td>
                      <td>
                        Phạm vi dưới 10km tại Tp. Hồ Chí Minh, Hà Nội và Đà Nẵng
                      </td>
                      <td>201200659</td>
                      <td>Cái</td>
                      <td>1</td>
                      <td>200.000</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        Phạm vi trên 10km tại Tp. Hồ Chí Minh, Hà Nội và Đà Nẵng
                      </td>
                      <td>201200660</td>
                      <td>Cái</td>
                      <td>1</td>
                      <td>300.000</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Ngoài các tỉnh Tp. Hồ Chí Minh, Hà Nội và Đà Nẵng</td>
                      <td>201200661</td>
                      <td>Cái</td>
                      <td>1</td>
                      <td>400.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="my-4">
                Lưu ý: - Phạm vi áp dụng được tính từ cửa hàng hoặc Trung tâm
                Bảo hành gần nhất của WeirdShop trên toàn quốc. - Các chi phí
                trên chưa bao gồm chi phí camera và chi phí vật tư thi công phát
                sinh thực tế. - Trong trường hợp phát sinh yêu cầu đặc biệt từ
                khách hàng về việc lắp đặt đường dây âm tường (có đục tường đi
                dây), phí dịch vụ lắp đặt sẽ được cộng thêm 100,000 VNĐ/mét (Mã
                dịch vụ: 201200662). - Đối với các yêu cầu đặc biệt khác, vui
                lòng liên hệ nhân viên bán hàng để được hỗ trợ
              </p>
              <p ref={endPoint}>
                Trường hợp khách hàng có nhu cầu hỗ trợ tận nơi ngoài những nội
                dung trên đây, vui lòng tham khảo thêm Dịch vụ sửa chữa và bảo
                trì{" "}
              </p>
            </div>
          </div>
        )}
      </div>
      <>
        <button
          onClick={handleOpen}
          className="fixed left-2 bottom-20 big-tablet:hidden small-phone:block button"
        >
          Đi đến
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="duration-300"
        >
          <Box className="w-full rounded-lg">
            <Typography id="modal-modal-description">
              <div className="p-2 mt-3 border-none text-white galaxy-fold:max-h-max">
                <div className="h-96 col-span-1 bg-[#132C33] text-white rounded-lg shadow-sm p-2 overflow-y-auto">
                  <p
                    onClick={gotoShippingPolicySection}
                    className="laptop:text-xl big-tablet:text-base cursor-pointer "
                  >
                    Chính sách vận chuyển
                  </p>
                  <ul className="p-4">
                    <li
                      onClick={gotoReceiveAtStore}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Nhận hàng tại Cửa hàng
                    </li>
                    <li
                      onClick={gotoCod}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Giao hàng tận nơi
                    </li>
                    <li
                      onClick={gotoPriceList1}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Bảng giá dịch vụ vận chuyển hàng hóa
                    </li>
                    <li
                      onClick={gotoNoteReceipt}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Một số lưu ý khi nhận hàng
                    </li>
                  </ul>
                  <p
                    className="laptop:text-xl big-tablet:text-base cursor-pointer"
                    onClick={gotoDeliveryService}
                  >
                    Dịch vụ giao hàng cùng cài đặt và hỗ trợ sử dụng sản phẩm
                  </p>
                  <ul className="p-4">
                    <li
                      onClick={gotoPriceList2}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Bảng giá dịch vụ giao hàng cùng cài đặt và hỗ trợ sử
                      dụng sản phẩm
                    </li>
                    <li
                      onClick={gotoScopeDelivery}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Phạm vi của dịch vụ giao hàng cùng cài đặt và hỗ trợ sử
                      dụng sản phẩm
                    </li>
                  </ul>
                  <p
                    className="laptop:text-xl big-tablet:text-base cursor-pointer"
                    onClick={gotoSetupService}
                  >
                    Dịch vụ giao hàng cùng thi công, lắp đặt tận nơi và chính
                    sách lắp đặt camera
                  </p>
                  <ul className="p-4">
                    <li
                      onClick={gotoInstallationOnsite}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Dịch vụ giao hàng cùng thi công, lắp đặt tận nơi
                    </li>
                    <li
                      onClick={gotoCameraSetup}
                      className="cursor-pointer my-4 laptop:text-base big-tablet:text-sm"
                    >
                      - Chính sách lắp đặt Camera
                    </li>
                  </ul>
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      </>
    </>
  );
}

export default Shipping;
