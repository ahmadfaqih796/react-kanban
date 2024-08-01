import { Pagination, Select, Table } from "antd";
import React, { useState } from "react";

const TablePagination = ({
  dataSource,
  columns,
  columnNumber = true,
  total,
  onQuery,
  ...props
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  //   onSelect: (record, selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     console.log(selected, selectedRows, changeRows);
  //   },
  // };

  const handleColumns = (columns) => {
    if (columnNumber) {
      return [
        {
          title: "NO",
          dataIndex: "id",
          align: "center",
          // sorter: true,
          render: (_, __, index) => (pageNumber - 1) * limit + index + 1,
        },
        ...columns,
      ];
    } else {
      return columns || [];
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setLimit(pageSize);
    onQuery((prev) => ({ ...prev, pageNumber: page, limit: pageSize }));
  };

  const handleLimitChange = (value) => {
    setPageNumber(1);
    setLimit(value);
    onQuery((prev) => ({ ...prev, pageNumber: 1, limit: value }));
  };

  const handleTableChange = (pagination, filters, sorter) => {
    onQuery((prev) => ({ ...prev, sorter: sorter }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Select
          value={limit}
          onChange={handleLimitChange}
          style={{ width: 120 }}
        >
          <Select.Option value={10}>10 / page</Select.Option>
          <Select.Option value={20}>20 / page</Select.Option>
          <Select.Option value={50}>50 / page</Select.Option>
          <Select.Option value={100}>100 / page</Select.Option>
        </Select>
        <Pagination
          align="end"
          current={pageNumber}
          pageSize={limit}
          total={total || 0}
          onChange={handlePageChange}
          // showSizeChanger
          // pageSizeOptions={[10, 20, 50, 100]}
          className="flex-grow-0"
        />
      </div>
      <Table
        {...props}
        //   key={"id"}
        //   rowKey={"id"}
        onChange={handleTableChange}
        dataSource={dataSource || []}
        columns={handleColumns(columns)}
        pagination={false}
      />
      ;
    </div>
  );
};

// TablePagination.defaultProps = {
//   dataSource: [],
//   columns: [],
//   columnNumber: true,
//   total: 0,
//   onQuery: () => {},
// };

export default TablePagination;
