import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Text,
} from "@mantine/core";
import { AiOutlineGithub } from "react-icons/ai";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();
  const d = new Date();
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>&copy; Copyright {d.getFullYear()} - Zettai</Text>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <AiOutlineGithub size="1.05rem" />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
