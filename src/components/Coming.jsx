import styled from 'styled-components';
import coming from './../assets/img/coming.png';

import { useTranslation } from 'react-i18next';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const P = styled.p`
  font-size: 16px;
  color: #6ca7d1;
  margin: 0;
  margin-top: 16px;
`;

export default function Coming() {
  const { t } = useTranslation();
  return (
    <Box>
      <img style={{ width: '290px' }} src={coming} alt="" />
      <P>{t('app.message.coming')}</P>
      {/* <span style={{ fontSize: '12px', color: 'rgba(108, 167, 209, .65)' }}>
        //
      </span> */}
    </Box>
  );
}
