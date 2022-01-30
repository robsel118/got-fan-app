import { LinearProgress } from "@mui/material";
import React, { FC } from "react";
import { CharacterCard } from "../../components/character-card";
import { useRequireAuth } from "../../hooks/useAuth";
import { useFetchEntry } from "../../hooks/useFetchEntry";
import { Character } from "../../interface/character.interface";

export const CharacterView: FC = () => {
  useRequireAuth()
  const [character] = useFetchEntry<Character>("characters");

  return character ? (
    <CharacterCard character={character}></CharacterCard>
  ) : (
    <LinearProgress/>
  );
};
