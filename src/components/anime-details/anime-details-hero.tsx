import { Center, Flex, Grid, Paper, Stack, Text, Image } from "@mantine/core";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Anime } from "../../types/api/anime";
import { shortenNumber } from "../../utils/shorten-number";

type IAnimeDetailsHeroProps = {
  anime: Anime;
};

const AnimeDetailsHero = ({ anime }: IAnimeDetailsHeroProps) => {
  return (
    <Grid align="center" mb={10}>
      <Grid.Col xs={12} sm={3}>
        <Image
          src={anime.images.jpg.large_image_url}
          radius={7}
          fit="fill"
          w="100%"
        />
      </Grid.Col>

      <Grid.Col xs={12} sm={9}>
        <Stack>
          <Text fw={700} fz="xxl" lh={1.2}>
            {anime.title}
          </Text>

          {anime.title_japanese && (
            // <Grid.Col xs={12}>
            <Text fz="xl" fs="italic">
              {anime.title_japanese}
            </Text>
            // </Grid.Col>
          )}

          <Text lineClamp={5} fz="md">
            Aired from {anime.aired.string}
          </Text>

          <Flex wrap="wrap">
            <Paper bg="primary" px={7} mr={3} mb={3}>
              <Text>Ranked: #{anime.rank ? anime.rank : 0}</Text>
            </Paper>

            <Paper bg="primary" px={7} mr={3} mb={3}>
              <Text>
                Popularity: #{anime.popularity ? anime.popularity : 0}
              </Text>
            </Paper>

            <Paper bg="primary" px={7} mr={3} mb={3}>
              <Text>
                {shortenNumber(anime.members ? anime.members : 0)} members
              </Text>
            </Paper>
          </Flex>

          <Flex wrap="wrap">
            {anime.genres.map((genre) => (
              <Paper
                bg="primary"
                px={7}
                mr={3}
                mb={5}
                component={Link}
                to={`/anime?genres=${genre.mal_id}`}
              >
                <Text>{genre.name}</Text>
              </Paper>
            ))}
          </Flex>

          {anime.score && (
            <Flex align="center">
              <Text fz="lg">{anime.score} </Text>
              <BsStarFill
                style={{
                  color: "yellow",
                  fontSize: "1rem",
                  marginRight: ".3rem",
                  marginLeft: ".3rem",
                }}
              />
              <Text fz="lg">by {shortenNumber(anime.scored_by)} users</Text>
            </Flex>
          )}
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default AnimeDetailsHero;
