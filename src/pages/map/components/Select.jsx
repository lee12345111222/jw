import { useState, useMemo, useCallback, useEffect } from 'react';

import L from 'leaflet';

import ToolContainer from './ToolContainer';

import { landOwner } from '@/constant/env/index';

import styles from './index.module.css';

import mineIcon from './../images/mine_icon.png';

// import snow from './../images/snow.svg';
// import oasis from './../images/oasis.svg';
import metaverse from './../images/metaverse.svg';
import parthenon from './../images/parthenon.svg';
// import ethereum from './../images/ethereum.svg';
// import polygon from './../images/polygon.svg';
// import btc from './../images/btc.svg';
// import pet from './../images/pet.svg';
// import maze from './../images/maze.svg';
// import adventure from './../images/adventure.svg';

const ragionsNames = [
  {
    name: 'Central City',
    img: parthenon
  },
  // {
  //   name: 'Snow Crash',
  //   img: snow
  // },
  // {
  //   name: 'Oasis',
  //   img: oasis
  // },
  {
    name: 'Metaverse',
    img: metaverse
  }
  // {
  //   name: 'Ethereum',
  //   img: ethereum
  // },
  // {
  //   name: 'Pet Island',
  //   img: pet
  // },
  // {
  //   name: 'Maze Island',
  //   img: maze
  // },
  // {
  //   name: 'Adventure Island',
  //   img: adventure
  // },
  // {
  //   name: '???',
  //   img: btc
  // },
  // {
  //   name: '??? ',
  //   img: polygon
  // }
];

const allTypes = [
  'My Parcel'
  // 'Buy now'
  // 'On auction', 'New shelf'
];

const markCreator = (x1, y1, size, iconUrl) => {
  return L.marker([x1 + size / 2.5, y1 + size / 2], {
    icon: L.icon({
      iconAnchor: [10, 30],
      iconSize: [20, 30],
      iconUrl: iconUrl || mineIcon
    })
  });
};

const Select = ({
  map,
  houses = [],
  mapData = {},
  config = {},
  account = ''
}) => {
  const { width, height, center } = useMemo(() => config, [config]);

  const [buyNow, onAuction, newShelf] = useMemo(() => {
    const buyNow = Object.values(mapData)
      // .filter(({ asset_status }) => asset_status === 'BUY_NOW')
      .filter(({ owner }) => owner === landOwner)
      .map(({ x1, y1, x2 }) => markCreator(x1, y1, x2 - x1));

    const onAuction = Object.values(mapData)
      .filter(({ asset_status }) => asset_status === 'ON_AUCTION')
      .map(({ x1, y1, x2 }) => markCreator(x1, y1, x2 - x1));

    const newShelf = Object.values(mapData)
      .filter(({ asset_status }) => asset_status === 'NEW_SHELF')
      .map(({ x1, y1, x2 }) => markCreator(x1, y1, x2 - x1));

    return [buyNow, onAuction, newShelf];
  }, [mapData]);

  const myLand = useMemo(
    () =>
      account
        ? Object.values(mapData)
            .filter(
              ({ owner }) => owner.toLowerCase() === account.toLowerCase()
            )
            .map(({ x1, y1, x2 }) => markCreator(x1, y1, x2 - x1))
        : null,
    [account, mapData]
  );

  const [sizeList, sizes] = useMemo(() => {
    const sizeList = {};

    const sizes = Array.from(
      new Set(
        houses.map((building) => {
          const { startX, startY, endX } = building;
          const size = endX - startX;

          const mark = markCreator(startX, startY, size);

          if (sizeList?.[size]) {
            sizeList[size].push(mark);
          } else {
            sizeList[size] = [mark];
          }
          return size;
        })
      )
    ).sort((a, b) => a - b);

    return [sizeList, sizes];
  }, [houses]);

  const [, setSelectedList] = useState();
  const [, setSelectedFilter] = useState();

  const ragions = useMemo(
    () =>
      ragionsNames.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      )),
    []
  );

  const types = useMemo(
    () =>
      allTypes.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      )),
    []
  );

  const allSizes = useMemo(
    () =>
      sizes.map((size) => (
        <option key={size} value={size}>
          {size} × {size}
        </option>
      )),
    [sizes]
  );

  const [areaLayer] = useState(L.layerGroup().addTo(map));

  useEffect(() => {
    map.on('zoom', () => {
      if (map.getZoom() === -2) {
        areaLayer.addTo(map);
      }
    });

    map.on('zoomstart', () => {
      if (map.getZoom() === -2) {
        areaLayer.remove();
      }
    });
  }, [areaLayer, map]);

  const handleRagion = useCallback(
    ({ target: { value } }) => {
      areaLayer.clearLayers();

      if (value === 'All areas') {
        return;
      }

      map.reset();

      const imgLayer = L.imageOverlay(
        Object.values(ragionsNames).find(({ name }) => name === value).img,
        [
          [center[1], -center[0]],
          [center[1] - height, width - center[0]]
        ]
      );

      areaLayer.addLayer(imgLayer);
    },
    [areaLayer, center, height, map, width]
  );

  const handleTypes = useCallback(
    ({ target: { value } }) => {
      const filterList = {
        'All types': null,
        'My Parcel': myLand,
        'Buy now': buyNow,
        'On auction': onAuction,
        'New shelf': newShelf
      };

      const filter = L.layerGroup(filterList[value]);

      setSelectedFilter((val) => {
        if (val) {
          map.removeLayer(val);
        }

        return filter;
      });

      map.addLayer(filter);
    },
    [buyNow, map, myLand, newShelf, onAuction]
  );

  const handleSize = useCallback(
    ({ target: { value } }) => {
      if (value === 'All sizes') {
        setSelectedList((val) => {
          if (val) {
            map.removeLayer(val);
          }
          return null;
        });
      }

      const selected = L.layerGroup(sizeList[value]);

      setSelectedList((val) => {
        if (val) {
          map.removeLayer(val);
        }
        return selected;
      });

      map.addLayer(selected);
    },
    [map, sizeList]
  );

  return (
    <ToolContainer className={styles.select}>
      <select onChange={handleRagion}>
        <option value="All areas">All areas</option>
        {ragions}
      </select>

      <select onChange={handleTypes}>
        <option value="All types">All types</option>
        {types}
      </select>

      <select onChange={handleSize}>
        <option value="All sizes">All sizes</option>
        {allSizes}
      </select>
    </ToolContainer>
  );
};

export default Select;
