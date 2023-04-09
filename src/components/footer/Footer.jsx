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
        <div>
          <Nav>
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

            <NavItem onClick={() => history.push('/earn')}>
              {t('nav.earn')}
            </NavItem>
            <NavItem onClick={() => history.push('/create')}>
              {t('nav.create')}
            </NavItem>
            <NavItem onClick={() => history.push('/map')}>
              {t('nav.map')}
            </NavItem>
            <NavItem onClick={() => history.push('/discover')}>
              {t('nav.discover')}
            </NavItem>
            <NavItem onClick={() => history.push('/market')}>
              {t('nav.market')}
            </NavItem>
            <NavItem onClick={() => history.push('/mysterybox')}>
              {t('nav.event')}
            </NavItem>
            <NavItem
              onClick={() => window.open('https://playerone.gitbook.io/doc/')}>
              {t('nav.documentation')}
            </NavItem>
            <NavItem onClick={() => history.push('/aboutus')}>
              {t('About Us')}
            </NavItem>
          </Nav>
          <Copyright>Copyright ©2023 PlayerOne</Copyright>
        </div>
      </Flex>
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
  padding: 40px 78px;
  gap: 40px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const ImgBox = styled.div`
  height: 40px;
  & img {
    height: 100%;
  }
`;

const Copyright = styled.div`
  margin-top: 12px;
  @media (max-width: 800px) {
    margin-top: 24px;
    text-align: center;
  }
`;
