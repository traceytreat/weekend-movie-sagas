import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddMovieForm.css';

function AddMovieForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    let [movieTitle, setMovieTitle] = useState('');
    let [moviePoster, setMoviePoster] = useState('');
    let [movieDescription, setMovieDescription] = useState('');
    let [movieGenre, setMovieGenre] = useState('0');

    const handleSubmit = () => {
        dispatch({
            type: 'ADD_MOVIE',
            payload:
            {
                title: movieTitle,
                poster: moviePoster,
                description: movieDescription,
                genre_id: Number(movieGenre)
            }
        })
        // return to main page
        history.push('/');
    }

    return (
        <section id="add-movie-form">

            <h3>Add a Movie</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="movieTitle">Name:</label>
                <input
                    id="movieTitle"
                    type="text"
                    placeholder="Movie name"
                    value={movieTitle}
                    onChange={(event) => setMovieTitle(event.target.value)}
                /><br />
                <label htmlFor="moviePoster">URL:</label>
                <input
                    id="moviePoster"
                    type="text"
                    placeholder="Poster URL"
                    value={moviePoster}
                    onChange={(event) => setMoviePoster(event.target.value)}
                /><br />
                <label htmlFor="movieDescription">Description:</label>
                <textarea
                    id="movieDescription"
                    placeholder="Movie description"
                    value={movieDescription}
                    onChange={(event) => setMovieDescription(event.target.value)}
                /><br />
                <label htmlFor="movieGenre">Genre:</label>
                <select
                    id="movieGenre"
                    value={movieGenre}
                    onChange={(event) => setMovieGenre(event.target.value)}
                >
                    <option value="0" disabled hidden>Choose genre</option>
                    <option value="1">Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Musical</option>
                    <option value="10">Romantic</option>
                    <option value="11">SciFi</option>
                    <option value="12">Space Opera</option>
                    <option value="13">Superhero</option>

                </select><br />
                <input
                    type="submit"
                    value="Add Movie"
                />
            </form>
        </section>
    );
}

export default AddMovieForm;