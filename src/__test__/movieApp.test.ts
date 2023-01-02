
/**
 *@jest-environment jsdom
 */

 import * as movieFunctions from "../ts/movieApp";
 import * as movieservicesFunctions from "../ts/services/movieservice"
 import { IMovie } from "../ts/models/IMovie";

 jest.mock("../ts/services/movieservice");
 
 describe("createHtml()", () => {
   test("should create HTML", async () => {
    // Arrange
    expect.assertions(3);
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    let searchText: string = "Lord";
    let movies: IMovie[] = await movieservicesFunctions.getData(searchText);

    //Act
    movieFunctions.createHtml(movies, container);

    // Assert
    expect(document.querySelectorAll("div.movie").length).toBe(2);
    expect(document.querySelectorAll("img").length).toBe(2);
    expect(document.querySelectorAll("h3").length).toBe(2);
  });
 });

 describe("displayNoResult()", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should show error message", () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    //Act
    movieFunctions.displayNoResult(container);

    //Assert
    expect(container.innerHTML).toBe("<p>Inga sökresultat att visa</p>");
    document.body.innerHTML = "";
  });
});

 describe("handleSubmit", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
   test("should call createHtml", async () => {
     // Arrange
     document.body.innerHTML = 
     `<form id="searchForm">
     <input type="text" value="star" id="searchText" placeholder="Skriv titel här" />
     <button type="submit" id="search">Sök</button>
   </form>
   <div id="movie-container"></div>`;
 
     let spy = jest.spyOn(movieFunctions, "createHtml").mockReturnValue();
 
     // Act
     await movieFunctions.handleSubmit();
 
     // Assert
     expect(spy).toHaveBeenCalled();
     document.body.innerHTML = "";
   });
 
   test("should call displayNoResult", async () => {
     // Arrange
     document.body.innerHTML = 
     `<form id="searchForm">
     <input type="text" value="" id="searchText" placeholder="Skriv titel här" />
     <button type="submit" id="search">Sök</button>
     </form>
     <div id="movie-container"></div>`;
 
     let spy = jest.spyOn(movieFunctions, "displayNoResult").mockReturnValue();
 
     // Act
     await movieFunctions.handleSubmit();

     // Assert
     expect(spy).toHaveBeenCalled();
     document.body.innerHTML = "";
   });

   test("should call displayNoResult", async () => {
    // Arrange
    document.body.innerHTML = 
    `<form id="searchForm">
    <input type="text" value="" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>
  <div id="movie-container"></div>`;

    let spy = jest.spyOn(movieFunctions, "displayNoResult").mockReturnValue();

    // Act
    await movieFunctions.handleSubmit();

    // Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
 });
 
 describe("init()", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should add submit eventlistener", () => {
    //Arrange
    let spy = jest.spyOn(movieFunctions, "handleSubmit").mockReturnValue(
      new Promise<void>((resolve) => {
        resolve();
      })
    );
    document.body.innerHTML = `
    <form id="searchForm">
    <button type="submit" id="search">Sök</button>
    </form>`;
    movieFunctions.init();

    //Act
    (document.getElementById("searchForm") as HTMLFormElement)?.submit();

    //Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});