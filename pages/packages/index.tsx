import CardList from "@/components/CardList";
import Layout from "@/components/layout";
import AppContainer from "@/components/layout/AppContainer";

type Props = {};
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

function PackagePage({}: Props) {
	return (
		<Layout
			pageTitle="Danh sách gói khám"
			subTitle="Danh sách Giáo sư, Bác sỹ kinh nghiệm trong nhiều lĩnh vực">
			<AppContainer className="py-16">
				<CardList {...doctorList} />
			</AppContainer>
		</Layout>
	);
}

export default PackagePage;
