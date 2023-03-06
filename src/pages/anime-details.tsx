import {
  Center,
  Flex,
  Grid,
  Loader,
  Paper,
  Stack,
  Text,
  Image,
  Card,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { animesApi } from "../api";
import AnimeDetailsHero from "../components/anime-details/anime-details-hero";
import AnimeReviewCard from "../components/anime-review-card";
import { AnimeReview } from "../types/api/anime";
import { Anime } from "../types/api/anime/anime.model";
import { JikanResponse } from "../types/api/response";

type Props = {};

const AnimeDetailsPage = (props: Props) => {
  const { id } = useParams();

  const fetchAnimeDetails = async (_id: string) =>
    animesApi.get(`/anime/${_id}`).then((res) => res.data);

  const fetchAnimeReviews = async (_id: string) =>
    animesApi.get(`/anime/${_id}/reviews`).then((res) => res.data);

  const {
    isLoading: isAnimesDetailsLoading,
    isError: isAnimesDetailsError,
    data: animesDetails,
  } = useQuery<JikanResponse<Anime>>({
    queryKey: [`${id}AnimeDetails`, id],
    queryFn: () => fetchAnimeDetails(id!),
  });

  const {
    isLoading: isAnimesReviewsLoading,
    isError: isAnimesReviewsError,
    data: animesReviews,
  } = useQuery<JikanResponse<AnimeReview[]>>({
    queryKey: [`${id}AnimeReviews`, id],
    queryFn: () => fetchAnimeReviews(id!),
  });

  return (
    <Stack py={20} spacing={50}>
      {isAnimesDetailsLoading && isAnimesReviewsLoading && (
        <Center p={40}>
          <Loader />
        </Center>
      )}

      {animesDetails && (
        <Grid gutter={20}>
          <Grid.Col xs={12}>
            <AnimeDetailsHero anime={animesDetails.data} />
          </Grid.Col>

          <Grid.Col xs={12}>
            <Text fw={700} fz="xxl">
              Synopsis
            </Text>
          </Grid.Col>

          <Grid.Col xs={12}>
            <Text>
              {animesDetails.data.synopsis
                ? animesDetails.data.synopsis
                : "Not currently available"}
            </Text>
          </Grid.Col>

          {animesReviews && !!animesReviews.data.length && (
            <>
              <Grid.Col xs={12}>
                <Flex align="center" justify="space-between">
                  <Text fw={700} fz="xxl">
                    Reviews
                  </Text>

                  <Text
                    fw={700}
                    fz="xl"
                    color="primary"
                    component={Link}
                    to={`/animes/${id}/reviews`}
                  >
                    Read More
                  </Text>
                </Flex>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Stack>
                  {animesReviews.data?.slice(0, 5).map((review) => (
                    <AnimeReviewCard review={review} />
                  ))}
                </Stack>
              </Grid.Col>
            </>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default AnimeDetailsPage;
