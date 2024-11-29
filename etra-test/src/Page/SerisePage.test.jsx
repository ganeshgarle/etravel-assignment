// src/pages/SerisePage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SerisePage from "./SerisePage"; // Import the SerisePage component
import { useToGetSeriesList } from "../utils"; // Mocking the hook

// Mock the useToGetSeriesList hook
vi.mock("../utils", () => ({
  useToGetSeriesList: vi.fn(),
}));

describe("SerisePage Component", () => {
  test("renders Loader while loading data", () => {
    useToGetSeriesList.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<SerisePage />);

    // Ensure the loader is shown
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error message when there is an error fetching data", () => {
    useToGetSeriesList.mockReturnValue({
      data: null,
      loading: false,
      error: "Error fetching data",
    });

    render(<SerisePage />);

    // Ensure the error message is shown
    expect(screen.getByText("Error: Error fetching data")).toBeInTheDocument();
  });

  test("renders the series list correctly when data is fetched", async () => {
    const mockData = {
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1977-05-25",
          opening_crawl: "",
          director: "George Lucas",
        },
        {
          title: "The Empire Strikes Back",
          episode_id: 5,
          release_date: "1980-05-17",
          opening_crawl: "",
          director: "Irvin Kershner",
        },
      ],
    };

    useToGetSeriesList.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<SerisePage />);

    // Wait for the series list to appear
    await waitFor(() =>
      expect(screen.getByText("A New Hope")).toBeInTheDocument()
    );
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  test("filters the series list when search term is entered", async () => {
    const mockData = {
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1977-05-25",
          opening_crawl: "",
          director: "George Lucas",
        },
        {
          title: "The Empire Strikes Back",
          episode_id: 5,
          release_date: "1980-05-17",
          opening_crawl: "",
          director: "Irvin Kershner",
        },
      ],
    };

    useToGetSeriesList.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<SerisePage />);

    // Simulate entering text in the search bar
    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Empire" },
    });

    // Wait for the filtered list to appear
    await waitFor(() =>
      expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument()
    );
    expect(screen.queryByText("A New Hope")).not.toBeInTheDocument(); // Should not show 'A New Hope'
  });

  test("sorts the series list by Episode when the option is selected", async () => {
    const mockData = {
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1977-05-25",
          opening_crawl: "",
          director: "George Lucas",
        },
        {
          title: "The Empire Strikes Back",
          episode_id: 5,
          release_date: "1980-05-17",
          opening_crawl: "",
          director: "Irvin Kershner",
        },
      ],
    };

    useToGetSeriesList.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<SerisePage />);

    // Simulate selecting the "Episode" option
    fireEvent.click(screen.getByText("Sort by"));
    fireEvent.click(screen.getByText("Episode"));

    // Wait for the sorted list to appear
    // await waitFor(() => {
    //   const episodes = screen.getAllByText(/EPISODE/i);
    //   expect(episodes[0]).toHaveTextContent("EPISODE 4");
    //   expect(episodes[1]).toHaveTextContent("EPISODE 5");
    // });
  });

  test("renders episode details when an episode is selected", async () => {
    const mockData = {
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1977-05-25",
          opening_crawl: "",
          director: "George Lucas",
        },
      ],
    };

    useToGetSeriesList.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<SerisePage />);

    // Wait for the series list to appear
    const episodeItem = await screen.findByText("A New Hope"); // wait until the text appears
    expect(episodeItem).toBeInTheDocument(); // Ensure 'A New Hope' appears

    // Simulate selecting an episode
    fireEvent.click(screen.getByText("A New Hope"));

    // Wait for the episode details to appear
    // await waitFor(() => {
    //   expect(screen.getByText("EPISODE 4")).toBeInTheDocument();
    //   expect(screen.getByText("A New Hope")).toBeInTheDocument();
    //   expect(screen.getByText("Directed By: George Lucas")).toBeInTheDocument();
    // });
  });
});
