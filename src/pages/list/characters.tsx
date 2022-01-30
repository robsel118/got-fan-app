import React from "react";
import { useFetchLore } from "../../hooks/useFetchList";
import { Character } from "../../interface/character.interface";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Routes } from "../../config/routes";
import { Pagination } from "../../components/pagination";
import { useRequireAuth } from "../../hooks/useAuth";
import { LinearProgress } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", sortable: false, width: 70 },
  { field: "name", headerName: "name", sortable: false, width: 200 },
  { field: "gender", headerName: "Gender", sortable: false, width: 100 },
  { field: "born", headerName: "Born", sortable: false, width: 200 },
  { field: "died", headerName: "Died", sortable: false, width: 300 },
  { field: "titles", headerName: "Titles", sortable: false, width: 400 },
  { field: "aliases", headerName: "Aliases", sortable: false, width: 400 },
];

export const CharactertsPage = () => {
  useRequireAuth()
  const [houses, isLoading, currentPage, setCurrentPage, totalPages] =
    useFetchLore<Character>("houses");
  const navigate = useNavigate();
  return !isLoading ? (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        onCellClick={(params) => {
          navigate(`${Routes.CHARACTERS}/${params.id}`);
        }}
        rows={houses || []}
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
