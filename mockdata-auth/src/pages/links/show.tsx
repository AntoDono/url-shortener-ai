import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField } from "@refinedev/antd";
import { Typography } from "antd";
import { Link } from "../../types";

const { Title } = Typography;

export const LinkShow = () => {
  const { queryResult } = useShow<Link>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>URL</Title>
      <TextField value={record?.url ?? ""} />

      <Title level={5}>Alias</Title>
      <TextField value={record?.alias ?? ""} />

      <Title level={5}>Accessed</Title>
      <NumberField value={record?.accessed ?? 0} />

      <Title level={5}>Access Log</Title>
      {record == null || record.access_log == null || !Array.isArray(record.access_log)
        ? ""
        : record.access_log.map((log, index) => (
            <div key={index}>
              <Typography.Text>IP: {log.ip}</Typography.Text>
              <br />
              <Typography.Text>User Agent: {log.user_agent}</Typography.Text>
              <br />
              <br />
            </div>
          ))}
    </Show>
  );
};
