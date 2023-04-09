import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import { Input, Checkbox } from 'antd';

import { Btn as Button, Title, Selection } from '../BasicComponents';

const Btn = styled(Checkbox)`
  margin: 0 !important;
  & span + span {
    border-radius: 4px;
    height: 30px;
    font-size: 12px;
    width: 80px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  & .ant-checkbox + span {
    color: rgb(255, 255, 255, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.45);
  }
  & .ant-checkbox-checked + span {
    color: #85c3fa;
    border: 1px solid #85c3fa;
  }
  & .ant-checkbox {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px 20px;
  padding: 20px 24px;
  border-bottom: 1px solid #323232;
`;

const ActionList = (props) => {
  const [selected, setSelected] = useState([]);

  const select = (val) => {
    let arr = [...selected];
    const index = arr.findIndex((s) => s === val);
    index === -1 ? arr.push(val) : (arr = arr.slice(index + 1));

    setSelected(arr);
    props.onClick(arr.toString());
  };

  const list = props.actions.map((action, index) => (
    <Btn onChange={() => select(action.value)} key={index}>
      {action.title}
    </Btn>
  ));
  return <BtnGroup>{list}</BtnGroup>;
};

const PriceBox = (props) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        padding: '10px 24px',
        borderBottom: '1px solid #323232'
      }}
    >
      <Selection onChange={props.onChange} selection={props.selection} />

      <div
        style={{
          margin: '10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Input
          onChange={(e) => props.setMinPrice(e.target.value)}
          value={props.minPrice}
          style={{ borderRadius: '4px' }}
          placeholder={t('filter.min_price')}
        />
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.45)',
            width: '36px',
            margin: '0 8px'
          }}
        ></div>
        <Input
          onChange={(e) => props.setMaxPrice(e.target.value)}
          value={props.maxPrice}
          style={{ borderRadius: '4px' }}
          placeholder={t('filter.max_price')}
        />
      </div>

      <Button
        onClick={props.onSubmit}
        style={{
          height: '28px'
        }}
      >
        {t('filter.confirm')}
      </Button>
    </div>
  );
};

export default function Filter(props) {
  const { t } = useTranslation();
  return (
    <div
      style={{
        flexShrink: 0,
        width: '232px',
        height: '100%',
        borderRight: '1px solid #323232'
      }}
    >
      <Title title={t('filter.status')} />
      <ActionList
        onClick={props.onClick}
        actions={[
          // BUY_NOW,ON_AUCTION,IS_NEW,HAS_OFFERS
          {
            title: t('filter.buy_now'),
            value: 1
          },
          {
            title: t('filter.on_auction'),
            value: 2
          },
          {
            title: t('filter.is_new'),
            value: 3
          }
        ]}
      />
      <Title title={t('filter.price')} />
      <PriceBox
        onSubmit={props.onSubmit}
        setMinPrice={props.setMinPrice}
        setMaxPrice={props.setMaxPrice}
        minPrice={props.minPrice}
        maxPrice={props.maxPrice}
        onChange={props.onChange}
        selection={['ETH']}
      />
    </div>
  );
}
