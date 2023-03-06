import { Flex, Grid, Pagination, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { animesApi } from "../api";
import LargeAnimeTile from "../components/large-anime-tile";
import { Anime } from "../types/api/anime";
import { JikanResponse } from "../types/api/response";

type Props = {};

const AnimesPage = (props: Props) => {
  const [searchParams] = useSearchParams();

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
        `/anime?q=${_query}&genres=${_genre}&producers=${_producers}&limit=1`
      )
      .then((res) => res.data);

  const fetchAnimes = async (
    _query: string,
    _genre: string,
    _producers: string
  ) =>
    animesApi
      .get(
        `/anime?q=${_query}&genres=${_genre}&producers=${_producers}&limit=10`
      )
      .then((res) => res.data);

  const {
    isLoading: isAnimesLengthDataLoading,
    isError: isAnimesLengthDataError,
    data: animesLengthData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [`${query}${genre}${producers}AnimesLength`],
    queryFn: () => fetchAnimes(query, genre, producers),
  });

  const {
    isLoading: isAnimesDataLoading,
    isError: isAnimesDataError,
    data: animesData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [`${query}${genre}${producers}Animes`],
    queryFn: () => fetchAnimes(query, genre, producers),
  });

  return (
    <Stack py={20} spacing={50}>
      {animesData && (
        <Grid gutter={20}>
          {animesData.data.map((anime) => (
            <Grid.Col key={anime.mal_id} mb={30}>
              <LargeAnimeTile anime={anime} />
            </Grid.Col>
          ))}
        </Grid>
      )}

      <Flex justify="center">
        <Pagination
          withEdges
          total={animesLengthData?.pagination?.last_visible_page!}
          siblings={3}
          // defaultValue={topAnimesPage}
          // onChange={(e) => {
          //   setTopAnimesPage(e);
          // }}
        />
      </Flex>
    </Stack>
  );
};

export default AnimesPage;
