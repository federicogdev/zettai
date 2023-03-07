import { Card, Text, Group, Avatar, Center } from "@mantine/core";
import React, { useState } from "react";
import { AnimeReview } from "../types/api/anime";
import dayjs from "dayjs";

type IAnimeReviewCardProps = {
  review: AnimeReview;
};

const AnimeReviewCard = ({ review }: IAnimeReviewCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const hasMore = review.review.length < 450;
  return (
    <Card radius="md" p="lg">
      <Group position="apart" mb={10}>
        <Center>
          <Avatar
            src={review.user.images.jpg.image_url}
            size={30}
            radius="xl"
            mr="xs"
          />
          <Text fw={700} fz="lg" inline>
            {review.user.username}
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <Text inline>{dayjs(review.date).format("DD MMM, YYYY")}</Text>
        </Group>
      </Group>

      <Text>
        {hasMore
          ? review.review
          : showMore
          ? review.review
          : `${review.review.substring(0, 450)}...`}
        {!hasMore && (
          <Text
            color="primary"
            onClick={() => setShowMore(!showMore)}
            style={{ cursor: "pointer" }}
          >
            {showMore ? "Show Less" : "Read More"}
          </Text>
        )}
      </Text>
    </Card>
  );
};

export default AnimeReviewCard;
