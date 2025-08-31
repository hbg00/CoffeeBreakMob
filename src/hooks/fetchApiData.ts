import { useState, useEffect } from 'react';
// will be used after creation of api 

const useFetchApiData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fetchedData: T = await response.json();
        setData(fetchedData);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted.');
        } else {
          setError(err.message || 'An unknown error occurred.');
          console.error('Error fetching data:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }


    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetchApiData;
