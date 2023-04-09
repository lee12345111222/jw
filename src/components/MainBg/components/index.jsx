import Stars from './stars/index';

import giantLeft from '../assets/giant-left.png';
import giantRight from '../assets/giant-right.png';
import mountain from '../assets/mountain.png';
import river from '../assets/river.png';
import ufoLeft from '../assets/ufo-left.png';
import ufoLeftLignt from '../assets/ufo-left_light.png';
import ufoRight from '../assets/ufo-right.png';
import ufoRightLignt from '../assets/ufo-right_light.png';
import humanLeft from '../assets/human-left.png';
import HumanLeftLignt from '../assets/human-left_light.png';
import HumanRight from '../assets/human-right.png';
import HumanRightLignt from '../assets/human-right_light.png';
import table from '../assets/table.png';

import latticeImg from '../assets/lattice.svg';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Layer = ({ children, className, style }) => {
  return (
    <div className={cx('layer', className)} style={style}>
      {children}
    </div>
  );
};

const Image = ({ src, className }) => {
  return <img className={cx('img', className)} src={src} alt="" />;
};

const GiantLeft = () => {
  return (
    <div className={cx('giant', 'giant-left')}>
      <Image src={giantLeft} />
    </div>
  );
};

const GiantRight = () => {
  return (
    <div className={cx('giant', 'giant-right')}>
      <Image src={giantRight} />
    </div>
  );
};

const Giants = () => {
  return (
    <Layer className={cx('giants')}>
      <GiantLeft />
      <GiantRight />
    </Layer>
  );
};

const Montian = () => {
  return (
    <Layer className={cx('montian')}>
      <Image src={mountain} />
    </Layer>
  );
};

const River = () => {
  return (
    <div
      className={cx('river')}
      style={{ backgroundImage: `url(${river})` }}></div>
  );
};

const Lattice = () => {
  return (
    <Layer
      style={{
        backgroundImage: `url(${latticeImg})`,
        opacity: 0.75
      }}></Layer>
  );
};

const UFTLeft = () => (
  <div className={cx('ufo-container')}>
    <Image src={ufoLeft} />
    <Image className={cx('heartbeat', 'ufo-light')} src={ufoLeftLignt} />
  </div>
);
const UFTRight = () => (
  <div className={cx('ufo-container')}>
    <Image src={ufoRight} />
    <Image className={cx('heartbeat', 'ufo-light')} src={ufoRightLignt} />
  </div>
);

const UFO = () => {
  return (
    <Layer>
      <div className={cx('ufo')}>
        <UFTLeft />
        <UFTRight />
      </div>
    </Layer>
  );
};

export const Sky = () => {
  return (
    <>
      <Giants />
      <Montian />
      <Stars />
      <UFO />
      <Lattice />
    </>
  );
};

const Road = () => (
  <Layer className={cx('road-container')}>
    <River />
    <div className={cx('road')}></div>
  </Layer>
);

const HumansLeft = () => (
  <div className={cx('human-left')}>
    <Image src={humanLeft} />
    <Image className={cx('heartbeat', 'human-light')} src={HumanLeftLignt} />
  </div>
);

const HumansRight = () => (
  <div className={cx('human-right')}>
    <Image src={HumanRight} />
    <Image className={cx('heartbeat', 'human-light')} src={HumanRightLignt} />
  </div>
);

const Humans = () => (
  <Layer>
    <div className={cx('humans')}>
      <HumansLeft />
      <HumansRight />
    </div>
  </Layer>
);

const Table = () => {
  return (
    <Layer className={cx('table-container')}>
      <div className={cx('table')}>
        <Image src={table} />
      </div>
    </Layer>
  );
};

export const Land = () => {
  return (
    <>
      <Road />
      <Humans />
      <Table />
    </>
  );
};
