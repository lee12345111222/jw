import { makeStyles } from '@material-ui/core/styles';

import item from './../../../assets/item001.png';

const styles = makeStyles({
  item: {
    width: 'calc(25% - 16px)',
    borderRadius: '6px',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '12px 12px 16px rgba(0, 0, 0, .24)'
    },
    '& img': {
      width: '100%'
    }
  }
});

export default function ExploreItem() {
  const classes = styles();

  return (
    <div className={classes.item}>
      <img src={item} alt="" />
    </div>
  );
}
