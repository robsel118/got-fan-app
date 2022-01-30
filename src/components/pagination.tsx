import React, { Dispatch, FC, SetStateAction } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Paper } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent={"flex-end"}
      marginX={8}
      marginY={4}
    >
      {currentPage > 1 && (
        <Item onClick={() => setCurrentPage((page) => page - 1)}>&#8249;</Item>
      )}
      <Item>{`${currentPage}/${totalPages}`}</Item>
      {currentPage < totalPages && (
        <Item onClick={() => setCurrentPage((page) => page + 1)}>&#8250;</Item>
      )}
    </Stack>
  );
};
