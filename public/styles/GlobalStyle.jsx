import { createGlobalStyle, css } from 'styled-components'
import { BGColor, PColor } from '../colors'
export const scrollStyle = css`
    scrollbar-color: rgba(0, 0, 0, .5) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    &::-webkit-scrollbar {
    -webkit-appearance: none;
}

&::-webkit-scrollbar:vertical {
    width:10px;
}

&::-webkit-scrollbar-button:increment,&::-webkit-scrollbar-button {
    display: none;
} 

&::-webkit-scrollbar:horizontal {
    height: 10px;
}

&::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
}
    &::-webkit-scrollbar-track {
    border-radius: 10px;  
}

`
export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    html {
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        background-color: ${BGColor};

    }
    input::-webkit-calendar-picker-indicator{
    display: block;
    }

input[type="time"]::-webkit-input-placeholder{ 
    visibility: visible !important;
}
input[type=time] {
  border: none;
  color: #2a2c2d;
  font-size: 14px;
  font-family: helvetica;
  width: 100px;
  outline: none;
}

/* Wrapper around the hour, minute, second, and am/pm fields as well as 
the up and down buttons and the 'X' button */
input[type=time]::-webkit-datetime-edit-fields-wrapper {
  display: flex;
}

/* The space between the fields - between hour and minute, the minute and 
second, second and am/pm */
input[type=time]::-webkit-datetime-edit-text {
  padding: 19px 4px;
}

/* Hour */
input[type=time]::-webkit-datetime-edit-hour-field {
  background-color: #f2f4f5;
  border-radius: 15%;
  padding: 19px 13px;
  color: #000;
}

/* Minute */
input[type=time]::-webkit-datetime-edit-minute-field {
  background-color: #f2f4f5;
  border-radius: 15%;
  color: #000;
  padding: 19px 13px;
}

/* AM/PM */
input[type=time]::-webkit-datetime-edit-ampm-field {
  background-color:  #f2f4f5;
  border-radius: 15%;
  color: #000000;
  padding: 19px 13px;
  /* here */
  display: block;
  font-size: 20px;
}
input[type="time"]::-webkit-calendar-picker-indicator {
   filter: invert(0.5) sepia(2) saturate(5) hue-rotate(175deg);
   /* color: ${PColor}; */
   font-size: 30px;
}

/* 'X' button for resetting/clearing time */
input[type=time]::-webkit-clear-button {
  display: none;
}

/* Up/Down arrows for incrementing/decrementing the value */
/* input[   ]::-webkit-inner-spin-button {
  display: none;
} */
    body {
        margin: 0;
        transition: .3s;
        font-family: 'PFont-Regular';
        
    }
    main {
        display: block;
    }

    h1 {
        font-size: 2em;
        margin: 0.67em 0;
        word-break: break-word;

    }

    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    pre {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    a {
        background-color: transparent;
        word-break: break-word;

    }

    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        text-decoration: underline dotted;
    }

    b,
    strong {
        font-weight: bolder;
    }

    code,
    kbd,
    samp {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    small {
        font-size: 80%;
    }

    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }
    
    img {
        border-style: none;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }
    
    button,
    input {
        overflow: visible;
    }

    button,

    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
        -webkit-appearance: button;
    }

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
        outline: 1px dotted ButtonText;
    }

    fieldset {
        padding: 0.35em 0.75em 0.625em;
    }

    legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
    }

    progress {
        vertical-align: baseline;
    }

    textarea {
        overflow: auto;
    }
    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
    }
    
    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }
    input[type="checkbox"] {
        flex: 1;
        justify-content: "flex-end";
        zoom: 2;
        transform: scale(1.2);
        transform-origin: 0 0;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }

    details {
        display: block;
    }

    summary {
        display: list-item;
    }

    template {
        display: none;
    }

    [hidden] {
        display: none;
    }


`
