import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset}
  
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }


  body {
    color: #595959;
    font-size: 1.4rem;
    line-height: 2.2rem;
  }

  h1, h2, h3 {
    text-align: center;
  }


  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  h4 {
    font-size: 1.4rem; 
    margin-bottom: 1.1rem;
  }
  
  a {
    text-decoration: none;
  }
  
  .MuiTextField-root {
    width: 100%;
  }
  
  .MuiMenuItem-root {
    font-size: 1.4rem;
    justify-content: center;
  }
  
  .MuiInputBase-multiline {
  line-height: 2.2rem
  }

  .MuiTableCell-root {
    font-size: 1.2rem;
    &.MuiTableCell-head  {
      font-size: 1.4rem;
      font-weight: 800;
    }
  }

  .MuiSnackbar-root {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
  }
  
  .MuiSnackbarContent-message {
    font-size: 1.4rem;
  }
`;

export const theme = {
  color: {
    primary: "#8C7B6B",
    secondary: "#D8C2AF",
    background: "#FFFFFF",
    subHeading: "#999999",
    text: "#595959",
    error: "red"
  },
  text: {
    fontSize: {
      small: "1.2rem",
      normal: "1.4rem",
      bigger: "1.8rem",
      big: "2.6rem"
    },
    lineHeight: {
      small: "1.8rem",
      normal: "2.1rem",
      bigger: "2.7rem",
      big: "3.9rem"
    }
  },
  breakpoints: {
    xs: "599px",
    sm: "959px",
    md: "1279px",
    lg: "1919px"
  }
};
