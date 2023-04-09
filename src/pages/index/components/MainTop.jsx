import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MainBtn from './../../../components/MainBtn';

import bg from './../../../assets/img/bg.png';

const imgWidth = 1920;
const imgHeight = 876;
const height = imgHeight / imgWidth;

const styles = makeStyles({
  bg: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    position: 'absolute',
    width: '100vw',
    height: `calc(100vw * ${height})`,
    top: 0,
    left: 0,
    zIndex: -9
  },
  bgCover: {
    backgroundImage:
      'linear-gradient(to bottom, rgba(11, 51, 90, 0), rgba(11, 51, 90, 1))',
    position: 'absolute',
    width: '100vw',
    height: `calc(100vw * ${height} - 100vw * ${height} / 3.5 + 2px)`,
    top: `calc(100vw * ${height} / 3.5)`,
    left: 0,
    zIndex: -9
  },
  titleBox: {
    height: `calc(100vw * ${height} - 56px)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    boxSizing: 'border-box',
    '& > *': {
      margin: '20px 0'
    }
  },
  mainTitle: {
    fontSize: '56px'
  },
  secondTitle: {
    fontSize: '24px'
  },
  downIcon: {
    marginTop: '64px'
  }
});

export default function MainTop(props) {
  const classes = styles();

  return (
    <Box>
      <div className={classes.bg}></div>
      <div className={classes.bgCover}></div>

      <div className={classes.titleBox}>
        <div className={classes.mainTitle}>{props.mainTitle}</div>
        <div className={classes.secondTitle}>{props.secondTitle}</div>
        <MainBtn
          style={{ fontSize: '24px', padding: '3px 34px' }}
          text={props.btnText}
        />
        <ExpandMoreIcon className={classes.downIcon} />
      </div>
    </Box>
  );
}
