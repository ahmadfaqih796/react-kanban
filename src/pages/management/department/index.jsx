import roleService from "@/api/services/roleService";
import { IconButton, Iconify } from "@/components/icon";
import TablePagination from "@/components/table/table-pagination";
import ProTag from "@/theme/antd/components/tag";
import { useQuery } from "@tanstack/react-query";
import { Popconfirm } from "antd";
import React from "react";

const Department = () => {
  const [query, setQuery] = React.useState({
    PageNumber: 1,
    limit: 10,
  });
  // const [pagination, setPagination] = React.useState({
  //   page : 1,
  //   limit : 10,
  // })
  const { data: dataWorkflow, isLoading } = useQuery({
    queryKey: ["department-list", query],
    queryFn: async () => {
      try {
        return await roleService.findAll({
          // ...query,
          pageNumber: query.pageNumber || 1,
          limit: query.limit || 10,
        });
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
    { title: "Created Date", dataIndex: "created_date", align: "center" },
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
        total={dataWorkflow?.total_data}
      />
    </div>
  );
};

export default Department;
