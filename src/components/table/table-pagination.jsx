import { Pagination, Select, Table } from "antd";
import React, { useState } from "react";

const TablePagination = ({ dataSource, columns, total, onQuery, ...props }) => {
  const [query, setQuery] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortedInfo, setSortedInfo] = useState({});

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

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setLimit(pageSize);
    onQuery({ ...query, PageNumber: page, limit: pageSize });
  };

  const handleLimitChange = (value) => {
    setLimit(value);
    setPageNumber(1); // Reset to first page on limit change
    onQuery({ ...query, limit: value });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
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
        dataSource={dataSource || []}
        columns={columns || []}
        pagination={false}
      />
      ;
    </div>
  );
};

export default TablePagination;
