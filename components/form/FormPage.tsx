import { useCallback } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { App, Button, Col, Form, FormProps, Input, Row, Upload } from "antd";
import { useRouter } from "next/router";

export interface FormPageProps extends FormProps {
  action?: string;
}

function FormPage({
  initialValues,
  action,
  children,
  onFinish,
  ...props
}: FormPageProps) {
  const router = useRouter();
  const { axiosAuth } = useAuth();
  const { message } = App.useApp();
  const workDay = "a";
  const workTime = "b";
  const procedure = "c";

  const handleFinish = useCallback(
    async (values: any) => {
      const id = initialValues?.id;
      const { backgroundImage, logo, ...newValues } = values;
      const updateValues = { id, workDay, workTime, procedure, ...newValues };
      console.log("🚀 ~ file: FormPage.tsx:50 ~ updateValues:", updateValues);

      try {
        if (action) {
          if (initialValues) {
            await axiosAuth.put(action, updateValues);
          } else {
            await axiosAuth.post(action, updateValues);
          }
        } else {
          await onFinish?.(updateValues);
        }

        if (initialValues) {
          message.success("Tạo bản ghi thành công!");
        } else {
          message.success("Sửa bản ghi thành công!");
        }
        router.back();
      } catch (error) {
        message.error("Có lỗi xảy ra!");
        console.log(error);
      }
    },
    [
      action,
      axiosAuth,
      initialValues,
      message,
      onFinish,
      router,
      initialValues?.id,
    ]
  );

  return (
    <Form
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
      {...props}
    >
      {children as any}
      <div className="flex justify-end gap-4">
        <Button
          danger
          onClick={() => {
            router.back();
          }}
        >
          Hủy
        </Button>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </div>
    </Form>
  );
}

export default FormPage;
