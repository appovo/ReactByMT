import { useRef } from "react";

const TimeboxCreator = ({ onCreate }) => {
  const titleInput = useRef();
  const totalTimeInMinutesInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({
      title: titleInput.current.value,
      totalTimeInMinutes: totalTimeInMinutesInput.current.value,
    });
    titleInput.current.value = "";
    totalTimeInMinutesInput.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="TimeboxCreator">
      <label>
        Activity:
        <input ref={titleInput} type="text" />
      </label>
      <br />
      <label>
        Time:
        <input ref={totalTimeInMinutesInput} type="number" />
      </label>
      <br />
      <button>Add timebox</button>
    </form>
  );
};

export default TimeboxCreator;
