import React from "react";
import { Anchor, Text } from "@mantine/core";
import { Link } from "react-router-dom";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <Text component={Link} variant="text" to="/launches/1234" color="blue">
        Hello
      </Text>
      <Text color="primary">Hello</Text>
    </>
  );
};

export default HomePage;
