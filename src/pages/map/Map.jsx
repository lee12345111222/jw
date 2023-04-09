import {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useCallback
} from 'react';

import { useWallet } from 'use-wallet';

import { useTranslation } from 'react-i18next';

import { jsonData } from '@/api/map';

import L from 'leaflet';

import { Spin } from 'antd';

// import { search } from '@/api/good';

import {
  ToolBox,
  ImgBox,
  SearchBox,
  SearchItem,
  Btn,
  MinTitle
} from './components';

import { Input, message } from 'antd';

import MapBuilder from './MapBuilder';
import './map.css';

import MainPage from '@/components/MainPage/index';

import bg from './iland.svg';
// import bg from './iland.png';
import bgBox from './bgBox.svg';
// import bgBox from './bgBox.png';
import ragion from './ragions/all.svg';

import addIcon from './images/add_icon.png';
import minusIcon from './images/minus_icon.png';
import zoomIcon from './images/zoom_icon.png';
import fullIcon from './images/full_icon.png';
import searchIcon from './images/search_icon.png';

import mineIcon from './images/mine_icon.png';

import { Selector } from '@/components/Styled';

import BigRoads from './BigRoads.svg';
import Houses from './Houses.svg';
// import Houses from './Houses.png';

import { showShortAddress } from '@/utils/common';

const buyUrl = process.env.REACT_APP_ELEMENT_REDIRECT;

const width = 1152;
const height = 1264;
const minX = -786;
const minY = -618;

const ragionsNames = [
  {
    name: 'Parthenon',
    x: -minX,
    y: -minY
  },
  {
    name: 'Snow Crash',
    x: 550,
    y: 1068
  },
  {
    name: 'Oasis',
    x: 984,
    y: 1096
  },
  {
    name: 'Avatar',
    x: 600,
    y: 668
  },
  {
    name: 'Metaverse',
    x: 1030,
    y: 666
  },
  {
    name: 'BTC',
    x: 320,
    y: 238
  },
  {
    name: 'Ethereum',
    x: 956,
    y: 280
  },
  {
    name: 'BSC',
    x: 800,
    y: 950
  },
  {
    name: 'Polygon',
    x: 652,
    y: 228
  }
];

let selectedBuilding = null;

export default function Map() {
  const mapElement = useRef();

  // const [Houses, setHouses] = useState();

  // useEffect(() => {
  //   let canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   const img = new Image();
  //   img.src = houses;
  //   img.onload = () => {
  //     canvas.width = img.width * 8;
  //     canvas.height = img.height * 8;
  //     ctx.drawImage(img, 0, 0, img.width * 8, img.height * 8);
  //     canvas.toBlob((blob) => setHouses(URL.createObjectURL(blob)));
  //     canvas = null;
  //   };

  // }, []);

  const [isLoading, setIsLoading] = useState(true);

  const [map, setMap] = useState(null);

  const [mapData, setMapData] = useState(null);
  const [landData, setLandData] = useState(null);

  const [defaultCenter, setDefaultCenter] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [mapDetail, setMapDetail] = useState(null);
  const [mapDetailShow, setMapDetailShow] = useState(false);
  const [selectedList, setSelectedList] = useState(false);

  const [houseEventsList, setHouseEventsList] = useState(null);

  const searchEl = useRef(null);
  const mapDetailEl = useRef(null);

  const { account, status: accountStatus } = useWallet();

  const { t } = useTranslation();

  const [minZoom, maxZoom, bgWidth, bgHeight, bgAround, bgScale] =
    useMemo(() => {
      return [-1, 3, 2092, 1663, { x: 760, y: 570 }, 1.6];
    }, []);

  // fix coords
  const xy = useCallback((x, y) => {
    const yx = L.latLng;

    if (L.Util.isArray(x)) {
      return yx(x[1], x[0]);
    }
    return yx(y, x);
  }, []);

  useLayoutEffect(() => {
    const currentElement = mapElement.current;
    const div = document.createElement('div');

    div.setAttribute('id', 'map');
    currentElement.appendChild(div);

    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = '#202931';

    setMap(
      L.map(div, {
        crs: L.CRS.Simple,
        minZoom,
        maxZoom,
        zoomControl: false,
        preferCanvas: true,
        attributionControl: false, // remove banquan
        // doubleClickZoom: false,
        maxBounds: [
          xy([-bgAround.x - 800 + minX, -bgAround.y + minY]),
          xy([
            (bgWidth - bgAround.x) * bgScale + 600 + minX,
            (bgHeight - bgAround.y) * bgScale + minY
          ])
        ]
      })
    );

    return () => currentElement.removeChild(div);
  }, [
    bgAround.x,
    bgAround.y,
    bgHeight,
    bgScale,
    bgWidth,
    maxZoom,
    minZoom,
    xy
  ]);

  useEffect(() => {
    jsonData().then((res) => setLandData(res));
    import('@/assets/map/data.json').then((res) => {
      setMapData(res.default);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  const mapBuilder = useMemo(() => {
    if (!mapData || !landData) return;
    return new MapBuilder(mapData, landData);
  }, [landData, mapData]);

  const [buildingData, data] = useMemo(() => {
    if (!mapBuilder) return new Array(7);

    return [mapBuilder.getBuildingData(), mapBuilder.getData()];
  }, [mapBuilder]);

  // create buildings name
  const BuildingsNames = useMemo(() => {
    if (!buildingData) return;
    return buildingData
      .filter((b) => b.token_id)
      .map((b) => {
        const { startX: x1, startY: y1, endX: x2, endY: y2, name: html } = b;
        const iconSize = x2 - x1;
        const x = iconSize / 2 + x1;
        const y = (y2 - y1) / 2 + y1;
        const className = 'house-name';

        return L.marker(xy([x, y]), {
          icon: L.divIcon({
            html,
            className,
            iconSize
          }),
          interactive: false
        });
      });
  }, [buildingData, xy]);

  const searchRes = useMemo(
    () =>
      buildingData &&
      buildingData.filter(
        (b) =>
          searchText &&
          b.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
      ),
    [searchText, buildingData]
  );

  const go2building = useCallback(
    ({ startX, startY, endX, endY, rect, size, name, owner, token_id }) => {
      rect.setStyle({
        stroke: false,
        fillColor: '#87c4f8',
        fillOpacity: 1
      });
      selectedBuilding = rect;
      map.fitBounds([xy([startX, startY]), xy([endX, endY])]);

      const detail = {
        name: name,
        coord: `${(startX + endX) / 2}, ${(startY + endY) / 2}`,
        size: `${endX - startX},${endY - startY}`,
        owner: owner || process.env.REACT_APP_ELEMENT_CONTRACT_ADDR,
        img: '/map_static/building.png'
      };
      if (token_id) detail.link = buyUrl + token_id;
      setMapDetail(detail);
      setMapDetailShow(true);
      setTimeout(() => {
        mapDetailEl.current.focus();
      }, 100);
    },
    [map, xy]
  );

  const SearchItemList = useMemo(
    () =>
      searchRes?.map?.((item, i) => {
        return (
          <SearchItem onClick={() => go2building(item)} key={i}>
            {item.name}
          </SearchItem>
        );
      }),
    [searchRes, go2building]
  );

  useEffect(() => {
    if (!map) return;

    L.marker(xy([-420 + minX, 370 + minY]), {
      icon: L.divIcon({
        html: 'Adventure Island',
        className: 'iland-name',
        iconSize: 128
      }),
      interactive: false
    }).addTo(map);

    L.marker(xy([1500 + minX, 880 + minY]), {
      icon: L.divIcon({
        html: 'Pet Island',
        className: 'iland-name',
        iconSize: 88
      }),
      interactive: false
    }).addTo(map);
  }, [xy, map]);

  useEffect(() => {
    if (!map) return;
    const mapBg = L.imageOverlay(bg, [
      xy([-bgAround.x + minX, -bgAround.y + minY]),
      xy([
        (bgWidth - bgAround.x) * bgScale + minX,
        (bgHeight - bgAround.y) * bgScale + minY
      ])
    ]);
    map.addLayer(mapBg);

    setDefaultCenter(mapBg.getBounds());
  }, [bgAround, bgHeight, bgWidth, bgScale, map, xy]);

  // useEffect(() => {
  //   if (!map || !defaultCenter) return;
  //   map.fitBounds(defaultCenter);
  // }, [defaultCenter, map]);

  useEffect(() => {
    if (!data) return;
    const xx = 0;
    const yy = 0;
    const mapBgBox = L.imageOverlay(bgBox, [
      xy([0 + xx + minX, 0 + yy + minY]),
      xy([width + xx + minX, height + xx + minY])
    ]);

    map.addLayer(mapBgBox);
  }, [map, data, xy]);

  useEffect(() => {
    if (!data || !map) return;
    const roads = L.imageOverlay(BigRoads, [
      xy([minX, minY]),
      xy([width + minX, height + minY])
    ]);
    map.fitBounds(defaultCenter);

    const RoadsGroup = L.layerGroup([roads]);

    if (!Houses) return;
    const HousesGroup = L.layerGroup([
      L.imageOverlay(Houses, [
        xy([minX, minY]),
        xy([width + minX, height + minY])
      ])
    ]);

    const HouseNamesGroup = L.layerGroup(BuildingsNames, xy([width, height]));

    const HouseList = data.buildings.map((h) => {
      let self;
      self = L.rectangle([xy([h.startX, h.startY]), xy([h.endX, h.endY])], {
        stroke: false,
        fillOpacity: 0
      });
      h.rect = self;

      let timeout = null;
      self.on('click', () => {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          selectedBuilding = self;
          self.setStyle({
            stroke: false,
            fillColor: '#87c4f8',
            fillOpacity: 1
          });

          let item = {};

          // if (h.owner) {
          //   const searchRes = await search({
          //     limit: 1,
          //     owner: h.owner
          //   });

          //   item = searchRes.data.search.edges[0].node.asset;
          // }

          const detail = {
            name: item?.name || h.name,
            coord: `${(h.startX + h.endX) / 2}, ${(h.startY + h.endY) / 2}`,
            size: `${h.endX - h.startX},${h.endY - h.startY}`,
            owner: h.owner || process.env.REACT_APP_ELEMENT_CONTRACT_ADDR,
            img: item?.imagePreviewUrl || '/map_static/good1.png'
          };
          if (h.token_id) detail.link = buyUrl + h.token_id;
          setMapDetail(detail);
          setMapDetailShow(true);
          mapDetailEl.current.focus();
        }, 100);
      });

      self.on('dblclick', () => {
        clearTimeout(timeout);
      });
      setHouseEventsList(data.buildings);
      return self;
    });

    // create roads name
    const drawRoadName = (
      roads,
      direction = true,
      isSmall = false,
      siSmallBig = false
    ) => {
      const roadsList = [];

      roads
        .filter((r) => r.name)
        .forEach((road) => {
          const x = (road.endX - road.startX) / 2 + road.startX;
          const y = (road.endY - road.startY) / 2 + road.startY;
          let className = direction ? 'road-name-row' : 'road-name-column';
          if (isSmall) {
            className = className + ' small';
          }
          if (siSmallBig) {
            className = className + ' small-big';
          }

          const size = direction
            ? road.endX - road.startX
            : road.endY - road.startY;

          let miniSize = isSmall ? 80 : 130;
          let count = 1;
          if (size > miniSize) {
            count = (size / miniSize) >> 0;
            miniSize = size / count;
          }

          for (let i = 0; i < count; i++) {
            const mRoad = L.marker(
              xy([
                direction ? road.startX + miniSize * i + miniSize / 2 : x,
                direction ? y : road.startY + miniSize * i + miniSize / 2
              ]),
              {
                icon: L.divIcon({
                  html: road.name,
                  className,
                  iconSize: miniSize * 2
                }),
                interactive: false
              }
            );

            roadsList.push(mRoad);
          }
        });

      return roadsList;
    };

    // -- style big roads
    const rowBigRoads = data.streets.filter(
      (road) =>
        road.roadSmall !== 1 &&
        road.endY - road.startY < road.endX - road.startX &&
        road.endY - road.startY === 8
    );

    // -- style small roads
    const rowSmallRoads = data.streets.filter(
      (road) =>
        road.roadSmall !== 1 &&
        road.endY - road.startY < road.endX - road.startX &&
        road.endY - road.startY === 4
    );

    // | style big roads
    const columnBigRoads = data.streets.filter(
      (road) =>
        road.roadSmall !== 1 &&
        road.endY - road.startY > road.endX - road.startX &&
        road.endX - road.startX === 8
    );

    // | style small roads
    const columnSmallRoads = data.streets.filter(
      (road) =>
        road.roadSmall !== 1 &&
        road.endY - road.startY > road.endX - road.startX &&
        road.endX - road.startX === 4
    );

    // big roads name
    const bigRoadsNmae = L.layerGroup([
      ...drawRoadName(rowBigRoads),
      ...drawRoadName(columnBigRoads, false)
    ]);

    const bigRoadsNmaeS = L.layerGroup([
      ...drawRoadName(rowBigRoads, true, false, true),
      ...drawRoadName(columnBigRoads, false, false, true)
    ]);

    const SmallRoadsNmae = L.layerGroup([
      ...drawRoadName(rowSmallRoads, true, true),
      ...drawRoadName(columnSmallRoads, false, true)
    ]);

    const Ragions = L.layerGroup([
      L.imageOverlay(
        [ragion],
        [xy([minX, minY]), xy([width + minX, height + minY])]
      )
    ]);

    Ragions.setZIndex(299);

    const RagionNames = L.layerGroup(
      ragionsNames.map(({ x, y, name: html }) => {
        return L.marker(xy([x + minX, y + minY]), {
          icon: L.divIcon({
            html,
            className: 'ragion-name',
            iconSize: 64
          }),
          interactive: false
        });
      })
    );

    const RagionNamesM = L.layerGroup(
      ragionsNames.map(({ x, y, name: html }) => {
        return L.marker(xy([x + minX, y + minY]), {
          icon: L.divIcon({
            html,
            className: 'ragion-name medium',
            iconSize: 128
          }),
          interactive: false
        });
      })
    );

    const RagionNamesBig = L.layerGroup(
      ragionsNames.map(({ x, y, name: html }) => {
        return L.marker(xy([x + minX, y + minY]), {
          icon: L.divIcon({
            html,
            className: 'ragion-name big',
            iconSize: 128
          }),
          interactive: false
        });
      })
    );

    const RagionNamesMax = L.layerGroup(
      ragionsNames.map(({ x, y, name: html }) => {
        return L.marker(xy([x + minX, y + minY]), {
          icon: L.divIcon({
            html,
            className: 'ragion-name max',
            iconSize: 256
          }),
          interactive: false
        });
      })
    );

    map.addLayer(RoadsGroup);
    map.addLayer(HousesGroup);

    map.addLayer(L.layerGroup(HouseList));

    map.addLayer(Ragions);
    map.addLayer(RagionNames);

    map.on('zoom', () => {
      const currentZoom = map.getZoom();
      if (currentZoom === maxZoom) {
        map.addLayer(HouseNamesGroup);
      } else {
        map.removeLayer(HouseNamesGroup);
      }

      if (currentZoom === minZoom) {
        map.addLayer(RagionNames);
      }

      if (currentZoom === minZoom + 1) {
        map.removeLayer(RagionNames);
        map.addLayer(RagionNamesM);
      } else {
        map.removeLayer(RagionNamesM);
      }

      if (currentZoom > minZoom + 1) {
        map.removeLayer(Ragions);
        map.addLayer(bigRoadsNmaeS);

        map.addLayer(RagionNamesBig);
      } else {
        map.addLayer(Ragions);
        map.removeLayer(bigRoadsNmaeS);
        map.removeLayer(RagionNamesBig);
      }

      if (currentZoom > minZoom + 2) {
        // map.removeLayer(Ragions);
        map.removeLayer(bigRoadsNmaeS);
        map.addLayer(bigRoadsNmae);
        map.addLayer(SmallRoadsNmae);
        map.removeLayer(RagionNamesBig);
        map.addLayer(RagionNamesMax);
      } else {
        map.removeLayer(bigRoadsNmae);
        map.removeLayer(SmallRoadsNmae);
        map.removeLayer(RagionNamesMax);
        // map.addLayer(Ragions);
      }
    });
  }, [BuildingsNames, data, defaultCenter, map, maxZoom, minZoom, xy]);

  const fullScreen = useCallback(() => {
    const el = document.documentElement;

    document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
      ? document.exitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.webkitExitFullscreen?.()
      : el.requestFullscreen?.() ||
        el.mozRequestFullScreen?.() ||
        el.webkitRequestFullscreen?.() ||
        el.msRequestFullscreen?.();
  }, []);

  const hideShow = useCallback(() => {
    selectedBuilding.setStyle({ stroke: false, fillOpacity: 0 });
    setMapDetailShow(false);
    setMapDetail(null);
  }, []);

  const selectArea = useCallback(
    (val) => {
      if (val === t('map.all_area')) {
        return map.fitBounds(defaultCenter);
      }

      const rag = ragionsNames.find(({ name }) => name === val);
      map.fitBounds([
        xy([rag.x + minX - 150, rag.y + minY - 150]),
        xy([rag.x + minX + 150, rag.y + minY + 150])
      ]);
    },
    [defaultCenter, map, t, xy]
  );

  const selectSize = useCallback(
    (val, type) => {
      if (val === t('map.all_size') || val === t('map.all_type')) {
        map.removeLayer(selectedList);
        setSelectedList(null);
        return;
      }
      let filteredData = [];

      if (type === 'size') {
        filteredData = data.buildings.filter((b) => {
          const x = b.endX - b.startX;
          const y = b.endY - b.startY;
          const size = x < y ? [x, y] : [y, x];
          const sizeStr = val.split(' × ');
          if (size[0] === +sizeStr[0] && size[1] === +sizeStr[1]) {
            return b;
          }
          return false;
        });
      }

      if (type === 'type') {
        if (val === t('map.my_land')) {
          if (account && accountStatus === 'connected') {
            filteredData = data.buildings.filter((b) => +b.owner === +account);
          }
        } else {
          const filterParams = [
            { status: 'BUY_NOW', name: t('map.buy') },
            { status: 'ON_AUCTION', name: t('map.on_auction') },
            { status: 'IS_NEW', name: t('map.new') }
          ];
          filteredData = data.buildings.filter(
            (b) =>
              b.asset_status === filterParams.find((f) => f.name === val).status
          );
        }
      }

      const selectedBuildings = filteredData.map((b) =>
        L.marker(
          xy([
            b.startX + (b.endX - b.startX) / 2,
            b.startY + (b.endY - b.startY) / 2
          ]),
          {
            icon: L.icon({
              iconAnchor: [10, 30],
              iconSize: [20, 30],
              iconUrl: mineIcon
            })
          }
        ).on('click', () => {
          const house = houseEventsList.find(
            (h) => h.startX === b.startX && h.startY === b.startY
          );
          house.rect._events.click[0].fn();
        })
      );
      if (selectedList) {
        map.removeLayer(selectedList);
      }
      const selected = L.layerGroup(selectedBuildings);
      setSelectedList(selected);
      map.addLayer(selected);
    },
    [data, map, selectedList, xy, houseEventsList, account, accountStatus, t]
  );

  return (
    <MainPage title={t('map.title')}>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)',
          position: 'relative'
        }}
        ref={mapElement}
      ></div>

      <ToolBox bottom="24px" right="24px">
        <ImgBox
          onClick={() => {
            map.setZoom(map.getZoom() + 1);
          }}
        >
          <img src={addIcon} alt="" />
        </ImgBox>

        <ImgBox
          onClick={() => {
            map.fitBounds(defaultCenter);
          }}
        >
          <img src={zoomIcon} alt="" />
        </ImgBox>
        <ImgBox
          onClick={() => {
            map.setZoom(map.getZoom() - 1);
          }}
        >
          <img src={minusIcon} alt="" />
        </ImgBox>
      </ToolBox>

      <ToolBox bottom="162px" right="24px">
        <ImgBox onClick={() => fullScreen()}>
          <img src={fullIcon} alt="" />
        </ImgBox>
      </ToolBox>

      <ToolBox
        top="80px"
        right="24px"
        style={{ flexDirection: 'row', gap: '16px', padding: '10px 24px' }}
      >
        <Selector
          style={{ minWidth: '100px' }}
          onChange={selectArea}
          defaultValue={t('map.all_area')}
          selection={[
            t('map.all_area'),
            'Parthenon',
            'Snow Crash',
            'Oasis',
            'Avatar',
            'Metaverse',
            'BTC',
            'Ethereum',
            'BSC',
            'Polygon'
          ]}
        />
        <Selector
          onChange={(val) => selectSize(val, 'type')}
          style={{ minWidth: '100px' }}
          defaultValue={t('map.all_type')}
          selection={[
            t('map.all_type'),
            t('map.my_land'),
            t('map.buy'),
            t('map.on_auction'),
            t('map.new')
          ]}
        />
        <Selector
          style={{ minWidth: '100px' }}
          onChange={(val) => selectSize(val, 'size')}
          defaultValue={t('map.all_size')}
          selection={[
            t('map.all_size'),
            '4 × 4',
            '4 × 6',
            '4 × 8',
            '4 × 10',
            '4 × 12',
            '4 × 14',
            '6 × 6',
            '6 × 10',
            '6 × 14',
            '6 × 16',
            '8 × 8',
            '8 × 12',
            '8 × 16',
            '8 × 20',
            '10 × 14',
            '12 × 14',
            '24 × 24'
          ]}
        />
      </ToolBox>

      <ToolBox
        onBlur={hideShow}
        ref={mapDetailEl}
        tabIndex="80001"
        top="136px"
        left="105px"
        className={mapDetailShow ? 'map-detail-show' : 'map-detail'}
        style={{
          padding: '16px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            minHeight: '275px',
            width: '268px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <img width="268" src={mapDetail?.img} alt="" />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '16px 0'
          }}
        >
          <div>{mapDetail?.name}</div>
          <Btn onClick={() => message.info(t('app.message.coming'))}>
            {t('map.enter')}
          </Btn>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            width: '100%',
            padding: '16px',
            borderRadius: '4px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 0' }}>
            <div style={{ width: '50%' }}>
              <MinTitle>{t('detail.coor')}</MinTitle>
              <span
                style={{
                  background: '-webkit-linear-gradient(#FBCB37, #FF982D)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {mapDetail?.coord}
              </span>
            </div>
            <div style={{ width: '50%' }}>
              <MinTitle>{t('detail.weight')}</MinTitle>
              <span
                style={{
                  background: '-webkit-linear-gradient(#F8A1FF, #9B56F4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {mapDetail?.size}
              </span>
            </div>
          </div>
          <div style={{ margin: '28px 0' }}>
            <MinTitle>{t('detail.owner')}</MinTitle>
            <MinTitle>{showShortAddress(mapDetail?.owner)}</MinTitle>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: ' 32px'
            }}
          >
            <Btn
              onClick={() =>
                mapDetail?.link ? window.open(mapDetail.link) : ''
              }
              style={
                mapDetail?.link
                  ? {
                      flexGrow: 1,
                      color: '#fff',
                      background:
                        'linear-gradient(154.56deg, #4DB7F5 14.1%, #8771FF 91.75%)',
                      boxShadow:
                        '0px 0px 2.96875px rgba(102, 154, 250, 0.5), inset -1.48438px -1.48438px 2.96875px #6699FA, inset 2.96875px 2.96875px 11.1328px #B8D7FF, inset -2.96875px -2.96875px 8.90625px #4371D2'
                    }
                  : {
                      flexGrow: 1,
                      color: '#fff',
                      backgroundColor: 'gray'
                    }
              }
            >
              {t('map.buy')}
            </Btn>
            <Btn onClick={hideShow} style={{ flexGrow: 1 }}>
              {t('map.cancel')}
            </Btn>
          </div>
        </div>
      </ToolBox>

      <ToolBox top="80px" left="105px">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse'
          }}
        >
          <ImgBox>
            <img src={searchIcon} alt="" />
          </ImgBox>
          <div className="search" style={{ marginRight: '-40px' }}>
            <Input
              value={searchText}
              placeholder={t('map.input_place')}
              onChange={(e) => setSearchText(e.target.value)}
              ref={searchEl}
              onBlur={() =>
                setTimeout(() => {
                  setSearchText('');
                }, 150)
              }
              style={{ height: '100%', width: '300px' }}
            />
          </div>
        </div>
        <SearchBox>{SearchItemList}</SearchBox>
      </ToolBox>

      {isLoading ? (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, .24)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999
          }}
        >
          <Spin />
        </div>
      ) : (
        ''
      )}
    </MainPage>
  );
}
