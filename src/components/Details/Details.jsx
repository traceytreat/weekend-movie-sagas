import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details(){
    const dispatch = useDispatch();
    const history = useHistory();

    const currentMovieID = useSelector(store => store.currentMovie.id);
    const movieDetails = useSelector(store => store.movieDetails);
    const movieGenres = useSelector(store => store.movieGenres);

    console.log('currentMovieID equals', currentMovieID);
    console.log('current movie details equals', movieDetails[0]);
    useEffect(() => {
        dispatch({ 
            type: 'FETCH_MOVIE_DETAILS', 
            payload: {currentMovieID} });
    }, []);

    return(
        <section id="movie-details">
            <h3>{movieDetails[0].title}</h3>
            <div>
                <img src={movieDetails[0].poster} />
            </div>
            <div>
                Genres:
                <ul>
                    {movieGenres.map(genre => (
                        <li key={genre.name}>{genre.name}</li>
                    ))}
                </ul>
                <p>{movieDetails[0].description}</p>
            </div>
        </section>
    );
}

export default Details;