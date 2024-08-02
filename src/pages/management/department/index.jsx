import roleService from "@/api/services/roleService";
import { IconButton, Iconify } from "@/components/icon";
import DeleteModal from "@/components/modal/delete-modal";
import TablePagination from "@/components/table/table-pagination";
import ProTag from "@/theme/antd/components/tag";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App } from "antd";
import React from "react";

const Department = () => {
  const { message } = App.useApp();
  const [open, setOpen] = React.useState({
    add: false,
    edit: false,
    delete: false,
  });
  const [openCoba, setOpenCoba] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [query, setQuery] = React.useState({
    pageNumber: 1,
    limit: 10,
  });

  // Ensure roleService is correctly importing the functions
  const deleteMutation = useMutation({
    mutationFn: (id) => roleService.deleteById(id),
    mutationKey: ["role-delete"],
    onSuccess: () => {
      // Refetch or update your data after the delete mutation succeeds
      refetch();
      message.success({
        content: "Delete Successful",
        duration: 3,
      });
      console.log("Delete successful");
      setOpen({ add: false, edit: false, delete: false });
    },
    onError: (error) => {
      refetch();
      console.error("Delete failed", error);
      setOpen({ add: false, edit: false, delete: false });
    },
  });

  const { data: dataWorkflow, refetch } = useQuery({
    queryKey: ["department-list", query],
    queryFn: async () => {
      try {
        return await roleService.findAll({
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
    {
      title: "Created Date",
      sorter: true,
      dataIndex: "created_date",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <IconButton onClick={() => handleDelete(record)}>
            <Iconify icon="mingcute:delete-2-fill" size={18} />
          </IconButton>
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

  const handleAdd = () => {
    setSelectedRecord(null);
    setOpen({ ...open, add: true });
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setOpen({ ...open, edit: true });
  };

  const handleDelete = (record) => {
    setSelectedRecord(record);
    setOpen((prev) => ({ ...prev, delete: true }));
  };

  const handleDeleteConfirm = async (e) => {
    e?.preventDefault();
    try {
      await deleteMutation.mutateAsync(selectedRecord.id);
    } catch (error) {
      console.log("000000000", error);
    }
  };

  return (
    <div>
      <TablePagination
        onQuery={setQuery}
        dataSource={dataSource}
        columns={columns}
        total={dataWorkflow?.total_data}
      />

      <DeleteModal
        visible={open.delete}
        // isLoading={deleteMutation.isLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setOpen({ add: false, edit: false, delete: false })}
        titleData={selectedRecord?.position}
      />
    </div>
  );
};

export default Department;
