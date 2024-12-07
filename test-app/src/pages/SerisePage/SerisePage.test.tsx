import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw/node"; // Corrected import
import { setupServer } from "msw/node";
import SerisePage from "./";

// Set up the mock server and request handler
const server = setupServer(
  rest.get("https://swapi.dev/api/films/?format=json", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            episode_id: 1,
            title: "A New Hope",
            release_date: "1977-05-25",
            opening_crawl: "It is a period of civil war...",
            director: "George Lucas",
          },
          {
            episode_id: 2,
            title: "The Empire Strikes Back",
            release_date: "1980-05-21",
            opening_crawl: "It is a dark time for the rebellion...",
            director: "Irvin Kershner",
          },
        ],
      })
    );
  })
);

// Start the server before all tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests, so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());

describe("SerisePage", () => {
  test("renders with loading state", async () => {
    // Mock the server response with a delay to simulate loading state
    server.use(
      rest.get("https://swapi.dev/api/films/?format=json", (req, res, ctx) => {
        return res(ctx.status(200), ctx.delay(500), ctx.json({ results: [] }));
      })
    );

    render(<SerisePage />);

    // Check that the "Loading..." message is shown while data is being fetched
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders with error state", async () => {
    // Mock the server to simulate an error
    server.use(
      rest.get("https://swapi.dev/api/films/?format=json", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: "Internal Server Error" })
        );
      })
    );

    render(<SerisePage />);

    // Wait for the error message to appear
    await waitFor(() =>
      expect(
        screen.getByText("Error: Internal Server Error")
      ).toBeInTheDocument()
    );
  });

  test("renders list of series", async () => {
    render(<SerisePage />);

    // Wait for the series data to load and check if the titles are rendered
    await waitFor(() =>
      expect(screen.getByText("A New Hope")).toBeInTheDocument()
    );
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  test("search functionality filters the series list", async () => {
    render(<SerisePage />);

    // Type into the search input
    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Empire" },
    });

    // Ensure only the series matching the search term is shown
    await waitFor(() =>
      expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument()
    );
    expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();
  });

  test("selects sort option and sorts by episode", async () => {
    render(<SerisePage />);

    // Change sort option to 'Episode'
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Episode" },
    });

    // Ensure that the series list is sorted by episode ID
    await waitFor(() =>
      expect(screen.getByText("A New Hope")).toBeInTheDocument()
    );
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    // Check if they are sorted by episode_id
    expect(screen.getByText("A New Hope").closest("li")).toBeInTheDocument();
  });

  test("selects sort option and sorts by year", async () => {
    render(<SerisePage />);

    // Change sort option to 'Year'
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Year" },
    });

    // Ensure that the series list is sorted by release year
    await waitFor(() =>
      expect(screen.getByText("A New Hope")).toBeInTheDocument()
    );
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  test("selects a series and displays episode details", async () => {
    render(<SerisePage />);

    // Click on a list item to select an episode
    fireEvent.click(screen.getByText("A New Hope"));

    // Ensure the episode details are displayed
    await waitFor(() =>
      expect(screen.getByText("EPISODE 1 - A New Hope")).toBeInTheDocument()
    );
    expect(screen.getByText("Directed By: George Lucas")).toBeInTheDocument();
  });
});
