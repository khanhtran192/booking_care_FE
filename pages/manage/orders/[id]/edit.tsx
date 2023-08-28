import OrderForm from "@/components/form/OrderForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { GetServerSideProps } from "next";

type Props = {};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
	params,
}) => {
	return {
		props: {},
	};
};

function EditOrder({}: Props) {
	return (
		<AdminLayout>
			<OrderForm initialValues={{}} onFinish={console.log} />
		</AdminLayout>
	);
}

export default EditOrder;
