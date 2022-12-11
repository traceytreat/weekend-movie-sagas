const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `SELECT * FROM genres`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500)
    })
});

// get a specific movie's genres
router.get('/:id', (req, res) => {
  const query = 
  `SELECT "genres"."name"  FROM "movies_genres"
  JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
  JOIN "movies" ON "movies"."id" = "movies_genres"."movie_id"
  WHERE "movies"."id" = $1`;
  pool.query(query, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get genres of specific movie', err);
      res.sendStatus(500)
    })

});

module.exports = router;