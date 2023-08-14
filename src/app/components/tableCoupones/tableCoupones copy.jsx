"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import styles from "./table.module.css";
import { threeDotsDashboard } from "../../../../public/imagnes";
import Image from "next/image";

function TableCouponesDashboard({ coupons = [] }) {
  const [selectedCoupons, setSelectedCoupons] = useState({});

  console.log(coupons);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

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
        Header: "Código",
        accessor: "code",
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
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: "Estado",
        accessor: "used",
        Cell: ({ value }) => (
          <span className={value ? styles.used : styles.notUsed}>
            {value ? "Usado" : "Activo"}
          </span>
        ),
      },
      {
        Header: "Cliente",
        accessor: (data) =>
          `${data.user?.name} ${data.user?.lastName}` || "N/A",
      },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: () => (
          <Image
            src={threeDotsDashboard}
            alt="Más acciones"
            width="5"
            height="5"
          />
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
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.tableHeader}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={index}
                  className={styles.title}
                >
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
              <tr
                {...row.getRowProps()}
                key={rowIndex}
                className={styles.filas}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cellIndex}
                    className={styles.celda}
                  >
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
