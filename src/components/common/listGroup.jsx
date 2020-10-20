import React from "react";
const ListGroup = ({
  genres,
  textProperty,
  valueProperty,
  selectedGenre,
  onGenreSelect,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => {
        return (
          <li
            key={genre[valueProperty]}
            className={
              genre === selectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onGenreSelect(genre)}
          >
            {genre[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};
export default ListGroup;
