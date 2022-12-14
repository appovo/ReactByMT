import React from "react";

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
  if (totalTimeInMinutes <= 0) {
    throw new Error("Całkowity czas musi być większy od 0");
  }
  return (
    <div className="Timebox">
      <h3>
        {title} - {totalTimeInMinutes} min.
      </h3>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Change</button>
    </div>
  );
}

export default Timebox;
