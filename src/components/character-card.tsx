import React, { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Category } from "../interface/common.interface";
import { Character } from "../interface/character.interface";

interface Props {
  character: Character & { id: string };
}
export const CharacterCard: FC<Props> = ({ character }) => {
  const { name, allegiances, father, mother, spouse, books, url, id, ...rest } =
    character;

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
          {father && (
            <Typography variant="body1" color="text.secondary" align="left">
              Father: {generateLink(Category.CHARACTERS, father)}
            </Typography>
          )}
          {mother && (
            <Typography variant="body1" color="text.secondary" align="left">
              Mother: {generateLink(Category.CHARACTERS, mother)}
            </Typography>
          )}
          {spouse && (
            <Typography variant="body1" color="text.secondary" align="left">
              Spouse: {generateLink(Category.CHARACTERS, spouse)}
            </Typography>
          )}
          <Typography variant="body1" color="text.secondary" align="left">
            Books:{" "}
            {books.map((book) => (
              <span>{generateLink(Category.BOOKS, book)} </span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
