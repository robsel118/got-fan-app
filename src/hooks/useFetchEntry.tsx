import axios from "axios";
import { useLocation } from "react-router";
import { useQuery } from "react-query";
import { Book } from "../interface/book.interface";
import { House } from "../interface/house.interface.ts";
import { Character } from "../interface/character.interface";

export function useFetchEntry<T extends Book | House | Character>(
  url: string
): [T | undefined, boolean] {
  const location = useLocation();

  const { data, isLoading } = useQuery<T, unknown, T>(
    [url, location.pathname],
    () => {
      return axios
        .get<T>(`https://www.anapioficeandfire.com/api/${location.pathname}`)
        .then((res) => res.data);
    },
    {
      select: (value) => ({
        ...value,
        id: value.url.split("/").pop()!,
      }),
    }
  );
  return [data, isLoading];
}
