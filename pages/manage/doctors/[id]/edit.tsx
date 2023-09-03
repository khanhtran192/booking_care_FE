import { doctorApi } from "@/axiosClient/endpoints";
import { Doctor } from "@/axiosClient/types";
import DoctorForm from "@/components/form/DoctorForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { GetServerSideProps } from "next";

type Props = {
	doctor: Omit<Doctor, "department"> & {
		departmentId: string | number;
	};
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
	params,
}) => {
	const doctor = await doctorApi.getById(params?.id as string);
	return {
		props: {
			doctor: {
				...doctor,
				departmentId: doctor.department.id,
			},
		},
	};
};

function EditHospital({ doctor }: Props) {
	return (
		<AdminLayout>
			<DoctorForm initialValues={doctor} />
		</AdminLayout>
	);
}

export default EditHospital;
