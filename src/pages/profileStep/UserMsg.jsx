import { memo } from 'react';
import styles from './index.module.css';
import BorderedBtn from '@/components/BorderedBtn2/index';
import Avatar from './assets/avatar.png';

import Eth from './assets/eth.png';
import Polygon from './assets/polygan.png';
import Twitter from './assets/twitter.png';
import Dc from './assets/dc.png';
import useHistory from '@/hooks/useHistory';
import { useSelector } from 'react-redux';

export const UserMsg = memo(() => {
  const name = useSelector(state => {
    //console.log(state, 'state');
    return state.user.name;
  });
  const history = useHistory();
  return (
    <div className={styles['card-user-content']}>
      <div className={styles['card-user-info']}>
        <div className={styles['card-user-avatar']}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={styles['card-user-name']}>LILIAN0802</div>
          <div className={styles['card-user-id']}>0x7396b4...751f9f0c8</div>
          <div className={styles['card-user-icon']}>
            <img src={Eth} alt="" />
            <img src={Polygon} alt="" />
            <div className={styles['card-user-line']}></div>
            <img src={Twitter} alt="" />
            <img src={Dc} alt="" />
          </div>
        </div>
      </div>
      <div className={styles['user-edit']}>
        <BorderedBtn width="88px" onClick={() => history.push('/profileEdit')}>
          Edit
        </BorderedBtn>
      </div>
    </div>
  );
});
