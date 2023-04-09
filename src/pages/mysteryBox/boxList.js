import mBox1Img from '@/assets/img/box/m-box1.png';
import mBox2Img from '@/assets/img/box/m-box2.png';
import mBox3Img from '@/assets/img/box/m-box3.png';
import mBox4Img from '@/assets/img/box/m-box4.png';

import mBox5Img from '@/assets/img/box/m-box5.png';
import mBox6Img from '@/assets/img/box/m-box6.png';
import mBox7Img from '@/assets/img/box/m-box7.png';
import mBox8Img from '@/assets/img/box/m-box8.png';

import lBox1Img from '@/assets/img/box/l-box1.png';
import lBox2Img from '@/assets/img/box/l-box2.png';
import lBox3Img from '@/assets/img/box/l-box3.png';
import lBox4Img from '@/assets/img/box/l-box4.png';

import gBox1Img from '@/assets/img/box/g-box1.png';
import gBox2Img from '@/assets/img/box/g-box2.png';
import gBox3Img from '@/assets/img/box/g-box3.png';
import gBox4Img from '@/assets/img/box/g-box4.png';

import AirBox1Img from '@/assets/img/box/air-box01.png';
import AirBox2Img from '@/assets/img/box/air-box02.png';
import AirBox3Img from '@/assets/img/box/air-box03.png';
import AirBox4Img from '@/assets/img/box/air-box04.png';

import { ReactComponent as AirdropIcon1 } from 'src/assets/icon/airdrop-count-icon-2.svg';
import { ReactComponent as AirdropIcon2 } from 'src/assets/icon/boxtype1-icon.svg';
import { ReactComponent as AirdropIcon3 } from 'src/assets/icon/boxtype3-icon.svg';
import { ReactComponent as AirdropIcon4 } from 'src/assets/icon/boxtype4-icon.svg';

import airdropBoxDark1 from 'src/assets/img/box/airdrop-box-dark-1.png';
import airdropBoxDark2 from 'src/assets/img/box/airdrop-box-dark-2.png';
import airdropBoxDark3 from 'src/assets/img/box/airdrop-box-dark-3.png';
import airdropBoxDark4 from 'src/assets/img/box/airdrop-box-dark-4.png';
import airdropBoxLight1 from 'src/assets/img/box/airdrop-box-light-1.png';
import airdropBoxLight2 from 'src/assets/img/box/airdrop-box-light-2.png';
import airdropBoxLight3 from 'src/assets/img/box/airdrop-box-light-3.png';
import airdropBoxLight4 from 'src/assets/img/box/airdrop-box-light-4.png';

const airdropBox = [
  {
    id: 1,
    title: 'VoxelRole Mystery Box 1',
    darkImg: airdropBoxDark1,
    img: airdropBoxLight1,
    count: 1,
    icon: <AirdropIcon1 />,
    countDesc: 'VoxelRole Parts '
  },
  {
    id: 2,
    title: 'Genesis Mystery Box 1',
    darkImg: airdropBoxDark2,
    img: airdropBoxLight2,
    count: 1,
    icon: <AirdropIcon2 />,
    countDesc: 'VoxelRole (full set) '
  },
  {
    id: 3,
    title: 'Genesis Mystery Box 3',
    img: airdropBoxLight3,
    darkImg: airdropBoxDark3,
    count: 1,
    icon: <AirdropIcon3 />,
    countDesc: 'VoxelRole (full set) '
  },
  {
    id: 4,
    title: 'Genesis Mystery Box 4',
    img: airdropBoxLight4,
    darkImg: airdropBoxDark4,
    count: 1,
    icon: <AirdropIcon4 />,
    countDesc: 'VoxelRole (full set) '
  }
];

const part = [
  {
    id: 1,
    title: 'VoxelRole Mystery Box 1',
    darkImg: mBox5Img,
    img: mBox1Img,
    count: '1',
    end_time: '2022-1-16 14:27:10',
    address: '0xaAD05685a08DA70213885466911e638583654aCD',
    desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.',
    free: 1
  },
  {
    id: 2,
    title: 'VoxelRole Mystery Box 2',
    darkImg: mBox6Img,
    img: mBox2Img,
    count: '3',
    end_time: '2022-1-16 14:27:10',
    address: '0xaAD05685a08DA70213885466911e638583654aCD',
    desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.',
    free: 1
  },
  {
    id: 3,
    title: 'VoxelRole Mystery Box 3',
    darkImg: mBox7Img,
    img: mBox3Img,
    count: '6',
    end_time: '2022-1-16 14:27:10',
    address: '0xaAD05685a08DA70213885466911e638583654aCD',
    desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.',
    free: 1
  },
  {
    id: 4,
    title: 'VoxelRole Mystery Box 4',
    darkImg: mBox8Img,
    img: mBox4Img,
    count: '9',
    end_time: '2022-1-16 14:27:10',
    address: '0xaAD05685a08DA70213885466911e638583654aCD',
    desc: 'The body will be divided into different levels of rarity according to the type of characters. The rarer the type, the higher the value of the body. The body will have different levels of rarity according to the type of the character. The rarer type has the higher the value of the body.',
    free: 1
  }
];
const genesis = [
  {
    id: 1,
    title: 'Genesis Mystery Box 1',
    img: gBox1Img
  },
  {
    id: 2,
    title: 'Genesis Mystery Box 2',
    img: gBox2Img
  },
  {
    id: 3,
    title: 'Genesis Mystery Box 3',
    img: gBox3Img
  },
  {
    id: 4,
    title: 'Genesis Mystery Box 4',
    img: gBox4Img
  }
];
const blueprint = [
  {
    id: 1,
    title: 'Blueprint Mystery Box 1',
    img: lBox1Img,
    desc: 'The Blueprint Mystery Box is a gift created especially for "Exodus."The official first release Blueprint has six types: Modern, Greek, Mediterranean, Gothic, Romanesaue, and Rococo. After receiving the Blueprint, users can bind the Blueprint to the land in the Parcel Editor. '
  },
  {
    id: 2,
    title: 'Blueprint Mystery Box 2',
    img: lBox2Img,
    desc: 'The Blueprint Mystery Box is a gift created especially for "Exodus."The official first release Blueprint has six types: Modern, Greek, Mediterranean, Gothic, Romanesaue, and Rococo. After receiving the Blueprint, users can bind the Blueprint to the land in the Parcel Editor. '
  },
  {
    id: 3,
    title: 'Blueprint Mystery Box 3',
    img: lBox3Img,
    desc: 'The Blueprint Mystery Box is a gift created especially for "Exodus."The official first release Blueprint has six types: Modern, Greek, Mediterranean, Gothic, Romanesaue, and Rococo. After receiving the Blueprint, users can bind the Blueprint to the land in the Parcel Editor. '
  },
  {
    id: 4,
    title: 'Blueprint Mystery Box 4',
    img: lBox4Img,
    desc: 'The Blueprint Mystery Box is a gift created especially for "Exodus."The official first release Blueprint has six types: Modern, Greek, Mediterranean, Gothic, Romanesaue, and Rococo. After receiving the Blueprint, users can bind the Blueprint to the land in the Parcel Editor. '
  }
];

const aircraft = [
  {
    id: 1,
    title: 'Jetpack Mystery Box 1',
    img: AirBox1Img,
    desc: 'Jetpack, an NFT composed of ERC-1155, is a gift designed for "Leviticus." In the life of the PlayerOne world, the Jetpack is an essential means of transportation. with the Jetpack on your back, you can overlook the PlayerOne continent from the perspective of God and fly freely with your friends in the PlayerOne world.'
  },
  {
    id: 2,
    title: 'Jetpack Mystery Box 2',
    img: AirBox2Img,
    desc: 'Jetpack, an NFT composed of ERC-1155, is a gift designed for "Leviticus." In the life of the PlayerOne world, the Jetpack is an essential means of transportation. with the Jetpack on your back, you can overlook the PlayerOne continent from the perspective of God and fly freely with your friends in the PlayerOne world.'
  },
  {
    id: 3,
    title: 'Jetpack Mystery Box 3',
    img: AirBox3Img,
    desc: 'Jetpack, an NFT composed of ERC-1155, is a gift designed for "Leviticus." In the life of the PlayerOne world, the Jetpack is an essential means of transportation. with the Jetpack on your back, you can overlook the PlayerOne continent from the perspective of God and fly freely with your friends in the PlayerOne world.'
  },
  {
    id: 4,
    title: 'Jetpack Mystery Box 4',
    img: AirBox4Img,
    desc: 'Jetpack, an NFT composed of ERC-1155, is a gift designed for "Leviticus." In the life of the PlayerOne world, the Jetpack is an essential means of transportation. with the Jetpack on your back, you can overlook the PlayerOne continent from the perspective of God and fly freely with your friends in the PlayerOne world.'
  }
];
// };

export { part, genesis, blueprint, aircraft, airdropBox };
