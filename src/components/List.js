import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import useFetch from '../hooks';

const MovieList = (item, index) => (
  <div className="col-sm-6 col-md-4 movie-list" key={item.name}>
    <div className="card">
      <Link to={`/movie/${index}`} className="card-link">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Year : {item.productionYear}</p>
          <p className="card-text">Genre: {item.genre}</p>
          <p className="card-text">{item.synopsisShort}</p>
        </div>
      </Link>
    </div>
  </div>
);

const List = () => {
  const { data, error, loading } = useFetch();
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [movieName, setMovieName] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (data && data.length) {
      setFiltered(data);
    }
  }, [data]);

  useEffect(() => {
    const newArr = applyFilters();
    if (newArr && newArr.length) {
      setFiltered(newArr);
    } else {
      setFiltered([]);
    }
  }, [year, genre, movieName]);

  const onChange = (e) => {
    setMovieName(e.target.value);
  };

  const applyFilters = () => {
    if (!year && !genre && !movieName) {
      return data;
    }

    let filtered = data;

    if (year) {
      filtered = filtered.filter((item) => item.productionYear == year);
    }
    if (genre) {
      filtered = filtered.filter((item) => item.genre === genre);
    }
    if (movieName) {
      filtered = filtered.filter((item) => {
        const lowerItem = (item.name).toLowerCase();
        const lowerMovieName = movieName.toLowerCase();
        return (lowerItem.indexOf(lowerMovieName) !== -1);
      });
    }
    return filtered;
  };

  if (loading) return <Spinner />;
  if (error) return <h1>Server Error</h1>;

  return (
    <div>
      <section className="row justify-content-md-center mt-5 mb-3 filters">
        <div className="col">
          <label htmlFor="year">Year :</label>{' '}
          <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All</option>
            <option value="2003">2003</option>
            <option value="2006">2006</option>
            <option value="2010">2010</option>
            <option value="2013">2013</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2018">2018</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="genre">Genre :</label>{' '}
          <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">All</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>
      </section>

      <div className="mt-5">
        <input
          type="text"
          className="form-control"
          spellCheck="false"
          placeholder="search movie"
          value={movieName}
          onChange={onChange}
        />
      </div>

      <section className="row">{filtered.length ? filtered.map(MovieList) : null}</section>
    </div>
  );
};

export default List;
