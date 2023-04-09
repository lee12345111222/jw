import styled from 'styled-components';

// import Dialog from './Dialog';
import Dialog from './proto-ui/dialog/index';

import closeIcon from '@/assets/icon/closeIcon.png';

const PlayerBox = styled.div`
  width: ${(props) => props.width || '100%'};
  position: relative;
  overflow: hidden;

  & video {
    width: 100%;
    max-width: 100vw;
    max-height: 100vh;
    display: block;
    object-fit: fill;
  }
`;

export default function MainVideo({ src, poster, show, onCancel }) {
  return (
    <Dialog open={show} onCancel={onCancel} onEscape={onCancel}>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgb(35, 34, 39)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {show ? (
          <PlayerBox width="60%">
            <video
              style={{
                outline: 'none'
              }}
              controls
              src={src}
              muted
              autoPlay
              poster={poster}
              loop
            ></video>
          </PlayerBox>
        ) : (
          ''
        )}

        <div
          onClick={onCancel}
          style={{
            width: '24px',
            position: 'absolute',
            top: '32px',
            right: '32px',
            cursor: 'pointer'
          }}
        >
          <img style={{ width: '100%' }} src={closeIcon} alt="" />
        </div>
      </div>
    </Dialog>
  );
}
