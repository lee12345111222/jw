import { useMemo, useCallback, useState } from 'react';

import { thumbPlus } from '@/api/share';

import useApi from '@/hooks/useApi';

import { video_server } from '@/constant/env/index';

import likeIcon from '@/assets/icon/like-icon.png';
import likeplusIcon from '@/assets/icon/likeplus-icon.png';
import previewCount from '@/assets/icon/preview-count.png';

import imageLoading from '@/components/ImageBox/assets/imageLoading.png';

import styles from './index.module.css';

import { showShortAddress } from '@/utils/common';

export default function DiscoverItem({
  item: {
    head_img,
    name,
    thumb_counter,
    uuid,
    view_counter,
    owner,
    owner_name,
    owner_tid
  } = {},
  onClick,
  thumbList,
  token,
  account
}) {
  const [thumbed, setThumbed] = useState(0);

  const randomTime = useMemo(
    () => Math.floor(Date.parse(new Date()) / 120000),
    []
  );

  const hasThumb = useMemo(
    () => (thumbList ? thumbList.find((id) => id === uuid) : false),
    [thumbList, uuid]
  );

  const { run } = useApi(thumbPlus, {
    manual: true,
    onSuccess: ({ code }) => {
      if (code === 200) {
        return;
      }
      if (hasThumb) {
        thumbed === 0 ? setThumbed(0) : setThumbed(-1);
      } else {
        thumbed === 0 ? setThumbed(0) : setThumbed(1);
      }
    }
  });

  const onThumb = useCallback(
    async (e) => {
      e.stopPropagation();
      const myToken = await token();
      if (!myToken) return;

      if (hasThumb) {
        thumbed === 0 ? setThumbed(-1) : setThumbed(0);
      } else {
        thumbed === 0 ? setThumbed(1) : setThumbed(0);
      }

      run({
        login_token: myToken,
        uuid,
        address: account,
        operator: hasThumb ? 'cancel' : 'thumb'
      });
    },
    [account, hasThumb, run, thumbed, token, uuid]
  );

  return (
    <div className={styles['discover-item']} onClick={onClick}>
      <Poster src={`${head_img}?r=${randomTime}`} />
      <ItemInfo>
        <TitleBox>
          <span>{name || '-'}</span>
          <div className={styles['info-list']}>
            <div>
              <img
                onClick={onThumb}
                src={
                  (hasThumb && thumbed === 0) || (!hasThumb && thumbed === 1)
                    ? likeplusIcon
                    : likeIcon
                }
                alt=""
              />
              <span>{thumb_counter + thumbed}</span>
            </div>
            <div>
              <img src={previewCount} alt="" />
              <span>{view_counter}</span>
            </div>
          </div>
        </TitleBox>

        <UserInfo name={owner_name} owner={owner} tokenId={owner_tid} />
      </ItemInfo>
    </div>
  );
}

export const Poster = ({ src }) => {
  const [onLoaded, setOnLoaded] = useState(false);

  return (
    <div
      style={{ backgroundImage: `url(${imageLoading})` }}
      className={styles['image-box']}
    >
      <img
        onLoad={() => setOnLoaded(true)}
        className={`${styles.poster} ${onLoaded ? styles.onload : ''}`}
        src={src}
        alt=""
      />
    </div>
  );
};

export const ItemInfo = ({ children }) => (
  <div className={styles['item-info']}>{children}</div>
);
export const TitleBox = ({ children }) => (
  <div className={styles['title-box']}>{children}</div>
);

export const UserInfo = ({ name, owner, tokenId }) => (
  <div className={styles['user-info']}>
    <div className={styles.avatar}>
      <img src={`${video_server}/images/${tokenId}.png`} alt="" />
    </div>
    <div className={styles['user-names']}>
      <span>{owner ? owner.slice(0, 11) : '-'}</span>
      <span className={styles['user-address']}>{showShortAddress(owner)}</span>
    </div>
  </div>
);