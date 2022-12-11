import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details() {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentMovieID = useSelector(store => store.currentMovie.id);
    const movies = useSelector(store => store.movies[currentMovieID - 1]);
    //const movieDetails = useSelector(store => store.movieDetails);
    const movieGenres = useSelector(store => store.movieGenres);

    console.log('currentMovieID equals', currentMovieID);
    console.log('current movie details equals', movies);
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });

        /*
        dispatch({ 
            type: 'FETCH_MOVIE_DETAILS', 
            payload: {currentMovieID} }
        );
        */

        dispatch({
            type: 'FETCH_MOVIE_GENRES',
            payload: { currentMovieID }
        }
        );

    }, []);

    return (
        <section id="movie-details">
            <h3>{movies.title}</h3>
            <div>
                <img src={movies.poster} />
            </div>
            <div>
                <h4>Genres:</h4>
            <ul>
                {movieGenres.map(genre => (
                    <li key={genre.name}>{genre.name}</li>
                ))}
            </ul>
            <h4>Description:</h4>
            <p>{movies.description}</p>
            <button onClick={() => {history.push('/')}}>Return to List</button>
            </div>
        </section>
    );
}

export default Details;