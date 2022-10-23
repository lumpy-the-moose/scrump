function Radio(props) {
  return (
    <>
      <input
        type="radio"
        className={props.inputClassName}
        name={props.name}
        id={props.value}
        value={props.value}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
        disabled={props.disabled}
      ></input>
      <label htmlFor={props.value} className={props.labelClassName}>
        {props.text}
      </label>
    </>
  );
}

export default Radio;
