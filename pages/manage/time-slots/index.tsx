import { DOCTORS, TIME_SLOTS } from "@/axiosClient/urls";
import TimeSlotTable from "@/components/TimeSlotTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";

function ManageTimeSlotsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<TimeSlotTable
				getApi={(axiosAuth, query) =>
					axiosAuth.get(`${DOCTORS}/${user?.doctorId}${TIME_SLOTS}`, {
						params: query,
					})
				}
				doctorId={user?.doctorId}
			/>
		</AdminLayout>
	);
}

export default ManageTimeSlotsPage;
