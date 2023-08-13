"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import styles from "./table.module.css";

function TableCouponesDashboard({ coupons = [] }) {
  const [selectedCoupons, setSelectedCoupons] = useState({});

  const columns = React.useMemo(
    () => [
      {
        Header: "Seleccionar",
        accessor: "select",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedCoupons[row.original.id] || false}
            onChange={() => handleCheckboxChange(row.original.id)}
          />
        ),
      },
      {
        Header: "Tipo de Cupon",
        accessor: "description",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Fecha de vencimiento",
        accessor: "expiryDate",
      },
      {
        Header: "Estado",
        accessor: "used",
        Cell: ({ value }) => (value ? "Usado" : "No usado"),
      },
      {
        Header: "Cliente",
        accessor: (data) =>
          `${data.user?.name} ${data.user?.lastName} ${data.user?.shopName}` ||
          "N/A",
      },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: () => (
          <>
            <button>Editar</button>
            <button>Eliminar</button>
          </>
        ),
      },
    ],
    [selectedCoupons]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: coupons });

  const handleCheckboxChange = (id) => {
    setSelectedCoupons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.tableHeader}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} th className={styles.title}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={styles.filas}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className={styles.celda}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableCouponesDashboard;
