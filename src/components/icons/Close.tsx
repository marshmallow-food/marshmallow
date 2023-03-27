import React from 'react';
import {SvgXml} from 'react-native-svg';

const close = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_598_1106)">
<circle cx="15" cy="15" r="15" fill="#D9D9D9"/>
<g clip-path="url(#clip1_598_1106)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5704 9.57041C10.4765 9.66429 10.4765 9.8165 10.5704 9.91038L15.16 14.5L10.5704 19.0896C10.4765 19.1835 10.4765 19.3357 10.5704 19.4296C10.6643 19.5235 10.8165 19.5235 10.9104 19.4296L15.5 14.84L20.0896 19.4296C20.1835 19.5235 20.3357 19.5235 20.4296 19.4296C20.5235 19.3357 20.5235 19.1835 20.4296 19.0896L15.84 14.5L20.4296 9.91038C20.5235 9.8165 20.5235 9.66429 20.4296 9.57041C20.3357 9.47653 20.1835 9.47653 20.0896 9.57041L15.5 14.16L10.9104 9.57041C10.8165 9.47653 10.6643 9.47653 10.5704 9.57041Z" fill="black"/>
</g>
</g>
<defs>
<clipPath id="clip0_598_1106">
<rect width="30" height="30" fill="white"/>
</clipPath>
<clipPath id="clip1_598_1106">
<rect width="10" height="10" fill="white" transform="translate(10.5 9.5)"/>
</clipPath>
</defs>
</svg>
`;

function Close() {
  return <SvgXml xml={close} />;
}

export default Close;
