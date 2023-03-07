import { Center } from "@mantine/core";

import Error from "../components/error";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <Center mih={"90vh"}>
      <Error
        message="The page is not available."
        topErrorMessage="404"
        whatsWrongErrorMessage="Page not found"
      />
    </Center>
  );
};

export default NotFoundPage;
