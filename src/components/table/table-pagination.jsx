import { Table } from "antd";
import React from "react";

const TablePagination = ({ dataSource, columns, ...props }) => {
  return (
    <div>
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
