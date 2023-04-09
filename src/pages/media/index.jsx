import { useState, useEffect, useCallback } from 'react';
import { Select } from 'antd';
import Atropos from 'atropos/react/atropos-react.esm.js';
import 'atropos/atropos.min.css';

import classNames from 'classnames/bind';
import styles from './index.module.css';

import DownBtn from './DownBtn/index';

import Header from './header/index';
import { ColorItem } from './ColorItem/index';

import arrow from '@/assets/img/media/arrow.png';
import titleIcon from '@/assets/img/media/mediaTitle.png';

import { FooterLinkArray } from '@/utils/footer-link';

import {
  newsImg,
  linkArray,
  hqImgArr,
  logoArr,
  colorArr,
  iconArr
} from './media-data';

const cx = classNames.bind(styles);

// 媒体页
export default function Media(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // 菜单选中效果，跳转对应锚点
  const onHandleMenu = (index, item) => {
    setActiveIndex(index);
  };

  const handleChange = (e) => {
    console.log(e);
  };

  const handleScrollToc = () => {
    const el = document.getElementById('container');
    const scrollTop = el.scrollTop || el.scrollTop;
    if (scrollTop < 1113) {
      setActiveIndex(0);
    } else if (scrollTop >= 1113 && scrollTop < 2601) {
      setActiveIndex(1);
    } else if (scrollTop >= 2601 && scrollTop < 3113) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  };

  useEffect(() => {
    const el = document.getElementById('container');
    el.onscroll = handleScrollToc;
    return () => {
      el.onscroll = () => null;
    };
  }, []);

  const handleViewMore = useCallback(() => {
    window.open('https://mirror.xyz/playeroneworld.eth');
  }, []);

  return (
    <>
      <div className={cx('media')}>
        <Header
          onHandleMenu={onHandleMenu}
          cx={cx}
          arrow={arrow}
          activeIndex={activeIndex}
        />

        <div id="container" className={cx('content')}>
          <div className={cx('media-logo-bg')}>
            <img className={cx('media-logo-title')} src={titleIcon} alt="img" />
          </div>
          <div id="Description" className={cx('description-box')}>
            <div className={cx('left-desc')}>
              <div className={cx('introduction')}>
                <div className={cx('desc-title')}>Introduction</div>
                <div className={cx('desc-text')}>
                  PlayerOne is the world's first multi-chain metaverse sandbox
                  gaming platform, with four
                  <br />
                  key components: production tools, a social scene, NFT trading
                  market, and a Play to Earn
                  <br />
                  gaming system. PlayerOne uses a 3D voxel game style, which
                  reduces the barrier for
                  <br />
                  developers to get started while also improving user experience
                  and sharing methods.
                </div>
              </div>

              <div className={cx('features')}>
                <div className={cx('desc-title')}>Features</div>
                <div className={cx('featur-item')}>
                  <span className={cx('featur-label')}>Production Tools:</span>
                  RoleEditor, SpaceEditor, VoxelEditor & GameEditor.
                </div>
                <div className={cx('featur-item')}>
                  <span className={cx('featur-label')}>Cross-platform:</span>
                  Supports all platforms, including Windows, Mac, and Linux; no
                  client is required.
                </div>
                <div className={cx('featur-item')}>
                  <span className={cx('featur-label')}>
                    {' '}
                    Low entry barriers:
                  </span>
                  The PlayerOne metaverse world may be experienced with a single
                  link, and a personalized place can be built in five minutes.
                </div>
                <div className={cx('featur-item')}>
                  <span className={cx('featur-label')}>
                    Platform openness:{' '}
                  </span>
                  Enable the import of cross-metaverse characters such as 3D NFT
                  characters like Meebits, as well as the creation of new
                  characters by developers.
                </div>
              </div>
            </div>
            <div className={cx('right-desc')}>
              <div className={cx('desc-title')}>Fact Sheet</div>
              <div className={cx('fact-item')}>
                <div className={cx('fact-lable')}>Developer:</div>
                <div className={cx('fact-desc')}>PlayerOne</div>
              </div>
              <div className={cx('fact-item')}>
                <div className={cx('fact-lable')}>Fouding date:</div>
                <div className={cx('fact-desc')}>2019</div>
              </div>
              <div className={cx('fact-item')}>
                <div className={cx('fact-lable')}>Game website:</div>
                <div className={cx('fact-desc')}>PlayerOne.world</div>
              </div>
              <div className={cx('fact-item')}>
                <div className={cx('fact-lable')}>Press/Business contact:</div>
                <div className={cx('fact-desc')}>Copyright 2022 PlayerOne</div>
              </div>
              <div className={cx('fact-item')}>
                <div className={cx('fact-lable')}>Social:</div>
                <div className={cx('social')}>
                  {linkArray.map(({ title, href }, index) => (
                    <a
                      href={href}
                      target="_blank"
                      key={index}
                      className={cx('fact-desc')}
                      rel="noreferrer">
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div id="Branding" className={cx('branding-box')}>
            <div className={cx('brand-logo-box')}>
              <div className={cx('brand-head')}>
                <div className={cx('brand-title1')}> Logo</div>
                <div className={cx('brand-desc')}>
                  Do Not Edit, Change, Distort, Color Or Reset The Sandbox
                  Presskit
                </div>
              </div>

              <div className={cx('brand-playone')}>
                {logoArr.map((item, index) => {
                  return <PlayOneCardItem key={index} {...item} />;
                })}
              </div>

              <div className={cx('brand-line')}></div>
            </div>

            <div className={cx('brand-active-logo')}>
              <div className={cx('brand-head')}>
                <div className={cx('brand-title1')}> Alternative Logo</div>

                <div className={cx('brand-desc')}>
                  Use Them Only When The Sandbox Brand Is Clearly Visible Or
                  Correctly Included Elsewhere On
                  <br />
                  The Page Or In The Design. (In Case Of Doubt,Use The Other
                  One)
                </div>
              </div>

              <PlayOneCardItem {...iconArr[0]} />
            </div>
          </div>

          <div className={cx('colors-box')}>
            <div className={cx('brand-head')}>
              <div className={cx('brand-title1')}> Colors</div>
              <div className={cx('brand-desc')}>Color Matching Guide</div>
            </div>

            <ColorItem colorArr={colorArr} />
          </div>

          <div id="Images" className={cx('images-box')}>
            <div className={cx('brand-head')}>
              <div className={cx('brand-title1')}> HQ Images</div>
            </div>

            <div className={cx('imgscontent')}>
              {hqImgArr.map(({ name, url }, index) => {
                return (
                  <div key={index} className={cx('imgs-item')}>
                    <Atropos shadow={false} className={cx('imgs')}>
                      <img className={cx('imgs')} src={url} alt="" />
                    </Atropos>
                    <div className={cx('img-desc')}>{name}</div>
                    <div className={cx('downloadBox')}>
                      <div>Download</div>
                      <DownBtn text="Png" src={url} name={name} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="News" className={cx('news-box')}>
            <div className={cx('brand-head')}>
              <div className={cx('brand-title1')}>News</div>
              <div className={cx('newscontent')}>
                {newsImg.map(({ desc, href, url }, index) => {
                  return (
                    <a href={href} target="_blank" rel="noreferrer" key={index}>
                      <div className={cx('news-item')}>
                        <img className={cx('news-imgs')} src={url} alt="" />
                        <div className={cx('news-desc')}>{desc}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className={cx('viewmore')} onClick={handleViewMore}>
                View More &gt;
              </div>
            </div>
          </div>
          <div className={cx('footer-box')}>
            <div className={cx('ft-left')}>
              <div className={cx('medaiaHeadRight')}>
                <Select
                  defaultValue="English"
                  style={{ width: 118 }}
                  bordered={false}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'English',
                      label: 'English'
                    }
                  ]}
                />
              </div>

              <div className={cx('medaiaHeadMenu', 'ft-menu')}>
                {['Description', 'Branding', 'Images', 'News'].map(
                  (item, index) => {
                    return (
                      <a
                        key={`ft-${item}`}
                        href={`#${item}`}
                        onClick={() => {
                          onHandleMenu(index, item);
                        }}
                        className={cx(
                          'medaiaMenuItem',
                          `${activeIndex === index ? 'menuActive' : ''}`
                        )}>
                        {item}
                      </a>
                    );
                  }
                )}
                <></>
              </div>
            </div>
            <FooterRight />
          </div>
        </div>
      </div>
    </>
  );
}

const PlayOneCardItem = ({ pngUrl, svgUrl, backgroundUrl, name }) => {
  return (
    <div className={cx('brand-playone-item')}>
      <Atropos shadow={false}>
        <img data-atropos-offset="-2" src={backgroundUrl} alt="" />
        <div className={cx('brand-playone-img-1')}>
          <img data-atropos-offset="4" src={pngUrl} alt="" />
        </div>
      </Atropos>
      <div className={cx('brand-img-theme')}>{name}</div>
      <div className={cx('brand-download')}>
        <div>Download</div>
        <DownBtn text="Png" src={pngUrl} name={name} />
        <DownBtn text="Svg" src={svgUrl} name={name} />
      </div>
    </div>
  );
};

const FooterRight = () => (
  <div className={cx('ft-right')}>
    {FooterLinkArray.map(({ src, href }, index) => {
      return (
        <a href={href} rel="noreferrer" target="_blank" key={index}>
          <img src={src} alt="" className={cx('footer-nav-item')} />
        </a>
      );
    })}
    <div className={cx('ft-desc')}>Copyright © 2023 PlayerOne</div>
  </div>
);
