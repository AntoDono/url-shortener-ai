import { Create, useForm } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Link } from "../../types";

export const LinkCreate: React.FC = () => {
  const { data: identity } = useGetIdentity<{ id: string }>();

  const { formProps, saveButtonProps } = useForm<Link>({
    defaultFormValues: {
      accessed: 0,
      access_log: [],
      id: uuidv4(),
      url: "",
      alias: "",
      user_id: identity?.id || "",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="URL" name="url" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Alias" name="alias" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="User ID" name="user_id">
          <Input disabled />
        </Form.Item>
      </Form>
    </Create>
  );
};
