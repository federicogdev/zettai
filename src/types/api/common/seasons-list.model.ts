import { AnimeSeason } from "../anime";

export interface SeasonsListData {
  year: number;
  seasons: Array<keyof typeof AnimeSeason>;
}
