import { manageDoctorApi, manageHospitalApi } from "@/axiosClient/endpoints";
import { TimeSlot } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { type TableColumnsType } from "antd";

const timeSLotColumns: TableColumnsType<TimeSlot> = [
	{
		dataIndex: "time",
		title: "Thời gian",
	},
	{
		dataIndex: "startTime",
		title: "Bắt đầu",
	},
	{
		dataIndex: "endTime",
		title: "Kết thúc",
	},
	{
		dataIndex: "price",
		title: "Giá tiền",
	},
	{
		dataIndex: "description",
		title: "Mô tả",
	},
];

function ManageTimeSlotsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				columns={timeSLotColumns}
				getApi={(axiosAuth, query) =>
					manageHospitalApi.getDoctors(axiosAuth, user?.hospitalId, query)
				}
				toggleApi={(axiosAuth, record) =>
					manageDoctorApi.toggleStatus(axiosAuth, record.id, record.active)
				}
			/>
		</AdminLayout>
	);
}

export default ManageTimeSlotsPage;
