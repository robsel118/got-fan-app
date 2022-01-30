import React from "react";
import { useFetchLore } from "../../hooks/useFetchList";
import { House } from "../../interface/house.interface.ts";
import { Routes } from "../../config/routes";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";

import { Pagination } from "../../components/pagination";
import { LinearProgress } from "@mui/material";
import { useRequireAuth } from "../../hooks/useAuth";

const columns = [
  { field: "id", headerName: "ID", sortable: false, width: 70 },
  { field: "name", headerName: "Name", sortable: false, width: 200 },
  { field: "region", headerName: "Region", sortable: false, width: 180 },
  { field: "founded", headerName: "Founded", sortable: false, width: 180 },
  { field: "words", headerName: "Words", sortable: false, width: 200 },
  {
    field: "coatOfArms",
    headerName: "Coat of Arms",
    sortable: false,
    width: 400,
  },
];

export const HousesPage = () => {
  useRequireAuth();
  const [houses, isLoading, currentPage, setCurrentPage, totalPages] =
    useFetchLore<House>("houses");
  const navigate = useNavigate();

  return !isLoading ? (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        onCellClick={(params) => {
          navigate(`${Routes.HOUSES}/${params.id}`);
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
