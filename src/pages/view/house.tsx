import { LinearProgress } from "@mui/material";
import React, { FC } from "react";
import { HouseCard } from "../../components/house-card";
import { useRequireAuth } from "../../hooks/useAuth";
import { useFetchEntry } from "../../hooks/useFetchEntry";
import { House } from "../../interface/house.interface.ts";

export const HouseView: FC = () => {
  useRequireAuth();
  const [house] = useFetchEntry<House>("houses");
  return house ? <HouseCard house={house}></HouseCard> : <LinearProgress />;
};
