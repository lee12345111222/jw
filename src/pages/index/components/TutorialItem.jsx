import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  item: {
    backgroundColor: '#154779',
    display: 'flex',
    padding: '24px 46px',
    marginTop: '32px',
    borderRadius: '6px',
    '&:hover': {
      boxShadow: '12px 12px 16px rgba(0, 0, 0, .24)'
    }
  },
  image: {
    width: '184px',
    height: '224px',
    borderRadius: '6px'
  },
  infoBox: {
    marginLeft: '24px'
  },
  title: {
    color: '#fff',
    fontSize: '22px'
  },
  subTitle: {
    color: 'rgba(255, 255, 255, .5)',
    fontWeight: 700,
    margin: '16px 0'
  },
  content: {
    //   fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(255, 255, 255, .35)',
    //   margin: '16px 0'
    marginTop: '32px'
  }
});

export default function TutorialItem(props) {
  const classes = styles();

  return (
    <div className={classes.item}>
      <div>
        <img className={classes.image} src={props.data.image} alt="" />
      </div>
      <div className={classes.infoBox}>
        <div className={classes.title}>{props.data.title}</div>
        <div className={classes.subTitle}>{props.data.subTitle}</div>
        <div className={classes.content}>{props.data.content}</div>
      </div>
    </div>
  );
}
