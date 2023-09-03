import { hospitalApi } from "@/axiosClient/endpoints";
import { Hospital } from "@/axiosClient/types";
import HospitalForm from "@/components/form/HospitalForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { GetServerSideProps } from "next";

type Props = {
	hospital: Hospital;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	params,
}) => {
	const hospital = await hospitalApi.getById(params?.id as string);
	return {
		props: {
			hospital,
		},
	};
};

function EditHospital({ hospital }: Props) {
	return (
		<AdminLayout>
			<HospitalForm initialValues={hospital} />
		</AdminLayout>
	);
}

export default EditHospital;
