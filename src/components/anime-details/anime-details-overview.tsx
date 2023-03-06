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
import React from "react";
import { Link } from "react-router-dom";
import { Anime } from "../../types/api/anime";

type IAnimeDetailsOverviewProps = {
  anime: Anime;
};

const AnimeDetailsOverview = ({ anime }: IAnimeDetailsOverviewProps) => {
  return (
    <Stack>
      <Stack>
        <Text fw={700} fz="xxl">
          Synopsis
        </Text>
        <Text>{anime.synopsis}</Text>
      </Stack>

      {anime.trailer.youtube_id && (
        <Stack>
          <Text fw={700} fz="xxl">
            Trailer
          </Text>
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>{" "}
        </Stack>
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
                // component={Link}
                // to={`/producers/${producer.mal_id}`}
                key={producer.mal_id}
              >
                <Text>{producer.name}</Text>
              </Paper>
            ))}
          </Flex>
        </Stack>
      )}

      {anime.genres && (
        <Stack>
          <Text fw={700} fz="xxl">
            Genres
          </Text>
          <Flex wrap="wrap">
            {anime.genres.map((genre) => (
              <Paper
                bg="primary"
                px={7}
                mr={3}
                component={Link}
                to={`/anime?genres=${genre.mal_id}`}
                key={genre.mal_id}
              >
                <Text>{genre.name}</Text>
              </Paper>
            ))}
          </Flex>
        </Stack>
      )}
    </Stack>
  );
};

export default AnimeDetailsOverview;
