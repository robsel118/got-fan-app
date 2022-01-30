import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useQuery } from "react-query";
import { Book } from "../interface/book.interface";
import { House } from "../interface/house.interface.ts";
import { Character } from "../interface/character.interface";

interface WithId {
  id: string;
}
export function useFetchLore<T extends Book | House | Character>(
  url: string
): [
  WithId[] | undefined,
  boolean,
  number,
  Dispatch<SetStateAction<number>>,
  number
] {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data, isLoading } = useQuery<T[], unknown, WithId[]>(
    [url, location.pathname, currentPage],
    () => {
      return axios
        .get<T[]>(
          `https://www.anapioficeandfire.com/api/${location.pathname}?pageSize=25&page=${currentPage}`
        )
        .then((res) => {
          const pageNumber: string[] = res.headers.link.match(/\d+/g)!;
          setTotalPages(parseInt(pageNumber[pageNumber.length - 2]));
          return res.data;
        });
    },
    {
      select: (values) =>
        values.map((value) => ({
          id: value.url.split("/").pop()!,
          ...value,
        })),
    }
  );
  return [data, isLoading, currentPage, setCurrentPage, totalPages];
}
