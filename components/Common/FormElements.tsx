import {
  StyledForm,
  StyledInput,
  StyledButton,
} from '../Styled/FormElements.styled';

export const Form: React.FC<{
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}> = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export const Input: React.FC<{
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}> = ({ placeholder, onChange, value }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    ></StyledInput>
  );
};

export interface ButtonProps {
  type?: 'button' | 'reset' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onTouchStart?: React.TouchEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  text?: string;
  display?: string;
  width: string;
  height: string;
  mobileWidth?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  onTouchStart,
  disabled,
  text,
  display,
  width,
  height,
  mobileWidth,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      onTouchStart={onTouchStart}
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
