import {
  // useCallback,
  useRef,
  useEffect,
  useState
} from 'react';

import styled from 'styled-components';
import { Flex, Text, Image } from '@/components/Basic';

import useApi from '@/hooks/useApi';
import { myCharacters } from '@/api/role';

import head from '@/assets/preview/head.png';

import { showShortAddress } from '@/utils/common';

export default function User({ token, account, unityContext }) {
  const [showSenter, setShowSenter] = useState(false);
  const timer = useRef();

  const { data: character, run: getMyCharacters } = useApi(myCharacters, {
    formatResult: (res) => res.data.list.find((char) => +char.main_role === 1),
    manual: true
  });

  useEffect(() => {
    if (!account) {
      return;
    }
    getMyCharacters(account);
  }, [account, getMyCharacters]);

  return (
    <div>
      <Flex ai="flex-end" fd="column">
        <Flex
          ai="flex-start"
          jc="center"
          w="40px"
          h="40px"
          style={{
            overflow: 'hidden',
            pointerEvents: 'auto',
            cursor: 'pointer',
            borderRadius: '2px'
          }}>
          <Image
            onClick={() => setShowSenter(!showSenter)}
            w="72px"
            h="72px"
            mt="-4px"
            src={character?.image_url || head}
          />
        </Flex>

        <Flex
          fd="column"
          ai="center"
          w="224px"
          mt="20px"
          tabIndex={80002}
          onBlur={() =>
            (timer.current = setTimeout(() => {
              setShowSenter(false);
            }, 50))
          }
          onFocus={() => clearTimeout(timer.current)}
          bgcolor="rgba(26, 32, 38, 0.96)"
          style={{
            display: showSenter ? 'flex' : 'none',
            pointerEvents: 'auto',
            fontSize: '12px',
            color: '#fff',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
          <Flex p="14px" ai="center" gap="4px">
            <div>{showShortAddress(account)}</div>

            <Text c="rgba(255, 255, 255, .35)">{character?.token_name}</Text>
          </Flex>

          {/* <Flex w="100%" p="14px" fd="column" ai="center">
            <div>About</div>
            <TextArea
              onFocus={() => handleFocus('0')}
              onBlur={() => handleFocus('1')}
              ref={aboutElement}
              bordered={false}
              rows={4}
              style={{
                fontSize: '12px',
                width: '100%'
              }}
              placeholder="Click here to write something about you!"
            />
          </Flex> */}

          <Line />

          <Flex
            w="100%"
            p="14px"
            fd="column"
            ai="center"
            gap="8px"
            bgcolor="rgba(26, 32, 38, 0.96)">
            <Text c="rgba(255, 255, 255, 0.85)">WALLET ADDRESS</Text>
            <Text c="rgba(255, 255, 255, 0.45)">
              {showShortAddress(account)}
            </Text>
          </Flex>

          <Line />

          <Flex p="14px">
            <Text c="rgba(255, 255, 255, 0.85)">backpack</Text>
          </Flex>

          {/* <div
            style={{
              padding: '14px',
              cursor: 'pointer'
            }}
            onClick={window.close}
          >
            LOG OUT
          </div> */}
        </Flex>
      </Flex>
    </div>
  );
}

const Line = styled.div`
  height: 1px;
  width: 100%;
  /* background-color: rgba(255, 255, 255, 0.15); */
  background: rgba(67, 75, 83, 0.4);
`;
