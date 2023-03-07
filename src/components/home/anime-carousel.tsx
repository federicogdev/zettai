import { Carousel } from "@mantine/carousel";
import { Image, rem } from "@mantine/core";
import { Link } from "react-router-dom";

const data = [
  {
    image: "/images/onepiece.jpg",

    title: "One Piece",
    mal_id: 21,
  },
  {
    image: "/images/shingeki.jpg",
    title: "Shingeki no Kyojin",
    mal_id: 16498,
  },
  {
    image: "/images/evangelion.jpg",
    title: "Neon Genesis Evangelion",
    mal_id: 30,
  },
  {
    image: "/images/kimetsu.jpg",
    title: "Kimetsu no Yaiba",
    mal_id: 38000,
  },
  {
    image: "/images/naruto.jpg",
    title: "Naruto",
    mal_id: 20,
  },
];

const AnimeCarousel = () => {
  return (
    <Carousel
      withIndicators
      loop
      styles={{
        indicator: {
          width: rem(12),
          height: rem(4),
          transition: "width 250ms ease",

          "&[data-active]": {
            width: rem(40),
          },
        },
      }}
    >
      {data.map((anime, i) => (
        <Carousel.Slide key={i} sx={{ aspectRatio: "16/9", w: "100%" }}>
          <Link to={`/anime/${anime.mal_id}`}>
            <Image src={anime.image} radius="md" />
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default AnimeCarousel;
