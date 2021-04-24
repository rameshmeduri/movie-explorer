import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks';
import Spinner from './Spinner';

const Detail = () => {
  const { data, error, loading } = useFetch();
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (data && data.length && id) {
      setMovie(data[id]);
    }
  }, [data, id]);

  if (loading) return <Spinner />;
  if (error) return <h1>Server Error</h1>;

  const len = Object.keys(movie).length;
  const MovieItem = (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{movie.name}</h5>
        <p className="card-text">
          <strong>Year</strong> : {movie.productionYear}
        </p>
        <p className="card-text">
          <strong>Genre</strong> : {movie.genre}
        </p>
        <p className="card-text">
          <strong>synopsisShort</strong> :
        </p>
        <p className="card-text">{movie.synopsisShort}</p>
        <p className="card-text">
          <strong>synopsis</strong> :
        </p>
        <p dangerouslySetInnerHTML={{ __html: movie.synopsis }} />
      </div>
    </div>
  );

  return (
    <section className="mt-4 mb-5">
      <div className="row align-items-start">
        <div className="col-1 mb-4">
          <Link to="/">Back</Link>
        </div>
      </div>
      {len ? MovieItem : null}
    </section>
  );
};

export default Detail;
