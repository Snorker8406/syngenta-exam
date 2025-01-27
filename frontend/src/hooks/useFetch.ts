import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  
  return [data];
}

export default useFetch;
