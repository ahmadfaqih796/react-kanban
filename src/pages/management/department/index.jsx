import roleService from "@/api/services/roleService";
import TablePagination from "@/components/table/table-pagination";
import ProTag from "@/theme/antd/components/tag";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Department = () => {
  const [query, setQuery] = React.useState({
    pageNumber: 1,
    limit: 10,
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
        columnNumber={false}
        total={dataWorkflow?.total_data}
      />
    </div>
  );
};

export default Department;
