import DoctorForm from "@/components/form/DoctorForm";
import AdminLayout from "@/components/layout/AdminLayout";

type Props = {};

function AddHospital({}: Props) {
	return (
		<AdminLayout>
			<DoctorForm />
		</AdminLayout>
	);
}

export default AddHospital;
