import React, { useState } from "react";

import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

function EditableCurrentTimebox() {
  const [title, setTitle] = useState("Używam useState");
  const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(3);
  const [isEditable, setIsEditable] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleTotalTimeInMinutesChange = (event) => {
    setTotalTimeInMinutes(event.target.value);
  };
  const handleConfirm = () => {
    setIsEditable(false);
  };
  const handleEdit = () => {
    setIsEditable(true);
  };
  return (
    <>
      <React.StrictMode>
        {isEditable ? (
          <TimeboxEditor
            title={title}
            totalTimeInMinutes={totalTimeInMinutes}
            isEditable={isEditable}
            onConfirm={handleConfirm}
            onTitleChange={handleTitleChange}
            onTotalTimeInMinutesChange={handleTotalTimeInMinutesChange}
          />
        ) : (
          <CurrentTimebox
            isEditable={isEditable}
            title={title}
            totalTimeInMinutes={totalTimeInMinutes}
            onEdit={handleEdit}
          />
        )}
      </React.StrictMode>
    </>
  );
}

export default EditableCurrentTimebox;
