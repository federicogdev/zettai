import { JikanImages } from "../common/image.model";

export interface AnimeReviewUser {
  url: string;
  username: string;
  images: JikanImages;
}

export interface AnimeReview {
  mal_id: number;
  url: string;
  type: string;
  date: string;
  score: number;
  tags: string[];
  review: string;
  user: AnimeReviewUser;
  is_spoiler: boolean;
  is_preliminary: boolean;
}
