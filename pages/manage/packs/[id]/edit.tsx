import { hospitalApi, packApi } from "@/axiosClient/endpoints";
import { Pack } from "@/axiosClient/types";
import PackForm from "@/components/form/PackForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { GetServerSideProps } from "next";

type Props = {
	pack: Pack;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
	params,
}) => {
	const pack = await packApi.getById(params?.id as string);
	return {
		props: {
			pack,
		},
	};
};

function EditPack({ pack }: Props) {
	return (
		<AdminLayout>
			<PackForm initialValues={pack} />
		</AdminLayout>
	);
}

export default EditPack;
