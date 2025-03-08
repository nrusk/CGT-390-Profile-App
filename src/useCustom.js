import { useState, useEffect } from 'react';

function useCustom(databaseQuery) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      setLoading(true);
      setError(null);
      try {
        const data = await databaseQuery(); // Assuming databaseQuery returns a promise
        setCount(data.length); // Or data.count, depending on your API response
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
  }, [databaseQuery]);

  
}

export default useCustom(count, loading, error);