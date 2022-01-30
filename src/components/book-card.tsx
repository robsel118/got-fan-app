import React, { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Category } from "../interface/common.interface";
import { Book } from "../interface/book.interface";

interface Props {
  book: Book & { id: string };
}
export const BookCard: FC<Props> = ({ book }) => {
  const {
    name,
    characters,
    povCharacters,
    url,
    id,
    released,
    ...rest
  } = book;

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
          <Typography variant="body1" color="text.secondary" align="left">
            Released: {new Date(released).toDateString()}
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
            Characters:{" "}
            {characters.map((character) => (
              <span>{generateLink(Category.CHARACTERS, character)} </span>
            ))}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            POV Characters:{" "}
            {povCharacters.map((character) => (
              <span>{generateLink(Category.CHARACTERS, character)} </span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
