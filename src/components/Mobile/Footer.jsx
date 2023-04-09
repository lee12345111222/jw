import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import useHistory from '@/hooks/useHistory';

import logo from '@/assets/img/index/logo.png';

export default function Footer() {
  const history = useHistory();

  const { t } = useTranslation();

  return (
    <Box>
      <Flex>
        <ImgBox>
          <img src={logo} alt="" />
        </ImgBox>
      </Flex>
      <Flex>
        <Box1>
          <NavItem
            onClick={() => {
              document.querySelector('#logo-img').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
              });
            }}>
            {t('footer.homepage')}
          </NavItem>
          <NavItem onClick={() => history.push('/create')}>
            {t('nav.create')}
          </NavItem>
          <NavItem onClick={() => history.push('/discover')}>
            {t('nav.discover')}
          </NavItem>
          <NavItem onClick={() => history.push('/mysterybox')}>
            {t('nav.event')}
            {/* <spam>Mystery Box</spam> */}
          </NavItem>
        </Box1>
        <Box2>
          <NavItem onClick={() => history.push('/earn')}>
            {t('nav.earn')}
          </NavItem>
          <NavItem onClick={() => history.push('/map')}>{t('nav.map')}</NavItem>
          <NavItem onClick={() => history.push('/market')}>
            {t('nav.market')}
          </NavItem>
          <NavItem
            onClick={() => window.open('https://playerone.gitbook.io/doc/')}>
            {t('nav.documentation')}
          </NavItem>
        </Box2>
        {/* <NavItem onClick={() => history.push('/aboutus')}>
                {t('About Us')}
              </NavItem> */}
      </Flex>
      <Copyright>Copyright ©2021 FirstLife</Copyright>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(90deg, #3d0e7a 0%, #220844 100%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  padding: 30px 78px;
  gap: 20px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

const Box1 = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //background: linear-gradient(90deg, #3d0e7a 0%, #220844 100%);
  //color: rgba(255, 255, 255, 0.5);

  padding: 10px 30px 10px 95px;
  gap: 10px;
`;

const Box2 = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //background: linear-gradient(90deg, #3d0e7a 0%, #220844 100%);
  //color: rgba(255, 255, 255, 0.5);

  padding: 10px 95px 10px 30px;
  gap: 10px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    gap: 16px 40px;
    justify-content: center;
  }
`;

const NavItem = styled.div`
  text-align: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const ImgBox = styled.div`
  height: 25px;
  width: 166px;
  & img {
    height: 100%;
    width: 100%;
  }
`;

const Copyright = styled.div`
  //margin-top: 12px;
  @media (max-width: 800px) {
    //margin-top: 24px;
    text-align: center;
  }
`;
