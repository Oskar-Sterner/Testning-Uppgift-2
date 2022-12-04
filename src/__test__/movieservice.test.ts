import { test, expect, jest } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";
import axios from "axios";
import { mockData } from "../ts/services/__mocks__/movieservice";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("getData", () => {
  test("should get mock data from api", async () => {

    mockAxios.get.mockResolvedValue({ data: { Search: mockData } });
    let result: IMovie[] = await getData("../services/movieservice.ts");

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].Title).toBe("Movie Test 1");
  });
  test("should not get mock data from api", async () => {

    mockAxios.get.mockRejectedValue({ data: { Search: mockData } });
    let result: IMovie[] = await getData("../services/movieservice.ts");

    expect(result.length).toBe(0);
  });
});