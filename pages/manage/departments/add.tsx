import DepartmentForm from "@/components/form/DepartmentForm";
import AdminLayout from "@/components/layout/AdminLayout";

type Props = {};

function AddHospital({}: Props) {
	return (
		<AdminLayout>
			<DepartmentForm />
		</AdminLayout>
	);
}

export default AddHospital;
