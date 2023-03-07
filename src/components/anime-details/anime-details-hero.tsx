import {
  Center,
  Flex,
  Grid,
  Loader,
  Paper,
  Stack,
  Text,
  Image,
} from "@mantine/core";
import dayjs from "dayjs";
import { BsStarFill } from "react-icons/bs";
import { Anime } from "../../types/api/anime";
import { shortenNumber } from "../../utils/shorten-number";

type IAnimeDetailsHeroProps = {
  anime: Anime;
};

const AnimeDetailsHero = ({ anime }: IAnimeDetailsHeroProps) => {
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

          {anime.score && (
            <Grid.Col xs={12}>
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
            </Grid.Col>
          )}

          <Grid.Col xs={12}>
            <Flex>
              <Paper bg="primary" px={7} mr={3}>
                <Text fw={600}>Ranked: #{anime.rank ? anime.rank : 0}</Text>
              </Paper>

              <Paper bg="primary" px={7} mr={3}>
                <Text fw={600}>
                  Popularity: #{anime.popularity ? anime.popularity : 0}
                </Text>
              </Paper>

              <Paper bg="primary" px={7} mr={3}>
                <Text fw={600}>
                  {shortenNumber(anime.members ? anime.members : 0)} members
                </Text>
              </Paper>

              <Paper bg="primary" px={7} mr={3}>
                <Text fw={600}>
                  {anime.approved ? "Approved" : "Not Approved"}
                </Text>
              </Paper>
            </Flex>
          </Grid.Col>

          <Grid.Col xs={12}>
            <Text lineClamp={5} fz="md">
              {dayjs(anime.aired.from).format("DD MMM, YYYY")}{" "}
              {anime.aired.to &&
                `to ${dayjs(anime.aired.to).format("DD MMM, YYYY")}`}
            </Text>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

export default AnimeDetailsHero;
