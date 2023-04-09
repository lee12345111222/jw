import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  Suspense,
  lazy,
  useMemo
} from 'react';

import { useWallet } from 'use-wallet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './index.module.css';

// eslint-disable-next-line no-unused-vars
import MiniMap from 'leaflet-minimap';

import MainPage from '@/components/MainPage/index';

// import LandPlan from '@/components/landPlan/index';

const Ui = lazy(() => import('./Ui'));

export default function Map() {
  const [data, setData] = useState();

  useEffect(() => {
    import('@/assets/map/config.json').then((data) => setData(data.default));
  }, []);

  const { config, shipStations, busStations } = useMemo(
    () => data || { config: {} },
    [data]
  );

  const { width, height, tileSize, center } = useMemo(() => config, [config]);

  const mapElement = useRef();
  const [map, setMap] = useState(null);

  useLayoutEffect(() => {
    if (!height || !tileSize || !width) {
      return;
    }

    const container = mapElement.current;
    const div = document.createElement('div');
    container.appendChild(div);

    const map = L.map(div, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 3,
      zoom: -2,
      zoomControl: false,
      detectRetina: true,
      preferCanvas: true,
      attributionControl: false,
      doubleClickZoom: true,
      maxBounds: [
        [-center[1] - 900, -center[0] - 3000],
        [height - center[1] + 900, width - center[0] + 3000]
      ]
    }).setView([0, 0]);

    L.tileLayer(
      `https://playeronefrontend.s3.ap-southeast-1.amazonaws.com/map_tiles/tiles{r}/{z}/{x}_{y}.png`,
      // `/map_static/map_tiles/tiles{r}/{z}/{x}_{y}.png`,
      {
        minZoom: -2,
        maxZoom: 3,
        tileSize: tileSize,
        r: '2x'
      }
    ).addTo(map);

    const defaultCenter = map.getBounds();

    map.reset = async () => {
      if ((await map.getZoom()) === 3) {
        await map.setZoom(2);
        setTimeout(() => {
          map.fitBounds(defaultCenter);
        }, 290);
      } else {
        map.fitBounds(defaultCenter);
      }
    };

    const tileLayer2 = new L.TileLayer(
      `https://playeronefrontend.s3.ap-southeast-1.amazonaws.com/map_tiles/tiles{r}/{z}/{x}_{y}.png`,
      {
        minZoom: -3,
        maxZoom: -3,
        tileSize: tileSize,
        r: '2x'
      }
    );

    new L.Control.MiniMap(tileLayer2, {
      toggleDisplay: false,
      width: 180,
      height: 152
    }).addTo(map);

    setMap(map);

    return () => {
      delete map.reset;
      container.removeChild(div);
    };
  }, [center, height, tileSize, width]);

  return (
    <MainPage title="Map">
      <div className={styles.container} ref={mapElement}></div>
      {map && (
        <>
          <Suspense fallback="">
            <Ui
              map={map}
              busStations={busStations}
              shipStations={shipStations}
              config={config}
              useWallet={useWallet}
            />
          </Suspense>
          {/* <LandPlan text="PlayerOne Genesis Land Plan >>" /> */}
        </>
      )}
    </MainPage>
  );
}
