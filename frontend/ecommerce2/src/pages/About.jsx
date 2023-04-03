import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Aos from "aos";
import "aos/dist/aos.css";

function About() {
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
        <>
          <div>
            <div className="flex flex-row items-end mb-20" data-aos="fade-up">
              <div
                className="bg-cover text-white p-8 shadow-sm"
                style={{
                  backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/744/804/845/computer-engineering-science-tech-wallpaper-preview.jpg')`,
                }}
              >
                <p className="text-6xl text-center my-8">
                  Giới thiệu WeirdShop
                </p>
                <div className="flex flex-col items-end">
                  <div className="big-desktop:mx-72 laptop:mx-48 big-tablet:mx-24 bg-black bg-opacity-70 p-12">
                    <p className="leading-8">
                      Công Ty Cổ Phần Thương Mại Dịch Vụ WeirdShop Xuất thân từ
                      cửa hàng kinh doanh máy tính được thành lập từ năm 2023,
                      WeirdShop được biết đến là đơn vị bán lẻ lâu đời và uy tín
                      tại Việt Nam.
                      <br /> WeirdShop chuyên kinh doanh các sản phẩm công nghệ
                      thông tin, thiết bị giải trí game, thiết bị văn phòng và
                      thiết bị hi-tech của nhiều nhãn hàng lớn như Dell, Asus,
                      HP, MSI, Lenovo…
                      <br /> Sau 3 tháng phát triển không ngừng, WeirdShop hướng
                      đến mục tiêu không chỉ là nơi kinh doanh máy tính mà còn
                      là nơi khách hàng có thể tìm thấy mọi tiện ích công nghệ
                      hiện đại và dịch vụ chất lượng cao.
                    </p>
                    <p className="leading-8">
                      Teko Việt Nam Teko Vietnam được thành lập 01/2017. Trên
                      thực tế, đội ngũ giàu kinh nghiệm của chúng tôi đã đồng
                      hành cùng nhau từ năm 2023 tiền thân là Garena Vietnam. Sứ
                      mệnh của Teko đang được viết tiếp như cách chúng tôi vẫn
                      hướng tới từ trước đến nay: “Thay đổi cuộc sống con người
                      bằng cách cung cấp các trải nghiệm tuyệt vời trên nền tảng
                      Internet”. Tại Teko, với các kỹ sư tài năng nhiều lĩnh
                      vực, chúng tôi làm việc, chia sẻ và đồng hành cùng nhau
                      trong việc ứng dụng các nền tảng công nghệ tiên tiến như
                      Cloud, Big Data, AI, Microservices phát triển các giải
                      pháp, sản phẩm công nghệ tiện lợi, hữu ích, tích cực cho
                      các doanh nghiệp, xã hội như ERP, Data Platform,
                      E-commerce Ecosystem, E-Payment, OmniChannel Seller &
                      Customer Services. Ngoài ra Teko Ventures đang đầu tư mạnh
                      mẽ vào các lĩnh vực: Fintech, New Retail, Logistics,
                      Warehouse, Digital Entertainment, B2B Management Solution.
                      Các đơn vị thành viên Teko bao gồm: Công ty Cổ phần Thương
                      mại Dich vụ WeirdShop, Tripi Việt Nam, Jupviec.vn,
                      Pos365.vn, Sapo.vn, VNPAY, Umbala, Công ty Đầu tư và
                      Thương mại VVM, Tenpoint7.vn. Các công ty này đều là đơn
                      vị lâu đời trong lĩnh vực bán lẻ thiết bị điện tử, tin
                      học, là nhà tiên phong trong lĩnh vực xây dựng hạ tầng,
                      nền tảng quản lý kinh doanh, thanh toán, bán lẻ và dịch vụ
                      đời sống…
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between my-20">
              <div
                className="bg-cover text-white p-8 big-tablet:w-7/12 small-phone:w-10/12 rounded-br-full shadow-sm"
                style={{
                  backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/744/804/845/computer-engineering-science-tech-wallpaper-preview.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl my-8">Hành trình phát triển</p>
                <div className="flex flex-col items-end">
                  <div className="mx-8 bg-black bg-opacity-70 w-10/12 p-4">
                    <p className="leading-8 laptop:text-base big-tablet:text-sm small-phone:text-base">
                      1997: Bắt đầu từ một cửa hàng nhỏ bán lắp ráp phần cứng
                      máy tính & PC tại TP HCM. 2000: Khai trương trung tâm dịch
                      vụ hàng đầu tại TP.HCM 2007: Công ty Thương mại & Dịch vụ
                      WeirdShop được thành lập. 2013: Khai trương showroom tại
                      Bình Dương 2015: Mở Showroom ngoài khu vực TP.HCM 2017: 5
                      showroom mới được mở tại TP.HCM 2018: WeirdShop và Teko
                      hợp tác, mở hơn 30 showroom tại Việt Nam. 2019: Tập trung
                      phát triển các chuỗi cửa hàng và chuẩn bị cho một tương
                      lai mới. 2020: Sẵn sàng cho tương lai mới phát triển mạnh
                      mẽ. 4/7/2020: Khai Trương cửa hàng tại số 2 Hoàng Hoa Thám
                      quận Tân Bình mở đầu cho chuỗi cửa hàng WeirdShop phong
                      cách mới!
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="mx-8 my-8 w-5/12 max-h-96 big-tablet:block small-phone:hidden"
                src="https://c0.wallpaperflare.com/preview/1007/355/640/industry-industry-4-web-network.jpg"
                alt="development"
                data-aos="fade-up"
              />
            </div>
            <div className="flex flex-row items-end my-20 small-phone:justify-end big-tablet:justify-between">
              <img
                className="mx-8 my-8 w-5/12 max-h-96 big-tablet:block small-phone:hidden"
                src="https://e0.pxfuel.com/wallpapers/328/77/desktop-wallpaper-services-business-success.jpg"
                alt="development"
                data-aos="fade-up"
              />
              <div
                className="bg-cover text-white p-8 big-tablet:w-7/12 small-phone:w-10/12 rounded-bl-full shadow-sm"
                style={{
                  backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/744/804/845/computer-engineering-science-tech-wallpaper-preview.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl my-8 text-center">Lĩnh vực kinh doanh</p>
                <div className="flex flex-col items-end">
                  <div className="mx-8 bg-black bg-opacity-70 big-tablet:w-9/12 small-phone:w-10/12 p-4">
                    <p className="leading-8 laptop:text-base big-tablet:text-sm small-phone:text-base">
                      WeirdShop cung cấp đầy đủ các sản phẩm máy tính, thiết bị
                      công nghệ thông tin & hi-end cho người dùng gia đình Cung
                      cấp giải pháp tích hợp hệ thống công nghệ thông tin cho
                      doanh nghiệp. Cung cấp giải pháp đặc biệt cho các doanh
                      nghiệp như hội nghị video, màn hình kỹ thuật số, hệ thống
                      quản lý thanh toán,… Thêm sự lựa chọn, WeirdShop mở rộng
                      ngành hàng như các thiết bị điện tử tiêu dùng, thiết bị
                      gia dụng và thiết bị thông minh. Đối tác chiến lược: Asus,
                      Dell, Acer, Hp, Lenovo, AMD, MSI, LG, Intel, Apple,
                      Samsung, Microsoft, GigaByte, Logitech, NVIDIA, Kingston,
                      KB Vision, Xiaomi, JBL, Bose, Sony, Microlab, Razer,…
                      …Chúng tôi luôn mở rộng các danh mục kinh doanh để khách
                      hàng thật sự hài lòng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-start my-12">
              <div
                className="bg-cover text-white p-8 big-tablet:w-7/12 small-phone:w-10/12 rounded-br-full shadow-sm"
                style={{
                  backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/744/804/845/computer-engineering-science-tech-wallpaper-preview.jpg')`,
                }}
                data-aos="fade-up"
              >
                <p className="text-4xl my-8">Thành tựu</p>
                <div className="flex flex-col items-end">
                  <div className="mx-8 bg-black bg-opacity-70 w-10/12 p-4">
                    <p className="leading-8 laptop:text-base big-tablet:text-sm small-phone:text-base">
                      Bằng những nỗ lực không mệt mỏi, WeirdShop tự hào là nhà
                      bán lẻ thiết bị công nghệ cao được khách hàng và các đối
                      tác tin tưởng và yêu mến. Đó là giải thưởng và niềm tự hào
                      vô giá của chúng tôi. Suốt 23 năm qua, Phong Vũ liên tiếp
                      được ghi nhận: Top 10 nhà bán lẻ ICT tại Việt Nam (ICT
                      Associate, HCMC) Thương hiệu được yêu thích nhất: Nhà bán
                      lẻ ICT khu vực phía Nam (eChip) Là đối tác bán lẻ cao cấp
                      nhất của các hãng công nghệ hàng đầu thế giới như
                      Microsoft, Dell, Asus, Acer, Lenovo, MSI, Samsung, LG, WD,
                      Intel, AMD…
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="mx-8 my-8 w-5/12 max-h-96 big-tablet:block small-phone:hidden"
                src="https://img.freepik.com/free-vector/achievement-quotes-with-success-medal-goal-symbols-realistic-illustration_1284-28111.jpg"
                alt="development"
                data-aos="fade-up"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default About;
