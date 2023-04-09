import styled from 'styled-components';

export const ToolBox = styled.div`
  position: absolute;
  top: ${(props) => props?.top};
  right: ${(props) => props?.right};
  bottom: ${(props) => props?.bottom};
  left: ${(props) => props?.left};
  background-color: rgb(26, 32, 38);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #323232;
  z-index: 999;
  &:focus {
    outline: none;
  }
`;

export const ImgBox = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #323232;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  & img {
    width: 20px;
    height: 20px;
  }
`;

export const SearchBox = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

export const SearchItem = styled.div`
  & + & {
    border-top: 1px solid #323232;
  }
  padding: 4px 8px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.24);
  }
`;

export const Btn = styled.div`
  width: 80px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #748afc;
  border-radius: 4px;
  color: #748afc;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: hsla(230, 95%, 88%, 0.24);
  }
`;

export const MinTitle = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 12px;
`;

var LogoSvg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg1.setAttribute('viewBox', '0 0 29 33');
LogoSvg1.setAttribute('fill', 'none');
LogoSvg1.setAttribute('width', '29');
LogoSvg1.setAttribute('height', '32');

LogoSvg1.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

var LogoSvg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg2.setAttribute('viewBox', '0 0 29 33');
LogoSvg2.setAttribute('fill', 'none');
LogoSvg2.setAttribute('width', '29');
LogoSvg2.setAttribute('height', '32');

LogoSvg2.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

var LogoSvg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg3.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg3.setAttribute('viewBox', '0 0 29 33');
LogoSvg3.setAttribute('fill', 'none');
LogoSvg3.setAttribute('width', '29');
LogoSvg3.setAttribute('height', '32');

LogoSvg3.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

var LogoSvg4 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg4.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg4.setAttribute('viewBox', '0 0 29 33');
LogoSvg4.setAttribute('fill', 'none');
LogoSvg4.setAttribute('width', '29');
LogoSvg4.setAttribute('height', '32');

LogoSvg4.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

var LogoSvg5 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg5.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg5.setAttribute('viewBox', '0 0 29 33');
LogoSvg5.setAttribute('fill', 'none');
LogoSvg5.setAttribute('width', '29');
LogoSvg5.setAttribute('height', '32');

LogoSvg5.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

var LogoSvg6 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg6.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg6.setAttribute('viewBox', '0 0 29 33');
LogoSvg6.setAttribute('fill', 'none');
LogoSvg6.setAttribute('width', '29');
LogoSvg6.setAttribute('height', '32');

LogoSvg6.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

var LogoSvg7 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg7.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg7.setAttribute('viewBox', '0 0 29 33');
LogoSvg7.setAttribute('fill', 'none');
LogoSvg7.setAttribute('width', '29');
LogoSvg7.setAttribute('height', '32');

LogoSvg7.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

var LogoSvg8 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
LogoSvg8.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
LogoSvg8.setAttribute('viewBox', '0 0 29 33');
LogoSvg8.setAttribute('fill', 'none');
LogoSvg8.setAttribute('width', '29');
LogoSvg8.setAttribute('height', '32');

LogoSvg8.innerHTML =
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.28506 10.0323L14.0943 16.273L28.1871 8.13649L14.0943 0L14.0936 0.000413504L14.0929 0L0 8.13654V24.4096L14.0929 32.5462L28.1858 24.4096V11.3477L25.0344 13.1699V13.1587L14.077 19.4849V26.2589L25.0107 19.9464V22.794L14.0533 29.1203L3.09586 22.794V10.1415L3.28506 10.0323Z" fill="white" />';

const ragion = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
ragion.setAttribute('viewBox', '0 0 744 1460');
ragion.setAttribute('fill', 'none');
ragion.setAttribute('width', '744');
ragion.setAttribute('height', '1460');

ragion.innerHTML = `<g opacity="0.7">
<path d="M742.976 961.287H656.231V883.054H548.547V765.705H565.497V685.358H528.605V585.981H543.561V522.549V453.831M543.561 453.831H509.661M543.561 453.831V410.486H581.45V319.566H743.973" stroke="#547770" stroke-width="6"/>
<path d="M547.657 883.183H484.292V1035.94H453.6V1161.31H435.778V1279.31H484.292V1457.35" stroke="#547770" stroke-width="6"/>
<path d="M184.578 963.398H259.572V1039.39H279.57V1199.82H209.576V1397.19H259.572V1459.47" stroke="#547770" stroke-width="6"/>
<path d="M279.57 1094.28H344.069V1128.05H435.778V1161.82" stroke="#547770" stroke-width="6"/>
<path d="M260.572 0.817383V163.066H207.44V318.992H227.49V409.599H207.44V532.865H91.1518V585.543H0.928223" stroke="#547770" stroke-width="6"/>
<path d="M0.928223 1035.17H72.8904H182.833V995.103V945.547V891.773H203.821V797.933H229.808V680.896H203.821V586.001H91.8804V534.336M430.702 0.817383V122.071H483.674V322.404H509.661V454.203H430.702V556.478H317.262V524.846H207.819" stroke="#547770" stroke-width="6"/>
</g>`;
