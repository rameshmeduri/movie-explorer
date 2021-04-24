import { useState, useEffect } from 'react';
const API = 'https://sometimes-maybe-flaky-api.gdshive.io';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(API);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { data, error, loading };
};

export default useFetch;
