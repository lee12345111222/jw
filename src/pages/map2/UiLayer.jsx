import { useState, useEffect, useCallback } from 'react';

import useApi from '@/hooks/useApi';

import { data as getData, jsonData as getJsonData } from '@/api/map';

import L from 'leaflet';

import Ui from './Ui';

import Loading from '@/components/CardList/components/Loading/index';

import bg from './iland.svg';
import bgBox from './bgBox.svg';

import BigRoads from './BigRoads.svg';
import Houses from './Houses.svg';

import styles from './index.module.css';

export default function UiLayer({ map }) {
  const { data, loading: loading1 } = useApi(getData);
  const { data: jsonData, loading: loading2 } = useApi(getJsonData);

  const [defaultCenter, setDefaultCenter] = useState(null);

  // fix coords
  const xy = useCallback((x, y) => {
    const yx = L.latLng;

    if (L.Util.isArray(x)) {
      return yx(x[1], x[0]);
    }
    return yx(y, x);
  }, []);

  useEffect(() => {
    const mapBg = L.imageOverlay(bg, [xy([-1546, -1188]), xy([1345, 1130])]);
    map.addLayer(mapBg);

    const bounds = mapBg.getBounds();

    setDefaultCenter(bounds);
    map.fitBounds(bounds);

    // L.tileLayer(
    //   'https://basemaps.cartocdn.com/light_all-{s}-{z}-{x}-{y}.png',
    //   {}
    // ).addTo(map);

    const mapBgBox = L.imageOverlay(bgBox, [xy([-786, -618]), xy([366, 646])]);
    map.addLayer(mapBgBox);
  }, [map, xy]);

  useEffect(() => {
    const roads = L.imageOverlay(BigRoads, [xy([-786, -618]), xy([366, 646])]);
    const houses = L.imageOverlay(Houses, [xy([-786, -618]), xy([366, 646])]);

    const RoadsGroup = L.layerGroup([roads]);
    const HousesGroup = L.layerGroup([houses]);

    map.addLayer(RoadsGroup);
    map.addLayer(HousesGroup);
  }, [map, xy]);

  return (
    <div className={styles['ui-container']}>
      {data && jsonData && (
        <Ui
          data={data}
          jsonData={jsonData}
          map={map}
          defaultCenter={defaultCenter}
        />
      )}
      {(loading1 || loading2) && (
        <div className={styles['loading-container']}>
          <Loading loading />
        </div>
      )}
    </div>
  );
}
