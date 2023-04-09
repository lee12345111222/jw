import { useState, useCallback, useMemo } from 'react';

import { Slider, Switch, Tabs, Select } from 'antd';

import { useThrottle, useUpdateEffect } from 'ahooks';

import styled from 'styled-components';

import { Flex, Grid, Text } from '@/components/Basic';

import { useLocalStorageState } from 'ahooks';

import './setting.css';

const { TabPane } = Tabs;
const { Option } = Select;

export default function Setting({ unityContext }) {
  const [options, setOptions] = useLocalStorageState(
    'PLAYER_ONE_GAME_SETTINGS',
    {
      defaultValue: {
        mouseSpeed: 100,
        audioMasterOp: 20,
        graphicsBloom: true,
        farClip: 300,
        graphicQaulity: 1,
        mainLightShadow: 1,
        AO: false,
        postProcess: false,
        antialiasing: false,
        terrainPlants: false
      }
    }
  );

  const {
    mouseSpeed,
    audioMasterOp,
    graphicsBloom,
    farClip,
    graphicQaulity,
    mainLightShadow,
    AO,
    postProcess,
    antialiasing,
    terrainPlants
  } = useMemo(() => options, [options]);

  const handleOptionChange = useCallback(
    (actionName, val) => {
      const poNames = {
        mouseSpeed: 'SetMouseSpeedOp',
        audioMasterOp: 'SetAudioMasterOp',
        graphicsBloom: 'SetGraphicsBloom',
        farClip: 'SetFarClip',
        graphicQaulity: 'SetGraphicQaulity',
        mainLightShadow: 'SetMainLightShadow',
        AO: 'SetAO',
        postProcess: 'SetPostProcess',
        antialiasing: 'SetAntialiasing',
        terrainPlants: 'SetTerrainPlants'
      };
      setOptions((v) => ({ ...v, [actionName]: val }));

      console.log('BuildSurface', poNames[actionName], (+val).toString());

      unityContext.send('BuildSurface', poNames[actionName], (+val).toString());
    },
    [setOptions, unityContext]
  );

  // const handleMasterAudioChange = useCallback(
  //   (val) => {
  //     unityContext.send('BuildSurface', 'SetAudioMasterOp', val.toString());
  //   },
  //   [unityContext]
  // );

  // const handleBloomChange = useCallback(
  //   (val) => {
  //     unityContext.send('BuildSurface', 'SetGraphicsBloom', (+val).toString());
  //   },
  //   [unityContext]
  // );

  // const handleSetFarClip = useCallback(
  //   (val) => {
  //     unityContext.send('BuildSurface', 'SetFarClip', (+val).toString());
  //   },
  //   [unityContext]
  // );

  return (
    <>
      <StyledTabs defaultActiveKey="1" tabPosition="left" tabBarGutter={0}>
        <StyledTabPane tab="GENERAL" key="1">
          <StyledTitle>GENERAL</StyledTitle>
          <StyledContent>
            <Grid gc="repeat(2, 1fr)" gg="32px 16px">
              <SettingItem title="MOUSE SENSIVITY">
                <SliderItem
                  actionName="mouseSpeed"
                  onChange={handleOptionChange}
                  current={mouseSpeed}
                  min={10}
                  max={360}
                />
              </SettingItem>

              {/* <SettingItem title="SCENES LOAD RADIUS">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="NAME TRANSPARENCY">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="PROFANITY FILTER">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="GENERAL">
                <StyledSelect
                  defaultValue="option1"
                  bordered={false}
                  defaultActiveFirstOption={false}>
                  <Option value="option1">option1</Option>
                  <Option value="option2">option2</Option>
                  <Option value="option3">option3</Option>
                  <Option value="option4">option4</Option>
                </StyledSelect>
              </SettingItem> */}
            </Grid>
          </StyledContent>
        </StyledTabPane>

        <StyledTabPane tab="GRAPHICS" key="2">
          <StyledTitle>GRAPHICS</StyledTitle>
          <StyledContent>
            <Grid gc="repeat(2, 1fr)" gg="32px 16px">
              <SettingItem title="DRAW DISTANCE">
                <SliderItem
                  actionName="farClip"
                  onChange={handleOptionChange}
                  current={farClip}
                  min={100}
                  max={1000}
                />
              </SettingItem>

              {/* <SettingItem title="AUTO QUALITY">
                <div>
                  <StyledSwitch />
                </div>
              </SettingItem> */}

              {/* <SettingItem title="BASE RESOLUTION">
                <StyledSelect
                  defaultValue="option1"
                  bordered={false}
                  defaultActiveFirstOption={false}>
                  <Option value="option1">option1</Option>
                  <Option value="option2">option2</Option>
                  <Option value="option3">option3</Option>
                  <Option value="option4">option4</Option>
                </StyledSelect>
              </SettingItem> */}

              {/* <SettingItem title="GRAPHICS QUALITY">
                <StyledSelect
                  defaultValue="option1"
                  bordered={false}
                  defaultActiveFirstOption={false}>
                  <Option value="option1">option1</Option>
                  <Option value="option2">option2</Option>
                  <Option value="option3">option3</Option>
                  <Option value="option4">option4</Option>
                </StyledSelect>
              </SettingItem> */}

              {/* <SettingItem title="RENDERING SCALE">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="30 FPS LIMIT">
                <div>
                  <StyledSwitch />
                </div>
              </SettingItem> */}

              {/* <SettingItem title="DRAW DISTANCE">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="SHADOW">
                <div>
                  <StyledSwitch />
                </div>
              </SettingItem> */}

              {/* <SettingItem title="ANTI-ALIASING">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="SOFT SHADOWS">
                <div>
                  <StyledSwitch />
                </div>
              </SettingItem> */}

              {/* <SettingItem title="AMBIENT OCCLUSION">
                <StyledSelect
                  defaultValue="option1"
                  bordered={false}
                  defaultActiveFirstOption={false}>
                  <Option value="option1">option1</Option>
                  <Option value="option2">option2</Option>
                  <Option value="option3">option3</Option>
                  <Option value="option4">option4</Option>
                </StyledSelect>
              </SettingItem> */}

              {/* <SettingItem title="SHADOW RESOLUTION">
                <StyledSelect
                  defaultValue="option1"
                  bordered={false}
                  defaultActiveFirstOption={false}>
                  <Option value="option1">option1</Option>
                  <Option value="option2">option2</Option>
                  <Option value="option3">option3</Option>
                  <Option value="option4">option4</Option>
                </StyledSelect>
              </SettingItem> */}

              <SettingItem title="BLOOM">
                <div>
                  <StyledSwitch
                    defaultChecked={graphicsBloom}
                    onChange={(v) => handleOptionChange('graphicsBloom', v)}
                  />
                </div>
              </SettingItem>

              <SettingItem title="GRAPHIC QUALITY">
                <StyledSelect
                  defaultValue={['low', 'middle', 'high'][graphicQaulity]}
                  bordered={false}
                  onChange={(v) => handleOptionChange('graphicQaulity', v)}
                  defaultActiveFirstOption={false}
                >
                  <Option value="0">low</Option>
                  <Option value="1">middle</Option>
                  <Option value="2">high</Option>
                </StyledSelect>
              </SettingItem>

              <SettingItem title="MAINLIGHT SHADOW">
                <StyledSelect
                  defaultValue={['none', 'hard', 'soft'][mainLightShadow]}
                  bordered={false}
                  onChange={(v) => handleOptionChange('mainLightShadow', v)}
                  defaultActiveFirstOption={false}
                >
                  <Option value="0">none</Option>
                  <Option value="1">hard</Option>
                  <Option value="2">soft</Option>
                </StyledSelect>
              </SettingItem>

              <SettingItem title="OPEN AO">
                <div>
                  <StyledSwitch
                    defaultChecked={AO}
                    onChange={(v) => handleOptionChange('AO', v)}
                  />
                </div>
              </SettingItem>

              <SettingItem title="POST PROCESS">
                <div>
                  <StyledSwitch
                    defaultChecked={postProcess}
                    onChange={(v) => handleOptionChange('postProcess', v)}
                  />
                </div>
              </SettingItem>

              <SettingItem title="ANTIALIASING">
                <div>
                  <StyledSwitch
                    defaultChecked={antialiasing}
                    onChange={(v) => handleOptionChange('antialiasing', v)}
                  />
                </div>
              </SettingItem>

              <SettingItem title="TERRAIN PLANTS">
                <div>
                  <StyledSwitch
                    defaultChecked={terrainPlants}
                    onChange={(v) => handleOptionChange('terrainPlants', v)}
                  />
                </div>
              </SettingItem>

              {/* <SettingItem title="SHADOW DISTANCE">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="COLOR GRADING">
                <div>
                  <SliderItem />
                </div>
              </SettingItem> */}

              {/* <SettingItem title="DETAIL OBJECT CULLING SIZE">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="DETAIL OBJECT CULLING">
                <div>
                  <StyledSwitch />
                </div>
              </SettingItem> */}
            </Grid>
          </StyledContent>
        </StyledTabPane>

        <StyledTabPane tab="AUDIO" key="3">
          <StyledTitle>VOLUME</StyledTitle>
          <StyledContent>
            <Grid gc="repeat(2, 1fr)" gg="32px 16px">
              <SettingItem title="MASTER">
                <SliderItem
                  actionName="audioMasterOp"
                  onChange={handleOptionChange}
                  min={1}
                  max={100}
                  current={audioMasterOp}
                />
              </SettingItem>

              {/* <SettingItem title="MUSIC">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="DRAW DISTANCE">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="AVATAR SFX">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="VOICE CHAT">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="WORLD SFX">
                <SliderItem />
              </SettingItem> */}

              {/* <SettingItem title="CHAT SOUNDS">
                <div>
                  <StyledSwitch />
                </div>
              </SettingItem> */}

              {/* <StyledTitle
                style={{
                  gridColumnStart: 1,
                  gridColumnEnd: 3,
                  paddingRight: '40px'
                }}>
                VOICE CHAT
              </StyledTitle>
              <SettingItem title="ALLOW VOICE CHAT">
                <StyledSelect
                  defaultValue="option1"
                  bordered={false}
                  defaultActiveFirstOption={false}>
                  <Option value="option1">option1</Option>
                  <Option value="option2">option2</Option>
                  <Option value="option3">option3</Option>
                  <Option value="option4">option4</Option>
                </StyledSelect>
              </SettingItem> */}
            </Grid>
          </StyledContent>
        </StyledTabPane>
      </StyledTabs>
    </>
  );
}

const SettingItem = ({ title, children }) => {
  return (
    <Flex fd="column" gap="8px">
      <Text fs="16px">{title}</Text>
      {children}
    </Flex>
  );
};

const SliderItem = ({
  min = 0,
  max = 50,
  current = 20,
  actionName,
  onChange
}) => {
  const [value, setValue] = useState(current);
  const debouncedValue = useThrottle(value, { wait: 500 });

  useUpdateEffect(() => {
    onChange?.(actionName, debouncedValue);
  }, [onChange, debouncedValue]);

  const handleChange = useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <Flex ai="center" jc="flex-start" gap="4px">
      <StyledSlider onChange={handleChange} value={value} min={min} max={max} />
      <Text fs="16px">{value}</Text>
    </Flex>
  );
};

const StyledTabs = styled(Tabs)`
  background-color: #313131;
  height: 460px;

  & > .ant-tabs-nav::before {
    content: 'Settings';
    font-size: 18px;
    width: 100%;
    height: 54px;
    padding: 0 24px;
    line-height: 54px;
    display: block;
    color: #fff;
  }

  & > .ant-tabs-nav {
    min-width: 164px;
    background-color: #3b3b3b;
    border-right: solid 1px rgba(255, 255, 255, 0.15);
  }

  & .ant-tabs-tab {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.45);
  }

  & .ant-tabs-tab:hover {
    color: rgba(255, 255, 255, 0.75);
  }

  & .ant-tabs-tab-active {
    background-color: #454545;
  }

  & .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
  }

  & > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab,
  & .ant-tabs-tab {
    height: 48px;
  }

  & > .ant-tabs-nav .ant-tabs-ink-bar {
    width: 0;
  }

  & .ant-tabs-content {
    max-height: 100%;
  }
`;

const StyledTabPane = styled(TabPane)`
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 0 40px 40px;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  text-align: center;
  height: 54px;
  line-height: 54px;
  margin: 0;
  flex-shrink: 0;
`;

const StyledSlider = styled(Slider)`
  height: 26px;
  width: 164px;
  padding: 0;
  margin: 0;
  & .ant-slider-rail {
    height: 22px;
    margin: 2px 0;
    background-color: #3b3b3b;
    border-radius: 0;
  }

  &:hover .ant-slider-rail {
    background-color: #3b3b3b;
  }

  & .ant-slider-track {
    height: 22px;
    margin: 2px 0;
    background-color: #454545;
    border-radius: 0;
  }

  &:hover .ant-slider-track {
    background-color: #454545;
  }

  & .ant-slider-handle {
    width: 6px;
    height: 26px;
    margin: 0;
    background-color: #616161;
    border: none;
    border-radius: 0;
  }
`;

const StyledSwitch = styled(Switch)`
  min-width: 40px;
  background-color: #3b3b3b;

  &.ant-switch-checked {
    background-color: #454545;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  & .ant-switch-handle::before {
    background-color: #616161;
  }
`;

const StyledSelect = styled(Select)`
  background-color: #3b3b3b;

  width: 164px;
  height: 22px;
  color: #fff;

  & .ant-select-selector {
    height: 22px !important;
  }

  & .ant-select-selection-item {
    height: 22px !important;
    line-height: 22px !important;
    font-size: 12px;
    color: #fff !important;
  }
`;
