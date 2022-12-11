import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details(){
    const dispatch = useDispatch();
    const history = useHistory();

    const currentMovieID = useSelector(store => store.currentMovie.id);
    console.log('currentMovieID equals', currentMovieID);

    useEffect(() => {
        dispatch({ 
            type: 'FETCH_MOVIE_DETAILS', 
            payload: {currentMovieID} });
    }, []);

    return(
        <>
        test
        </>
    );
}

export default Details;