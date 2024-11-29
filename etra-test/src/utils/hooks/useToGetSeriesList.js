import { useState, useEffect } from "react";

export const useToGetSeriesList = (url) => {
  // State to store the fetched data, loading status, and any errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (err) {
        setError(err.message); // Set any errors encountered
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [url]); // Re-run the effect if the URL changes

  return { data, loading, error };
};
