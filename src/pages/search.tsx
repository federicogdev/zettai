import {
  ActionIcon,
  Box,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
type Props = {};

const SearchPage = (props: Props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate(); // RRDv6
  const [query, setQuery] = useState("");

  return (
    <Stack py={20} spacing={50}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query !== "") {
            navigate(`/anime?q=${query}`);
          }
        }}
      >
        <TextInput
          icon={<BsSearch size="1.1rem" />}
          radius="xl"
          size="md"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
            >
              <AiOutlineArrowRight size="1.1rem" />
            </ActionIcon>
          }
          placeholder="Search questions"
          rightSectionWidth={42}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>

      {/* {data ? (
        <Box bg="red" w="100%" h="100vh"></Box>
      ) : (
        <Box bg="yellow" w="100%" h="100vh"></Box>
      )} */}
    </Stack>
  );
};

export default SearchPage;
