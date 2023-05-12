/* eslint-disable react/prop-types */
/* eslint-disable indent */
import { BColor, NorthTexasGreen, PColor } from 'public/colors'

export const IconLove = ({ size, style }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 36 32'
    width={size}
  ><path d='M30.4 16q1.5-1.3 2-2.6t.6-3q0-1.4-.7-3T30.6 5q-1.4-1.2-2.4-1.6T25.8 3q-1.5 0-3 .6t-2.6 2l-2 2-2.3-2q-1.8-1.4-3-2T10.2 3t-2.6.4T5.3 5q-1 .7-1.6 2.4t-.7 3q0 1.4.6 3T5.4 16L18 28l12.4-12zM0 10.5q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.7t3.6-.7q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1 16 .4 13.7T0 10.4z'></path></svg>
}
// Icono de Flecha hacia arriba
export const IconArrowTop = ({ size, style = {}, color }) => {
  return <svg
    height={size}
    style={style}
    version='1.1'
    viewBox='0 0 330 330'
    width={size}
    x='0px'
    xmlns='http://www.w3.org/2000/svg'
    y='0px'
  >
    <path
      d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
      fill={color}
    />
  </svg>
}

// Icono de Flecha hacia derecha
export const IconArrowR = ({ size, style = {}, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 492.004 492.004'
    width={size}
    x='0px'
    y='0px'
  ><path d='M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z' fill={color} /></svg>
}

// Icon de X de cerrar con circulo sin relleno
export const IconCancel = ({ style = {}, size, color }) => {
  return <svg
    fill={color || '#717171'}
    height={size}
    style={style}
    viewBox='0 0 32 32'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      height={20.36}
      rx={1.13}
      transform='rotate(-45 8 9.6)'
      width={2.26}
      x={8}
      y={9.6}
    />
    <rect
      height={20.36}
      rx={1.13}
      transform='rotate(45 22.4 8)'
      width={2.26}
      x={22.4}
      y={8}
    />
  </svg>
}

// Icono Facebook
export const IconFacebook = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 511 511.9'
    width={size}
    x='0px'
    y='0px'
  ><path d='M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h192V336h-64v-80h64v-64c0-53.024,42.976-96,96-96h64v80h-32c-17.664,0-32-1.664-32,16v64h80l-32,80h-48v176h96c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z' fill={color} /></svg>
}
export const IconLogo = ({ style = {}, color, size }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 80 43'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M0 24.258h6.09L9.498 7.472h-6.09L0 24.258zM3.947 4.836h6.087L11.016 0H4.922l-.975 4.836zM8.498 28.985h6.09l3.695-18.167h4.444l.7-3.346h-4.482l.154-.776c.286-1.431.751-3.096 3.047-3.096 1.361 0 2.665.148 3.93.68L26.77.744A13.22 13.22 0 0 0 22.381 0c-4.894 0-8.265 2.914-9.499 7.472h-2.114l-.662 3.346h2.084L8.498 28.985z'></path><path d='M27.79 24.633c7.19 0 12.18-6.569 12.18-11.927 0-3.902-3.688-5.608-7.195-5.608-7.89 0-12.183 7.063-12.183 11.927 0 3.902 3.726 5.608 7.198 5.608zM47 24.633c7.192 0 12.181-6.569 12.181-11.927 0-3.902-3.696-5.608-7.199-5.608-7.886 0-12.186 7.063-12.186 11.927 0 3.902 3.73 5.608 7.202 5.608M69.082 24.258h6.055L80 .374h-6.09l-1.451 7.097a12.51 12.51 0 0 0-2.46-.281c-5.966 0-11.391 7.588-11.391 13.011 0 2.231 1.45 4.43 3.912 4.43 3.5 0 5.921-1.712 6.932-3.317h.378l-.748 2.944zM50.322 36.91c-4.454 3.792-10.408 5.739-16.879 5.337-8.16-.502-13.816-6.82-14.954-13.227h.387c1.836 4.091 6.304 7.869 11.911 8.49 5.475.604 12.184-1.87 15.866-5.402l-4.13-3.124 12.263.036-2.639 12.983-1.825-5.093z'></path></svg>
}

export const IconInstagram = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 511 511.9'
    width={size}
    x='0px'
    y='0px'
  ><path d='M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h192V336h-64v-80h64v-64c0-53.024,42.976-96,96-96h64v80h-32c-17.664,0-32-1.664-32,16v64h80l-32,80h-48v176h96c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z' fill={color} /></svg>
}

// Icon logo tipo
// Icon logo Home
export const IconHome = ({ style = {}, color, size }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 1 511 511.999'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='m498.699219 222.695312c-.015625-.011718-.027344-.027343-.039063-.039062l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.808594-33.328126-13.808594-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.144532.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.441406 13.234375 31.273437 13.746093.484375.046876.96875.070313 1.457031.070313h8.320313v153.695313c0 30.417968 24.75 55.164062 55.167969 55.164062h81.710937c8.285157 0 15-6.71875 15-15v-120.5c0-13.878906 11.292969-25.167969 25.171875-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.28125 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.164062v-153.695313h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.8125 18.359375-18.367187 18.367187-48.253906.027344-66.632813zm-21.242188 45.421876c-3.238281 3.238281-7.542969 5.023437-12.117187 5.023437h-22.71875c-8.285156 0-15 6.714844-15 15v168.695313c0 13.875-11.289063 25.164062-25.167969 25.164062h-66.710937v-105.5c0-30.417969-24.746094-55.167969-55.167969-55.167969h-48.195313c-30.421875 0-55.171875 24.75-55.171875 55.167969v105.5h-66.710937c-13.875 0-25.167969-11.289062-25.167969-25.164062v-168.695313c0-8.285156-6.714844-15-15-15h-22.328125c-.234375-.015625-.464844-.027344-.703125-.03125-4.46875-.078125-8.660156-1.851563-11.800781-4.996094-6.679688-6.679687-6.679688-17.550781 0-24.234375.003906 0 .003906-.003906.007812-.007812l.011719-.011719 208.847656-208.839844c3.234375-3.238281 7.535157-5.019531 12.113281-5.019531 4.574219 0 8.875 1.78125 12.113282 5.019531l208.800781 208.796875c.03125.03125.066406.0625.097656.09375 6.644531 6.691406 6.632813 17.539063-.03125 24.207032zm0 0' /></svg>
}
// Icono  de Youtube
export const IconYoutube = ({ style = {}, size, color, color2 }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 -77 512.00213 512'
    width={size}
    x='0px'
    y='0px'
  ><path d='m501.453125 56.09375c-5.902344-21.933594-23.195313-39.222656-45.125-45.128906-40.066406-10.964844-200.332031-10.964844-200.332031-10.964844s-160.261719 0-200.328125 10.546875c-21.507813 5.902344-39.222657 23.617187-45.125 45.546875-10.542969 40.0625-10.542969 123.148438-10.542969 123.148438s0 83.503906 10.542969 123.148437c5.90625 21.929687 23.195312 39.222656 45.128906 45.128906 40.484375 10.964844 200.328125 10.964844 200.328125 10.964844s160.261719 0 200.328125-10.546875c21.933594-5.902344 39.222656-23.195312 45.128906-45.125 10.542969-40.066406 10.542969-123.148438 10.542969-123.148438s.421875-83.507812-10.546875-123.570312zm0 0' fill={color} /><path d='m204.96875 256 133.269531-76.757812-133.269531-76.757813zm0 0' fill={color2} /></svg>
}
export const IconCopy = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    id='Layer_1'
    style={style}
    version='1.1'
    viewBox='0 0 115.77 122.88'
    width={size}
    x='0px'
    xmlns='http://www.w3.org/2000/svg'
    y='0px'
  ><path d='M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z' fill={color} /></svg>
}
// Icono  de Youtube
// export const IconPay = ({ style = {}, size, color, color2 }) => <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 251.95 255.32"><defs><style>.cls-1,.cls-3{fill:none;}.cls-1,.cls-2,.cls-3{stroke:#000;strokeWidth:10px;}.cls-1,.cls-2{strokeMiterlimit:10;}.cls-2{fill:#fff;}.cls-3{strokeLinecap:round;strokeLinejoin:round;}</style></defs><rect className="cls-1" x="524" y="319" width="200" height="154" rx="12" transform="translate(-585.72 -73.95) rotate(-18.28)"/><rect className="cls-2" x="5" y="96.32" width="200" height="154" rx="12"/><rect className="cls-1" x="29" y="121.32" width="63" height="44" rx="12"/><line className="cls-3" x1="143" y1="127.32" x2="180" y2="128.32"/><line className="cls-3" x1="143" y1="158.32" x2="180" y2="159.32"/><line className="cls-3" x1="27" y1="188.32" x2="54" y2="189.32"/><line className="cls-3" x1="79" y1="188.32" x2="106" y2="189.32"/><line className="cls-3" x1="120" y1="188.32" x2="147" y2="189.32"/><line className="cls-3" x1="29" y1="219.32" x2="90" y2="220.32"/><line className="cls-3" x1="30" y1="95.32" x2="215" y2="43.32"/><line className="cls-3" x1="129" y1="96.32" x2="221" y2="73.32"/></svg>
export const IconPay = ({ style = {}, size, color }) => {
  return <svg
    data-name='Capa 1'
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 247.95 252.32'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M-469.56,140.11l-4.78-14.46a12,12,0,0,1,7.63-15.16L-299.6,55.28a12,12,0,0,1,15.16,7.63l40.78,123.44a12,12,0,0,1-7.63,15.16l-27.62,9.12'
      fill='none'
      stroke={color || '#000'}
      strokeWidth='10px'
      transform='translate(486 -49.68)'
  /><rect
      fill='none'
      height='154'
      rx='12'
      stroke={color || '#000'}
      strokeWidth='10px'
      width='200'
      x='5'
      y='93.32'
  /><rect
      fill='none'
      height='44'
      rx='12'
      stroke={color || '#000'}
      strokeWidth='10px'
      width='63'
      x='29'
      y='118.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='143'
      x2='180'
      y1='124.32'
      y2='125.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='143'
      x2='180'
      y1='155.32'
      y2='156.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='27'
      x2='54'
      y1='185.32'
      y2='186.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='79'
      x2='106'
      y1='185.32'
      y2='186.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='120'
      x2='147'
      y1='185.32'
      y2='186.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='29'
      x2='90'
      y1='216.32'
      y2='217.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='30'
      x2='208'
      y1='92.32'
      y2='42.32'
  /><line
      fill='none'
      stroke={color || '#000'}
      strokeLinecap='round'
      strokeWidth='10px'
      x1='129'
      x2='219'
      y1='93.32'
      y2='70.32'
  /></svg>
}// Icono de Log Out / cerrar sesión
export const IconCheck = ({ style = {}, size, color }) => {
  return <svg
    data-name='Capa 1'
    fill={color}
    height={size}
    id='Capa_1'
    style={style}
    viewBox='0 0 188 147'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><polyline
      fill='none'
      points='183 5 68 142 66 142 5 77'
      stroke='#000'
      strokeLinecap='round'
      strokeMiterlimit='10'
      strokeWidth='12px'
  /></svg>
}
export const IconDelTag = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    width={size}
  ><path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'></path></svg>
}
export const IconLogout = ({ size, color }) => {
  return <svg
    height={size}
    version='1.1'
    viewBox='0 0 512 512'
    width={size}
    x='0px'
    xmlSpace='preserve'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    y='0px'
  >
    <g>
      <g>
        <path d='M255.15,468.625H63.787c-11.737,0-21.262-9.526-21.262-21.262V64.638c0-11.737,9.526-21.262,21.262-21.262H255.15 c11.758,0,21.262-9.504,21.262-21.262S266.908,0.85,255.15,0.85H63.787C28.619,0.85,0,29.47,0,64.638v382.724 c0,35.168,28.619,63.787,63.787,63.787H255.15c11.758,0,21.262-9.504,21.262-21.262 C276.412,478.129,266.908,468.625,255.15,468.625z' fill={color} />
      </g>
    </g>
    <g>
      <g>
        <path d='M505.664,240.861L376.388,113.286c-8.335-8.25-21.815-8.143-30.065,0.213s-8.165,21.815,0.213,30.065l92.385,91.173H191.362c-11.758,0-21.262,9.504-21.262,21.262c0,11.758,9.504,21.263,21.262,21.263h247.559l-92.385,91.173c-8.377,8.25-8.441,21.709-0.213,30.065c4.167,4.21,9.653,6.336,15.139,6.336c5.401,0,10.801-2.041,14.926-6.124l129.276-127.575c4.04-3.997,6.336-9.441,6.336-15.139C512,250.302,509.725,244.88,505.664,240.861z' fill={color} />
      </g>
    </g>
  </svg>
}

// Icono Banner Derecho
export const IconArrowRight = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 22.893 45.908'
    width={size}
    x='0px'
    y='0px'
  >
    <path
      d='M1365.5,348.848l21.837-22.686L1365.5,303.635'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='bevel'
      strokeWidth='3px'
      transform='translate(-1365.14 -303.287)'
    />
  </svg>
}
/* Icono De Flecha derecha del banner */
export const IconArrowLeft = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 22.893 45.908'
    width={size}
    x='0px'
    y='0px'
  >
    <path
      d='M1365.5,348.848l21.837-22.686L1365.5,303.635'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='bevel'
      strokeWidth='2px'
      transform='translate(1388.033 349.194) rotate(180)'
    />
  </svg>
}

/* Icono de WhatsApp */
export const IconWhatsApp = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='-23 -21 682 682.66669'
    width={size}
    x='0px'
    y='0px'
  ><path
      d='m544.386719 93.007812c-59.875-59.945312-139.503907-92.9726558-224.335938-93.007812-174.804687 0-317.070312 142.261719-317.140625 317.113281-.023437 55.894531 14.578125 110.457031 42.332032 158.550781l-44.992188 164.335938 168.121094-44.101562c46.324218 25.269531 98.476562 38.585937 151.550781 38.601562h.132813c174.785156 0 317.066406-142.273438 317.132812-317.132812.035156-84.742188-32.921875-164.417969-92.800781-224.359376zm-224.335938 487.933594h-.109375c-47.296875-.019531-93.683594-12.730468-134.160156-36.742187l-9.621094-5.714844-99.765625 26.171875 26.628907-97.269531-6.269532-9.972657c-26.386718-41.96875-40.320312-90.476562-40.296875-140.28125.054688-145.332031 118.304688-263.570312 263.699219-263.570312 70.40625.023438 136.589844 27.476562 186.355469 77.300781s77.15625 116.050781 77.132812 186.484375c-.0625 145.34375-118.304687 263.59375-263.59375 263.59375zm144.585938-197.417968c-7.921875-3.96875-46.882813-23.132813-54.148438-25.78125-7.257812-2.644532-12.546875-3.960938-17.824219 3.96875-5.285156 7.929687-20.46875 25.78125-25.09375 31.066406-4.625 5.289062-9.242187 5.953125-17.167968 1.984375-7.925782-3.964844-33.457032-12.335938-63.726563-39.332031-23.554687-21.011719-39.457031-46.960938-44.082031-54.890626-4.617188-7.9375-.039062-11.8125 3.476562-16.171874 8.578126-10.652344 17.167969-21.820313 19.808594-27.105469 2.644532-5.289063 1.320313-9.917969-.664062-13.882813-1.976563-3.964844-17.824219-42.96875-24.425782-58.839844-6.4375-15.445312-12.964843-13.359374-17.832031-13.601562-4.617187-.230469-9.902343-.277344-15.1875-.277344-5.28125 0-13.867187 1.980469-21.132812 9.917969-7.261719 7.933594-27.730469 27.101563-27.730469 66.105469s28.394531 76.683594 32.355469 81.972656c3.960937 5.289062 55.878906 85.328125 135.367187 119.648438 18.90625 8.171874 33.664063 13.042968 45.175782 16.695312 18.984374 6.03125 36.253906 5.179688 49.910156 3.140625 15.226562-2.277344 46.878906-19.171875 53.488281-37.679687 6.601563-18.511719 6.601563-34.375 4.617187-37.683594-1.976562-3.304688-7.261718-5.285156-15.183593-9.253906zm0 0'
      fill={color}
      fillRule='evenodd'
  /></svg>
}

// Icono de IconInstagramGradient
export const IconInstagramGradient = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 512 512'
    width={size}
    x='0px'
    y='0px'
  ><linearGradient
      gradientTransform='matrix(32 0 0 -32 1519 20757)'
      gradientUnits='userSpaceOnUse'
      id='SVGID_1_'
      x1='-46.0041'
      x2='-32.9334'
      y1='634.1208'
      y2='647.1917'
  > <stop offset='0' stopColor='#FFC107' /> <stop offset='0.507' stopColor='#F44336' /><stop offset='0.99' stopColor='#9C27B0' /></linearGradient><path d='M352,0H160C71.648,0,0,71.648,0,160v192c0,88.352,71.648,160,160,160h192c88.352,0,160-71.648,160-160V160C512,71.648,440.352,0,352,0z M464,352c0,61.76-50.24,112-112,112H160c-61.76,0-112-50.24-112-112V160C48,98.24,98.24,48,160,48h192c61.76,0,112,50.24,112,112V352z' fill='url(#SVGID_1_)' /><linearGradient
      gradientTransform='matrix(32 0 0 -32 1519 20757)'
      gradientUnits='userSpaceOnUse'
      id='SVGID_2_'
      x1='-42.2971'
      x2='-36.6404'
      y1='637.8279'
      y2='643.4846'
  ><stop offset='0' stopColor='#FFC107' /><stop offset='0.507' stopColor='#F44336' /><stop offset='0.99' stopColor='#9C27B0' /></linearGradient><path d='M256,128c-70.688,0-128,57.312-128,128s57.312,128,128,128s128-57.312,128-128S326.688,128,256,128z M256,336c-44.096,0-80-35.904-80-80c0-44.128,35.904-80,80-80s80,35.872,80,80C336,300.096,300.096,336,256,336z' fill='url(#SVGID_2_)' /><linearGradient
      gradientTransform='matrix(32 0 0 -32 1519 20757)'
      gradientUnits='userSpaceOnUse'
      id='SVGID_3_'
      x1='-35.5456'
      x2='-34.7919'
      y1='644.5793'
      y2='645.3331'
  ><stop offset='0' stopColor='#FFC107' /><stop offset='0.507' stopColor='#F44336' /><stop offset='0.99' stopColor='#9C27B0' /></linearGradient><circle
      cx='393.6'
      cy='118.4'
      fill='url(#SVGID_3_)'
      r='17.056'
  /></svg>
}
// Icono de IconUser

export const IconUser = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M12 12.5C9 12.5 6.5 10 6.5 7S9 1.5 12 1.5 17.5 4 17.5 7 15 12.5 12 12.5zM12 3C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM17 15.5c1.4 0 2.5 1.1 2.5 2.5v2.5h-15V18c0-1.4 1.1-2.5 2.5-2.5h10m0-1.5H7c-2.2 0-4 1.8-4 4v4h18v-4c0-2.2-1.8-4-4-4z'></path></svg>
}
// Icono  de Tres AddPlusCircle
export const IconSales = ({ style = {}, size, color }) => {
  return <svg
    fill='none'
    height={size}
    stroke={color || PColor}
    style={style}
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M8.14096 8.00024C6.71925 8.00024 5.49276 8.99817 5.20365 10.3902L3.99972 16.1868C3.48396 18.6701 5.37989 21.0002 7.91614 21.0002H16.0839C18.6201 21.0002 20.516 18.6701 20.0003 16.1868L18.7964 10.3902C18.5073 8.99818 17.2808 8.00024 15.8591 8.00024H8.14096Z'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
  ></path><path
      d='M15 6V6C15 4.34315 13.6569 3 12 3V3C10.3431 3 9 4.34315 9 6V6'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
  ></path></svg>
}
export const AddPlusCircle = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 27 27'
    width={size}
    x='0px'
    y='0px'
  >
    <circle
      cx='13.5'
      cy='13.5'
      fill='#e4e4e4'
      r='13.5'
    /><circle
      cx='8.5'
      cy='8.5'
      fill={color}
      r='8.5'
      transform='translate(5,5)'
    /><line
      fill='none'
      stroke='#fff'
      strokeWidth='3px'
      transform='translate(9.517 13.5)'
      x2='8.494'
    />
    <line
      fill='none'
      stroke='#fff'
      strokeWidth='3px'
      transform='translate(13.606 9.096)'
      y2='8.809'
    /></svg>
}

export const IconShopping = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    fillRule='evenodd'
    height={size}
    style={style}
    viewBox='0 0 18 23'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M8.7.2c-1.1 0-2 .3-2.6.9-.6.6-1 1.4-1.2 2.2-.2.6-.3 1.1-.3 1.7H2C.9 5 0 5.9 0 7l.1 13c0 1.7 1.3 3 3 3H15c1.7 0 3-1.3 3-3V7c0-1.1-.9-2-2-2h-3.2c-.1-.6-.1-1.1-.3-1.6-.2-.8-.6-1.7-1.2-2.2-.7-.6-1.5-1-2.6-1zm2.7 6.3v2.6c0 .4.3.7.8.7.4 0 .7-.3.7-.8v-.8-1.8H16c.3 0 .5.2.5.5l-.1 13c0 .8-.7 1.5-1.5 1.5H3.1c-.8 0-1.5-.7-1.5-1.5L1.5 7c0-.3.2-.5.5-.5h2.5v2.6c0 .4.3.8.7.8.4 0 .8-.4.8-.8v-.8-1.8h5.4zM11.3 5c0-.4-.1-.8-.2-1.2-.2-.7-.4-1.2-.8-1.5-.4-.3-.8-.5-1.6-.5s-1.3.2-1.6.5c-.4.3-.6.8-.8 1.5-.1.4-.2.8-.2 1.2h5.2z'></path></svg>
}
export const IconHorario = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 23 23'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle
      cx='11.5'
      cy='11.5'
      fill='none'
      r='10.5'
      stroke={color || '#5e5f5f'}
      strokeMiterlimit='10'
      strokeWidth='2px'
    />
    <polyline
      fill={color || '#5e5f5f'}
      points='11 7 11 12.57 15.69 12.57'
      stroke={color || '#5e5f5f'}
      strokeMiterlimit='10'
    />
  </svg>
}

export const IconSearch = ({ style = {}, size, color, props }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 16.39 16.23'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  ><circle
      cx='6.91'
      cy='6.91'
      fill='none'
      r='6.41'
      stroke={color}
  /><rect
      fill='none'
      height='0.54'
      rx='0.22'
      stroke={color}
      strokeMiterlimit='10'
      transform='translate(45.89 33.02) rotate(42.94)'
      width='5.71'
      x='-39.59'
      y='7.49'
  /></svg>
}
// Icon de Arrow
export const IconArrowBottom = ({ style = {}, color, size }) => {
  return <svg
    color={color}
    height={size}
    style={style}
    version='1.1'
    viewBox='0 0 129 129'
    width={size}
  >
    <path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill={color} />
  </svg>
}

export const IconDownload = ({ style = {}, size, color }) => {
  return (<svg
    fill={color}
    height={size}
    stroke={color}
    style={style}
    viewBox='0 0 329.89 306.05'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
d='M164.93 306c-34.49 0-68.98.04-103.47-.01-30.36-.04-54.81-20.26-60.38-50.06-.86-4.63-.94-9.44-.99-14.17-.13-12.24-.11-24.49-.01-36.74.06-6.42 4.26-11.37 10.02-12.24 5.92-.89 11.39 2.29 13.25 7.97.57 1.73.66 3.67.67 5.52.06 12.37.01 24.74.03 37.11.04 23.06 15.55 38.61 38.53 38.61 68.23.01 136.46.01 204.69 0 22.99 0 38.49-15.54 38.54-38.61.02-12.5-.02-24.99.01-37.49.02-8.06 4.81-13.28 12.04-13.23 6.97.05 11.96 5.38 11.92 13.09-.08 15.49.58 31.05-.67 46.45-2.42 29.89-28.42 53.5-58.47 53.71-35.24.25-70.48.06-105.72.06.01.01.01.02.01.03z'
fill={color}
stroke={color}
    />
    <path
d='M152.93 189.09v-4.07c0-56.73 0-113.46.01-170.19 0-1.62-.09-3.27.17-4.86 1.01-6.05 6.54-10.35 12.63-9.94 5.9.39 10.72 5.21 11.14 11.21.1 1.37.04 2.75.04 4.12v174.81c1.45-1.36 2.4-2.21 3.3-3.1 14.49-14.49 28.94-29.02 43.49-43.45 7.01-6.95 18.13-4.04 20.39 5.26 1.17 4.81-.58 8.73-4.03 12.17-20.09 20.02-40.13 40.1-60.19 60.15-2.03 2.03-4.03 4.1-6.11 6.08-5.55 5.26-12.29 5.35-17.67 0-22.58-22.49-45.1-45.02-67.6-67.59-5.2-5.21-5.36-12.58-.6-17.41 4.87-4.95 12.29-4.77 17.68.59 14.62 14.54 29.18 29.13 43.74 43.74.95.95 1.61 2.2 2.4 3.31.41-.28.81-.56 1.21-.83z'
fill={color}
stroke={color}
    />
  </svg>
)}

// Icon de Google full color
export const IconGoogleFullColor = ({ size }) => {
  return <svg
    height={size}
    version='1.1'
    viewBox='0 0 256 262'
    width={size}
  >
    <path d='M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451' fill='#4285F4'></path>
    <path d='M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1' fill='#34A853'></path>
    <path d='M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37' fill='#FBBC05'></path>
    <path d='M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479' fill='#EB4335'></path>
  </svg>
}
export const IconMessageMain = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 28 28'
    width={size}
  ><path d='M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z'></path></svg>
}

// Icon de Arrow
export const IconCategories = ({ size }) => {
  return <svg
    height={size}
    viewBox='0 0 269.71 271.12'
    width={size}
  >
    <path
      d='M1069.19,337c-2,9.92-4.62,21.82-7.77,35.92a24.79,24.79,0,0,1-4.28,9.7,19.77,19.77,0,0,1-1.78,2.11L997,439.6'
      fill='none'
      stroke='red'
      strokeMiterlimit='1'
      strokeWidth='7px'
      transform='translate(-802.91 -175.1)'
    />
    <rect
      fill='none'
      stroke='red'
      strokeMiterlimit='1'
      strokeWidth='7px'
    />
    <path
      d='M954,439,897.87,379.2a12,12,0,0,1,.52-17l73.28-68.89a26,26,0,0,1,2.21-1.65,29,29,0,0,1,12-4.4c44.51-6.5,66.76-9.75,72.71-3.52,6.86,7.17,1.81,29.78-8.3,75a24.72,24.72,0,0,1-4.27,9.7,22.25,22.25,0,0,1-1.78,2.11L971,439.48A12,12,0,0,1,954,439Z'
      fill='none'
      stroke='red'
      strokeMiterlimit='1'
      strokeWidth='7px'
      transform='translate(-802.91 -175.1)'
    />
    <circle
      cx='221.37'
      cy='140.22'
      fill='none'
      r='10.76'
      stroke='red'
      strokeMiterlimit='10'
      strokeWidth='5px'
    />
  </svg>
}
// Icon de Google full color
export const IconSendMessage = ({ size, color }) => {
  return <svg
    height={size}
    viewBox='0 0 47.02 39.35'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><defs></defs><title>Asset 8</title><g data-name='Layer 2' id='Layer_2'><g data-name='Layer 2' id='Layer_2-2'><path
      d='M45.84,1.13,17.26,26.45l12.08,3.14a1,1,0,0,0,1.17-.51L46,1.26A.1.1,0,0,0,45.84,1.13Z'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1px'
  /><path
      d='M9.62,23.15l-7.83-2a1,1,0,0,1-.15-2L45.62,1a.06.06,0,0,1,.05.11l-36.05,22,4.86,14.57a1,1,0,0,0,2-.31l.79-11'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1px'
  /><line
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1px'
      x1='16.06'
      x2='23.65'
      y1='38.35'
      y2='28.11'
  /></g></g></svg>
}
// Icon de Google full color
export const IconSendMessageTwo = ({ size }) => {
  return <svg
    height={size}
    viewBox='0 0 24 24'
    width={size}
  ><path
      d='M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z'
      fill='#0080ff'
      fillRule='evenodd'
      stroke='none'
  ></path></svg>
}
// Icono  de Ubicación
export const IconEnterLocation = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 16.045 22.389'
    width={size}
    x='0px'
    y='0px'
  ><g transform='translate(-309.47 -48.69)'><path
      d='M325.015,56.713c0,4.155-7.523,13.565-7.523,13.565s-7.522-9.41-7.522-13.565a7.523,7.523,0,1,1,15.045,0Z'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeMiterlimit='10'
  /><circle
      cx='3.479'
      cy='3.479'
      fill='none'
      r='3.479'
      stroke={color}
      strokeLinecap='round'
      strokeMiterlimit='10'
      transform='translate(314.013 53.293)'
  /></g></svg>
}
export const IconRate = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 122.8 116.7'
    width={size}
    x='0px'
    y='0px'
  >
    <polygon fill={color} points='61.4,0 80.3,38.4 122.8,44.6 92.1,74.5 99.3,116.7 61.4,96.8 23.4,116.7 30.7,74.5 0,44.6 42.4,38.4 ' />
  </svg>
}

export const IconInfo = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 34 34'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M15.333 21.999h3.333v3.333h-3.333v-3.333zm0-13.334h3.333v10h-3.333v-10zm1.65-8.333C7.783.332.333 7.799.333 16.999c0 9.2 7.45 16.666 16.65 16.666C26.2 33.665 33.666 26.2 33.666 17S26.2.332 16.983.332zm.017 30c-7.367 0-13.334-5.967-13.334-13.333C3.666 9.632 9.633 3.665 17 3.665c7.366 0 13.333 5.967 13.333 13.334 0 7.366-5.967 13.333-13.333 13.333z'></path></svg>
}

export const IconEdit = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 22 22'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M20.76 1.24a4.25 4.25 0 0 0-6.012 0l-.487.488L2.658 13.33a.854.854 0 0 0-.188.3c0 .01-.012.01-.012.021L.045 20.904a.83.83 0 0 0 1.052 1.052l7.252-2.413c.01 0 .01-.011.022-.011.11-.045.21-.1.299-.189l3.1-3.1a.835.835 0 0 0 0-1.173.835.835 0 0 0-1.174 0l-2.513 2.513-3.665-3.665 10.43-10.43 1.827 1.827 1.827 1.827-4.23 4.23a.836.836 0 0 0 0 1.173.835.835 0 0 0 1.174 0l4.816-4.816.487-.487a4.23 4.23 0 0 0 1.24-3A4.174 4.174 0 0 0 20.76 1.24zm-1.173 1.174c.487.488.753 1.14.753 1.827 0 .642-.233 1.251-.654 1.727L17.86 4.142l-1.827-1.827a2.591 2.591 0 0 1 3.554.1zM3.61 15.457l2.934 2.934-4.407 1.473 1.473-4.407z' fill={color}></path></svg>
}

export const IconDost = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'></path></svg>
}

export const IconDelete = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 23 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M13.014 10.085l-.544 8.656c-.036.48.338.9.822.925h.06a.87.87 0 0 0 .87-.817l.544-8.656a.867.867 0 0 0-.822-.924.892.892 0 0 0-.93.816zM8.965 9.269a.883.883 0 0 0-.821.924l.543 8.656a.87.87 0 0 0 .87.817h.06a.883.883 0 0 0 .822-.925l-.543-8.656a.892.892 0 0 0-.93-.816z' fill={color}></path><path d='M22.027 4.946h-5.968V3.338C16.058 1.5 14.547 0 12.698 0H10.21C8.35 0 6.839 1.5 6.839 3.338v1.608H.882A.866.866 0 0 0 0 5.811c0 .48.387.876.882.876h2.066l.894 14.191C3.952 22.631 5.304 24 6.912 24h9.074c1.607 0 2.96-1.369 3.069-3.122l.096-1.572a.875.875 0 0 0-.821-.925.884.884 0 0 0-.93.817l-.097 1.572c-.049.829-.629 1.49-1.317 1.49H6.91c-.688 0-1.268-.65-1.317-1.49L4.7 6.687H18.21l-.387 6.1c-.036.48.338.9.822.924a.876.876 0 0 0 .93-.817l.399-6.207h2.066a.884.884 0 0 0 .882-.876c0-.48-.41-.865-.894-.865zM8.603 3.338c0-.877.725-1.597 1.607-1.597h2.49c.881 0 1.606.72 1.606 1.597v1.608H8.603V3.338z' fill={color}></path></svg>
}
export const IconDeleteKeyboard = ({ style = {}, size, color }) => {
  return <svg
    fill={'none'}
    height={size}
    stroke={color || BColor}
    strokeLinecap='round'
    strokeLinejoin='round'
    style={style}
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM18 9l-6 6M12 9l6 6' fill={color} />
  </svg>
}
export const IconPlus = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 79.46 81.92'
    width={size}
  ><path
      d='M86.6,229V265.2h34.8v9.24H86.6v36.5H76.74v-36.5H41.94V265.2h34.8V229Z'
      fill={color}
      transform='translate(-41.94 -229.01)'
  /></svg>
}

/* Icono de Facebook */
export const Facebook = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 48 48'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M27.629 47V23.997h6.509L35 16.07h-7.371l.011-3.967c0-2.067.201-3.175 3.245-3.175h4.069V1h-6.51c-7.818 0-10.57 3.845-10.57 10.312v4.76H13v7.926h4.874V47h9.755z'></path></svg>
}

export const IconTwitter = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 48 48'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M22.821 14.375l.102 1.686-1.698-.206c-6.18-.792-11.58-3.477-16.165-7.987L2.82 5.63l-.58 1.653c-1.222 3.683-.441 7.574 2.106 10.19 1.358 1.446 1.053 1.652-1.29.792-.816-.276-1.529-.482-1.597-.379-.237.241.578 3.374 1.223 4.613.883 1.721 2.683 3.408 4.652 4.407L9 27.697l-1.97.035c-1.901 0-1.969.034-1.765.757.679 2.238 3.362 4.613 6.35 5.646l2.106.723-1.834 1.102c-2.717 1.583-5.909 2.478-9.101 2.547-1.528.035-2.785.172-2.785.275 0 .345 4.143 2.273 6.554 3.03 7.234 2.238 15.826 1.274 22.278-2.548 4.585-2.72 9.17-8.124 11.309-13.357 1.154-2.788 2.31-7.883 2.31-10.328 0-1.583.101-1.79 2.003-3.683 1.12-1.102 2.173-2.307 2.377-2.65.34-.655.306-.655-1.426-.07-2.887 1.033-3.294.895-1.868-.654 1.053-1.101 2.31-3.098 2.31-3.683 0-.104-.51.069-1.088.378-.61.345-1.97.861-2.988 1.17l-1.834.586-1.664-1.136c-.917-.62-2.207-1.308-2.887-1.515-1.732-.482-4.38-.413-5.943.138-4.245 1.55-6.928 5.542-6.622 9.915z'></path></svg>
}

export const IconLocationMap = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 49 48'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><g
      fill={color}
      fillRule='nonzero'
      transform='translate(-287 -1776)'
  ><g id='Prato' transform='translate(48 1708)'><g id='Alerta-endereço' transform='translate(239 68)'><path d='M25 45C13 36.96 7 28.96 7 21c0-9.941 8.059-18 18-18s18 8.059 18 18c0 7.96-6 15.96-18 24zm0-16a8 8 0 1 0 0-16 8 8 0 0 0 0 16z' id='Combined-Shape'></path></g></g></g></svg>
}

// Iconos
export const IconBuy = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 14 15'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M7 0c2.062 0 3.733 1.678 3.733 3.748v.537h2.079L14 15H0L1.187 4.286l2.079-.001v-.537c0-2.003 1.566-3.64 3.536-3.743zm4.857 5.357H2.142l-.95 8.572h11.615l-.95-8.572zM7 1.071c-1.472 0-2.666 1.199-2.666 2.677l-.001.537h5.333v-.537c0-1.421-1.104-2.584-2.497-2.671z' fillOpacity='.8'></path>
  </svg>
}
export const IconAccount = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 20 21'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M14.178 14.08c2 0 3.622 1.621 3.622 3.622v.6h-1.2v-.6c0-1.338-1.084-2.423-2.422-2.423H5.793c-1.327 0-2.403 1.076-2.403 2.403v.6h-1.2v-.6c0-1.99 1.613-3.603 3.603-3.603zM10 2.696c2.652 0 4.803 2.15 4.803 4.803 0 2.652-2.15 4.802-4.803 4.802-2.652 0-4.803-2.15-4.803-4.802 0-2.653 2.15-4.803 4.803-4.803zm0 1.2c-1.99 0-3.603 1.613-3.603 3.603 0 1.99 1.613 3.602 3.603 3.602 1.99 0 3.602-1.613 3.602-3.602 0-1.99-1.612-3.603-3.602-3.603z' fillOpacity='.8'></path>
  </svg>
}
export const IconMessage = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='-21 -86 682.66669 682'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='m627.5 199.402344c-6.90625 0-12.5 5.601562-12.5 12.5v44.546875c0 25.5625-20.800781 46.363281-46.363281 46.363281h-71.25c-3.316407 0-6.492188 1.3125-8.839844 3.65625l-86.378906 86.382812v-77.539062c0-6.90625-5.597657-12.5-12.5-12.5h-178.96875c-25.5625 0-46.363281-20.796875-46.363281-46.363281v-189.089844c0-25.5625 20.800781-46.359375 46.363281-46.359375h357.9375c25.5625 0 46.363281 20.796875 46.363281 46.359375v44.542969c0 6.90625 5.59375 12.5 12.5 12.5 6.898438 0 12.5-5.59375 12.5-12.5v-44.542969c0-39.347656-32.011719-71.359375-71.363281-71.359375h-357.9375c-39.351563 0-71.363281 32.011719-71.363281 71.359375v160.589844h-90.980469c-26.660157 0-48.355469 21.6875-48.355469 48.355469v115.1875c0 26.667968 21.695312 48.355468 48.355469 48.355468h38.230469l61.953124 61.957032c2.394532 2.394531 5.59375 3.664062 8.84375 3.664062 1.609376 0 3.238282-.3125 4.78125-.953125 4.671876-1.933594 7.71875-6.488281 7.71875-11.546875v-53.121094h96.523438c26.664062 0 48.355469-21.6875 48.355469-48.355468v-63.679688h62.40625v95.214844c0 5.058594 3.046875 9.613281 7.71875 11.546875 1.542969.640625 3.167969.953125 4.78125.953125 3.253906 0 6.449219-1.269532 8.839843-3.664063l104.054688-104.050781h66.074219c39.351562 0 71.363281-32.011719 71.363281-71.363281v-44.546875c0-6.898438-5.601562-12.5-12.5-12.5zm-337.734375 192.089844c0 12.882812-10.476563 23.355468-23.359375 23.355468h-109.023438c-6.90625 0-12.5 5.601563-12.5 12.5v35.445313l-44.28125-44.28125c-2.34375-2.34375-5.523437-3.664063-8.839843-3.664063h-43.40625c-12.878907 0-23.355469-10.472656-23.355469-23.355468v-115.1875c0-12.878907 10.476562-23.355469 23.355469-23.355469h90.980469v3.5c0 39.351562 32.011718 71.363281 71.363281 71.363281h79.066406zm0 0' /><path d='m511.542969 77.914062h-243.75c-6.902344 0-12.5 5.597657-12.5 12.5 0 6.90625 5.597656 12.5 12.5 12.5h243.75c6.902343 0 12.5-5.59375 12.5-12.5 0-6.902343-5.597657-12.5-12.5-12.5zm0 0' /><path d='m524.042969 157.917969c0-6.902344-5.597657-12.5-12.5-12.5h-243.75c-6.902344 0-12.5 5.597656-12.5 12.5 0 6.90625 5.597656 12.5 12.5 12.5h243.75c6.902343 0 12.5-5.59375 12.5-12.5zm0 0' /><path d='m267.792969 212.917969c-6.902344 0-12.5 5.597656-12.5 12.5 0 6.90625 5.597656 12.5 12.5 12.5h140.625c6.902343 0 12.5-5.59375 12.5-12.5 0-6.902344-5.597657-12.5-12.5-12.5zm0 0' /><path d='m627.5 149.402344c-6.882812 0-12.5 5.617187-12.5 12.5 0 6.886718 5.617188 12.5 12.5 12.5s12.5-5.613282 12.5-12.5c0-6.882813-5.617188-12.5-12.5-12.5zm0 0' /></svg>
}
export const IconConfig = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 273.55 272'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><g id='Web'><path d='M391.57,255.7A4.63,4.63,0,0,1,392,252V232a8,8,0,0,0-7-7.94l-31.35-3.92q-1.45-3.9-3.27-7.8l19.43-25a8,8,0,0,0-.66-10.57L335.2,142.86a8,8,0,0,0-10.57-.66l-25,19.4q-3.9-1.82-7.8-3.27L287.94,127a8,8,0,0,0-7.94-7H232a8,8,0,0,0-7.94,7l-3.92,31.35q-3.9,1.45-7.8,3.27l-25-19.43a8,8,0,0,0-10.57.66L142.86,176.8a7.66,7.66,0,0,0-1.28,1.87l.11-.44c-.09.13-.19.25-.29.37a5.25,5.25,0,0,1-.64,1.66,5.51,5.51,0,0,1-.42,1.79,4.24,4.24,0,0,1,0,.71.75.75,0,0,1,.06.13,1.63,1.63,0,0,1,.09.19l.13-.52a8.47,8.47,0,0,0,.09,1.13,4,4,0,0,1,.09.48,8.05,8.05,0,0,0,1.42,3.19l19.4,25q-1.82,3.9-3.27,7.8l-28,3.51a4.6,4.6,0,0,1-1.44.81,4.6,4.6,0,0,1-3.47,1.41h-.19a11.08,11.08,0,0,1-3.08,3.76.25.25,0,0,0,0,.08,3.66,3.66,0,0,1-.6,1.86c-.13.21-.32.43-.45.6s-.29.39-.45.57a1.14,1.14,0,0,1-.15.16,5.08,5.08,0,0,1-.5.44V280a8,8,0,0,0,7,7.94l31.35,3.92q1.45,3.9,3.27,7.8l-19.43,25a8,8,0,0,0,.66,10.57l33.94,33.95a8,8,0,0,0,10.57.65l25-19.39q3.9,1.82,7.8,3.27L224.06,385a8,8,0,0,0,7.94,7h48a8,8,0,0,0,7.94-7l3.92-31.35q3.9-1.45,7.8-3.27l25,19.42a8,8,0,0,0,10.57-.65L368.34,336a13.26,13.26,0,0,0,1.57-5c.61-5.76-2.87-10-3.71-11l-15.8-20.34q1.82-3.9,3.27-7.8L385,287.94a8,8,0,0,0,7-7.94v-8h.76C392.8,266.51,393.06,261,391.57,255.7ZM376,272.94l-29.3,3.66a8,8,0,0,0-6.65,5.6,86.86,86.86,0,0,1-6.16,14.7,8,8,0,0,0,.8,8.64l18.17,23.36-24,23.9-23.36-18.18a8,8,0,0,0-8.64-.8,86.86,86.86,0,0,1-14.7,6.16,8,8,0,0,0-5.6,6.65L272.94,376H239.06l-3.66-29.3a8,8,0,0,0-5.6-6.65,87.69,87.69,0,0,1-14.7-6.16,8,8,0,0,0-8.64.8L183.13,352.8,159.2,328.87l18.18-23.36a8,8,0,0,0,.8-8.64,86.86,86.86,0,0,1-6.16-14.7,8,8,0,0,0-6.65-5.6L136,272.94V239.06l29.3-3.66a8,8,0,0,0,6.65-5.6,87.69,87.69,0,0,1,6.16-14.7,8,8,0,0,0-.8-8.64L159.2,183.13l23.93-23.93,23.36,18.18a8,8,0,0,0,8.64.8,86.86,86.86,0,0,1,14.7-6.16,8,8,0,0,0,5.6-6.65L239.06,136h33.88l3.66,29.3a8,8,0,0,0,5.6,6.65,86.86,86.86,0,0,1,14.7,6.16,8,8,0,0,0,8.64-.8l23.36-18.17,23.9,24-18.18,23.36a8,8,0,0,0-.8,8.64,86.86,86.86,0,0,1,6.16,14.7,8,8,0,0,0,6.65,5.6L376,239.06Z' transform='translate(-119.71 -120)' /><line
      x1='273.55'
      x2='272.29'
      y1='136'
      y2='136'
  /><line
      x1='272.29'
      x2='272.29'
      y1='153.15'
      y2='152'
  /><path d='M328,256a72,72,0,1,0-72,72h0A72.07,72.07,0,0,0,328,256Zm-72,56a56,56,0,1,1,56-56A56,56,0,0,1,256,312Z' transform='translate(-119.71 -120)' /><path d='M130.33,223.65c-5.13.82-9.19,4-10.31,8.25a10.41,10.41,0,0,0,.32,6' transform='translate(-119.71 -120)' /></g></svg>
}
// Icon Fullscreen
export const IconFullscreen = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 126.14 114.25'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><polyline
      fill='none'
      points='67.58 6.5 119.64 6.5 119.64 53.36'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /><polyline
      fill='none'
      points='6.8 52.71 6.8 6.5 56.82 6.5'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /><polyline
      fill='none'
      points='56.88 107.75 6.5 107.75 6.5 62.77'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /><polyline
      fill='none'
      points='119.54 63.39 119.54 107.75 67.71 107.75'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /></svg>
}
// Icon Fullscreen
export const IconScreenNormal = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 132.29 118.58'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><polyline
      fill='none'
      points='0 71.72 52.06 71.72 52.06 118.58'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /><polyline
      fill='none'
      points='81.6 118.33 81.6 72.12 131.62 72.12'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /><polyline
      fill='none'
      points='132.29 44.98 81.91 44.98 81.91 0'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /><polyline
      fill='none'
      points='52.94 0.62 52.94 44.98 1.12 44.98'
      stroke={color}
      strokeMiterlimit='10'
      strokeWidth='13px'
  /></svg>
}
export const IconBill = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 512 512'
    width={size}
    x='0px'
    xmlns='http://www.w3.org/2000/svg'
    y='0px'
  >
    <path
      d='M444.875,109.792L338.208,3.125c-2-2-4.708-3.125-7.542-3.125h-224C83.146,0,64,19.135,64,42.667v426.667
           C64,492.865,83.146,512,106.667,512h298.667C428.854,512,448,492.865,448,469.333v-352
           C448,114.5,446.875,111.792,444.875,109.792z M341.333,36.417l70.25,70.25h-48.917c-11.771,0-21.333-9.573-21.333-21.333V36.417z
            M426.667,469.333c0,11.76-9.563,21.333-21.333,21.333H106.667c-11.771,0-21.333-9.573-21.333-21.333V42.667
           c0-11.76,9.563-21.333,21.333-21.333H320v64C320,108.865,339.146,128,362.667,128h64V469.333z'
    />
    <path
      d='M373.333,298.667H138.667c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h234.667
           c5.896,0,10.667-4.771,10.667-10.667C384,303.438,379.229,298.667,373.333,298.667z'
    />
    <path
      d='M373.333,234.667H138.667c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h234.667
           c5.896,0,10.667-4.771,10.667-10.667C384,239.438,379.229,234.667,373.333,234.667z'
    />
    <path
      d='M373.333,362.667H138.667c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h234.667
           c5.896,0,10.667-4.771,10.667-10.667C384,367.438,379.229,362.667,373.333,362.667z'
    />
    <path
      d='M266.667,426.667h-128c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h128
           c5.896,0,10.667-4.771,10.667-10.667C277.333,431.438,272.563,426.667,266.667,426.667z'
    />
    <path
      d='M234.667,181.333c0,5.896,4.771,10.667,10.667,10.667h128c5.896,0,10.667-4.771,10.667-10.667
           c0-5.896-4.771-10.667-10.667-10.667h-128C239.438,170.667,234.667,175.438,234.667,181.333z'
    />
    <path
      d='M160,170.667h-21.333c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h10.667
           c0,5.896,4.771,10.667,10.667,10.667s10.667-4.771,10.667-10.667v-1.965C183.056,185.617,192,173.888,192,160
           c0-17.646-14.354-32-32-32c-5.875,0-10.667-4.781-10.667-10.667c0-5.885,4.792-10.667,10.667-10.667h21.333
           c5.896,0,10.667-4.771,10.667-10.667s-4.771-10.667-10.667-10.667h-10.667c0-5.896-4.771-10.667-10.667-10.667
           s-10.667,4.771-10.667,10.667v1.965C136.944,91.716,128,103.445,128,117.333c0,17.646,14.354,32,32,32
           c5.875,0,10.667,4.781,10.667,10.667S165.875,170.667,160,170.667z'
    />
  </svg>
}
// Icono de billetera
export const IconWallet = ({ style = {}, color, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 54.01 39.97'
    width={size}
  ><path d='M17.38,22.99c0,1.54-0.46,2.7-1.39,3.49s-2.15,1.18-3.65,1.18h-0.02l-0.33,2.61 c-1.09-0.04-1.64-0.1-1.64-0.16l0.31-2.57c-1.09-0.13-2.01-0.29-2.74-0.46L7.47,27l0.29-2.3c1.17,0.16,2.24,0.27,3.23,0.33 l0.49-3.85c-1.52-0.46-2.6-1.01-3.23-1.66c-0.63-0.65-0.95-1.53-0.95-2.66c0-1.46,0.44-2.55,1.33-3.26 c0.89-0.72,2.1-1.07,3.65-1.07h0.29l0.4-3.05h1.64l-0.4,3.19c0.91,0.09,1.76,0.21,2.52,0.35l0.38,0.09l-0.24,2.35 c-1.08-0.12-2.07-0.21-2.99-0.27l-0.44,3.56c1.53,0.49,2.58,1.02,3.13,1.6C17.1,20.93,17.38,21.81,17.38,22.99z M10.23,16.67 c0,0.35,0.11,0.64,0.33,0.86c0.22,0.22,0.65,0.45,1.28,0.69l0.38-3.08C10.9,15.2,10.23,15.71,10.23,16.67z M14.44,23.19 c0-0.35-0.1-0.64-0.3-0.87c-0.2-0.23-0.56-0.45-1.07-0.65l-0.42,3.39C13.84,24.92,14.44,24.3,14.44,23.19z' fill={color} /><path d='M38.53,20.14c0,1.77,1.44,3.22,3.22,3.22c1.77,0,3.22-1.44,3.22-3.22c0-1.77-1.44-3.22-3.22-3.22 C39.98,16.92,38.53,18.36,38.53,20.14z M41.75,18.48c0.91,0,1.66,0.74,1.66,1.66c0,0.91-0.74,1.66-1.66,1.66s-1.66-0.74-1.66-1.66 C40.09,19.22,40.84,18.48,41.75,18.48z' fill={color} /><path d='M54.01,13.79h-1.84V6.27v-1.1C52.17,2.32,49.85,0,47,0H5.17C2.32,0,0,2.32,0,5.17v1.1v27.89v0.63 c0,2.85,2.32,5.17,5.17,5.17H47c2.85,0,5.17-2.32,5.17-5.17v-0.63v-8.22h1.84V13.79z M1.54,5.17c0-2,1.63-3.64,3.63-3.64H47 c2,0,3.64,1.63,3.64,3.64v1.1H1.54V5.17z M50.63,34.79c0,2-1.63,3.64-3.64,3.64H5.17c-2,0-3.63-1.63-3.63-3.64v-0.63h49.1V34.79z  M50.63,32.63H1.54V7.81h49.1v5.97h-9.39c-3.35,0-6.08,2.73-6.08,6.08s2.73,6.08,6.08,6.08h9.39V32.63z M50.63,15.34v9.04h-9.39 c-2.49,0-4.52-2.03-4.52-4.52s2.03-4.52,4.52-4.52H50.63z M52.46,24.39h-0.29v-9.04h0.29V24.39z' fill={color} /></svg>
}

// Icon grid
export const IconGridLayout = ({ style = {}, size, color }) => {
  return <svg
    data-name='Capa 1'
    fill={color}
    height={size}
    id='Capa_1'
    style={style}
    viewBox='0 0 216.83 206.61'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><rect
      fill='none'
      height='59'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='10px'
      width='92'
      x='5'
      y='8.65'
  /><rect
      fill='none'
      height='113.52'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='10px'
      width='92'
      x='4'
      y='89.09'
  /><rect
      fill='none'
      height='110.74'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='10px'
      width='92'
      x='120.83'
      y='4'
  /><rect
      fill='none'
      height='62.61'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='10px'
      width='92'
      x='120.26'
      y='137.26'
  /></svg>
}
export const IconNoShow = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 512.001 512.001'
    width={size}
    x='0px'
    y='0px'
  > <path d='M316.332,195.662c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.944,0,15.083     c12.075,12.075,18.752,28.139,18.752,45.248c0,35.285-28.715,64-64,64c-17.109,0-33.173-6.656-45.248-18.752     c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.139-4.16,10.923,0,15.083c16.085,16.128,37.525,25.003,60.331,25.003     c47.061,0,85.333-38.272,85.333-85.333C341.334,233.187,332.46,211.747,316.332,195.662z' /> <path d='M270.87,172.131c-4.843-0.853-9.792-1.472-14.869-1.472c-47.061,0-85.333,38.272-85.333,85.333     c0,5.077,0.619,10.027,1.493,14.869c0.917,5.163,5.419,8.811,10.475,8.811c0.619,0,1.237-0.043,1.877-0.171     c5.781-1.024,9.664-6.571,8.64-12.352c-0.661-3.627-1.152-7.317-1.152-11.157c0-35.285,28.715-64,64-64     c3.84,0,7.531,0.491,11.157,1.131c5.675,1.152,11.328-2.859,12.352-8.64C280.534,178.702,276.652,173.155,270.87,172.131z' /> <path d='M509.462,249.102c-2.411-2.859-60.117-70.208-139.712-111.445c-5.163-2.709-11.669-0.661-14.379,4.587     c-2.709,5.227-0.661,11.669,4.587,14.379c61.312,31.744,110.293,81.28,127.04,99.371c-25.429,27.541-125.504,128-230.997,128     c-35.797,0-71.872-8.64-107.264-25.707c-5.248-2.581-11.669-0.341-14.229,4.971c-2.581,5.291-0.341,11.669,4.971,14.229     c38.293,18.496,77.504,27.84,116.523,27.84c131.435,0,248.555-136.619,253.483-142.443     C512.854,258.915,512.833,253.091,509.462,249.102z' /> <path d='M325.996,118.947c-24.277-8.171-47.829-12.288-69.995-12.288c-131.435,0-248.555,136.619-253.483,142.443     c-3.115,3.669-3.371,9.003-0.597,12.992c1.472,2.112,36.736,52.181,97.856,92.779c1.813,1.216,3.84,1.792,5.888,1.792     c3.435,0,6.827-1.664,8.875-4.8c3.264-4.885,1.92-11.52-2.987-14.763c-44.885-29.845-75.605-65.877-87.104-80.533     c24.555-26.667,125.291-128.576,231.552-128.576c19.861,0,41.131,3.755,63.189,11.157c5.589,2.005,11.648-1.088,13.504-6.699     C334.572,126.862,331.585,120.825,325.996,118.947z' /> <path d='M444.865,67.128c-4.16-4.16-10.923-4.16-15.083,0L67.116,429.795c-4.16,4.16-4.16,10.923,0,15.083 c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.115L444.865,82.211 C449.025,78.051,449.025,71.288,444.865,67.128z' /></svg>
}
export const IconShowEye = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 512 298.67'
    width={size}
  ><path d='M509.46,249.1c-2.41-2.86-60.11-70.21-139.71-111.44a10.67,10.67,0,1,0-9.79,19C421.27,188.37,470.25,237.9,487,256c-25.43,27.55-125.51,128-231,128-35.8,0-71.87-8.64-107.26-25.7a10.66,10.66,0,0,0-9.26,19.2C177.77,396,217,405.33,256,405.33c131.44,0,248.56-136.62,253.49-142.45A10.67,10.67,0,0,0,509.46,249.1Z' transform='translate(0 -106.66)' /><path d='M326,119c-24.28-8.17-47.83-12.29-70-12.29C124.57,106.66,7.45,243.28,2.52,249.1a10.66,10.66,0,0,0-.6,13c1.47,2.12,36.74,52.18,97.86,92.78a10.44,10.44,0,0,0,5.89,1.79,10.68,10.68,0,0,0,5.88-19.56c-44.88-29.84-75.6-65.88-87.1-80.53C49,229.9,149.74,128,256,128c19.86,0,41.13,3.76,63.19,11.16a10.52,10.52,0,0,0,13.5-6.7A10.64,10.64,0,0,0,326,119Z' transform='translate(0 -106.66)' /><ellipse
      cx='256'
      cy='149.08'
      fill='none'
      rx='85.33'
      ry='85.59'
      stroke='#000'
      strokeWidth='19px'
  /></svg>
}
export const IconWarning = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 512 298.67'
    width={size}
  ><path d='M509.46,249.1c-2.41-2.86-60.11-70.21-139.71-111.44a10.67,10.67,0,1,0-9.79,19C421.27,188.37,470.25,237.9,487,256c-25.43,27.55-125.51,128-231,128-35.8,0-71.87-8.64-107.26-25.7a10.66,10.66,0,0,0-9.26,19.2C177.77,396,217,405.33,256,405.33c131.44,0,248.56-136.62,253.49-142.45A10.67,10.67,0,0,0,509.46,249.1Z' transform='translate(0 -106.66)' /><path d='M326,119c-24.28-8.17-47.83-12.29-70-12.29C124.57,106.66,7.45,243.28,2.52,249.1a10.66,10.66,0,0,0-.6,13c1.47,2.12,36.74,52.18,97.86,92.78a10.44,10.44,0,0,0,5.89,1.79,10.68,10.68,0,0,0,5.88-19.56c-44.88-29.84-75.6-65.88-87.1-80.53C49,229.9,149.74,128,256,128c19.86,0,41.13,3.76,63.19,11.16a10.52,10.52,0,0,0,13.5-6.7A10.64,10.64,0,0,0,326,119Z' transform='translate(0 -106.66)' /><ellipse
      cx='256'
      cy='149.08'
      fill='none'
      rx='85.33'
      ry='85.59'
      stroke='#000'
      strokeWidth='19px'
  /></svg>
}
export const IconFolder = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 254.89 207.69'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M200.4,258.36h82.18l21.32,30.72H414.64s13.49-.61,9,11.35c-.58,1.56,0,28.17,0,28.17h22.11s3.13,2,3.13,5.09a15.74,15.74,0,0,1,0,6.46l-44.8,122.47s.19,4.11-11.35,3.33l-189.2.1s-9.39-.69-9.19-9.3V263.06S196.88,258.36,200.4,258.36Z'
      fill='#e5b911'
      transform='translate(-194.34 -258.36)'
  /><path
      d='M423.64,328.6h22.11s3.13,2,3.13,5.09a15.74,15.74,0,0,1,0,6.46l-44.8,122.47s.19,4.11-11.35,3.33l-189.19.1s-5.59-.41-8.06-4.55a8.78,8.78,0,0,1-1.14-4.75c.22-11.24,21.81-58.84,29.36-81.62,2.79-8.43,6.38-16.59,9.13-25a82.53,82.53,0,0,1,7-15.92,29.4,29.4,0,0,1,2.48-4c5.71-6.66,17.73-5.16,26.17-4.35,11.52,1.11,23.18.21,34.68,1.49,6.88.76,23.65,1,57.19,1.36C379.28,328.92,400.47,328.94,423.64,328.6Z'
      fill='#ecce3d'
      transform='translate(-194.34 -258.36)'
  /></svg>
}
export const IconDollar = (props) => {
  return <svg
  fill='none'
  height={24}
  width={24}
  xmlns='http://www.w3.org/2000/svg'
  {...props}
  >
  <path
    d='M12.257 19.496a.83.83 0 0 0 .824-.825V17.54c1.616-.176 2.892-1.54 2.892-3.2a3.238 3.238 0 0 0-3.233-3.233h-.967a1.59 1.59 0 0 1-1.584-1.583 1.59 1.59 0 0 1 1.584-1.583h2.891a.83.83 0 0 0 .825-.825.83.83 0 0 0-.825-.825h-1.583v-1.1a.83.83 0 0 0-.824-.824.812.812 0 0 0-.825.803V6.3c-1.617.176-2.892 1.54-2.892 3.2a3.238 3.238 0 0 0 3.233 3.233h.967a1.59 1.59 0 0 1 1.584 1.583A1.59 1.59 0 0 1 12.74 15.9H9.848a.83.83 0 0 0-.824.825c0 .45.374.825.824.825h1.584v1.1c0 .472.374.846.825.846Z'
    fill='currentColor'
  />
  <path
    d='M12.256.945C6.198.945 1.272 5.871 1.272 11.93c0 6.058 4.926 10.984 10.984 10.984 3.398 0 6.553-1.54 8.654-4.222a.822.822 0 0 0-.143-1.155.821.821 0 0 0-1.155.143 9.288 9.288 0 0 1-7.356 3.585c-5.146 0-9.335-4.19-9.335-9.335 0-5.146 4.19-9.335 9.335-9.335 5.146 0 9.335 4.189 9.335 9.335 0 .45.374.824.825.824a.83.83 0 0 0 .825-.824C23.23 5.87 18.304.945 12.256.945Z'
    fill='currentColor'
  />
</svg>

}
export const IconInvoice = ({ style = {}, size }) => {
  return <svg
    fill='none'
    height={size}
    stroke='#000'
    strokeWidth='5px'
    style={style}
    viewBox='0 0 210.91 261.78'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M357,211.55V264a11.74,11.74,0,0,1-11.74,11.74H166.78A11.74,11.74,0,0,1,155,264V34.68a11.74,11.74,0,0,1,11.74-11.74h37.57'
      stroke='#000'
      strokeLinecap='round'
      transform='translate(-150.54 -18.44)'
  /><path d='M218.43,22.94H346.3a10.8,10.8,0,0,1,10.66,11V198.81' transform='translate(-150.54 -18.44)' /><text
      fill='none'
      fontSize='32.32px'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      transform='translate(27.2 51.1)'
  >INVOICE</text><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='132.85'
      x2='173.67'
      y1='76.11'
      y2='76.11'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='110.54'
      x2='171.71'
      y1='89.41'
      y2='89.41'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='33.31'
      x2='170.8'
      y1='135.89'
      y2='135.89'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='33.25'
      x2='170.74'
      y1='166.15'
      y2='166.15'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='138.26'
      x2='138.26'
      y1='193.62'
      y2='111.98'
  /><path
      d='M257.11,251.47c4-9.66,7.55-12.06,10.24-12.13,5.87-.17,7.79,10.72,15.26,11.54,6.72.73,9.49-7.63,17.61-8.61,6.79-.82,13.17,4,18.06,9.2'
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      transform='translate(-150.54 -18.44)'
  /><path d='M237.44,212.07h86.77v-84H180.87v84h22.77' transform='translate(-150.54 -18.44)' /></svg>
}
export const IconDate = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 210.91 183'
    width={size}
  ><path
      d='M-72.52,369.59v29.87c0,3.7-5.26,6.69-11.74,6.69H-262.7c-6.48,0-11.73-3-11.73-6.69V268.84c0-3.7,5.25-6.69,11.73-6.69h37.57'
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      transform='translate(278.93 -227.65)'
  /><path
      d='M-211,262.15H-83.18c5.89,0,10.66,2.79,10.66,6.24v93.95'
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      transform='translate(278.93 -227.65)'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='32.67'
      x2='32.67'
      y1='45.32'
      y2='4.5'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='64.08'
      x2='23.26'
      y1='91.42'
      y2='91.42'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='127.87'
      x2='87.05'
      y1='91.42'
      y2='91.42'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='191.65'
      x2='150.83'
      y1='91.42'
      y2='91.42'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='62.08'
      x2='21.26'
      y1='141.71'
      y2='141.71'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='125.87'
      x2='85.05'
      y1='141.71'
      y2='141.71'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='189.65'
      x2='148.83'
      y1='141.71'
      y2='141.71'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='114.07'
      x2='114.07'
      y1='45.32'
      y2='4.5'
  /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeWidth='9px'
      x1='176.67'
      x2='176.67'
      y1='47.28'
      y2='6.46'
  /></svg>
}
export const IconPDF = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 243.17 282.5'
    width={size}
  ><rect
      fill='#fff'
      height='256'
      rx='40.28'
      width='221'
  /><path d='M0,55H94.5A36.5,36.5,0,0,1,131,91.5v0A36.5,36.5,0,0,1,94.5,128H0a0,0,0,0,1,0,0V55A0,0,0,0,1,0,55Z' fill='#bf0512' /><path
      d='M-219.25-207.63a9.42,9.42,0,0,1-1,4.33,8.66,8.66,0,0,1-2.65,3.11,11.59,11.59,0,0,1-3.68,1.81,15.47,15.47,0,0,1-4.25.57h-3.5v9.47A3.35,3.35,0,0,0-234-187a1.73,1.73,0,0,0,1,.89,7,7,0,0,0,1.4.29c.67.08,1.28.14,1.84.15v1.56h-13.41v-1.56l1.53-.15a5.46,5.46,0,0,0,1.4-.29,1.84,1.84,0,0,0,.95-.84,2.88,2.88,0,0,0,.3-1.4v-22.55a4,4,0,0,0-.22-1.38,1.63,1.63,0,0,0-1-.93,10.31,10.31,0,0,0-1.66-.41c-.56-.08-1-.13-1.42-.16v-1.56H-229a11.27,11.27,0,0,1,7.08,2.1A6.73,6.73,0,0,1-219.25-207.63Zm-6.7,5.33a6,6,0,0,0,1-2.19,9.42,9.42,0,0,0,.25-2,11.3,11.3,0,0,0-.3-2.55,6,6,0,0,0-1-2.27,5.24,5.24,0,0,0-2-1.61,7.58,7.58,0,0,0-3.13-.57h-3.1v13.8H-232a8.74,8.74,0,0,0,3.86-.73A5.68,5.68,0,0,0-225.95-202.3Z'
      fill='#fff'
      transform='translate(261 293.11)'
  /><path
      d='M-185.75-199.53a15,15,0,0,1-1.5,6.91,13.89,13.89,0,0,1-3.89,4.8,17,17,0,0,1-5.44,2.8,21,21,0,0,1-6.23.92h-12.94v-1.56a14.92,14.92,0,0,0,1.66-.12,4.88,4.88,0,0,0,1.35-.28,1.9,1.9,0,0,0,1-.84,2.87,2.87,0,0,0,.3-1.36V-210.8a3.34,3.34,0,0,0-.26-1.34,1.9,1.9,0,0,0-1-1,5.76,5.76,0,0,0-1.47-.48,13.33,13.33,0,0,0-1.37-.2v-1.56h13.65a18.17,18.17,0,0,1,5.55.87,16.58,16.58,0,0,1,4.75,2.34,13.51,13.51,0,0,1,4.32,5.13A16.7,16.7,0,0,1-185.75-199.53Zm-5.39,0a18,18,0,0,0-.84-5.68,13.1,13.1,0,0,0-2.44-4.44,10.78,10.78,0,0,0-3.73-2.83,11.5,11.5,0,0,0-4.92-1l-2,0-1.68.06v24a3.06,3.06,0,0,0,1.16,2.77,6.67,6.67,0,0,0,3.59.77,11.35,11.35,0,0,0,4.89-1,8.91,8.91,0,0,0,3.39-2.75,12.31,12.31,0,0,0,2-4.28A22.49,22.49,0,0,0-191.14-199.54Z'
      fill='#fff'
      transform='translate(261 293.11)'
  /><path
      d='M-157.66-207.52h-1.65a11.26,11.26,0,0,0-1.93-3.72,4.76,4.76,0,0,0-2.8-2.18c-.46-.06-1-.1-1.62-.13s-1.33,0-2.13,0H-173V-201h3.6a7.4,7.4,0,0,0,2.54-.34,3.9,3.9,0,0,0,1.54-1,4.46,4.46,0,0,0,.81-1.51,9,9,0,0,0,.47-2.19h1.65v12.28h-1.65a9.35,9.35,0,0,0-.45-2.2,5.49,5.49,0,0,0-.83-1.78,3.19,3.19,0,0,0-1.66-1.11,8.55,8.55,0,0,0-2.42-.3H-173v10.75a2.85,2.85,0,0,0,.29,1.29,2.15,2.15,0,0,0,1,.93,8.58,8.58,0,0,0,1.43.37,10.66,10.66,0,0,0,1.68.24v1.56h-13.54v-1.56l1.76-.14a5.07,5.07,0,0,0,1.43-.26,1.9,1.9,0,0,0,1-.84,2.87,2.87,0,0,0,.3-1.36V-210.8a3.13,3.13,0,0,0-.25-1.29,1.87,1.87,0,0,0-1-.91,7.84,7.84,0,0,0-1.59-.51,13.2,13.2,0,0,0-1.6-.26v-1.56h24.5Z'
      fill='#fff'
      transform='translate(261 293.11)'
  /><rect
      fill='#d7d7d7'
      height='9.59'
      rx='4.79'
      width='133.43'
      x='39'
      y='167.48'
  /><rect
      fill='#d7d7d7'
      height='9.59'
      rx='4.79'
      width='133.43'
      x='39'
      y='185.09'
  /><rect
      fill='#d7d7d7'
      height='9.59'
      rx='4.79'
      width='133.43'
      x='39'
      y='202.7'
  /><rect
      fill='#d7d7d7'
      height='9.59'
      rx='4.79'
      width='133.43'
      x='39'
      y='220.3'
  /><circle
      cx='182.04'
      cy='219.02'
      fill='#d7d7d7'
      r='59.96'
  /><circle
      cx='183.21'
      cy='222.54'
      fill='#fff'
      r='59.96'
  /><rect
      fill='#389fcb'
      height='46.83'
      rx='6.78'
      width='16.7'
      x='174.99'
      y='190.3'
  /><polygon fill='#389fcb' points='165.34 226.44 201.08 226.96 183.21 250.3 165.34 226.44' /></svg>
}
export const IconImg = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 257.8 187.47'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><rect
      fill='none'
      height='181.47'
      rx='12'
      stroke={color}
      strokeWidth='12px'
      width='251.22'
      x='3.58'
      y='3'
  /><path
      d='M731,467.48,864,334.61s6.42-6.86,12.48,2.73l61.09,58.14'
      fill='none'
      stroke={color}
      strokeWidth='12px'
      transform='translate(-682.81 -285.43)'
  /><path
      d='M790,413.15l-49.44-52.64S735,353,727.13,362.84L685,406.93'
      fill='none'
      stroke={color}
      strokeWidth='12px'
      transform='translate(-682.81 -285.43)'
  /><circle
      cx='110.12'
      cy='53.83'
      fill='none'
      r='22.65'
      stroke={color}
      strokeWidth='12px'
  /></svg>
}
export const IconHTML = ({ style = {}, size }) => {
  return <svg
    fill='none'
    height={size}
    style={style}
    viewBox='0 0 124 141.53199999999998'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M10.383 126.894L0 0l124 .255-10.979 126.639-50.553 14.638z' fill='#e34f26' /><path d='M62.468 129.277V12.085l51.064.17-9.106 104.851z' fill='#ef652a' /><path d='M99.49 41.362l1.446-15.49H22.383l4.34 47.49h54.213L78.81 93.617l-17.362 4.68-17.617-5.106-.936-12.085H27.319l2.128 24.681 32 8.936 32.255-8.936 4.34-48.17H41.107L39.49 41.362z' fill='#fff' /></svg>
}
export const IconQuestion = ({ style = {}, size }) => {
  return <svg
    fill='none'
    height={size}
    style={style}
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M12 15a1 1 0 100 2 1 1 0 000-2zM15 10a3.006 3.006 0 00-3-3 3 3 0 00-2.9 2.27 1 1 0 101.937.494A1.02 1.02 0 0112 9a1.006 1.006 0 011 1c0 .013.007.024.007.037 0 .013-.007.023-.007.036a.5.5 0 01-.276.447l-1.172.584A1 1 0 0011 12v1a1 1 0 102 0v-.383l.619-.308a2.515 2.515 0 001.381-2.3V10z' fill='currentColor'></path><path d='M19.082 4.94A9.931 9.931 0 0012.016 2H12a10 10 0 00-.016 20H12a10 10 0 007.082-17.06zm-1.434 12.725A7.943 7.943 0 0112 20h-.013A8 8 0 1112 4h.012a8 8 0 015.636 13.665z' fill='currentColor'></path></svg>
}
export const IconDrag = ({ style = {}, size, color }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 24 24'
    width={size}
  ><path d='M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z' fill={color}></path></svg>
}
export const IconExcel = ({ style = {}, size }) => {
  return <svg
    clipRule='evenodd'
    fillRule='evenodd'
    height={size}
    strokeLinejoin='round'
    strokeMiterlimit='1.41421'
    style={style}
    viewBox='0 0 560 400'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='m307.5 103.75h-73.334c-5.028 0-9.167 4.139-9.167 9.166v38.959l82.501 48.125 41.25 17.405 41.25-17.405v-48.125z'
      fill='#21a366'
      fillRule='nonzero'
      height={size}
      width={size}
  /><path
      d='m224.999 151.875h82.501v48.125h-82.501z'
      fill='#107c41'
      height={size}
      width={size}
  /><path
      d='m380.834 103.75h-73.334v48.125h82.5v-38.959c0-5.027-4.139-9.166-9.166-9.166z'
      fill='#33c481'
      fillRule='nonzero'
      height={size}
      width={size}
  /><path
      d='m307.5 200h-82.501v87.084c0 5.027 4.139 9.166 9.167 9.166h146.668c5.027 0 9.166-4.139 9.166-9.166v-38.959z'
      fill='#185c37'
      fillRule='nonzero'
      height={size}
      width={size}
  /><path
      d='m307.5 200h82.5v48.125h-82.5z'
      fill='#107c41'
      height={size}
      width={size}
  /><g
      fillRule='nonzero'
      height={size}
      width={size}
  ><path
        d='m284.584 138.125h-59.584v130.625h59.584c5.022-.014 9.152-4.144 9.166-9.166v-112.293c-.014-5.022-4.144-9.152-9.166-9.166z'
        fillOpacity='.094118'
        height={size}
        width={size}
  /><g
        fillOpacity='.2'
        height={size}
        width={size}
  ><path d='m277.709 145h-52.709v130.625h52.709c5.022-.014 9.152-4.144 9.166-9.166v-112.293c-.014-5.022-4.144-9.152-9.166-9.166z' /><path
          d='m277.709 145h-52.709v116.875h52.709c5.022-.014 9.152-4.144 9.166-9.166v-98.543c-.014-5.022-4.144-9.152-9.166-9.166z'
          height={size}
          width={size}
  /><path
          d='m270.834 145h-45.834v116.875h45.834c5.022-.014 9.152-4.144 9.166-9.166v-98.543c-.014-5.022-4.144-9.152-9.166-9.166z'
          height={size}
          width={size}
  /></g><path
        d='m179.166 145h91.668c5.027 0 9.166 4.139 9.166 9.166v91.668c0 5.027-4.138 9.166-9.166 9.166h-91.668c-5.027 0-9.166-4.139-9.166-9.166v-91.668c0-5.027 4.139-9.166 9.166-9.166z'
        fill='#107c41'
        height={size}
        width={size}
  /><path
        d='m194.292 234.375 22.246-34.471-20.376-34.279h16.397l11.123 21.909c1.022 2.079 1.725 3.63 2.109 4.652h.144c.734-1.661 1.502-3.276 2.302-4.843l11.889-21.718h15.055l-20.904 34.087 21.431 34.663h-16.014l-12.849-24.067c-.605-1.023-1.118-2.099-1.534-3.212h-.191c-.376 1.091-.874 2.136-1.487 3.115l-13.232 24.164z'
        fill='#fff'
        height={size}
        width={size}
  /></g><path
      d='m170 90h220v220h-220z'
      fill='none'
      height={size}
      width={size}
  /></svg>
}
export const IconSvg = ({ style = {}, size }) => {
  return <svg
    height={size}
    role='img'
    style={style}
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><title>SVG icon</title><path d='M12 0c-1.497 0-2.749.965-3.248 2.17a3.45 3.45 0 00-.238 1.416 3.459 3.459 0 00-1.168-.834 3.508 3.508 0 00-1.463-.256 3.513 3.513 0 00-2.367 1.02c-1.06 1.058-1.263 2.625-.764 3.83.179.432.47.82.82 1.154a3.49 3.49 0 00-1.402.252C.965 9.251 0 10.502 0 12c0 1.497.965 2.749 2.17 3.248.437.181.924.25 1.414.236-.357.338-.65.732-.832 1.17-.499 1.205-.295 2.772.764 3.83 1.058 1.06 2.625 1.263 3.83.764.437-.181.83-.476 1.168-.832-.014.49.057.977.238 1.414C9.251 23.035 10.502 24 12 24c1.497 0 2.749-.965 3.248-2.17a3.45 3.45 0 00.238-1.416c.338.356.73.653 1.168.834 1.205.499 2.772.295 3.83-.764 1.06-1.058 1.263-2.625.764-3.83a3.459 3.459 0 00-.834-1.168 3.45 3.45 0 001.416-.238C23.035 14.749 24 13.498 24 12c0-1.497-.965-2.749-2.17-3.248a3.455 3.455 0 00-1.414-.236c.357-.338.65-.732.832-1.17.499-1.205.295-2.772-.764-3.83a3.513 3.513 0 00-2.367-1.02 3.508 3.508 0 00-1.463.256c-.437.181-.83.475-1.168.832a3.45 3.45 0 00-.238-1.414C14.749.965 13.498 0 12 0zm-.041 1.613a1.902 1.902 0 011.387 3.246v3.893L16.098 6A1.902 1.902 0 1118 7.902l-2.752 2.752h3.893a1.902 1.902 0 110 2.692h-3.893L18 16.098A1.902 1.902 0 1116.098 18l-2.752-2.752v3.893a1.902 1.902 0 11-2.692 0v-3.893L7.902 18A1.902 1.902 0 116 16.098l2.752-2.752H4.859a1.902 1.902 0 110-2.692h3.893L6 7.902A1.902 1.902 0 117.902 6l2.752 2.752V4.859a1.902 1.902 0 011.305-3.246z' /></svg>
}
export const IconWord = ({ style = {}, size }) => {
  return <svg
    clipRule='evenodd'
    fillRule='evenodd'
    height={size}
    strokeLinejoin='round'
    strokeMiterlimit='1.41421'
    style={style}
    viewBox='0 0 560 400'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><g fillRule='nonzero'><path d='m380.829 103.753h-146.659c-5.028 0-9.165 4.137-9.165 9.165v38.959l82.498 24.062 82.497-24.062v-38.959c0-5.028-4.137-9.165-9.164-9.165z' fill='#41a5ee' /><path d='m389.993 151.877h-164.994v48.123l82.497 24.062 82.497-24.062z' fill='#2b7cd3' /><path d='m389.993 200h-164.994v48.124l82.497 24.061 82.497-24.061z' fill='#185abd' /><path d='m389.993 248.124h-164.994v38.959c0 5.027 4.136 9.164 9.163 9.164h146.66c5.027 0 9.164-4.137 9.164-9.164z' fill='#103f91' /><path d='m284.582 138.127h-59.583v130.621h59.583c5.022-.015 9.149-4.143 9.164-9.164v-112.286c-.015-5.021-4.142-9.149-9.164-9.164z' fillOpacity='.098039' /><path d='m277.708 145.002h-52.709v130.621h52.709c5.021-.015 9.149-4.143 9.163-9.165v-112.285c-.014-5.021-4.142-9.149-9.163-9.164zm0 0h-52.709v116.871h52.709c5.021-.015 9.149-4.143 9.163-9.164v-98.536c-.014-5.021-4.142-9.149-9.163-9.164zm-6.875 0h-45.834v116.871h45.834c5.021-.015 9.149-4.143 9.163-9.164v-98.536c-.014-5.021-4.142-9.149-9.163-9.164z' fillOpacity='.2' /><path d='m179.164 145.002h91.661c5.028 0 9.165 4.136 9.165 9.164v91.662c0 5.027-4.137 9.163-9.165 9.163h-91.661c-5.027 0-9.164-4.136-9.164-9.163v-91.662c0-5.028 4.137-9.164 9.164-9.164z' fill='#185abd' /><path d='m252.154 234.374h-12.375l-14.437-47.436-15.125 47.436h-12.374l-13.75-68.748h12.375l9.624 48.123 14.438-46.748h10.312l13.75 46.748 9.624-48.123h11.687z' fill='#fff' /></g><path d='m170 90.004h219.993v219.993h-219.993z' fill='none' /></svg>
}
export const IconTar = ({ style = {}, size }) => {
  return <svg
    height={size}
    id='Capa_1'
    style={style}
    version='1.1'
    viewBox='0 0 48 48'
    width={size}
    x='0px'
    xmlns='http://www.w3.org/2000/svg'
    y='0px'
  >
    <path
      d='M47.987,21.938c-0.006-0.091-0.023-0.178-0.053-0.264c-0.011-0.032-0.019-0.063-0.033-0.094
       c-0.048-0.104-0.109-0.202-0.193-0.285c-0.001-0.001-0.001-0.001-0.001-0.001L42,15.586V10c0-0.022-0.011-0.041-0.013-0.063
       c-0.006-0.088-0.023-0.173-0.051-0.257c-0.011-0.032-0.019-0.063-0.034-0.094c-0.049-0.106-0.11-0.207-0.196-0.293l-9-9
       c-0.086-0.086-0.187-0.148-0.294-0.196c-0.03-0.014-0.06-0.022-0.091-0.032c-0.085-0.03-0.172-0.047-0.263-0.052
       C32.039,0.01,32.021,0,32,0H7C6.448,0,6,0.448,6,1v14.586l-5.707,5.707c0,0-0.001,0.001-0.002,0.002
       c-0.084,0.084-0.144,0.182-0.192,0.285c-0.014,0.031-0.022,0.062-0.033,0.094c-0.03,0.086-0.048,0.173-0.053,0.264
       C0.011,21.96,0,21.978,0,22v19c0,0.552,0.448,1,1,1h5v5c0,0.552,0.448,1,1,1h34c0.552,0,1-0.448,1-1v-5h5c0.552,0,1-0.448,1-1V22
       C48,21.978,47.989,21.96,47.987,21.938z M44.586,21H42v-2.586L44.586,21z M38.586,9H33V3.414L38.586,9z M8,2h23v8
       c0,0.552,0.448,1,1,1h8v5v5H8v-5V2z M6,18.414V21H3.414L6,18.414z M40,46H8v-4h32V46z M46,40H2V23h5h34h5V40z'
    />
    <path
      d='M33.86,32.143c0.221-0.153,0.422-0.354,0.604-0.603c0.181-0.249,0.332-0.552,0.451-0.91
       c0.119-0.357,0.179-0.767,0.179-1.232c0-0.601-0.085-1.116-0.255-1.547c-0.17-0.431-0.405-0.788-0.706-1.071
       c-0.3-0.283-0.66-0.49-1.079-0.621c-0.419-0.13-0.878-0.195-1.377-0.195h-3.434V38h1.972v-5.134h1.139L33.222,38h2.142
       l-2.159-5.542C33.421,32.401,33.639,32.297,33.86,32.143z M32.602,30.902c-0.323,0.312-0.734,0.468-1.233,0.468h-1.156v-3.706
       h1.156c0.204,0,0.408,0.028,0.612,0.085s0.388,0.153,0.552,0.289s0.298,0.323,0.4,0.561s0.153,0.538,0.153,0.901
       C33.086,30.123,32.925,30.591,32.602,30.902z'
    />
    <path
      d='M21.441,25.964L18.449,38h2.04l0.612-2.55h3.162L24.858,38h2.125l-2.941-12.036H21.441z M21.357,33.852l1.309-5.967h0.068
       l1.275,5.967H21.357z'
    />
    <polygon points='18.756,25.964 12.227,25.964 12.227,27.698 14.488,27.698 14.488,38 16.494,38 16.494,27.698 18.756,27.698 ' />
  </svg>
}
export const IconJS = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 1052 1052'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M0 0h1052v1052H0z' fill='#f0db4f' /><path d='M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z' fill='#323330' /></svg>
}
export const IconCSS = ({ style = {}, size }) => {
  return <svg
    fill='none'
    height={size}
    style={style}
    viewBox='0 0 124 141.53'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M10.383 126.892L0 0l124 .255-10.979 126.637-50.553 14.638z' fill='#1b73ba' /><path d='M62.468 129.275V12.085l51.064.17-9.106 104.85z' fill='#1c88c7' /><path d='M100.851 27.064H22.298l2.128 15.318h37.276l-36.68 15.745 2.127 14.808h54.043l-1.958 20.68-18.298 3.575-16.595-4.255-1.277-11.745H27.83l2.042 24.426 32.681 9.106 31.32-9.957 4-47.745H64.765l36.085-14.978z' fill='#fff' /></svg>
}
export const IconZIP = ({ style = {}, size }) => {
  return <svg
    data-name='Capa 1'
    height={size}
    id='Capa_1'
    style={style}
    viewBox='0 0 125.64 110.16'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path d='M5,0H120.63a5,5,0,0,1,5,5V36.72a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V5A5,5,0,0,1,5,0Z' fill='#e3393b' /><rect
      fill='#3d81ba'
      height='36.72'
      width='125.64'
      y='36.72'
  /><path d='M0,73.44H125.64a0,0,0,0,1,0,0v32.19a4.53,4.53,0,0,1-4.53,4.53H4.53A4.53,4.53,0,0,1,0,105.63V73.44A0,0,0,0,1,0,73.44Z' fill='#169151' /><rect
      fill='#f29a49'
      height='110.16'
      width='34.74'
      x='47.52'
  /><rect
      fill='#ed8231'
      height='17.64'
      width='37.68'
      x='46.62'
      y='16.8'
  /><rect
      fill='#f29a49'
      height='17.64'
      width='37.68'
      x='46.62'
      y='15.52'
  /><polygon fill='#c33032' points='82.26 6.36 125.64 36.72 83.17 36.72 82.26 6.36' /><path
      d='M423.45-190.09s16.14-19.64,34.38,0Z'
      fill='#f9a855'
      transform='translate(-375.93 205.61)'
  /><path
      d='M457.78-169.9v29.16H444.1V-153s-3.51-5.58-7.2.54v11.7H423.31V-169.9s-4.23-.54-4.32,3l-.9,29.43s2.07,5.13,6.48,6.75h34.29s3.51-.54,4.68-7.65l-.72-30.06S462.15-171.36,457.78-169.9Z'
      fill='#fff'
      transform='translate(-375.93 205.61)'
  /><rect
      fill='#f6c92e'
      height='27.6'
      width='6.84'
      x='9.36'
      y='4.56'
  /><rect
      fill='#f6c92e'
      height='27.6'
      width='6.84'
      x='9.36'
      y='44.16'
  /><rect
      fill='#f6c92e'
      height='27.6'
      width='6.84'
      x='9.36'
      y='78'
  /></svg>
}

export const IconColombia = ({ style = {}, size }) => {
  return <svg
    height={size}
    id='Capa_1'
    style={style}
    version='1.1'
    viewBox='0 0 450 300'
    width={size}
    x='0px'
    y='0px'
  >
    <rect
      fill='#CE1126'
      height='300'
      width='450'
    />
    <rect
      fill='#003893'
      height='225'
      width='450'
    />
    <rect
      fill='#FCD116'
      height='150'
      width='450'
    />
  </svg>
}
// Icono  de Venezuela
export const IconVenezuela = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 180 120'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='s' transform='translate(0,-36)'>
      <g id='f'>
        <g id='t'>
          <path
            d='M0,-5V0H3z'
            fill='#fff'
            id='o'
            transform='rotate(18,0,-5)'
          />
          <use transform='scale(-1,1)' />
        </g>
        <use href='#t' transform='rotate(72)' />
      </g>
      <use href='#t' transform='rotate(-72)' />
      <use href='#f' transform='rotate(144)' />
    </g>
    <path d='M0,0H180V120H0z' fill='#cf142b' />
    <path d='M0,0H180V80H0z' fill='#00247d' />
    <path d='M0,0H180V40H0z' fill='#ffcc00' />
    <g transform='translate(90,84)'>
      <g id='s4'>
        <g id='s2'>
          <use href='#s' transform='rotate(10)' />
          <use href='#s' transform='rotate(30)' />
        </g>
        <use href='#s2' transform='rotate(40)' />
      </g>
      <use href='#s4' transform='rotate(-80)' />
    </g>
  </svg>
}
// Icono  de Paraguay
export const IconParaguay = ({ style = {}, size }) => {
  return <svg
    height={size}
    id='svg2'
    style={style}
    version='1.1'
    viewBox='0 0 600 330'
    width={size}
    x='0px'
    y='0px'
  >
    <rect
      fill='#0038A8'
      height='330'
      id='rect4'
      width='600'
    />
    <rect
      fill='#D52B1E'
      height='220'
      id='rect6'
      width='600'
    />
    <rect
      fill='#fff'
      height='110'
      id='rect8'
      width='600'
    />
    <path
      d='M341.8,165c0,23.1-18.7,41.8-41.8,41.8c-23.1,0-41.8-18.7-41.8-41.8c0-23.1,18.7-41.8,41.8-41.8
C323.1,123.2,341.8,141.9,341.8,165z'
      fill='#fff'
      id='path2542'
      stroke='#000000'
      strokeMiterlimit='10'
      strokeWidth='1.8429'
    />
    <path
      d='M326.1,164.9c0,14.4-11.7,26.1-26.1,26.1s-26.1-11.7-26.1-26.1c0-14.4,11.7-26,26.1-26
S326.1,150.5,326.1,164.9z'
      id='path2550'
    />
    <path
      d='M300,155.5l2.2,6.3l6.6,0.1l-5.3,4l1.9,6.3l-5.5-3.8l-5.5,3.8l1.9-6.3l-5.3-4l6.6-0.1L300,155.5z
'
      fill='#FEDF00'
      id='path2554'
      stroke='#000000'
      strokeWidth='0.3013'
    />
  </svg>
}
// Icono  de Brazil
export const IconBrazil = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    version='1.0'
    viewBox='-2100 -1470 4200 2940'
    width={size}
  >
    <rect
      fill={NorthTexasGreen}
      height='100%'
      width='100%'
      x='-50%'
      y='-50%'
    />
    <path d='m-1743 0 1743 1113 1743-1113-1743-1113z' fill='#fedf00' />
    <circle fill='#002776' r='735' />
  </svg>
}
// Icono  de Brazil
export const IconCostaRica = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 10 6'
    width={size}
  >
    <path
      d='M0,0h10v6H0z'
      fill='#002b7f'
      height={size}
      width={size}
    />
    <path
      d='M0,1h10v4H0z'
      fill='#fff'
      height={size}
      width={size}
    />
    <path
      d='M0,2h10v2H0z'
      fill='#ce1126'
      height={size}
      width={size}
    />
  </svg>
}
// Icono  de Brazil
export const IconMiniCheck = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 17 14'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      clipRule='evenodd'
      d='M2.59 6.57A1 1 0 0 0 1.19 8l5.16 5.09L16.72 2.36A1 1 0 1 0 15.28.97l-8.96 9.28-3.73-3.68z'
      fillRule='evenodd'
  ></path></svg>
}
// Icono  de Cuba
export const IconCuba = ({ style = {}, size }) => {
  return <svg
    height={size}
    id='Layer_1'
    style={style}
    version='1.1'
    viewBox='0 0 64 42'
    width={size}
    x='0px'
    y='0px'
  >

    <path
      d='M5.8,0h52.3C61.4,0,64,2.6,64,5.7v30.6c0,3.2-2.6,5.7-5.8,5.7H5.8
C2.6,42,0,39.4,0,36.3V5.7C0,2.6,2.6,0,5.8,0z'
      fill='#0038A8'
      id='Rounded_Rectangle_7_copy_1_'
    />
    <rect
      fill='#fff'
      height='8.4'
      width='64'
      y='24.9'
    />
    <rect
      fill='#fff'
      height='8.4'
      width='64'
      y='8.4'
    />
    <path d='M2.1,40.7L32.9,21L2.1,1.3C0.8,2.4,0,4,0,5.7v30.6C0,38,0.8,39.6,2.1,40.7z' fill='#CF142B' />
    <polygon
      fill='#fff'
      points='11.7,14.8 13.3,19.5 18.4,19.5 14.3,22.4 15.8,27.2 11.7,24.2 7.7,27.2 9.3,22.4 5.2,19.5 10.2,19.5
'
    />
  </svg>
}
// Icono  de USA
export const IconUSA = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    version='1.1'
    viewBox='0 0 64 42'
    width={size}
    x='0px'
    y='0px'
  >

    <rect
      fill='#fff'
      height='3.2'
      width='64'
      y='9.6'
    />
    <path d='M0,36.3c0,0.7,0.1,1.5,0.4,2.1h63.2c0.3-0.7,0.4-1.4,0.4-2.1v-1.1H0V36.3z' fill='#fff' />
    <rect
      fill='#fff'
      height='3.2'
      width='64'
      y='22.4'
    />
    <rect
      fill='#fff'
      height='3.2'
      width='64'
      y='28.8'
    />
    <rect
      fill='#fff'
      height='3.2'
      width='64'
      y='16'
    />
    <path d='M0,5.7v0.7h64V5.7c0-0.9-0.2-1.7-0.6-2.5H0.6C0.2,4,0,4.8,0,5.7z' fill='#fff' />
    <path d='M58.2,0H5.8C3.5,0,1.5,1.3,0.6,3.2h62.8C62.5,1.3,60.5,0,58.2,0z' fill='#CF142B' />
    <rect
      fill='#CF142B'
      height='3.2'
      width='64'
      y='6.4'
    />
    <rect
      fill='#CF142B'
      height='3.2'
      width='64'
      y='12.8'
    />
    <rect
      fill='#CF142B'
      height='3.2'
      width='64'
      y='19.2'
    />
    <rect
      fill='#CF142B'
      height='3.2'
      width='64'
      y='25.6'
    />
    <rect
      fill='#CF142B'
      height='3.2'
      width='64'
      y='32'
    />
    <path d='M5.8,42h52.4c2.4,0,4.5-1.5,5.4-3.6H0.4C1.3,40.5,3.3,42,5.8,42z' fill='#CF142B' />
    <path
      d='M31.5,0H5.8C4.1,0,2.6,0.7,1.6,1.8h0.7L2.6,1l0.3,0.8h0.9L3.1,2.4l0.3,0.9L2.6,2.7L1.9,3.3l0.3-0.9L1.5,1.9
C0.6,2.9,0,4.2,0,5.7v16.7h31.5V0z'
      fill='#0b0b9d'
    />
  </svg>
}
export const IconMéxico = ({ style = {}, size }) => {
  return <svg
    height={size}
    style={style}
    viewBox='0 0 64 42'
    width={size}
    x='0px'
    y='0px'
  >
    <path
      d='M5.8,0h52.3C61.4,0,64,2.6,64,5.7v30.6c0,3.2-2.6,5.7-5.8,5.7H5.8
C2.6,42,0,39.4,0,36.3V5.7C0,2.6,2.6,0,5.8,0z'
      fill='#FFFFFF'
    />
    <path d='M64,5.3v31.4c0-0.1,0-0.3,0-0.4V5.7C64,5.6,64,5.5,64,5.3z' fill='#57A863' />
    <path d='M5.8,42h15.5V0H5.8C2.6,0,0,2.6,0,5.7v30.7C0,39.5,2.6,42.1,5.8,42z' fill='#006847' />
    <path d='M58.2,42H42.7V0h15.5C61.4,0,64,2.6,64,5.7v30.7C64,39.5,61.4,42.1,58.2,42z' fill='#CE1126' />
    <circle
      cx='32'
      cy='21'
      fill='#EABC28'
      r='7'
    />
  </svg>
}
export const IconPeru = ({ size }) => {
  return <svg
    height={size}
    version='1.1'
    viewBox='0 0 64 42'
    width={size}
    x='0px'
    y='0px'
  >
    <path
      d='M5.8,0h52.3C61.4,0,64,2.6,64,5.7v30.6c0,3.2-2.6,5.7-5.8,5.7H5.8
C2.6,42,0,39.4,0,36.3V5.7C0,2.6,2.6,0,5.8,0z'
      fill='#FFFFFF'
      id='Rounded_Rectangle_7_copy'
    />
    <path d='M64,5.3v31.4c0-0.1,0-0.3,0-0.4V5.7C64,5.6,64,5.5,64,5.3z' fill='#57A863' />
    <path d='M5.8,42h15.5V0H5.8C2.6,0,0,2.6,0,5.7v30.7C0,39.5,2.6,42.1,5.8,42z' fill='#CC0000' />
    <path d='M58.2,42H42.7V0h15.5C61.4,0,64,2.6,64,5.7v30.7C64,39.5,61.4,42.1,58.2,42z' fill='#CC0000' />
  </svg>
}
export const IconPanama = ({ size }) => {
  return <svg
    height={size}
    viewBox='0 0 64 42'
    width={size}
    x='0px'
    y='0px'
  >
    <path
      d='M58.1,0H36.2h-8.4h-22C2.6,0,0,2.6,0,5.7v11.1v8.4v11.1C0,39.4,2.6,42,5.8,42h22h8.4h22
c3.2,0,5.8-2.5,5.8-5.7V25.2v-8.4V5.7C64,2.6,61.4,0,58.1,0z'
      fill='#FFFFFF'
      id='SVGID_1_'
    />
    <path d='M58.1,0H36.2H32v21h32v-4.2V5.7C64,2.6,61.4,0,58.1,0z' fill='#CF1033' />
    <path d='M0,21v4.2v11.1C0,39.4,2.6,42,5.8,42h22H32V21H0z' fill='#0063C0' />
    <polygon fill='#0063C0' points='16.1,4.9 17.4,9.1 21.9,9.1 18.3,11.7 19.7,16 16.1,13.3 12.5,16 13.8,11.7 10.2,9.1 14.7,9.1 ' />
    <polygon fill='#CF1033' points='48,24.4 49.4,28.6 53.8,28.6 50.2,31.2 51.6,35.5 48,32.8 44.4,35.5 45.8,31.2 42.2,28.6 46.6,28.6 ' />
  </svg>
}
export const IconRepublDom = ({ size }) => {
  return <svg
    height={size}
    viewBox='0 0 64 42'
    width={size}
    x='0px'
    y='0px'
  >
    <path d='M27.8,0h-22C2.6,0,0,2.6,0,5.7v11.1h27.8V0z' fill='#002D61' />
    <path d='M0,25.2v11.1C0,39.4,2.6,42,5.8,42h22V25.2H0z' fill='#CF1033' />
    <path d='M58.1,0H36.2v16.8H64V5.7C64,2.6,61.4,0,58.1,0z' fill='#CF1033' />
    <path d='M36.2,42h22c3.2,0,5.8-2.5,5.8-5.7V25.2H36.2V42z' fill='#002D61' />
    <polygon
      fill='#fff'
      points='36.2,0 27.8,0 27.8,16.8 0,16.8 0,25.2 27.8,25.2 27.8,42 36.2,42 36.2,25.2 64,25.2 64,16.8
36.2,16.8 '
    />
    <circle
      cx='32'
      cy='21'
      fill='#1F714D'
      r='4.3'
    />
  </svg>
}
export const IconPause = ({ style = {}, size, color }) => {
  return <svg
    data-name='Capa 1'
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 63 63'
    width={size}
  ><circle
      cx='31.5'
      cy='31.5'
      fill='transparent'
      r='31'
  /><path d='M125,19.5A30.5,30.5,0,1,1,94.5,50,30.53,30.53,0,0,1,125,19.5m0-1A31.5,31.5,0,1,0,156.5,50,31.5,31.5,0,0,0,125,18.5Z' transform='translate(-93.5 -18.5)' /><rect
      height='29'
      width='9'
      x='16'
      y='17'
  /><path d='M118,36V64h-8V36h8m1-1H109V65h10V35Z' transform='translate(-93.5 -18.5)' /><rect
      height='29'
      width='9'
      x='38'
      y='17'
  /><path d='M140,36V64h-8V36h8m1-1H131V65h10V35Z' transform='translate(-93.5 -18.5)' /></svg>
}
export const IconPrint = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    id='Capa_1'
    style={style}
    version='1.1'
    viewBox='0 0 573.75 573.75'
    width={size}
    x='0px'
    xmlns='http://www.w3.org/2000/svg'
    y='0px'
  >

    <rect
      height='19.125'
      width='286.875'
      x='143.438'
      y='439.875'
    />
    <rect
      height='19.125'
      width='286.875'
      x='143.438'
      y='497.25'
    />
    <circle
      cx='449.438'
      cy='267.75'
      r='19.125'
    />
    <path
      d='M506.812,172.125h-38.25V38.25c0-21.038-17.213-38.25-38.25-38.25H143.438c-21.038,0-38.25,17.212-38.25,38.25v133.875
       h-38.25c-32.513,0-57.375,24.862-57.375,57.375v172.125C9.562,434.138,34.425,459,66.938,459h38.25v76.5
       c0,21.037,17.212,38.25,38.25,38.25h286.875c21.037,0,38.25-17.213,38.25-38.25V459h38.25c32.513,0,57.375-24.862,57.375-57.375
       V229.5C564.188,196.987,539.325,172.125,506.812,172.125z M124.312,38.25c0-9.562,7.65-19.125,19.125-19.125h286.875
       c9.562,0,19.125,7.65,19.125,19.125v133.875H124.312V38.25z M449.438,535.5c0,9.562-7.65,19.125-19.125,19.125H143.438
       c-9.562,0-19.125-7.65-19.125-19.125V401.625h325.125V535.5z M545.062,401.625c0,21.037-17.213,38.25-38.25,38.25h-38.25V382.5
       H105.188v57.375h-38.25c-21.038,0-38.25-17.213-38.25-38.25V229.5c0-21.038,17.212-38.25,38.25-38.25h439.875
       c21.037,0,38.25,17.212,38.25,38.25V401.625z'
    />
  </svg>
}

export const IconNotification = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 32 32'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M28.2267 12.4802C28.7734 12.4802 29.2267 12.0268 29.2267 11.4802V6.48016C29.2267 5.20016 28.1867 4.16016 26.8934 4.16016H4.9334C3.6534 4.16016 2.6134 5.20016 2.6134 6.48016V18.8535C2.6134 20.1335 3.66674 21.1868 4.94674 21.1868H8.94674V26.8402C8.94674 27.2402 9.1734 27.6002 9.54674 27.7602C9.68007 27.8135 9.8134 27.8402 9.94674 27.8402C10.1867 27.8402 10.4267 27.7468 10.6134 27.5735L17.6401 21.1868H26.9067C28.1867 21.1868 29.2267 20.1468 29.2267 18.8668V17.9335C29.2267 17.3868 28.7734 16.9335 28.2267 16.9335C27.6801 16.9335 27.2267 17.3868 27.2267 17.9335V18.8668C27.2267 19.0402 27.0801 19.1868 26.9067 19.1868H17.2534C17.0001 19.1868 16.7601 19.2802 16.5867 19.4535L10.9467 24.5868V20.2002C10.9467 19.6535 10.4934 19.2002 9.94674 19.2002H4.94674C4.76007 19.2002 4.6134 19.0535 4.6134 18.8668V6.49349C4.6134 6.32016 4.76007 6.17349 4.9334 6.17349H26.8934C27.0667 6.17349 27.2134 6.32016 27.2134 6.49349V11.4802C27.2267 12.0268 27.6667 12.4802 28.2267 12.4802Z'
      fill='red'
      height={size}
      width={size}
  ></path><path d='M11.9334 14.2132C12.6256 14.2132 13.1867 13.6521 13.1867 12.9599C13.1867 12.2677 12.6256 11.7065 11.9334 11.7065C11.2412 11.7065 10.6801 12.2677 10.6801 12.9599C10.6801 13.6521 11.2412 14.2132 11.9334 14.2132Z'></path><path d='M19.9335 14.1862C20.6109 14.1862 21.1601 13.637 21.1601 12.9596C21.1601 12.2821 20.6109 11.7329 19.9335 11.7329C19.256 11.7329 18.7068 12.2821 18.7068 12.9596C18.7068 13.637 19.256 14.1862 19.9335 14.1862Z'></path><path d='M15.9333 14.2532C16.6476 14.2532 17.2267 13.6741 17.2267 12.9598C17.2267 12.2455 16.6476 11.6665 15.9333 11.6665C15.2191 11.6665 14.64 12.2455 14.64 12.9598C14.64 13.6741 15.2191 14.2532 15.9333 14.2532Z'></path></svg>
}
export const IconPromo = ({ style = {}, size, color }) => {
  return <svg
    fill={color}
    height={size}
    style={style}
    viewBox='0 0 32 32'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M28.2267 12.4802C28.7734 12.4802 29.2267 12.0268 29.2267 11.4802V6.48016C29.2267 5.20016 28.1867 4.16016 26.8934 4.16016H4.9334C3.6534 4.16016 2.6134 5.20016 2.6134 6.48016V18.8535C2.6134 20.1335 3.66674 21.1868 4.94674 21.1868H8.94674V26.8402C8.94674 27.2402 9.1734 27.6002 9.54674 27.7602C9.68007 27.8135 9.8134 27.8402 9.94674 27.8402C10.1867 27.8402 10.4267 27.7468 10.6134 27.5735L17.6401 21.1868H26.9067C28.1867 21.1868 29.2267 20.1468 29.2267 18.8668V17.9335C29.2267 17.3868 28.7734 16.9335 28.2267 16.9335C27.6801 16.9335 27.2267 17.3868 27.2267 17.9335V18.8668C27.2267 19.0402 27.0801 19.1868 26.9067 19.1868H17.2534C17.0001 19.1868 16.7601 19.2802 16.5867 19.4535L10.9467 24.5868V20.2002C10.9467 19.6535 10.4934 19.2002 9.94674 19.2002H4.94674C4.76007 19.2002 4.6134 19.0535 4.6134 18.8668V6.49349C4.6134 6.32016 4.76007 6.17349 4.9334 6.17349H26.8934C27.0667 6.17349 27.2134 6.32016 27.2134 6.49349V11.4802C27.2267 12.0268 27.6667 12.4802 28.2267 12.4802Z'
      fill='red'
      height={size}
      width={size}
  ></path><path d='M11.9334 14.2132C12.6256 14.2132 13.1867 13.6521 13.1867 12.9599C13.1867 12.2677 12.6256 11.7065 11.9334 11.7065C11.2412 11.7065 10.6801 12.2677 10.6801 12.9599C10.6801 13.6521 11.2412 14.2132 11.9334 14.2132Z'></path><path d='M19.9335 14.1862C20.6109 14.1862 21.1601 13.637 21.1601 12.9596C21.1601 12.2821 20.6109 11.7329 19.9335 11.7329C19.256 11.7329 18.7068 12.2821 18.7068 12.9596C18.7068 13.637 19.256 14.1862 19.9335 14.1862Z'></path><path d='M15.9333 14.2532C16.6476 14.2532 17.2267 13.6741 17.2267 12.9598C17.2267 12.2455 16.6476 11.6665 15.9333 11.6665C15.2191 11.6665 14.64 12.2455 14.64 12.9598C14.64 13.6741 15.2191 14.2532 15.9333 14.2532Z'></path></svg>
}