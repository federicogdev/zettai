import { Grid, Text, Flex, Image, Paper } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { Anime } from "../types/api/anime";
import { shortenNumber } from "../utils/shorten-number";

type ILargeAnimeTileProps = {
  anime: Anime;
};

const LargeAnimeTile = ({ anime }: ILargeAnimeTileProps) => {
  return (
    <Grid align="center">
      <Grid.Col xs={12} sm={3}>
        <Link to={`/anime/${anime.mal_id}`}>
          <Image
            src={anime.images.jpg.large_image_url}
            radius={7}
            fit="fill"
            w="100%"
          />
        </Link>
      </Grid.Col>
      <Grid.Col xs={12} sm={9}>
        <Grid gutter={10}>
          <Grid.Col xs={12} pb={0}>
            <Text fw={700} fz="xxl">
              {anime.title}
            </Text>
          </Grid.Col>

          {anime.title_japanese && (
            <Grid.Col xs={12}>
              <Text fz="xl" fs="italic">
                {anime.title_japanese}
              </Text>
            </Grid.Col>
          )}

          <Grid.Col xs={12}>
            <Text lineClamp={5}>{anime.synopsis}</Text>
          </Grid.Col>

          <Grid.Col xs={12}>
            <Flex>
              {anime.episodes > 0 && (
                <Paper bg="primary" px={7} mr={3}>
                  <Text fw={600}>{anime.episodes} episodes</Text>
                </Paper>
              )}

              {anime.type && (
                <Paper bg="primary" px={7} mr={3}>
                  <Text fw={600}>{anime.type}</Text>
                </Paper>
              )}

              <Paper bg="primary" px={7} mr={3}>
                <Text fw={600}>{shortenNumber(anime.members)} members</Text>
              </Paper>
            </Flex>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

export default LargeAnimeTile;
