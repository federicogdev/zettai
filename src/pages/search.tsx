import {
  ActionIcon,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { animesApi } from "../api";
import { JikanResource } from "../types/api/common";
import { useQuery } from "@tanstack/react-query";
import { JikanResponse } from "../types/api/response";
import { AnimesPaginationContext } from "../context/animes-pagination-context";
import { FaChevronRight } from "react-icons/fa";
interface AnimeGenre extends JikanResource {
  count: number;
}

type Props = {};
const SearchPage = (props: Props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { setQueryAnimesPage } = useContext(AnimesPaginationContext);

  const fetchAnimeGenres = async () =>
    animesApi.get("/genres/anime").then((res) => res.data);

  const {
    isLoading: isAnimeGenresLoading,
    isError: isAnimeGenresError,
    data: animeGenres,
  } = useQuery<JikanResponse<AnimeGenre[]>>({
    queryKey: [`animeGenres`],
    queryFn: () => fetchAnimeGenres(),
  });

  return (
    <Stack py={20} spacing={30}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query !== "") {
            setQueryAnimesPage(1);
            navigate(`/anime?q=${query.replace(/\s+/g, `+`)}`);
          }
        }}
      >
        <TextInput
          icon={<BsSearch size="1.1rem" />}
          radius="sm"
          size="md"
          rightSection={
            <ActionIcon
              size={32}
              radius="sm"
              color={theme.primaryColor}
              variant="filled"
            >
              <AiOutlineArrowRight size="1.1rem" />
            </ActionIcon>
          }
          placeholder="e.g Naruto, Bleach...."
          rightSectionWidth={42}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>

      <Text fz="xl" fw={700}>
        Genres
      </Text>
      <SimpleGrid
        cols={5}
        spacing="md"
        breakpoints={[
          { maxWidth: "md", cols: 5, spacing: "md" },
          { maxWidth: "sm", cols: 3, spacing: "sm" },
          { maxWidth: "xs", cols: 2, spacing: "sm" },
        ]}
      >
        {animeGenres?.data
          .sort((a, b) => {
            return b.count - a.count;
          })
          .map((genre) => (
            <Card
              key={genre.mal_id}
              p={10}
              component={Link}
              to={`/anime?genres=${genre.mal_id}`}
              onClick={() => {
                setQueryAnimesPage(1);
              }}
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text lineClamp={1} fw={700}>
                    {genre.name}
                  </Text>
                  <Text size="sm">{genre.count} titles</Text>
                </Box>
                <ActionIcon color="primary">
                  <FaChevronRight style={{ height: ".7em" }} />
                </ActionIcon>
              </Flex>
            </Card>
          ))}
      </SimpleGrid>
    </Stack>
  );
};

export default SearchPage;
