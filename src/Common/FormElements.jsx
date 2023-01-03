import {
  StyledForm,
  StyledInput,
  StyledButton,
} from '../Styled/FormElements.styled';

export const Form = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export const Input = ({ placeholder, onChange, value }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      autoFocus
    ></StyledInput>
  );
};

export const Button = ({
  onClick,
  disabled,
  text,
  display,
  width,
  height,
  mobileWidth,
}) => {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      disabled={disabled}
      display={display}
      width={width}
      height={height}
      mobileWidth={mobileWidth}
    >
      {text}
    </StyledButton>
  );
};
