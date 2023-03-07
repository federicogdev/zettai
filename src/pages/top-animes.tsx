import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { animesApi } from "../api";
import { AnimesPaginationContext } from "../context/animes-pagination-context";
import {
  Select,
  Stack,
  Flex,
  Text,
  Pagination,
  Center,
  Loader,
  Grid,
} from "@mantine/core";
import LargeAnimeTile from "../components/large-anime-tile";
import { JikanResponse } from "../types/api/response";
import { Anime } from "../types/api/anime";
import Error from "../components/error";

type Props = {};

const TopAnimesPage = (props: Props) => {
  const {
    topAnimesPage,
    topAnimesFilter,
    setTopAnimesFilter,
    setTopAnimesPage,
  } = useContext(AnimesPaginationContext);

  const fetchAnimesLength = async (filter: string) =>
    animesApi
      .get(`/top/anime?filter=${filter}&limit=10`)
      .then((res) => res.data);

  const fetchAnimes = async (filter: string, page: number) =>
    animesApi
      .get(`/top/anime?filter=${filter}&page=${page}&limit=10`)
      .then((res) => res.data);

  const {
    isLoading: isAnimesLengthDataLoading,
    isError: isAnimesLengthDataError,
    data: animesLengthData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [`${topAnimesFilter}AnimesFilterLength`, topAnimesFilter],
    queryFn: () => fetchAnimesLength(topAnimesFilter!),
  });

  const {
    isLoading: isAnimesDataLoading,
    isError: isAnimesDataError,
    data: animesData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [
      `${topAnimesFilter}${topAnimesPage}AnimesPage`,
      topAnimesFilter,
      topAnimesPage,
    ],
    queryFn: () => fetchAnimes(topAnimesFilter!, topAnimesPage!),
  });

  return (
    <Stack py={20} spacing={50} mih="90vh">
      <Flex justify="space-between" align="center">
        <Text fw={700} fz="xl">
          Results: {animesLengthData?.pagination?.items?.total}
        </Text>

        <Select
          maw="30%"
          value={topAnimesFilter}
          onChange={(e) => {
            setTopAnimesFilter(e!);
            setTopAnimesPage(1);
          }}
          data={[
            { value: "favorite", label: "Favourites" },
            { value: "airing", label: "Airing" },
            { value: "upcoming", label: "Upcoming" },
            { value: "bypopularity", label: "Popular" },
          ]}
        />
      </Flex>

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
            total={animesLengthData.pagination?.last_visible_page!}
            siblings={3}
            defaultValue={topAnimesPage}
            onChange={(e) => {
              setTopAnimesPage(e);
            }}
          />
        </Flex>
      )}
    </Stack>
  );
};

export default TopAnimesPage;
