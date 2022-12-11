import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details(){
    const dispatch = useDispatch();
    const history = useHistory();

    const currentMovieID = useSelector(store => store.currentMovie.id);
    const movieDetails = useSelector(store => store.movieDetails[0]);
    const movieGenres = useSelector(store => store.movieGenres);

    console.log('currentMovieID equals', currentMovieID);
    console.log('current movie details equals', movieDetails);
    console.log('current movie details equals', movieGenres);
    useEffect(() => {
        dispatch({ 
            type: 'FETCH_MOVIE_DETAILS', 
            payload: {currentMovieID} }
        );
        dispatch({ 
            type: 'FETCH_MOVIE_GENRES', 
            payload: {currentMovieID} }
        );
            
    }, []);

    return(
            <div>
                Genres:
                <ul>
                    {movieGenres.map(genre => (
                        <li key={genre.name}>{genre.name}</li>
                    ))}
                </ul>
            </div>
    
    );
}

export default Details;