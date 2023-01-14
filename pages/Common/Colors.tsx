interface Colors {
  accent: string;
  background: string;
  text: string;
  green: string;
  grey: string;
  teal: string;
}

const colors: Colors = {
  accent: '#ff8888',
  background: '#eef0f5',
  text: '#686868',
  green: '#66dbb1',
  grey: '#cccccc',
  teal: '#41d9e2',
};

export const getColor = (color: keyof Colors): string => {
  return colors[color];
};
