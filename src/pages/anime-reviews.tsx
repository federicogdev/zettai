import { Stack, Center, Loader, Grid, Flex, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { animesApi } from "../api";
import AnimeReviewCard from "../components/anime-review-card";
import Error from "../components/error";
import { AnimeReview } from "../types/api/anime";
import { JikanResponse } from "../types/api/response";

type Props = {};

const AnimeReviewsPage = (props: Props) => {
  const { id } = useParams();

  const fetchAnimeReviews = async (_id: string) =>
    animesApi.get(`/anime/${_id}/reviews`).then((res) => res.data);

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
      {isAnimesReviewsLoading ? (
        <Center mih="90vh">
          <Loader />
        </Center>
      ) : isAnimesReviewsError ? (
        <Center mih="90vh">
          <Error />
        </Center>
      ) : (
        <Grid gutter={20}>
          {!!animesReviews.data.length && (
            <>
              <Grid.Col xs={12}>
                <Text fw={700} fz="xxl">
                  Reviews
                </Text>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Stack>
                  {animesReviews.data.map((review) => (
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

export default AnimeReviewsPage;
