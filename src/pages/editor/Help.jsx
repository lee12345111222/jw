import { Directions, MouseLeft, Key, Text } from '../preview/Help';
import { Flex, Container } from '@/custom-ui/index';

import styles from './help.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Help({ onClick }) {
  return (
    <Flex
      jc="space-between"
      ai="stretch"
      className={cx('help')}
      onClick={onClick}
    >
      <Flex
        fd="column"
        ai="flex-start"
        jc="space-between"
        style={{ padding: '12px' }}
      >
        <Flex fd="column" ai="center">
          <Container w="100">
            <Rect style={{ width: '130px' }} />
          </Container>
          <Arrow top />
          <div>
            <Text>Feature list and Publish</Text>
          </div>
        </Flex>
        <Flex ai="center" gap="16px">
          <Rect style={{ width: '44px', height: '44px', marginLeft: '4px' }} />
          <div style={{ margin: '-6px 0' }}>
            <Arrow left />
          </div>
          <div>
            <Text>Statistics of various items in the current scene</Text>
          </div>
        </Flex>
      </Flex>

      <Flex fd="column">
        <Flex ai="center" jc="flex-end" gap="16px">
          <div>
            <div>
              <Text>Project saving, setting,</Text>
            </div>
            <div>
              <Text>exporting (coming soon)</Text>
            </div>
          </div>
          <Arrow right />
          <div style={{ marginBottom: '6px', marginRight: '46px' }}>
            <Rect style={{ width: '208px' }} />
          </div>
        </Flex>

        <Flex grow="1" jc="flex-end" style={{ gap: '8px' }}>
          <Flex fd="column" jc="space-between">
            <Flex fd="column" ai="flex-end">
              <Rect style={{ height: '124px' }} />
              <Arrow top />
              <Flex fd="column" ai="flex-end">
                <div>
                  <Text>For some operations on objects</Text>
                </div>
                <div>
                  <Text>add, replace, delete</Text>
                </div>
              </Flex>
            </Flex>

            <Flex ai="center" jc="flex-end" gap="16px">
              <Flex fd="column" ai="flex-end">
                <div>
                  <Text>All properties of the</Text>
                </div>
                <div>
                  <Text>selected object</Text>
                </div>
              </Flex>
              <Arrow right />
            </Flex>

            <Flex ai="flex-end" style={{ height: '220px' }}>
              <Flex gap="16px" ai="center" style={{ marginBottom: '8px' }}>
                <div>
                  <Text>View Shortcut Tips</Text>
                </div>
                <Arrow />
                <Rect
                  style={{ marginRight: '56px', width: '44px', height: '44px' }}
                />
              </Flex>
            </Flex>
          </Flex>
          <Rect
            style={{
              width: '266px',
              marginRight: '16px',
              marginBottom: '16px'
            }}
          />
        </Flex>
      </Flex>

      <Flex fd="column" ai="center" className={cx('center')}>
        <Flex ai="center" fd="column" gap="16px">
          <Rect style={{ marginTop: '12px', width: '520px' }} />
          <Arrow top />
          <div>
            <Text>All feature are here</Text>
          </div>
        </Flex>
        <Flex grow="1" ai="center" style={{ gap: '200px' }}>
          <Flex fd="column" style={{ gap: '60px' }}>
            <div>
              <Directions />
            </div>
            <Flex fd="column" gap="16px">
              <div>
                <Text>Press </Text>
                <Key>Shift</Key>
                <Text> Quick run or fast flight</Text>
              </div>
              <div>
                <Text>Press </Text>
                <Key>Space</Key>
                <Text> to jump</Text>
              </div>
              <div>
                <Text>Press </Text>
                <Key>F</Key>
                <Text> Switch flight mode</Text>
              </div>
            </Flex>
          </Flex>
          <div>
            <MouseLeft />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

const Rect = ({ className, style }) => (
  <Flex jc="space-between" className={cx('rect', className)} style={style}>
    <Flex fd="column" jc="space-between">
      <Corner className={cx('corner1')} />
      <Corner className={cx('corner2')} />
    </Flex>
    <Flex fd="column" jc="space-between">
      <Corner className={cx('corner3')} />
      <Corner className={cx('corner4')} />
    </Flex>
  </Flex>
);

const Corner = ({ className }) => (
  <div className={cx('corner', className)}></div>
);

const Arrow = ({ top, left, bottom }) => (
  <div className={cx('arrow', { top, left, bottom })}>➞</div>
);
