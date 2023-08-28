import { hospitalApi } from "@/axiosClient/endpoints";
import { Hospital } from "@/axiosClient/types";
import HospitalForm from "@/components/form/HospitalForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { GetServerSideProps } from "next";

type Props = {
  packList: Awaited<ReturnType<typeof hospitalApi.getPackages>>;
  departmentList: Awaited<ReturnType<typeof hospitalApi.getDepartments>>;
  hospital: Hospital;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  params,
}) => {
  const queryParams = { ...query } as Record<string, any>;
  const hospital = await hospitalApi.getById(params?.id as string);
  const packList = await hospitalApi.getPackages(params?.id as string, {
    page: queryParams.packPage,
    size: queryParams.packSize,
  });
  const departmentList = await hospitalApi.getDepartments(
    params?.id as string,
    {
      page: queryParams.departmentPage,
      size: queryParams.departmentSize,
    }
  );
  return {
    props: {
      packList,
      departmentList,
      hospital,
    },
  };
};

function EditHospital({ packList, departmentList, hospital }: Props) {
  console.log("🚀 ~ file: edit.tsx:40 ~ EditHospital ~ hospital:", hospital);
  return (
    <AdminLayout>
      <HospitalForm initialValues={hospital} />
    </AdminLayout>
  );
}

export default EditHospital;
