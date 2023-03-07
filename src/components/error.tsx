import { Grid, Image, Text, Title } from "@mantine/core";
import React from "react";

type Props = {
  topErrorMessage?: string;
  whatsWrongErrorMessage?: string;
  message?: string;
};

const Error = ({
  topErrorMessage = "OOOPS",
  whatsWrongErrorMessage = "Something went wrong",
  message = "Try refreshing the page",
}: Props) => {
  return (
    <Grid align="center">
      <Grid.Col xs={12} md={8}>
        <Image src="/images/error.png" />
      </Grid.Col>
      <Grid.Col xs={12} md={4}>
        <Text size="xxxxl" fw={700} color="primary">
          {topErrorMessage}
        </Text>

        <Text size="xxl" fw={700}>
          {whatsWrongErrorMessage}
        </Text>

        <Text>{message}</Text>
      </Grid.Col>
    </Grid>
  );
};

export default Error;
