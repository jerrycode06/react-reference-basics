import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: " ", year: " ", genreID: " ", rating: " " },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    year: Joi.number().integer().required().label("Year"),
    genreID: Joi.string().required().label("Genre"),
    rating: Joi.number().required().min(0).max(10).label("Rating"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieID = this.props.match.params.id;
      if (movieID === "new") return;
      const { data: movie } = await getMovie(movieID);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (err) {
      if (err.response && err.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreID: movie.genre._id,
      year: movie.year,
      rating: movie.rating,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("year", "Year")}
          {this.renderSelect("genreID", "Genre", this.state.genres)}
          {this.renderInput("rating", "Rating")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
