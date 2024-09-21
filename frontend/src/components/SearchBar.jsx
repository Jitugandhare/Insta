import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchSearchResults } from '../redux/searchSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    dispatch(setQuery(newQuery));
    if (newQuery.length > 2) {
      dispatch(fetchSearchResults(newQuery));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
