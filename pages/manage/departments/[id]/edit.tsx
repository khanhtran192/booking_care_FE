import { departmentApi } from "@/axiosClient/endpoints";
import { Department } from "@/axiosClient/types";
import DepartmentForm from "@/components/form/DepartmentForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { GetServerSideProps } from "next";

type EditDepartmentProps = {
	department: Department;
};

export const getServerSideProps: GetServerSideProps<
	EditDepartmentProps
> = async ({ params }) => {
	const department = await departmentApi.getById(params?.id as string);
	return {
		props: {
			department,
		},
	};
};

function EditHospital({ department }: EditDepartmentProps) {
	return (
		<AdminLayout>
			<DepartmentForm initialValues={department} />
		</AdminLayout>
	);
}

export default EditHospital;
