import { useState, useEffect } from "react";

// Generic type for the result data, you can replace `unknown` with a specific type when you know the data structure
export const useToGetSeriesList = <T>(url: string) => {
  // State to store the fetched data, loading status, and any errors
  const [data, setData] = useState<T | null>(null); // T represents the type of the data you are fetching
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result: T = await response.json(); // Cast the result to the expected type
        setData(result); // Set the fetched data
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Set any errors encountered
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [url]); // Re-run the effect if the URL changes

  return { data, loading, error };
};
