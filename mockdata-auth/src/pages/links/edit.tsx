import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { Link } from "../../types";

export const LinkEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<Link>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="URL" name="url" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Alias" name="alias" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="User ID" name="user_id" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
      </Form>
    </Edit>
  );
};
