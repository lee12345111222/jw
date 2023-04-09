import { Selection, Title } from './BasicComponents';

import { useTranslation } from 'react-i18next';

export default function StatusBar(props) {
  const { t } = useTranslation();
  return (
    <Title title={props.count + ' ' + t('statusbar.results')}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexShrink: 0
        }}
      >
        <Selection
          onChange={(val) => props.onChange(val)}
          default={props.default}
          selection={props.selection}
          style={{
            width: '140px',
            padding: 0
          }}
        />
      </div>
    </Title>
  );
}
