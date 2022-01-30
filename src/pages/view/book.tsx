import { LinearProgress } from "@mui/material";
import React, { FC } from "react";
import { BookCard } from "../../components/book-card";
import { useRequireAuth } from "../../hooks/useAuth";
import { useFetchEntry } from "../../hooks/useFetchEntry";
import { Book } from "../../interface/book.interface";

export const BookView: FC = () => {
  useRequireAuth()
  const [book] = useFetchEntry<Book>("books");
  return book ? <BookCard book={book}></BookCard> : <LinearProgress/>;
};
