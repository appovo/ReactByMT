import React from "react";
import Timebox from "./Timebox";

export function TimeboxesList({ timeboxes, onTimeBoxDelete, onTimeBoxEdit }) {
  return timeboxes.map((timebox, index) => (
    <Timebox
      key={timebox.id}
      title={timebox.title}
      totalTimeInMinutes={timebox.totalTimeInMinutes}
      onDelete={() => onTimeBoxDelete(index)}
      onEdit={() =>
        onTimeBoxEdit(index, {
          ...timebox,
          title: "Updated timebox",
        })
      }
    />
  ));
}
