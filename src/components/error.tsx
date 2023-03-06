import { Grid, Image, Text, Title } from "@mantine/core";
import React from "react";

type Props = {};

const Error = (props: Props) => {
  return (
    <Grid align="center">
      <Grid.Col xs={12} md={7}>
        <Image src="/error.png" />
      </Grid.Col>
      <Grid.Col xs={12} md={5}>
        <Text size="xxxxl" fw={700} color="primary">
          OOOPS
        </Text>

        <Text size="xxl" fw={700}>
          Something went wrong.
        </Text>

        <Text>Try refreshing the page.</Text>
      </Grid.Col>
    </Grid>
  );
};

export default Error;
