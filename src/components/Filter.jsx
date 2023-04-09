import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Grid, Flex, Container } from './Basic';

import { Input, message } from 'antd';
import { useSelections } from 'ahooks';

import { Title, Selection2 } from './BasicComponents';

import BorderedBtn from './BorderedBtn2/index';

/**
 * @description
 *
 * @param {object} props
 * @param {function} props.onChange
 * @param {[]} props.selections
 * @param {function} props.onSelect
 * @returns {JSX.Element}
 */
export default function Filter({ onChange, selections, onSelect }) {
  const { t } = useTranslation();

  return (
    <Container
      w="232px"
      h="100%"
      br="1px solid #323232"
      style={{
        flexShrink: 0
      }}
    >
      <Title title={t('filter.status')} />
      <Selector onChange={onChange} selections={selections} />
      <Title title={t('filter.price')} />
      <PriceBox onSelect={onSelect} options={[{ name: 'USD', value: 'USD' }]} />
    </Container>
  );
}

const Selector = ({ selections, onChange }) => {
  const { t } = useTranslation();

  const selectionsList = useMemo(
    () =>
      selections || [
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
      ],
    [selections, t]
  );

  const { selected, isSelected, toggle } = useSelections(
    selectionsList.map((selection) => selection.value),
    []
  );

  useEffect(() => {
    onChange(selected.toString());
  }, [onChange, selected]);

  const Selections = useMemo(
    () =>
      selectionsList.map((selection) => (
        <SelectorItem
          key={selection.value}
          onClick={() => toggle(selection.value)}
          className={isSelected(selection.value) ? 'selected' : ''}
        >
          {selection.title}
        </SelectorItem>
      )),
    [isSelected, selectionsList, toggle]
  );

  return (
    <Grid
      gc="repeat(2, 1fr)"
      gg="24px 20px"
      p="20px 24px"
      bb="1px solid #323232"
    >
      {Selections}
    </Grid>
  );
};

export const SelectorItem = styled.div`
  border-radius: 4px;
  height: 30px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border: 1px solid rgba(255, 255, 255, 0.45);
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: all 0.24s ease-in;
  &:hover {
    color: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(133, 195, 250, 0.72);
  }
  &.selected {
    color: #85c3fa;
    border: 1px solid #85c3fa;
  }
`;

const PriceBox = ({ onSelect, options }) => {
  const { t } = useTranslation();

  const [inputKey, setInputKey] = useState(1);

  const [coinName, setCoinName] = useState();

  const minPriceElement = useRef();
  const maxPriceElement = useRef();
  const selectionElement = useRef();

  const handleSelect = useCallback(() => {
    if (!coinName) {
      return message.info('Please select currency first');
    }

    if (
      !minPriceElement.current.state.value &&
      minPriceElement.current.state.value !== 0
    ) {
      return message.info('Please enter min price first');
    }

    if (
      !maxPriceElement.current.state.value &&
      maxPriceElement.current.state.value !== 0
    ) {
      return message.info('Please enter max price first');
    }

    onSelect([
      minPriceElement.current.state.value,
      maxPriceElement.current.state.value,
      coinName
    ]);
  }, [coinName, onSelect]);

  const handleReset = useCallback(() => {
    if (
      !minPriceElement.current.state.value &&
      !maxPriceElement.current.state.value &&
      !coinName
    ) {
      return;
    }
    minPriceElement.current.state.value = '';
    maxPriceElement.current.state.value = '';
    selectionElement.current.value = '';

    setInputKey(inputKey + 1);

    onSelect([]);
  }, [coinName, inputKey, onSelect]);

  return (
    <Container p="10px 24px">
      <Selection2
        key={inputKey + 2}
        ref={selectionElement}
        style={{ padding: '10px 0' }}
        onChange={(val) => setCoinName(val)}
        options={options}
      />

      <Flex m="10px 0" ai="center" jc="space-between">
        <StyledInput
          key={inputKey}
          ref={minPriceElement}
          placeholder={t('filter.min_price')}
        />
        <Container
          h="1px"
          w="32px"
          m="0 8px"
          bgcolor="rgba(255, 255, 255, 0.45)"
        />
        <StyledInput
          key={inputKey + 1}
          ref={maxPriceElement}
          placeholder={t('filter.max_price')}
        />
      </Flex>

      <Flex ai="center" jc="space-between" p="3px">
        <BorderedBtn width="78px" onClick={handleSelect} h="30px" mt="20px">
          <span style={{ fontSize: '14px' }}>{t('filter.confirm')}</span>
        </BorderedBtn>

        <BorderedBtn
          onClick={handleReset}
          bgColor="rgba(255, 255, 255, 0)"
          borderWidth="1px"
          width="78px"
          h="30px"
          mt="20px"
        >
          <span style={{ color: 'rgb(6, 196, 255)', fontSize: '14px' }}>
            Reset
          </span>
        </BorderedBtn>
      </Flex>
    </Container>
  );
};

const StyledInput = styled(Input)`
  border-radius: 4px;
  border-color: rgba(255, 255, 255, 0.45);
  transition: all 0.24s ease-in;
  &:hover {
    border-color: rgba(133, 195, 250, 0.72);
  }
  &:focus {
    border-color: #85c3fa;
  }
`;
