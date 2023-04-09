import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = makeStyles({
  list: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    marginBottom: '32px'
  },
  title: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '22px'
  },
  translation: {
    color: '#668FBE',
    fontSize: '22px',
    marginLeft: '8px'
  },
  desc: {
    color: 'rgba(102, 143, 190, .45)',
    marginLeft: '24px'
  },
  more: {
    color: '#668FBE',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

export default function ListTitle(props) {
  const classes = styles();

  return (
    <div className={classes.list}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.translation}>{props.translation}</div>
      <div className={classes.desc}>{props.desc}</div>
      <div className={classes.more}>
        <span>{props.more}</span>
        <ChevronRightIcon />
      </div>
    </div>
  );
}
