import { createGlobalStyle } from 'styled-components';
import { getColor } from '../Common/Colors';

export const GlobalStyles = createGlobalStyle`
body {
  background-color: ${getColor('background')};
  color: ${getColor('text')};
  font-family: 'Lato', sans-serif;
}

#__next {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1,
h2,
h3,
ul,
p {
  margin: 0;
}

a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
}
`;
