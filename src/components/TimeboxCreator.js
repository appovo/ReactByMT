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
        Co robisz?
        <input ref={titleInput} type="text" />
      </label>
      <br />
      <label>
        Ile minut?
        <input ref={totalTimeInMinutesInput} type="number" />
      </label>
      <br />
      <button>Dodaj timebox</button>
    </form>
  );
};

export default TimeboxCreator;
