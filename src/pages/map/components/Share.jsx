import { useState, useEffect, useCallback } from 'react';

import Dialog from '@/ui/dialog/index';

import styles from './share.module.css';
import classNames from 'classnames/bind';

import shareBg from '@/assets/img/share-bg.png';
import mapSvg from './../images/map.svg';
import defaultHead from './../images/default-head.png';
import goldcoin from '@/assets/img/goldcoin.png';

import pendingIcon from '@/assets/icon/warning-icon.svg';

import useApi from '@/hooks/useApi';
import { getShareUrl } from '@/api/map';

import { Button, Flex } from '@/custom-ui/index';

const cx = classNames.bind(styles);

const center = { x: 2387, y: 1499 };

const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 630;
const ctx = canvas.getContext('2d');

async function imgLoader(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.addEventListener('load', () => {
      resolve(img);
    });

    img.onerror = (error) => reject(error);
  });
}

function reverse(item) {
  const { x, y } = center;
  const { startX, startY, endX } = item;
  const width = endX - startX;

  return {
    ...item,
    startX: startY + x,
    startY: -startX + y - width,
    endX: startY + x + width,
    endY: -startX + y
  };
}

export default function Share({ building, account, getToken, open, onClose }) {
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState();

  const { run } = useApi(getShareUrl, {
    manual: true,
    onSuccess: (res) => setData(res?.data?.url)
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const load = useCallback(async () => {
    setLoading(true);
    const bg = await imgLoader(shareBg);
    const mapImg = await imgLoader(mapSvg);

    const sclae = 2;
    const { startX: sx, startY: sy, endX: ex, area } = building;

    const w = ex - sx;

    const house = reverse(building);

    const { startX, startY, endX } = house;
    const width = (endX - startX) * sclae;

    const cx = startX * sclae + width / 2;
    const cy = startY * sclae + width / 2;

    ctx.drawImage(
      mapImg,
      497 - cx + 640 / 2 - 142,
      247 - cy + 318 / 2 - 14,
      mapImg.width * 2 * sclae,
      mapImg.height * 2 * sclae
    );

    const headImg = await imgLoader(defaultHead);

    ctx.drawImage(headImg, 1027, 40, 118, 118);
    ctx.drawImage(bg, 0, 0, 1200, 630);

    const smooth = 180 / (mapImg.width * 2);
    ctx.beginPath();
    ctx.fillStyle = '#FEEE3C';
    ctx.strokeStyle = '#7B61FF';
    ctx.lineWidth = 3;
    ctx.rect(497 - width / 2 + 178, 247 - width / 2 + 145, width, width);

    ctx.fill();
    ctx.stroke();

    ctx.drawImage(
      mapImg,
      61 + 10,
      204 + 32.75,
      mapImg.width * smooth * 2,
      mapImg.height * smooth * 2
    );

    ctx.beginPath();
    ctx.fillStyle = '#F34FC5';
    ctx.arc(
      61 + 10 + (cx * smooth) / 2,
      204 + 32.75 + (cy * smooth) / 2,
      4,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 26px roboto';
    ctx.fillText(`(${sx + w / 2}, ${sy + w / 2})`, 328 + 54, 130 + 36);

    ctx.fillText('Unique', 60 + 20, 522 + 36);
    ctx.fillText('ESTATE', 60 + 218, 522 + 36);
    ctx.fillText('Area:', 60 + 20, 450 + 36);

    ctx.fillStyle = '#FEEE3C';
    ctx.fillText(`${w} × ${w}`, 60 + 112, 522 + 36);
    ctx.fillText(area || '-', 60 + 94, 450 + 36);

    ctx.fillStyle = '#DBC2FC';
    ctx.font = 'normal 22px roboto';
    ctx.fillText(`${account?.slice(2, 11)}`, 1028, 164 + 28);

    const url = canvas.toDataURL('image/png', 1);
    setUrl(url);

    const token = getToken();
    canvas.toBlob(
      (blob) => {
        const data = {
          login_token: token,
          address: account,
          token_id: building.tokenId,
          upfile: blob
        };

        run(data);
      },
      'image/jpeg',
      1
    );
  }, [account, building, getToken, run]);

  useEffect(() => {
    load();
  }, [load]);

  const handleShare = useCallback(() => {
    const res = window.open(`/redirect.html#${data}`);
    if (res) {
      setSuccess(true);
    } else {
      // 这里可以显示 分享窗口未弹出（被拦截）的提示
    }
  }, [data]);

  const [needConfirm, setNeedConfirm] = useState(false);

  return (
    <div>
      <Dialog
        backdrop={false}
        header=""
        footer=""
        open={!success && open}
        className={cx('dialog')}
      >
        <Flex fd="column" ai="center" gap="24px">
          <div className={cx('poster')}>
            <img src={url} alt="" />
          </div>

          <div className={cx('text')}>
            {open?.tx && (
              <div>
                <span>Transaction request is submitted! </span>
                <a
                  href={`/redirect.html#https://etherscan.io/tx/${open?.tx}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Etherscan &gt;&gt;
                </a>
              </div>
            )}
            <div>
              <span>Share a Tweet and win </span>
              <span style={{ color: 'rgba(254, 238, 60, 0.65)' }}>3,000</span>
              <span> MG tokens</span>
            </div>
          </div>

          <Flex ai="center" jc="center" gap="32px">
            <Button
              className={cx('btn')}
              loading={loading}
              onClick={handleShare}
            >
              Tweet and Claim MG
            </Button>
            <Button
              onClick={() => setNeedConfirm(true)}
              className={cx('btn')}
              danger
              type=""
            >
              Give up reward
            </Button>
          </Flex>
        </Flex>
      </Dialog>

      <Dialog
        header=""
        footer=""
        backdrop={false}
        open={success}
        className={cx('dialog')}
      >
        <Flex ai="center" fd="column" gap="32px">
          <div className={cx('goldcoin')}>
            <img src={goldcoin} alt="" />
          </div>

          <div className={cx('text')}>
            MG will appear in your wallet after on-chain transaction is
            completed
          </div>

          <Flex ai="center" jc="center" gap="32px">
            <Button
              className={cx('btn')}
              loading={loading}
              onClick={() => {
                setData();
                setSuccess(false);
                onClose();
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => {
                setData();
                setSuccess(false);
                onClose();
              }}
              className={cx('btn')}
              danger
              type=""
            >
              Close
            </Button>
          </Flex>
        </Flex>
      </Dialog>

      <Dialog animate={false} header="" footer="" open={needConfirm}>
        <div className={styles['confirm-dialog']}>
          <div>
            <img src={pendingIcon} alt="" />
          </div>
          <div>Are you sure to give up the reward?</div>
          <div className={styles['confirm-dialog-actions']}>
            <Button onClick={onClose}>
              <div className={styles.action}>Confirm</div>
            </Button>
            <Button onClick={() => setNeedConfirm(false)} type="outline">
              <div className={styles.action}>Cancel</div>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
