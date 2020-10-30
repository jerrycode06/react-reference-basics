import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "year", label: "Year" },
    { path: "cast", label: "Cast" },
    { path: "genre.name", label: "Genre" },
    { path: "rating", label: "Rating" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const currentUser = auth.getCurrentUser();
    if (currentUser && currentUser.isAdmin)
      this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
