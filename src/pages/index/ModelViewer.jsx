// import '@google/model-viewer';
import voxelplay from '@/assets/img/voxelplay.png';

import { static_server } from '@/constant/env/index';

const SERVER = `${static_server}/role_player`;

export default function ModelViewer({ animationName }) {
  return (
    <model-viewer
      disable-zoom
      src={`${SERVER}/role.glb`}
      autoplay
      camera-controls
      animation-name={animationName}
      shadow-intensity="2.4"
      shadow-softness="0.64"
      environment-image={`${SERVER}/pond_bridge_night_1k.hdr`}
      style={{
        background:
          'linear-gradient(180deg, #242453 0%, #30306F 7.63%, #4848A6 100%)',
        height: '100%',
        width: '100%',
        '&::part(defaultProgressMask)': {
          background: 'rgba(255, 255, 255, 0) !important'
        }
      }}
      exposure="1">
      <div
        id="lazy-load-poster"
        style={{ backgroundImage: `url(${voxelplay})` }}
        slot="poster"></div>
    </model-viewer>
  );
}
