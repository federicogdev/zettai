import {
  Center,
  Flex,
  Grid,
  Loader,
  Pagination,
  Stack,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { animesApi } from "../api";
import LargeAnimeTile from "../components/large-anime-tile";
import { AnimesPaginationContext } from "../context/animes-pagination-context";
import { Anime } from "../types/api/anime";
import { JikanResponse } from "../types/api/response";
import Error from "../components/error";

type Props = {};

const AnimesPage = (props: Props) => {
  const [searchParams] = useSearchParams();
  const { queryAnimesPage, setQueryAnimesPage } = useContext(
    AnimesPaginationContext
  );
  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genres") || "";
  const producers = searchParams.get("producers") || "";

  const fetchAnimesLength = async (
    _query: string,
    _genre: string,
    _producers: string
  ) =>
    animesApi
      .get(
        `/anime?q=${_query}&genres=${_genre}&producers=${_producers}&limit=10`
      )
      .then((res) => res.data);

  const fetchAnimes = async (
    _query: string,
    _genre: string,
    _producers: string,
    _page: number
  ) =>
    animesApi
      .get(
        `/anime?q=${_query}&genres=${_genre}&producers=${_producers}&page=${_page}&limit=10&order_by=members&sort=desc`
      )
      .then((res) => res.data);

  const {
    isLoading: isAnimesLengthDataLoading,
    isError: isAnimesLengthDataError,
    data: animesLengthData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [
      `${query}${genre}${producers}AnimesLength`,
      query,
      genre,
      producers,
    ],
    queryFn: () => fetchAnimesLength(query, genre, producers),
  });

  const {
    isLoading: isAnimesDataLoading,
    isError: isAnimesDataError,
    data: animesData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [
      `${query}${genre}${producers}Animes`,
      query,
      genre,
      producers,
      queryAnimesPage,
    ],
    queryFn: () => fetchAnimes(query, genre, producers, queryAnimesPage),
  });

  return (
    <Stack py={20} spacing={50} mih="90vh">
      {isAnimesDataLoading ? (
        <Center p={40}>
          <Loader />
        </Center>
      ) : isAnimesLengthDataError || isAnimesDataError ? (
        <Center p={40}>
          <Error />
        </Center>
      ) : (
        <Grid gutter={20}>
          {animesData?.data.map((anime) => (
            <Grid.Col key={anime.mal_id} mb={30}>
              <LargeAnimeTile anime={anime} />
            </Grid.Col>
          ))}
        </Grid>
      )}

      {animesLengthData && !isAnimesLengthDataLoading && (
        <Flex justify="center">
          <Pagination
            withEdges
            total={animesLengthData?.pagination?.last_visible_page!}
            siblings={3}
            defaultValue={queryAnimesPage}
            onChange={(e) => {
              setQueryAnimesPage(e);
            }}
          />
        </Flex>
      )}
    </Stack>
  );
};

export default AnimesPage;
