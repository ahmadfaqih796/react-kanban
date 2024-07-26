import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Select,
  Row,
  Space,
  Popconfirm,
  Pagination,
} from "antd";
import Table from "antd/es/table";
import { useState } from "react";

import roleService from "@/api/services/roleService";
import { IconButton, Iconify } from "@/components/icon";
import ProTag from "@/theme/antd/components/tag";
import { CircleLoading } from "@/components/loading";

export default function RolePage() {
  const [searchForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);

  console.log("bbbbbbbbbb", query);

  const columns = [
    { title: "Name", dataIndex: "position" },
    {
      title: "Status",
      dataIndex: "created_by",
      align: "center",
      render: (created_by) => (
        <ProTag color={created_by === "enable" ? "success" : "error"}>
          {created_by}
        </ProTag>
      ),
    },
    { title: "Desc", dataIndex: "created_date", align: "center" },
    {
      title: "Action",
      key: "operation",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete the Organization"
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <IconButton>
              <Iconify
                icon="mingcute:delete-2-fill"
                size={18}
                className="text-error"
              />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const { data: dataWorkflow, isLoading } = useQuery({
    queryKey: ["role", query, pageNumber, limit],
    queryFn: async () => {
      try {
        return await roleService.findAll({ ...query, pageNumber, limit });
      } catch (err) {
        console.log("vvvvvvvvvvvvvv", err);
      }
    },
  });

  const onSearchFormReset = () => {
    searchForm.resetFields();
    setQuery({});
    setPageNumber(1);
  };

  const onSearch = () => {
    const values = searchForm.getFieldsValue();
    setQuery(values);
    setPageNumber(1);
  };

  const onCreate = () => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: true,
      title: "Create New",
      formValue: {
        ...prev.formValue,
        id: "",
        name: "",
        order: 1,
        desc: "",
        status: "enable",
      },
    }));
  };

  const onEdit = (formValue) => {
    setOrganizationModalProps((prev) => ({
      ...prev,
      show: true,
      title: "Edit",
      formValue,
    }));
  };

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setLimit(pageSize);
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={6}>
              <Form.Item label="Search" name="keyword" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} lg={6}>
              <Form.Item label="Status" name="status" className="!mb-0">
                <Select>
                  <Select.Option value="enable">
                    <ProTag color="success">Enable</ProTag>
                  </Select.Option>
                  <Select.Option value="disable">
                    <ProTag color="error">Disable</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} lg={12}>
              <div className="flex justify-end">
                <Button onClick={onSearchFormReset}>Reset</Button>
                <Button type="primary" className="ml-4" onClick={onSearch}>
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Organization List"
        extra={
          <Button type="primary" onClick={onCreate}>
            New
          </Button>
        }
      >
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columns}
          dataSource={dataWorkflow?.data}
          rowSelection={{ ...rowSelection }}
          loading={!!isLoading && { indicator: <CircleLoading /> }}
          locale={{ emptyText: !!isLoading && "Loading..." }}
        />
        <Pagination
          current={pageNumber}
          pageSize={limit}
          total={dataWorkflow?.total_data || 0}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </Card>
    </Space>
  );
}
