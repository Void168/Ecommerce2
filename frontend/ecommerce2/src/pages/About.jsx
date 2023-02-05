import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'

function About() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  return (
    <div className="container mx-auto grid grid-cols-5">
      {loading ? (
        <div className="h-screen flex justify-center items-center absolute text-center w-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="col-span-1 p-4 bg-slate-400 shadow-sm"></div>
          <div className="col-span-4 p-12">
            <p className="text-3xl text-center my-8">Giới thiệu WeirdShop</p>
            <p>
              Công Ty Cổ Phần Thương Mại Dịch Vụ WeirdShop Xuất thân từ cửa hàng
              kinh doanh máy tính được thành lập từ năm 1997, WeirdShop được
              biết đến là đơn vị bán lẻ lâu đời và uy tín tại Việt Nam.
              <br /> WeirdShop chuyên kinh doanh các sản phẩm công nghệ thông
              tin, thiết bị giải trí game, thiết bị văn phòng và thiết bị
              hi-tech của nhiều nhãn hàng lớn như Dell, Asus, HP, MSI, Lenovo…
              <br /> Sau 23 năm phát triển không ngừng, WeirdShop hướng đến mục
              tiêu không chỉ là nơi kinh doanh máy tính mà còn là nơi khách hàng
              có thể tìm thấy mọi tiện ích công nghệ hiện đại và dịch vụ chất
              lượng cao.
            </p>
            <br />
            <p>
              Teko Việt Nam Teko Vietnam được thành lập 01/2017. Trên thực tế,
              đội ngũ giàu kinh nghiệm của chúng tôi đã đồng hành cùng nhau từ
              năm 2009 tiền thân là Garena Vietnam. Sứ mệnh của Teko đang được
              viết tiếp như cách chúng tôi vẫn hướng tới từ trước đến nay: “Thay
              đổi cuộc sống con người bằng cách cung cấp các trải nghiệm tuyệt
              vời trên nền tảng Internet”. Tại Teko, với các kỹ sư tài năng
              nhiều lĩnh vực, chúng tôi làm việc, chia sẻ và đồng hành cùng nhau
              trong việc ứng dụng các nền tảng công nghệ tiên tiến như Cloud,
              Big Data, AI, Microservices phát triển các giải pháp, sản phẩm
              công nghệ tiện lợi, hữu ích, tích cực cho các doanh nghiệp, xã hội
              như ERP, Data Platform, E-commerce Ecosystem, E-Payment,
              OmniChannel Seller & Customer Services. Ngoài ra Teko Ventures
              đang đầu tư mạnh mẽ vào các lĩnh vực: Fintech, New Retail,
              Logistics, Warehouse, Digital Entertainment, B2B Management
              Solution. Các đơn vị thành viên Teko bao gồm: Công ty Cổ phần
              Thương mại Dich vụ WeirdShop, Tripi Việt Nam, Jupviec.vn,
              Pos365.vn, Sapo.vn, VNPAY, Umbala, Công ty Đầu tư và Thương mại
              VVM, Tenpoint7.vn. Các công ty này đều là đơn vị lâu đời trong
              lĩnh vực bán lẻ thiết bị điện tử, tin học, là nhà tiên phong trong
              lĩnh vực xây dựng hạ tầng, nền tảng quản lý kinh doanh, thanh
              toán, bán lẻ và dịch vụ đời sống…
            </p>
            <p className="text-2xl my-8">Hành trình phát triển</p>
            <p>
              1997: Bắt đầu từ một cửa hàng nhỏ bán lắp ráp phần cứng máy tính &
              PC tại TP HCM. 2000: Khai trương trung tâm dịch vụ hàng đầu tại
              TP.HCM 2007: Công ty Thương mại & Dịch vụ WeirdShop được thành
              lập. 2013: Khai trương showroom tại Bình Dương 2015: Mở Showroom
              ngoài khu vực TP.HCM 2017: 5 showroom mới được mở tại TP.HCM 2018:
              WeirdShop và Teko hợp tác, mở hơn 30 showroom tại Việt Nam. 2019:
              Tập trung phát triển các chuỗi cửa hàng và chuẩn bị cho một tương
              lai mới. 2020: Sẵn sàng cho tương lai mới phát triển mạnh mẽ.
              4/7/2020: Khai Trương cửa hàng tại số 2 Hoàng Hoa Thám quận Tân
              Bình mở đầu cho chuỗi cửa hàng WeirdShop phong cách mới!
            </p>
            <p className="text-2xl my-8">Lĩnh vực kinh doanh</p>
            <p>
              WeirdShop cung cấp đầy đủ các sản phẩm máy tính, thiết bị công
              nghệ thông tin & hi-end cho người dùng gia đình Cung cấp giải pháp
              tích hợp hệ thống công nghệ thông tin cho doanh nghiệp. Cung cấp
              giải pháp đặc biệt cho các doanh nghiệp như hội nghị video, màn
              hình kỹ thuật số, hệ thống quản lý thanh toán,… Thêm sự lựa chọn,
              WeirdShop mở rộng ngành hàng như các thiết bị điện tử tiêu dùng,
              thiết bị gia dụng và thiết bị thông minh. Đối tác chiến lược:
              Asus, Dell, Acer, Hp, Lenovo, AMD, MSI, LG, Intel, Apple, Samsung,
              Microsoft, GigaByte, Logitech, NVIDIA, Kingston, KB Vision,
              Xiaomi, JBL, Bose, Sony, Microlab, Razer,… …Chúng tôi luôn mở rộng
              các danh mục kinh doanh để khách hàng thật sự hài lòng.
            </p>
            <p className="text-2xl my-8">Thành tựu</p>
            <p>
              Bằng những nỗ lực không mệt mỏi, WeirdShop tự hào là nhà bán lẻ
              thiết bị công nghệ cao được khách hàng và các đối tác tin tưởng và
              yêu mến. Đó là giải thưởng và niềm tự hào vô giá của chúng tôi.
              Suốt 23 năm qua, Phong Vũ liên tiếp được ghi nhận: Top 10 nhà bán
              lẻ ICT tại Việt Nam (ICT Associate, HCMC) Thương hiệu được yêu
              thích nhất: Nhà bán lẻ ICT khu vực phía Nam (eChip) Là đối tác bán
              lẻ cao cấp nhất của các hãng công nghệ hàng đầu thế giới như
              Microsoft, Dell, Asus, Acer, Lenovo, MSI, Samsung, LG, WD, Intel,
              AMD…
            </p>
          </div>
        </>
      )}
    </div>
  )
}
export default About
