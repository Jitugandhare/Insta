import React from 'react';
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const { results, status } = useSelector((state) => state.search);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error fetching results.</div>;

  return (
    <div>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
