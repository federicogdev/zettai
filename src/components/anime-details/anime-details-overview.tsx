import {
  Stack,
  Text,
  Flex,
  Card,
  AspectRatio,
  Box,
  Grid,
  Paper,
} from "@mantine/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimesPaginationContext } from "../../context/animes-pagination-context";
import { Anime } from "../../types/api/anime";

type IAnimeDetailsOverviewProps = {
  anime: Anime;
};

const AnimeDetailsOverview = ({ anime }: IAnimeDetailsOverviewProps) => {
  const { setQueryAnimesPage } = useContext(AnimesPaginationContext);
  return (
    <Stack spacing={20}>
      <Text>{anime.synopsis}</Text>

      {anime.trailer.youtube_id && (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      )}

      {anime.producers && (
        <Stack>
          <Text fw={700} fz="xxl">
            Producers
          </Text>
          <Flex wrap="wrap">
            {anime.producers.map((producer) => (
              <Paper
                bg="primary"
                px={7}
                mr={3}
                mb={5}
                component={Link}
                to={`/anime?producers=${producer.mal_id}`}
                onClick={() => setQueryAnimesPage(1)}
                key={producer.mal_id}
              >
                <Text>{producer.name}</Text>
              </Paper>
            ))}
          </Flex>
        </Stack>
      )}
    </Stack>
  );
};

export default AnimeDetailsOverview;
