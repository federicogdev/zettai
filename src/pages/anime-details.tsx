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
import Error from "../components/error";

import { Link, useParams } from "react-router-dom";
import { animesApi } from "../api";
import AnimeDetailsHero from "../components/anime-details/anime-details-hero";
import AnimeDetailsOverview from "../components/anime-details/anime-details-overview";
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
      {isAnimesDetailsLoading || isAnimesReviewsLoading ? (
        <Center p={40}>
          <Loader />
        </Center>
      ) : isAnimesDetailsError || isAnimesReviewsError ? (
        <Center mih="90vh">
          <Error />
        </Center>
      ) : (
        <Grid gutter={20}>
          <Grid.Col xs={12}>
            <AnimeDetailsHero anime={animesDetails.data} />
          </Grid.Col>

          <Grid.Col xs={12}>
            <AnimeDetailsOverview anime={animesDetails.data} />
          </Grid.Col>

          {animesReviews.data.length > 0 && (
            <Grid.Col xs={12}>
              <Flex align="center" justify="space-between" mb={20}>
                <Text fw={700} fz="xxl">
                  Reviews
                </Text>

                <Text
                  fw={700}
                  fz="xl"
                  color="primary"
                  component={Link}
                  to={`/anime/${id}/reviews`}
                >
                  Read More
                </Text>
              </Flex>
              <Stack>
                {animesReviews.data?.slice(0, 5).map((review) => (
                  <AnimeReviewCard review={review} />
                ))}
              </Stack>
            </Grid.Col>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default AnimeDetailsPage;
