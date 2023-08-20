import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<>
			<footer className="bg-gray-100 py-14">
				<div className="container mx-auto lg:max-w-6xl flex gap-4">
					<div className="w-1/2 flex flex-col gap-2">
						<Link href="/" className="text-blue-500">
							<div className="flex gap-2">
								<Image src="logo.svg" alt="logo" width={20} height={20} />
								<h3 className="text-blue-400">BookingCare</h3>
							</div>
						</Link>
						<h2 className="font-semibold mt-4">
							Công ty Cổ phần Công nghệ BookingCare
						</h2>
						<p>
							Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu
							Giấy, Thành phố Hà Nội, Việt Nam
						</p>
						<p>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
						<div className="flex mt-2 gap-2">
							<a
								className="text-blue-500"
								target="_blank"
								href="http://online.gov.vn/Home/WebDetails/68563">
								<Image
									className="nut-bct luoi"
									src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
									width="78"
									height="30"
									data-src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
									alt="Đã thông báo với bộ công thương"
								/>
							</a>
							<a
								target="_blank"
								href="http://online.gov.vn/Home/AppDetails/1101">
								<Image
									className="nut-bct luoi"
									src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
									width="78"
									height="30"
									data-src="/assets/icon/bo-cong-thuong.svg"
									alt="Đã thông báo với bộ công thương"
								/>
							</a>
						</div>
					</div>
					<div className="w-1/4 text-blue-500 leading-loose">
						<ul>
							<li>
								<a href="/hop-tac-voi-bookingcare">Liên hệ hợp tác</a>
							</li>
							<li>
								<a href="/danh-ba-y-te">Danh bạ y tế</a>
							</li>
							<li>
								<a href="/suc-khoe-doanh-nghiep-sv10">Sức khỏe doanh nghiệp</a>
							</li>
							<li>
								<a href="/goi-chuyen-doi-so">Gói chuyển đổi số doanh nghiệp</a>
							</li>
							<li>
								<a href="https://tuyendung.bookingcare.vn">Tuyển dụng</a>
							</li>
							<li>
								<a href="/benh-nhan-thuong-hoi">Câu hỏi thường gặp</a>
							</li>
							<li>
								<a href="/page/dieu-khoan-su-dung-p7">Điều khoản sử dụng</a>
							</li>
							<li>
								<a href="/page/chinh-sach-bao-mat-p8">Chính sách Bảo mật</a>
							</li>
							<li>
								<a href="/thong-tin/quy-trinh-ho-tro-giai-quyet-khieu-nai-p13">
									Quy trình hỗ trợ giải quyết khiếu nại
								</a>
							</li>
							<li>
								<a href="/site/quyche">Quy chế hoạt động</a>
							</li>
						</ul>
					</div>
					<div className="w-1/4">
						<div>
							<strong>Trụ sở tại Hà Nội</strong>
							<br /> Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu,
							Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
						</div>
						<br />
						<div>
							<strong>Văn phòng tại TP Hồ Chí Minh</strong>
							<br /> Số 01, Hồ Bá Kiện, Phường 15, Quận 10
						</div>
						<br />
						<div>
							<strong>Hỗ trợ khách hàng</strong>
							<br /> support@bookingcare.vn (7h - 18h)
						</div>
						<br />
						<div>
							<strong>Hotline</strong>
							<br />
							<a className="text-blue-500" href="tel:02473012468">
								024-7301-2468
							</a>{" "}
							(7h - 18h)
						</div>
					</div>
				</div>
			</footer>
			<div className="w-full h-16 bg-blue-400 flex items-center">
				<div className="container mx-auto lg:max-w-6xl text-white">
					© 2023 BookingCare
				</div>
			</div>
		</>
	);
}

export default Footer;
