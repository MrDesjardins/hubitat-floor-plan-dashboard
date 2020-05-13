import { useState, useEffect } from "react";

export const useFetch = <T>(url: string): T | undefined => {
  const [data, updateData] = useState(undefined);

  // empty array as second argument equivalent to componentDidMount
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();
      updateData(json);
    }
    fetchData();
  }, [url]);

  return (data as unknown) as T;
};
