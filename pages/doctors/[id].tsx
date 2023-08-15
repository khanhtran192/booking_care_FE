import DoctorCard from "@/components/CardList/DoctorCard";
import AppContainer from "@/components/layout/AppContainer";
import MainHeader from "@/components/layout/MainHeader";
import React from "react";

type Props = {};

const html = `<div class="bs-noidung" id="bs-gioithieu"><h2>Bác sĩ Chuyên khoa II Trần Minh Khuyên</h2><ul><li>Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh</li><li>Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris)</li><li>Bác sĩ nhận khám từ 16 tuổi trở lên</li></ul><h3>Quá trình đào tạo</h3><ul><li>Tốt nghiệp Bác sĩ Đa khoa, Trường Đại học y dược thành phố Hồ Chí Minh</li><li>Học chuyên khoa cấp I và chuyên khoa cấp II Chuyên ngành Tâm thần, Đại học Y khoa Huế</li><li>Tốt nghiệp Tâm lý trị liệu, trường Tâm lý thực Hành Paris (Psychology practique de Paris)</li></ul><h3>Quá trình công tác</h3><ul><li>Nguyên Trưởng phòng Kế hoạch Nghiệp vụ, Trưởng phòng khám Tâm thần Quận 3, thành phố Hồ Chí Minh</li><li>Nguyên Trưởng khoa lâm sàng Bệnh tâm thần thành phố Hồ Chí Minh</li><li>Giám định viên tư pháp chuyên ngành Tâm thần giám định các trường hợp trọng án, các trường hợp có liên quan pháp lý do cảnh sát điều tra, tòa án các cấp trưng cầu.</li></ul><h2>Khám và điều trị</h2><ul><li>Các rối loạn giấc ngủ không thực tổn: mất ngủ, ngủ nhiều, ngủ ngày quá mức, rối loạn nhịp thức ngủ, hoảng sợ khi ngủ, ác mộng, ngủ rũ,...</li><li>Các rối loạn lo âu: lo lắng, sợ hãi về tương lai, cảm giác cáu gắt, căng thẳng, vận động, bồn chồn, hồi hộp, vã mồ hôi tay chân, cồn cào,...</li><li>Rối loạn trầm cảm: buồn chán, bi quan, mệt mỏi, giảm hoạt động,...</li><li>Hưng cảm: vui vẻ quá mức, suồng sã, tăng hoạt động, đứng ngồi không yên,...</li><li>Rối loạn hoang tưởng:&nbsp;hoang tưởng bị hại, bị theo dõi, liên hệ, bị tội,...</li><li>Rối loạn ảo giác</li><li>Các rối loạn liên quan đến stress</li><li>Rối loạn khí sắc</li><li>Rối loạn cảm xúc phân liệt</li><li>Rối loạn đa nhân cách</li><li>Các bệnh lý loạn thần do sử dụng chất (ma túy đá, cần sa, heroin..)...</li></ul></div>`;

function DoctorDetailPage({}: Props) {
	const data = {
		id: 1,
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
	};
	return (
		<>
			<MainHeader />
			<AppContainer className="mt-[4.5rem]">
				<DoctorCard {...data} isDetail />
			</AppContainer>
			<AppContainer className="mb-4">
				<hr className="my-4" />
				<div
					dangerouslySetInnerHTML={{
						__html: html,
					}}></div>
			</AppContainer>
		</>
	);
}

export default DoctorDetailPage;
