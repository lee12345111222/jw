import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import L from 'leaflet';

import ToolContainer from './ToolContainer';
import styles from './index.module.css';

import { Input } from '@/custom-ui/index';
import Button from '@/ui/button/index';

import { getparcelmetadata, saveparcelmetadata } from '@/api/map';
import useApi from '@/hooks/useApi';
import { message } from 'antd';

const Detail = ({ building, search, map, account, getToken }) => {
  const [, setSelectedRectangle] = useState();
  const [show, setShow] = useState();

  const selected = useMemo(() => building || search, [building, search]);

  const { startX, startY, endX, endY, isMain, tokenId } = useMemo(
    () => selected || {},
    [selected]
  );

  const { data, run, loading } = useApi(getparcelmetadata, { manual: true });
  const { run: save } = useApi(saveparcelmetadata, { manual: true });

  const handleRun = useCallback(async () => {
    const token = await getToken();
    run({ login_token: token, address: account, token_id: tokenId });
  }, [account, getToken, run, tokenId]);

  useEffect(() => {
    if (!account || !tokenId) {
      return;
    }

    handleRun();
  }, [account, handleRun, tokenId]);

  const tokenRef = useRef();
  const districtRef = useRef();
  const elevationRef = useRef();
  const islandRef = useRef();
  const lakeRef = useRef();
  const mountainRef = useRef();
  const riverRef = useRef();
  const seaRef = useRef();
  const subwayRef = useRef();
  const isMainRef = useRef();

  const {
    district,
    elevation,
    island,
    lake,
    mountain,
    river,
    sea,
    subway,
    sys_default
  } = useMemo(() => (loading ? {} : data?.data || {}), [data?.data, loading]);

  useEffect(() => {
    tokenRef.current.value = tokenId || '';
  }, [tokenId]);

  useEffect(() => {
    districtRef.current.value = district || '';
  }, [district]);

  useEffect(() => {
    elevationRef.current.value = elevation === undefined ? '' : elevation;
  }, [elevation]);

  useEffect(() => {
    islandRef.current.value = island || '';
  }, [island]);

  useEffect(() => {
    lakeRef.current.value = lake || '';
  }, [lake]);

  useEffect(() => {
    mountainRef.current.value = mountain || '';
  }, [mountain]);

  useEffect(() => {
    riverRef.current.value = river || '';
  }, [river]);

  useEffect(() => {
    seaRef.current.value = sea || '';
  }, [sea]);

  useEffect(() => {
    subwayRef.current.value = subway || '';
  }, [subway]);

  useEffect(() => {
    isMainRef.current.checked = !!sys_default;
  }, [sys_default]);

  useEffect(() => {
    if (selected) {
      setShow(true);
    }
  }, [selected]);

  const selectedLayer = useMemo(() => L.layerGroup(), []);

  useEffect(() => {
    map.on('zoom', () => {
      if (map.getZoom() > 0) {
        selectedLayer.addTo(map);
      } else {
        selectedLayer.remove();
      }
    });
  }, [map, selectedLayer]);

  useEffect(() => {
    if (!selected) {
      return setSelectedRectangle((val) => {
        if (val) {
          selectedLayer.removeLayer(val);
        }
        return undefined;
      });
    }

    let rect;
    if (isMain) {
      const bounds = [
        [startX, startY],
        [endX, endY]
      ];
      rect = L.rectangle(bounds, {
        color: '#87c4f8',
        fill: false,
        weight: 4,
        lineJoin: 'clip'
      });
    } else {
      const bounds = [
        [startX + 0.5, startY + 0.5],
        [endX - 0.5, endY - 0.5]
      ];
      rect = L.rectangle(bounds, {
        stroke: false,
        fillColor: '#87c4f8',
        fillOpacity: 1
      });
    }
    selectedLayer.addLayer(rect);

    setSelectedRectangle((val) => {
      if (val) {
        selectedLayer.removeLayer(val);
      }
      return rect;
    });
  }, [endX, endY, isMain, selected, selectedLayer, startX, startY]);

  useEffect(() => {
    if (!search) {
      return;
    }

    map.setView([startX, startY], 2);
  }, [map, search, startX, startY]);

  const handleSubmit = useCallback(async () => {
    const district = districtRef.current.value;
    const elevation = elevationRef.current.value;
    const island = islandRef.current.value;
    const lake = lakeRef.current.value;
    const mountain = mountainRef.current.value;
    const river = riverRef.current.value;
    const sea = seaRef.current.value;
    const subway = subwayRef.current.value;
    const isDefault = isMainRef.current.checked;

    const token = await getToken();

    if (!token) {
      return message.info('Login First');
    }

    const { code } = await save({
      login_token: token,
      address: account,
      token_id: tokenId,
      elevation,
      district,
      island,
      lake,
      mountain,
      river,
      sea,
      subway,
      sys_default: +isDefault
    });

    if (code !== 200) {
      // return message.error('保存失败');
      return;
    }

    // message.success('保存成功');
    handleRun();
  }, [account, getToken, handleRun, save, tokenId]);

  return (
    <div>
      {/* <ClickAwayListener onClickAway={() => setShow()}> */}
      <ToolContainer
        className={`${styles.detail} ${show ? styles['show-detail'] : ''}`}>
        <div style={{ margin: '16px 0', fontSize: '24px' }}>
          编辑地块 metadata 信息
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <FormItem name="token_id" label="土地 ID" readOnly refs={tokenRef} />
          <FormItem name="elevation" label="地块海拔" refs={elevationRef} />
          <FormItem name="district" label="地块所属地区" refs={districtRef} />
          <FormItem name="island" label="地块所属岛" refs={islandRef} />
          <FormItem name="lake" label="地块靠近的湖" refs={lakeRef} />
          <FormItem name="mountain" label="地块靠近的山" refs={mountainRef} />
          <FormItem name="river" label="地块靠近的河" refs={riverRef} />
          <FormItem name="sea" label="地块靠近的海" refs={seaRef} />
          <FormItem name="subway" label="地块靠近的地铁" refs={subwayRef} />
          <FormItem
            name="isDefault"
            type="checkbox"
            label="是否系统预留"
            refs={isMainRef}
          />

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <div style={{ flexGrow: 1 }}>
              <Button outline onClick={() => setShow()}>
                关闭
              </Button>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Button loading={loading} onClick={handleSubmit}>
                提交
              </Button>
            </div>
          </div>
        </div>
      </ToolContainer>
      {/* </ClickAwayListener> */}
    </div>
  );
};

export default Detail;

const FormItem = ({ name, label, readOnly, refs, type = 'text' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label style={{ width: '160px', textAlign: 'right' }} htmlFor={name}>
        {label}
      </label>
      <Input name={name} id={name} readOnly={readOnly} type={type} ref={refs} />
    </div>
  );
};
