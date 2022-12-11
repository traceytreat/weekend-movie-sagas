import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    //yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('FETCH_MOVIE_GENRES', fetchMovieGenres);
    yield takeEvery('ADD_MOVIE', addMovie);
}

function* addMovie(action) {
    yield axios.post('/api/movie', action.payload);
    console.log('Add movie', action.payload);
    yield put({
        type: 'FETCH_MOVIES'
    })
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchAllGenres() {
    // get all genres from the DB
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data });

    } catch {
        console.log('get all genres error');
    }
        
}

// Get details of the movie
/*
function* fetchMovieDetails(action) {
    //console.log('action is', action.payload.currentMovieID);
    try {
        const movieDetails = yield axios.get('/api/movie/' + action.payload.currentMovieID)
        //const movieGenres = yield axios.get('/api/genre/' + action.payload.currentMovieID)
        yield put({type: 'SET_MOVIE_DETAILS', payload: movieDetails.data})
        //yield put({type: 'SET_MOVIE_GENRES', payload: movieGenres.data})
    } catch {
        console.log('get specific movie error')
    }
}
*/

// Get genres of specific movie
function* fetchMovieGenres(action) {
    try {
        const movieGenres = yield axios.get('/api/genre/' + action.payload.currentMovieID)
        yield put({type: 'SET_MOVIE_GENRES', payload: movieGenres.data})
    } catch {
        console.log('get specific movie genres error')
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

/*
// store the movies combined with genres in one array
const moviesGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES_GENRES':
            return action.payload;
        default:
            return state;
    }
}
*/
// store movie details
/*
const movieDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
*/

// store genres of movie
const movieGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// store id of current movie
const currentMovie = (state = 0, action) => {
    switch (action.type) {
        case 'SET_CURRENT_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieGenres,
        currentMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
