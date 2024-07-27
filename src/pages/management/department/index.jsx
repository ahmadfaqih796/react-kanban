import roleService from "@/api/services/roleService";
import { IconButton, Iconify } from "@/components/icon";
import TablePagination from "@/components/table/table-pagination";
import ProTag from "@/theme/antd/components/tag";
import { useQuery } from "@tanstack/react-query";
import { Popconfirm } from "antd";
import React from "react";

const Department = () => {
  const { data: dataWorkflow, isLoading } = useQuery({
    queryKey: ["department-list"],
    queryFn: async () => {
      try {
        return await roleService.findAll({});
      } catch (err) {
        console.log("error: ", err);
      }
    },
  });

  const columns = [
    //  {
    //    title: "NO",
    //    dataIndex: "id",
    //    align: "center",
    //    sorter: true,
    //    render: (text, record, index) => (pageNumber - 1) * limit + index + 1,
    //  },
    {
      title: "Name",
      sorter: true,
      dataIndex: "position",
    },
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
    //  {
    //    title: "Action",
    //    key: "operation",
    //    align: "center",
    //    width: 100,
    //    render: (_, record) => (
    //      <div className="flex w-full justify-center text-gray">
    //        <IconButton onClick={() => onEdit(record)}>
    //          <Iconify icon="solar:pen-bold-duotone" size={18} />
    //        </IconButton>
    //        <Popconfirm
    //          title="Delete the Organization"
    //          okText="Yes"
    //          cancelText="No"
    //          placement="left"
    //        >
    //          <IconButton>
    //            <Iconify
    //              icon="mingcute:delete-2-fill"
    //              size={18}
    //              className="text-error"
    //            />
    //          </IconButton>
    //        </Popconfirm>
    //      </div>
    //    ),
    //  },
  ];
  const dataSource = dataWorkflow?.data.map((item, index) => {
    return {
      ...item,
      key: index + 1,
    };
  });
  console.log("dtttt", dataSource);

  return (
    <div>
      <TablePagination dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Department;
