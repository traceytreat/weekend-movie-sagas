import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <button onClick={() => history.push('/addmovie')}>Add Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div id="movie" key={movie.id} >
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