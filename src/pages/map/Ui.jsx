import {
  useEffect,
  useCallback,
  useState,
  useMemo,
  lazy,
  Suspense
} from 'react';

import { jsonData, getparcelstatus, ogpasscards } from '@/api/map';
import useApi, { useApi2 } from '@/hooks/useApi';

import styles from './index.module.css';
import './ui.css';

import L from 'leaflet';

import {
  Search,
  Detail,
  Zoom,
  Select,
  PassCards,
  Pending,
  LandTypes
} from './components/index';

import useLoginToken from '@/hooks/useLoginToken';
import { isTest } from '@/utils/common';

let specialTokenId = 127;
const specialUrl = isTest
  ? 'https://j69i60l.playerone.world/preview/a570216f-03f1-47f5-99b5-cddfbef82576'
  : 'https://www.playerone.world/preview/36fd72d7-3a55-401c-afb8-3678924a37de';

const Share = lazy(() => import('./components/Share'));

const createPopup = (x, y, name = '', area = '', time = 5, isShip = false) => `
<div class='popup-title'>${name}</div>
<div>${isShip ? 'Ships' : 'Buses'} run every ${time} minutes</div>
<div class='pop-up-flex'>
  <div>${x}, ${y}</div>
  <div style='display: ${area ? 'block' : 'none'}'>${area}</div>
</div>
`;

export default function Ui({
  map,
  busStations,
  shipStations,
  config,
  useWallet
}) {
  const { data: mapData } = useApi(jsonData);

  const [houses, setHouses] = useState([]);

  const { data: parcelstatus, run } = useApi(getparcelstatus, {
    manual: true,
    pollingInterval: 3000,
    pollingWhenHidden: false,
    formatResult(res) {
      return res?.data?.pp_status;
    }
  });

  const hasDifferentStatus = useMemo(() => {
    if (!parcelstatus) {
      return false;
    }
    for (const key of Object.keys(parcelstatus)) {
      const house = houses.find(({ tokenId }) => +tokenId === +key);
      if (house && house.status !== +parcelstatus[key].s) {
        console.log('hasDifferentStatus');
        return true;
      }
    }
    return false;
  }, [houses, parcelstatus]);

  const [getToken] = useLoginToken();

  const { account, ethereum } = useWallet();

  const { data: passcards, run: getPassCards } = useApi2(ogpasscards, {
    manual: true,
    tokenKey: 'login_token'
  });

  useEffect(() => {
    if (!account) {
      return;
    }

    getPassCards({ address: account });
  }, [account, getToken, getPassCards]);

  const stationIcons = useMemo(() => {
    const width = 20;

    return L.layerGroup([
      ...shipStations.map(({ startX, startY, endX, name, area }) => {
        const w = (endX - startX) / 2;
        const [x, y] = [startX + w, startY + w];
        return L.marker([x + 8, y - 8], {
          icon: L.icon({
            iconAnchor: [width / 2, width / 2],
            iconSize: [width, width],
            iconUrl: '/map_static/shipStationIcon.svg'
          })
        }).bindPopup(createPopup(x, y, `${name} Pier`, area, 5, true), {
          className: 'costum-popup-container',
          closeButton: false
        });
      }),
      ...busStations.map(({ startX, startY, endX, name, area }) => {
        const w = (endX - startX) / 2;
        const [x, y] = [startX + w, startY + w];
        return L.marker([x + 8, y - 8], {
          icon: L.icon({
            iconAnchor: [width / 2, width / 2],
            iconSize: [width, width],
            iconUrl: '/map_static/busStationIcon.svg'
          })
        }).bindPopup(createPopup(x, y, `${name} Bus Station`, area), {
          className: 'costum-popup-container',
          closeButton: false
        });
      })
    ]).setZIndex(1);
  }, [busStations, shipStations]);

  const bigStationIcons = useMemo(() => {
    const width = 40;

    return L.layerGroup([
      ...shipStations.map(({ startX, startY, endX, name, area }) => {
        const w = (endX - startX) / 2;
        const [x, y] = [startX + w, startY + w];
        return L.marker([x + 8, y - 8], {
          icon: L.icon({
            iconAnchor: [width / 2, width / 2],
            iconSize: [width, width],
            iconUrl: '/map_static/shipStationIcon.svg'
          })
        }).bindPopup(createPopup(x, y, `${name} Pier`, area, 5, true), {
          className: 'costum-popup-container',
          closeButton: false
        });
      }),
      ...busStations.map(({ startX, startY, endX, name, area }) => {
        const w = (endX - startX) / 2;
        const [x, y] = [startX + w, startY + w];
        return L.marker([x + 8, y - 8], {
          icon: L.icon({
            iconAnchor: [width / 2, width / 2],
            iconSize: [width, width],
            iconUrl: '/map_static/busStationIcon.svg'
          })
        }).bindPopup(createPopup(x, y, `${name} Bus Station`, area), {
          className: 'costum-popup-container',
          closeButton: false
        });
      })
    ]).setZIndex(1);
  }, [busStations, shipStations]);

  useEffect(() => {
    map.on('zoomstart', async (e) => {
      const target = await e.target;
      const zoom = target._animateToZoom;

      if (zoom < 0) {
        stationIcons.remove();
      }
      if (zoom < 2) {
        bigStationIcons.remove();
      }
    });

    map.on('zoom', async (e) => {
      const target = await e.target;
      const zoom = target._animateToZoom;

      if (zoom > -1) {
        stationIcons.addTo(map);
      }
      if (zoom >= 2) {
        stationIcons.remove();
        bigStationIcons.addTo(map);
      }
    });
  }, [bigStationIcons, map, stationIcons]);

  useEffect(() => {
    if (!mapData) {
      return;
    }

    setHouses(() =>
      Object.values(mapData).map(
        ({
          x1,
          y1,
          x2,
          y2,
          token_id,
          owner,
          custom_name,
          custom_img,
          district
        }) => ({
          startX: x1,
          startY: y1,
          endX: x2,
          endY: y2,
          owner: owner,
          tokenId: token_id,
          custom_img: custom_img
            ? custom_img.replace(/\.(\w+)$/, '-thumb.$1')
            : null,
          area: district,
          name:
            custom_name || `Parcel ${(x2 - x1) / 2 + x1},${(x2 - x1) / 2 + y1}`
        })
      )
    );

    run();
  }, [mapData, run]);

  useEffect(() => {
    if (!parcelstatus || hasDifferentStatus === false) {
      return;
    }

    setHouses((buildings) => {
      const houses = [];

      Object.keys(parcelstatus).forEach((key) => {
        const { ...house } = buildings.find(
          ({ tokenId, endX, startX }) => +tokenId === +key
        );
        if (!house) {
          return;
        }

        house.status = +parcelstatus[key].s;

        if (parcelstatus[key]?.a) {
          house.buyer = parcelstatus[key]?.a;
        }

        houses.push(house);
      });

      const specialHouse = buildings.find(
        ({ tokenId }) => +tokenId === specialTokenId
      );

      if (specialHouse) {
        const { ...house } = specialHouse;
        house.status = 4;
        houses.push(house);
      }

      return houses;
    });
  }, [hasDifferentStatus, parcelstatus]);

  const [houseGroup0, setHouseGroup0] = useState();
  const [houseGroup1, setHouseGroup1] = useState();
  const [houseGroup2, setHouseGroup2] = useState();
  const [houseGroup3, setHouseGroup3] = useState();
  const [houseGroup4, setHouseGroup4] = useState();

  useEffect(() => {
    const zoom = map.getZoom();

    setHouseGroup0((houseGroup) => {
      if (houseGroup) {
        houseGroup.remove();
      }

      const group = L.layerGroup(
        houses
          .filter(({ startX, endX }) => endX - startX === 50)
          .map(({ startX, startY, endX, endY, custom_img, tokenId }) => {
            const imgSrc =
              tokenId === specialTokenId
                ? 'https://playeroneworld.s3.ap-southeast-1.amazonaws.com/pubs/yklogo.png'
                : custom_img || '/map_static/sold0.png';
            return L.imageOverlay(imgSrc, [
              [startX + 1, startY + 1],
              [endX - 1, endY - 1]
            ]);
          })
      ).setZIndex(201);

      if (zoom > -2) {
        group.addTo(map);
      }
      return group;
    });

    setHouseGroup1((houseGroup) => {
      if (houseGroup) {
        houseGroup.remove();
      }

      const group = L.layerGroup(
        houses
          .filter(
            ({ startX, endX, status }) => endX - startX === 40 && status > 1
          )
          .map(({ startX, startY, endX, endY, status, custom_img }) => {
            return L.imageOverlay(
              custom_img || `/map_static/sold${status}.png`,
              [
                [startX + 1, startY + 1],
                [endX - 1, endY - 1]
              ]
            );
          })
      ).setZIndex(201);

      if (zoom > -2) {
        group.addTo(map);
      }

      return group;
    });

    setHouseGroup2((houseGroup) => {
      if (houseGroup) {
        houseGroup.remove();
      }

      const group = L.layerGroup(
        houses
          .filter(
            ({ startX, endX, status }) => endX - startX === 30 && status > 1
          )
          .map(({ startX, startY, endX, endY, status, custom_img }) => {
            return L.imageOverlay(
              custom_img || `/map_static/sold${status}.png`,
              [
                [startX + 1, startY + 1],
                [endX - 1, endY - 1]
              ]
            );
          })
      ).setZIndex(201);

      if (zoom > -1) {
        group.addTo(map);
      }

      return group;
    });

    setHouseGroup3((houseGroup) => {
      if (houseGroup) {
        houseGroup.remove();
      }

      const group = L.layerGroup(
        houses
          .filter(
            ({ startX, endX, status }) => endX - startX === 20 && status > 1
          )
          .map(({ startX, startY, endX, endY, status, custom_img }) => {
            return L.imageOverlay(
              custom_img || `/map_static/sold${status}.png`,
              [
                [startX + 1, startY + 1],
                [endX - 1, endY - 1]
              ]
            );
          })
      ).setZIndex(201);

      if (zoom > 0) {
        group.addTo(map);
      }

      return group;
    });

    setHouseGroup4((houseGroup) => {
      if (houseGroup) {
        houseGroup.remove();
      }

      const group = L.layerGroup(
        houses
          .filter(
            ({ startX, endX, status }) => endX - startX === 10 && status > 1
          )
          .map(({ startX, startY, endX, endY, status, custom_img }) => {
            return L.imageOverlay(
              custom_img || `/map_static/sold${status}.png`,
              [
                [startX + 1, startY + 1],
                [endX - 1, endY - 1]
              ]
            );
          })
      ).setZIndex(201);

      if (zoom > 1) {
        group.addTo(map);
      }

      return group;
    });
  }, [houses, map]);

  useEffect(() => {
    map.on('zoomstart', () => {
      if (houseGroup0) {
        houseGroup0.remove();
      }
    });

    map.on('zoom', () => {
      const zoom = map.getZoom();
      if (houseGroup0 && zoom > -2) {
        houseGroup0.addTo(map);
      }
    });
  }, [houseGroup0, map]);

  useEffect(() => {
    map.on('zoomstart', () => {
      if (houseGroup1) {
        houseGroup1.remove();
      }
    });

    map.on('zoom', () => {
      const zoom = map.getZoom();
      if (houseGroup1 && zoom > -2) {
        houseGroup1.addTo(map);
      }
    });
  }, [houseGroup1, map]);

  useEffect(() => {
    map.on('zoomstart', () => {
      if (houseGroup2) {
        houseGroup2.remove();
      }
    });

    map.on('zoom', () => {
      const zoom = map.getZoom();
      if (houseGroup2 && zoom > -1) {
        houseGroup2.addTo(map);
      }
    });
  }, [houseGroup2, map]);

  useEffect(() => {
    map.on('zoomstart', () => {
      if (houseGroup3) {
        houseGroup3.remove();
      }
    });

    map.on('zoom', () => {
      const zoom = map.getZoom();
      if (houseGroup3 && zoom > 0) {
        houseGroup3.addTo(map);
      }
    });
  }, [houseGroup3, map]);

  useEffect(() => {
    map.on('zoomstart', () => {
      if (houseGroup4) {
        houseGroup4.remove();
      }
    });

    map.on('zoom', () => {
      const zoom = map.getZoom();
      if (houseGroup4 && zoom > 1) {
        houseGroup4.addTo(map);
      }
    });
  }, [houseGroup4, map]);

  const [selectedBuildingCoor, setSelectedBuildingCoor] = useState();

  const [serachRes, setSerachRes] = useState();

  const [selectedBuilding, setSelectedBuilding] = useState();

  useEffect(() => {
    map.on('click', ({ latlng }) => {
      let isSingleClick = true;
      setTimeout(() => {
        if (!isSingleClick) {
          return;
        }
        const zoom = map.getZoom();
        if (zoom < 1) {
          return setSelectedBuildingCoor();
        }

        setSelectedBuildingCoor(latlng);
      }, 200);
      map.on('dblclick', (e) => {
        isSingleClick = false;
      });
    });
  }, [map]);

  useEffect(() => {
    if (!selectedBuildingCoor) {
      return;
    }
    const { lat, lng } = selectedBuildingCoor;

    const selected = houses.find((building) => {
      const { startX, startY, endX, endY } = building;

      if (startX < lat && startY < lng && endX > lat && endY > lng) {
        return building;
      }

      return undefined;
    });

    if (!selected) {
      return;
    }

    setSelectedBuilding((b) => {
      setSerachRes();
      return selected !== b ? selected : undefined;
    });
  }, [houses, selectedBuildingCoor]);

  const handleSearch = useCallback((val) => {
    setSelectedBuilding();
    setSerachRes(val);
  }, []);

  const [open, setOpen] = useState(null);

  const handleOpen = useCallback(async (o) => {
    setOpen(o);
  }, []);

  return (
    <div className={styles['ui-container']}>
      <Detail
        building={selectedBuilding}
        search={serachRes}
        map={map}
        getToken={getToken}
        account={account}
        ethereum={ethereum}
        onOpen={handleOpen}
        getPassCards={getPassCards}
        passcards={passcards?.data?.cards || []}
        specialUrl={specialUrl}
      />
      <Search buildings={houses} onSelect={handleSearch} />
      <Zoom map={map} />
      <Select
        map={map}
        houses={houses}
        mapData={mapData}
        config={config}
        account={account}
      />

      <PassCards passcards={passcards?.data?.cards || []} />
      <Pending
        map={map}
        houses={houses}
        onSelect={handleSearch}
        account={account}
      />
      <LandTypes />

      {open && (
        <Suspense fallback={''}>
          <Share
            building={selectedBuilding}
            account={account}
            getToken={getToken}
            open={open}
            onClose={() => setOpen(null)}
          />
        </Suspense>
      )}
    </div>
  );
}