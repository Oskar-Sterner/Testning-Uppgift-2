import { IMovie } from "../../models/IMovie";

export let mockData: IMovie[] = [
  {
    Title: "Movie Test 1",
    Year: "1994",
    imdbID: "1234",
    Poster: "posterURL",
    Type: "Action",
  },
  {
    Title: "Movie Test 2",
    Year: "1996",
    imdbID: "1234",
    Poster: "posterURL",
    Type: "comedy",
  },
];

export async function getMovies(): Promise<IMovie[]> {
  return new Promise((resolve) => {
    resolve(mockData);
  });
}