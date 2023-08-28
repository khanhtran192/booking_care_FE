import PackForm from "@/components/form/PackForm";
import AdminLayout from "@/components/layout/AdminLayout";

type Props = {};

function AddPack({}: Props) {
	return (
		<AdminLayout>
			<PackForm />
		</AdminLayout>
	);
}

export default AddPack;
