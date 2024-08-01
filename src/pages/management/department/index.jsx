import roleService from "@/api/services/roleService";
import { IconButton, Iconify } from "@/components/icon";
import TablePagination from "@/components/table/table-pagination";
import ProTag from "@/theme/antd/components/tag";
import { useQuery } from "@tanstack/react-query";
import { Popconfirm } from "antd";
import React from "react";

const Department = () => {
  const [query, setQuery] = React.useState({
    pageNumber: 1,
    limit: 10,
  });
  const [open, setOpen] = React.useState({
    add: false,
    edit: false,
    delete: false,
  });

  const { data: dataWorkflow } = useQuery({
    queryKey: ["department-list", query],
    queryFn: async () => {
      try {
        return await roleService.findAll({
          // ...query,
          pageNumber: query.pageNumber || 1,
          limit: query.limit || 10,
          ...(query.sorter && {
            sortDir: query.sorter?.order === "ascend" ? "asc" : "desc",
            sortFiled: query.sorter?.field,
          }),
        });
      } catch (err) {
        console.log("error: ", err);
      }
    },
  });
  const columns = [
    {
      title: "Name",
      sorter: true,
      dataIndex: "position",
    },
    {
      title: "Created By",
      sorter: true,
      dataIndex: "created_by",
      align: "center",
      render: (created_by) => <ProTag color={"success"}>{created_by}</ProTag>,
    },
    { title: "Created Date", dataIndex: "created_date", align: "center" },
    {
      title: "Action",
      // key: "id",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          {/* {JSON.stringify(record)} */}
          <IconButton>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            // id={record.id}
            // open={open.delete}
            title="Delete the Organization"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => console.log("delete", record)}
          >
            <button
              className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover`}
            >
              <Iconify
                icon="mingcute:delete-2-fill"
                size={18}
                className="text-error"
              />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const dataSource = dataWorkflow?.data.map((item, index) => {
    return {
      ...item,
      key: index + 1,
    };
  });
  console.log("ppppppppppp", query);

  return (
    <div>
      <TablePagination
        onQuery={setQuery}
        dataSource={dataSource}
        columns={columns}
        // columnNumber={false}
        total={dataWorkflow?.total_data}
      />
    </div>
  );
};

export default Department;
