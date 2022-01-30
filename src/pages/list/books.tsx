import React from "react";
import { useFetchLore } from "../../hooks/useFetchList";
import { LinearProgress } from "@mui/material";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Routes } from "../../config/routes";
import { Book } from "../../interface/book.interface";
import { Pagination } from "../../components/pagination";
import { useRequireAuth } from "../../hooks/useAuth";

const columns = [
  { field: "id", headerName: "ID", sortable: false, width: 70 },
  { field: "name", headerName: "Name", sortable: false, width: 220 },
  { field: "isbn", headerName: "ISBN", sortable: false, width: 130 },
  {
    field: "numberOfPages",
    headerName: "Pages",
    type: "number",
    sortable: false,
    width: 90,
  },
  {
    field: "country",
    headerName: "Country",
    sortable: false,
    width: 160,
  },
  {
    field: "released",
    headerName: "Released date",
    sortable: false,
    width: 160,
    valueGetter: (props: GridValueGetterParams) => {
      return new Date(props.value).toLocaleDateString();
    },
  },
];

export const BooksPage = () => {
  useRequireAuth()
  const [books, isLoading, currentPage, setCurrentPage, totalPages] =
    useFetchLore<Book>("houses");
  const navigate = useNavigate();
  return !isLoading ? (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        onCellClick={(params) => {
          navigate(`${Routes.BOOKS}/${params.id}`);
        }}
        rows={books || []}
        columns={columns}
        rowsPerPageOptions={[25]}
        hideFooter
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  ) : (
    <LinearProgress />
  );
};
