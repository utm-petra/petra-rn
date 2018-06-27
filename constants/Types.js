export type Rock = {
  id: string,
  name: string,
  qrCode: string,
  type: string,
  lat: number,
  lon: number,
  location: string,
  mineralComposition: string,
  texture: string,
  interpretation: string,
  pics: string[]
};

export type Theme = {
  roundness: number,
  colors: {
    primary: any,
    primaryDark: any,
    primaryLight: any,
    secondary: any,
    secondaryDark: any,
    secondaryLight: any,
    accent: any,
    background: any,
    paper: any,
    error: any,
    text: any,
    disabled: any,
    placeholder: any
  },
  fonts: any
};
