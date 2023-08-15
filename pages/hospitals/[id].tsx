import AppCard, { CardProps } from "@/components/AppCard";
import CardList from "@/components/CardList";
import AppContainer from "@/components/layout/AppContainer";
import DetailLayout from "@/components/layout/DetailLayout";
import { Typography } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

type Props = {};

const departments: CardProps[] = Array(5).fill({
	small: true,
	title: "Thần kinh",
	image: "https://cdn.bookingcare.vn/fr/w300/2023/06/20/113208-than-kinh.jpg",
});

const doctorList = {
	total: 100,
	page: 1,
	data: Array(10).fill({
		image:
			"https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg",
		title: "Bác sĩ Chuyên khoa II Trần Minh Khuyên",
		desc: `Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh
	Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris)
	Bác sĩ nhận khám từ 16 tuổi trở lên`,
		price: "250.000đ - 500.000đ",
		address: `Phòng khám Vietlife MRI Trần Bình Trọng <br />
		14 Trần Bình Trọng - Hoàn Kiếm - Hà Nội`,
		times: Array(5).fill("9:00 - 10:00"),
	}),
};

function Hospital({}: Props) {
	useEffect(() => {
		axios
			.get("https://rude-groups-wink.loca.lt/api/hospitals?page=0&size=20")
			.then(console.log)
			.catch(console.log);
	}, []);

	return (
		<DetailLayout
			title="Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108"
			subTitle="Số 1E Trường Chinh - Thanh Xuân - Hà Nội"
			avatar="https://cdn.bookingcare.vn/fr/w500/2019/07/31/085056logobenhvien108.jpg"
			bgImage="https://cdnimg.vietnamplus.vn/t1200/uploaded/oqivokbb/2021_04_18/anh_benh_vien_108.jpg">
			<AppContainer>
				<Typography.Title level={2} className="!text-xl">
					Giới thiệu
				</Typography.Title>
				<div>
					Từ nay, người bệnh có thể đặt lịch tại Bệnh viện Đa khoa An Việt thông
					qua hệ thống đặt khám BookingCare.
					<ul className="list-disc p-8">
						<li>
							Được lựa chọn khám với các bác sĩ chuyên khoa giàu kinh nghiệm
						</li>
						<li>
							Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)
						</li>
						<li> Giảm thiểu thời gian chờ đợi</li>
					</ul>
					Sau khi đặt khám, người bệnh sẽ nhận được hướng dẫn chi tiết về sự
					chuẩn bị cả TRƯỚC và TRONG và SAU KHI KHÁM để hành trình đi khám thuận
					tiện và hiệu quả hơn.
				</div>
				<div className="py-16">
					<Typography.Title level={2} className="!text-xl">
						Chuyên khoa
					</Typography.Title>
					<hr className="mb-4" />
					<div className="columns-4 py-16">
						{departments.map((department, i) => (
							<div className="w-full mb-4 inline-block" key={i}>
								<AppCard key={i} {...department} />
							</div>
						))}
					</div>
				</div>
				<div className="py-16">
					<Typography.Title level={2} className="!text-xl">
						Gói khám
					</Typography.Title>
					<hr className="mb-4" />
					<CardList data={doctorList.data} total={doctorList.total} />
				</div>
			</AppContainer>
		</DetailLayout>
	);
}

export default Hospital;
