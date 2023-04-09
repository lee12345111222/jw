import styles from './account.module.css';

import copyIcon from '@/assets/icon/copy.png';
import ethIcon from '@/assets/icon/san.png';
import coming from '@/assets/img/coming2.png';

const Account = ({ account, balance }) => {
  return (
    <div className={styles.page}>
      <div className={styles['left-side']}>
        <div className={styles['head-img']}></div>

        <Info
          title="Nick Name"
          info={
            <>
              <div style={{ fontWeight: '600' }}>{account?.slice(2, 11)}</div>
              <img
                src={copyIcon}
                alt=""
                style={{ width: '18px', marginLeft: '8px' }}
              />
            </>
          }
        />
        <Info title="E-mail" info="-" />
        {/* <Info
          title="Passwod"
          info={<div className={styles.btn}>Reset Password</div>}
        /> */}
      </div>

      <div className={styles['right-side']}>
        <div className={styles.wollet}>
          <Info
            title={
              <>
                <img
                  src={ethIcon}
                  alt=""
                  style={{ height: '36px', marginRight: '8px' }}
                />
                <div style={{ color: '#fff' }}>{balance}</div>
              </>
            }
            titleSize="42px"
            // info={'$14458.86'}
            infoSize="20px"
          />
          <Info
            title="Wallet Address"
            info={
              <>
                <div>{account}</div>
                <img
                  src={copyIcon}
                  alt=""
                  style={{ width: '18px', marginLeft: '8px' }}
                />
              </>
            }
            titleSize="17px"
            infoSize="20px"
          />
        </div>
        <div className={styles.news}>
          <div className={styles['news-title']}>Status</div>
          <div className={styles.coming}>
            <img src={coming} alt="" />
            <div>
              <div>Coming soon</div>
              <div style={{ opacity: 0.65, fontSize: '12px' }}>
                Features will be online soon, stay tuned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

const Info = ({ title, info, titleSize, infoSize }) => (
  <div className={styles.info}>
    <Label title={title} size={titleSize} />
    <Item info={info} size={infoSize} />
  </div>
);

const Label = ({ title, size }) => (
  <div
    className={styles.label}
    style={{ fontSize: size || '14px', lineHeight: size || '14px' }}
  >
    {title}
  </div>
);
const Item = ({ info, size }) => (
  <div
    className={styles['info-item']}
    style={{ fontSize: size || '16px', lineHeight: size || '16px' }}
  >
    {info}
  </div>
);
