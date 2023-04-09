import styles from './Cards.module.css';

import BorderedBox from '../BorderedBox2/index';

import ImageBox from '../ImageBox/index';

import VideoPlayer from '../videoPlayer/index';

export const BasicCard = ({
  img,
  aspectRatio,
  hoverable,
  pointer,
  title,
  children,
  onClick,
  disable,
  imgIcon,
  detailStyle,
  lightImg
}) => {
  return (
    <Card
      hoverable={hoverable}
      pointer={pointer}
      disable={disable}
      onClick={!disable ? onClick : () => {}}>
      <div style={{ position: 'relative' }}>
        <ImageBox src={img} aspectRatio={aspectRatio} lightSrc={lightImg} />
        {imgIcon}
      </div>
      <Details style={detailStyle}>
        <Title>{title}</Title>
        {children}
      </Details>
    </Card>
  );
};

export const VideoCard = ({
  poster,
  video,
  tokenId,
  currentId,
  onPlay,
  hoverable,
  pointer,
  title,
  children,
  onClick,
  disable
}) => {
  return (
    <Card
      hoverable={hoverable}
      pointer={pointer}
      disable={disable}
      onClick={!disable ? onClick : () => {}}>
      <VideoPlayer
        index={tokenId}
        current={currentId}
        loop
        onPlay={onPlay}
        video={video}
        poster={poster}
      />
      <Details>
        <Title>{title}</Title>
        {children}
      </Details>
    </Card>
  );
};

export const InfoBoxContainer = ({ children }) => (
  <div className={styles['info-box-container']}>{children}</div>
);

export const InfoBox1 = ({ children, width }) => {
  return (
    <BorderedBox bgColor="#ffb732" borderColor="#ffb732" width={width}>
      <div className={styles['info-box']}>{children}</div>
    </BorderedBox>
  );
};

export const InfoBox2 = ({ children, width }) => {
  return (
    <BorderedBox bgColor="#ac5cff" borderColor="#ac5cff" width={width}>
      <div className={styles['info-box']}>{children}</div>
    </BorderedBox>
  );
};

const Card = ({
  hoverable = true,
  pointer = true,
  children,
  onClick,
  disable
}) => (
  <div className={disable ? styles.disable : ''}>
    <div
      onClick={onClick}
      className={`${styles['basic-card-container']} ${
        hoverable ? styles.hoverable : ''
      } ${pointer ? styles.pointer : ''}`}>
      {children}
    </div>
  </div>
);

const Details = ({ children, style }) => (
  <div className={styles.details} style={style}>
    {children}
  </div>
);

const Title = ({ children }) => <div className={styles.title}>{children}</div>;
