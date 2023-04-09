import { Select } from 'antd';

import logoIcon from '@/assets/img/media/logo.png';

export default function Header(props) {
  const menu = ['Description', 'Branding', 'Images', 'News'];
  const { cx, activeIndex, onHandleMenu, arrow } = props;

  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className={cx('mediaHeadBox')}>
        <div className={cx('headContent')}>
          <img className={cx('medaiaHeadLeft')} src={logoIcon} alt="" />
          <div className={cx('medaiaHeadMenu')}>
            {menu.map((item, index) => {
              return (
                <a
                  key={`media-header-${item}`}
                  href={`#${item}`}
                  onClick={() => {
                    onHandleMenu(index, item);
                  }}
                  className={cx(
                    'medaiaMenuItem',
                    `${activeIndex === index ? 'menuActive' : ''}`
                  )}>
                  {item}
                </a>
              );
            })}
          </div>
          <div className={cx('medaiaHeadRight')}>
            <Select
              defaultValue="English"
              style={{ width: 100 }}
              bordered={false}
              onChange={handleChange}
              options={[
                {
                  value: 'English',
                  label: 'English'
                }
              ]}
              className={cx('language')}
            />
          </div>
        </div>
      </div>
    </>
  );
}
