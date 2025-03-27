import { List, EditButton, ShowButton, NumberField } from "@refinedev/antd";
import { useTable } from "@refinedev/antd";
import { Table, Space } from "antd";

import { Link } from "../../types";

export const LinkList: React.FC = () => {
  const { tableProps } = useTable<Link>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="alias" title="Alias" />
        <Table.Column dataIndex="url" title="URL" />
        <Table.Column
          dataIndex="accessed"
          title="Times Accessed"
          render={(value: number) => (
            <NumberField
              value={value || 0}
              options={{
                notation: "standard",
              }}
            />
          )}
        />
        <Table.Column<Link>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
