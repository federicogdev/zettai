import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { animesApi } from "../api";
import { TopAnimesContext } from "../context/top-animes-context";
import { JikanResponse, Anime } from "../types/api";
import { Select, Stack, Flex, Text, Pagination } from "@mantine/core";

type Props = {};

const AnimesPage = (props: Props) => {
  const {
    topAnimesPage,
    topAnimesFilter,
    setTopAnimesFilter,
    setTopAnimesPage,
  } = useContext(TopAnimesContext);

  const fetchAnimesLength = async (filter: string) =>
    animesApi
      .get(`/top/anime?filter=${topAnimesFilter}&limit=10`)
      .then((res) => res.data);

  const {
    isLoading: isAnimesLengthDataLoading,
    isError: isAnimesLengthDataError,
    data: animesLengthData,
  } = useQuery<JikanResponse<Anime>>({
    queryKey: [`${topAnimesFilter}Animes`, topAnimesFilter],
    queryFn: () => fetchAnimesLength(topAnimesFilter!),
  });

  return (
    <Stack py={20}>
      <Flex justify="space-between" align="center">
        <Text fw={700} fz="xl">
          Results: {animesLengthData?.pagination?.items?.total}
        </Text>

        <Select
          value={topAnimesFilter}
          onChange={setTopAnimesFilter}
          data={[
            { value: "airing", label: "Airing" },
            { value: "upcoming", label: "Upcoming" },
            { value: "bypopularity", label: "Popular" },
            { value: "favorite", label: "Favourites" },
          ]}
        />
      </Flex>

      {animesLengthData && !isAnimesLengthDataLoading && (
        <Flex justify="center">
          <Pagination
            withEdges
            total={animesLengthData.pagination?.last_visible_page!}
            siblings={3}
            defaultValue={1}
            onChange={(e) => setTopAnimesPage(e)}
          />
        </Flex>
      )}
    </Stack>
  );
};

export default AnimesPage;
