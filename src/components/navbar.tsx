import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, Link } from "react-router-dom";
import { RiMovieFill } from "react-icons/ri";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  logo: {
    color: theme.fn.variant({
      variant: "dark",
      color: theme.primaryColor,
    }).background,
  },

  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      fontWeight: 700,
      backgroundColor: theme.fn.variant({
        variant: "dark",
        color: theme.colors.teal[0],
      }).background,
      color: theme.fn.variant({ variant: "dark", color: theme.primaryColor })
        .color,
    },
  },
}));

const links = [
  { link: "/animes", label: "Animes" },
  { link: "/search", label: "Search" },
];

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: `/${pathname.split("/")[1]}` === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header} size="md">
        <Link to="/">
          <Avatar color="primary" radius="xl" size="md">
            <RiMovieFill size="1.5rem" />
          </Avatar>
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default Navbar;
