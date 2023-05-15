const express = require("express");

const app = express();
const port = 3000;

///we also have to add the json parser using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


let movies = [
    {
        id: '1',
        title: 'Inception',
        director: "Christopher Nolan",
        release_date: '2010-07-16',
    },
    {
        id: '2',
        title: 'The Irishman',
        director: "Martin Scorsese",
        release_date: '2019-09-27',
    },
];



//add movies to the list
app.post("/movie", (req, res) => {
    const movie = req.body
    console.log(movie)
    movies.push(movie)
    res.send("Movie is added to the list");
})



///search a movie in the list(use appropriate url formatting to find the movie)

app.get("/movie/:id", (req, res) => {
    const id = req.params.id
    for (let movie of movies) {
        if (movie.id === id) {
            res.json(movie);
            console.log(movie);
            return;
        }
    }
    res.status(400).send("Movie not found");
})




////delete a record in an array

app.delete("/movie/:id",(req,res)=>{
    const id=req.params.id///this is the client side we choose the record to be deleted and id is stored in the id variable
    movies=movies.filter(movie=>{
        if(movie.id !==id)
        {
            return true;
        }
        return false
    })
    res.send("movie is deleted");
})



///this is to get movies from the json file
app.get("/movie", (req, res) => {
    res.json(movies);
});

app.listen(port, () => console.log(`Server listening at port ${port} `));