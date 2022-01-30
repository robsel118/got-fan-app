import React, { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { House } from "../interface/house.interface.ts";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Category } from "../interface/common.interface";
interface Props {
  house: House & { id: string };
}
export const HouseCard: FC<Props> = ({ house }) => {
  const {
    name,
    coatOfArms,
    currentLord,
    founder,
    heir,
    overlord,
    cadetBranches,
    swornMembers,
    ancestralWeapons,
    url,
    id,
    ...rest
  } = house;

  const generateLink = (category: Category, url: string) => {
    const index = url.split("/").pop();
    return (
      <Link key={index} to={`/${category}/${index}`}>
        {index}
      </Link>
    );
  };
  return (
    <Box>
      <Card sx={{ maxWidth: 345, margin: "1rem auto" }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            marginBottom={"1rem"}
          >
            "<em>{coatOfArms}</em>"
          </Typography>

          {Object.entries(rest).map(([key, value]) => {
            return (
              value.length > 0 && (
                <Typography
                  textTransform="capitalize"
                  variant="body1"
                  color="text.secondary"
                  align="left"
                >
                  {`${key}: ${Array.isArray(value) ? value.join(", ") : value}`}
                </Typography>
              )
            );
          })}
          <Typography variant="body1" color="text.secondary" align="left">
            Ancestral Weapons: {ancestralWeapons.join(", ")}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            Founder: {generateLink(Category.CHARACTERS, founder)}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            Current Lord: {generateLink(Category.CHARACTERS, currentLord)}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            Heir: {generateLink(Category.CHARACTERS, heir)}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            Overlord: {generateLink(Category.CHARACTERS, overlord)}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            Sworn Members:{" "}
            {swornMembers.map((member) => (
              <span>{generateLink(Category.CHARACTERS, member)} </span>
            ))}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            Cadet Branches:{" "}
            {cadetBranches.map((branch) => (
              <span>{generateLink(Category.HOUSES, branch)} </span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
