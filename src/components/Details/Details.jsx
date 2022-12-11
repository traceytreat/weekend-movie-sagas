import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Details.css';

function Details() {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentMovieID = useSelector(store => store.currentMovie.id);
    //get the specific movie
    const movies = useSelector(store => store.movies[currentMovieID - 1]);
    //get the genres for this specific movie
    const movieGenres = useSelector(store => store.movieGenres);


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });

        dispatch({
            type: 'FETCH_MOVIE_GENRES',
            payload: { currentMovieID }
        }
        );

    }, []);

    // display movie details on the dom
    return (
        <section id="movie-details">
            <div id="poster">
                <h3>{movies.title}</h3>
                <img src={movies.poster} />
            </div>
            <div id="info">
                <h4>Genres:</h4>
                <ul>
                    {movieGenres.map(genre => (
                        <li key={genre.name}>{genre.name}</li>
                    ))}
                </ul>
                <h4>Description:</h4>
                <p>{movies.description}</p>
                <button onClick={() => { history.push('/') }}>Return to List</button>
            </div>
        </section>
    );
}

export default Details;