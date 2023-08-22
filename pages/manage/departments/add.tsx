import HospitalForm from "@/components/form/HospitalForm";
import AdminLayout from "@/components/layout/AdminLayout";

type Props = {};

function AddHospital({}: Props) {
	return (
		<AdminLayout>
			<HospitalForm />
		</AdminLayout>
	);
}

export default AddHospital;
