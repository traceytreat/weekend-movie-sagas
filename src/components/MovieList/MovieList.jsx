import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);
    //const moviesGenres = useSelector(store => store.moviesGenres);
    //console.log('moviesGenres array', moviesGenres);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        //dispatch({ type: 'FETCH_MOVIES_GENRES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img
                                onClick={() => {
                                    dispatch({
                                        type: 'SET_CURRENT_MOVIE',
                                        payload: {id: movie.id}
                                    });
                                    history.push('/details');
                                }
                                }
                                src={movie.poster}
                                alt={movie.title} 
                            />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;