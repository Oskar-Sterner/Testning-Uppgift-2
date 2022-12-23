import * as functions from "../ts/functions";
import { IMovie } from "../ts/models/IMovie";
import { test, expect } from "@jest/globals";
import {
  mockData,
  longerMockData,
  doubleMockData,
} from "../ts/services/__mocks__/movieservice";

describe("movieSort()", () => {
  describe("if desc = true", () => {
    test("should sort alphabetically", async () => {
      //Arrange
      let testMovies: IMovie[] = longerMockData;

      //Act
      functions.movieSort(testMovies);
      //Assert
      expect(testMovies[0].Title).toBe("Lord of War");
      expect(testMovies[1].Title).toBe("The Lord of the Rings: The Fellowship of the Ring");
      expect(testMovies[2].Title).toBe("The Lord of the Rings: The Return of the King");
      expect(testMovies[3].Title).toBe("The Lord of the Rings: The Rings of Power");
    });

    test("should sort alphabetically with doubles", async () => {
      //Arrange
      let testMovies: IMovie[] = doubleMockData;

      //Act
      functions.movieSort(testMovies);
      //Assert
      expect(testMovies[0].Title).toBe("Lord of War");
      expect(testMovies[1].Title).toBe("The Lord of the Rings: The Fellowship of the Ring");
      expect(testMovies[2].Title).toBe("The Lord of the Rings: The Return of the King");
      expect(testMovies[3].Title).toBe("The Lord of the Rings: The Return of the King");
    });
  });
  describe("if desc = false", () => {
    test("should sort reversed alphabetically", () => {
      //Arrange
      let testMovies: IMovie[] = longerMockData;
      let testBoolean: boolean = false;
      //Act
      functions.movieSort(testMovies, testBoolean);
      //Assert
      expect(testMovies[0].Title).toBe("The Lord of the Rings: The Two Towers");
      expect(testMovies[1].Title).toBe("The Lord of the Rings: The Rings of Power");
      expect(testMovies[2].Title).toBe("The Lord of the Rings: The Return of the King");
      expect(testMovies[3].Title).toBe("The Lord of the Rings: The Fellowship of the Ring");
    });
  });
});