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
  margin: 16px 0;
`;

export default function NoData({ show }) {
  const { t } = useTranslation();
  if (show) {
    return (
      <Box>
        <img style={{ width: '290px' }} src={coming} alt="" />
        <P>{t('app.status.no_content')}</P>
        {/* no content yet */}
      </Box>
    );
  } else return '';
}
