import { useRef } from "react";

const TimeboxEditor = ({
  initialTitle,
  initialTotalTimeInMinutes,
  onUpdate,
}) => {
  const titleInput = useRef();
  const totalTimeInMinutesInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({
      title: titleInput.current.value,
      totalTimeInMinutes: totalTimeInMinutesInput.current.value,
    });
    resetToInitialValue();
  };

  const resetToInitialValue = () => {
    titleInput.current.value = initialTitle;
    totalTimeInMinutesInput.current.value = initialTotalTimeInMinutes;
  };

  const onCancel = () => {
    resetToInitialValue();
  };

  return (
    <form onSubmit={handleSubmit} className="TimeboxEditor">
      <label>
        Co robisz?
        <input ref={titleInput} defaultValue={initialTitle} type="text" />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          ref={totalTimeInMinutesInput}
          defaultValue={initialTotalTimeInMinutes}
          type="number"
        />
      </label>
      <br />
      <button onClick={onCancel}>Anuluj</button>
      <button onClick={onUpdate}>Zapisz zmiany</button>
    </form>
  );
};

export default TimeboxEditor;
