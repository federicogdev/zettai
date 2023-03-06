import { Grid, Text, Flex, Image, Paper } from "@mantine/core";
import React from "react";
import { Anime } from "../types/api";
import { shortenNumber } from "../utils/shorten-number";

type ILargeAnimeTileProps = {
  anime: Anime;
};

const LargeAnimeTile = ({ anime }: ILargeAnimeTileProps) => {
  return (
    <Grid align="center">
      <Grid.Col xs={12} sm={3}>
        <Image
          src={anime.images.jpg.image_url}
          radius={7}
          fit="fill"
          w="100%"
        />
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
                  <Text>{anime.episodes} episodes</Text>
                </Paper>
              )}

              {anime.type && (
                <Paper bg="primary" px={7} mr={3}>
                  <Text>{anime.type}</Text>
                </Paper>
              )}

              <Paper bg="primary" px={7} mr={3}>
                <Text>{shortenNumber(anime.members)} members</Text>
              </Paper>
            </Flex>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

export default LargeAnimeTile;
