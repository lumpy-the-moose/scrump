function Button(props) {
  return (
    <button
      type="button"
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

export default Button;
