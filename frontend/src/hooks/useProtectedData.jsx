import { useState, useEffect } from "react";
import axios from "axios";

const backend = "http://localhost:3000";

export function useProtectedData(url, Storage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Storage.getItem("token");
        console.log("Retrieved token:", token);
        if (token !== null && token !== "") {
          console.log(`token: ${token}`);
          const response = await axios.get(`${backend}/${url}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setData(response.data);
        } else {
          throw new Error("User not authenticated");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
