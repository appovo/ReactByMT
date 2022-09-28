import React from "react";

function ReadOnlyTimebox({ title, totalTimeInMinutes }) {
  if (totalTimeInMinutes <= 0) {
    throw new Error("Całkowity czas musi być większy od 0");
  }
  return (
    <div className="Timebox">
      <h3>
        {title} - {totalTimeInMinutes} min.
      </h3>
    </div>
  );
}

export default ReadOnlyTimebox;
