import React from "react";
import {
  AspectRatio,
  Center,
  Flex,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import Error from "../components/error";

import AnimeCarousel from "../components/home/anime-carousel";
import { animesApi } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Anime } from "../types/api/anime";
import { JikanResponse } from "../types/api/response";
import { Link } from "react-router-dom";
type Props = {};

const HomePage = (props: Props) => {
  const fetchAnimes = async (filter: string) =>
    animesApi
      .get(`/top/anime?filter=${filter}&limit=12`)
      .then((res) => res.data);

  const {
    isLoading: isHomePopularAnimesDataLoading,
    isError: isHomePopularAnimesDataError,
    data: homePopularAnimesData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [`homePopularAnimes`],
    queryFn: () => fetchAnimes("bypopularity"),
  });

  const {
    isLoading: isHomeAiringAnimesDataLoading,
    isError: isHomeAiringAnimesDataError,
    data: homeAiringAnimesData,
  } = useQuery<JikanResponse<Anime[]>>({
    queryKey: [`homeAiringAnimes`],
    queryFn: () => fetchAnimes("airing"),
  });

  if (isHomePopularAnimesDataLoading || isHomeAiringAnimesDataLoading) {
    <Center p={40}>
      <Loader />
    </Center>;
  }
  if (isHomePopularAnimesDataError || isHomeAiringAnimesDataError) {
    <Center p={40}>
      <Error />
    </Center>;
  }

  return (
    <Stack py={20} spacing={20} mih="90vh">
      <AnimeCarousel />

      <Flex align="center" justify="space-between">
        <Text fw={700} fz="xxl">
          User's favourites
        </Text>

        <Text
          fw={700}
          fz="xl"
          color="primary"
          component={Link}
          to={`/top-animes`}
        >
          See More
        </Text>
      </Flex>

      <SimpleGrid
        cols={6}
        spacing="lg"
        breakpoints={[
          { maxWidth: "lg", cols: 6, spacing: "md" },
          { maxWidth: "md", cols: 4, spacing: "md" },
          { maxWidth: "sm", cols: 3, spacing: "sm" },
          { maxWidth: "xs", cols: 3, spacing: "sm" },
        ]}
      >
        {homePopularAnimesData?.data.map((anime) => (
          <Stack spacing={10}>
            <Link to={`/anime/${anime.mal_id}`}>
              <AspectRatio
                ratio={0.66}
                key={anime.mal_id}
                style={{ position: "relative" }}
              >
                <Image
                  src={anime.images.jpg.large_image_url}
                  radius="md"
                  h={300}
                />
              </AspectRatio>
            </Link>
            <Text lineClamp={2} fz="lg" fw={700}>
              {anime.title}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>

      <Flex align="center" justify="space-between">
        <Text fw={700} fz="xxl">
          Airing animes leaderboard
        </Text>

        <Text
          fw={700}
          fz="xl"
          color="primary"
          component={Link}
          to={`/top-animes`}
        >
          See More
        </Text>
      </Flex>

      <SimpleGrid
        cols={6}
        spacing="lg"
        breakpoints={[
          { maxWidth: "lg", cols: 6, spacing: "md" },
          { maxWidth: "md", cols: 4, spacing: "md" },
          { maxWidth: "sm", cols: 3, spacing: "sm" },
          { maxWidth: "xs", cols: 3, spacing: "sm" },
        ]}
      >
        {homeAiringAnimesData?.data.map((anime) => (
          <Stack spacing={10}>
            <Link to={`/anime/${anime.mal_id}`}>
              <AspectRatio
                ratio={0.66}
                key={anime.mal_id}
                style={{ position: "relative" }}
              >
                <Image
                  src={anime.images.jpg.large_image_url}
                  radius="md"
                  maw="100%"
                />
              </AspectRatio>
            </Link>
            <Text lineClamp={2} fz="lg" fw={700}>
              {anime.title}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default HomePage;
