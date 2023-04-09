import {
  useState,
  useEffect,
  useCallback
  // , useMemo
} from 'react';

import Dialog from '@/ui/dialog/index';

import styles from './share.module.css';
import classNames from 'classnames/bind';

import shareBg from './../images/share-bg.svg';
import mapSvg from './../images/map.svg';
import defaultHead from './../images/default-head.png';
import goldcoin from '@/assets/img/goldcoin.png';

// import { video_server } from '@/constant/env';
// import { getMainRole } from '@/api/role';
import useApi from '@/hooks/useApi';
import { getShareUrl } from '@/api/map';

import { Button, Flex } from '@/custom-ui/index';

const cx = classNames.bind(styles);

const center = { x: 2387, y: 1499 };

const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 900;
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

export default function Share({ building, account, token, open, onClose }) {
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState();

  const { run, loading } = useApi(getShareUrl, {
    manual: true,
    onSuccess: setData
  });

  useEffect(() => {
    if (!data || !open) {
      return;
    }

    const {
      data: { url }
    } = data;

    window.open(`/redirect.html#${url}`);
    onClose();
    setSuccess(true);
  }, [data, onClose, open]);

  //   const { data, run } = useApi(getMainRole);

  //   useEffect(() => {
  //     if (account) {
  //       run(account);
  //     }
  //   }, [account, run]);

  //   const tokenTd = useMemo(() => data?.data?.token_id, [data]);

  const load = useCallback(async () => {
    const bg = await imgLoader(shareBg);
    const mapImg = await imgLoader(mapSvg);

    const sclae = 2;

    const { startX: sx, startY: sy, endX: ex } = building;
    const w = ex - sx;

    const house = reverse(building);

    const { startX, startY, endX } = house;
    const width = (endX - startX) * sclae;

    const cx = startX * sclae + width / 2;
    const cy = startY * sclae + width / 2;

    ctx.drawImage(
      mapImg,
      395 - cx + 211,
      310 - cy + 187.5,
      mapImg.width * 2 * sclae,
      mapImg.height * 2 * sclae
    );

    // const headImg = await imgLoader(
    //   !tokenTd ? `${video_server}/images/${0}.png` : defaultHead
    // );

    const headImg = await imgLoader(defaultHead);

    // if (tokenTd) {
    //   //
    // } else {
    //   ctx.drawImage(headImg, 1027, 46, 118, 118);
    // }

    ctx.drawImage(headImg, 1027, 46, 118, 118);
    ctx.drawImage(bg, 0, 0, 1200, 900);

    const smooth = 200 / (mapImg.width * 2);
    ctx.beginPath();
    ctx.fillStyle = '#FEEE3C';
    ctx.strokeStyle = '#7B61FF';
    ctx.lineWidth = 3;
    ctx.rect(395 + 211 - width / 2, 310 + 187.5 - width / 2, width, width);
    ctx.fill();
    ctx.stroke();

    ctx.drawImage(
      mapImg,
      65 + 10,
      310 + 32.75,
      mapImg.width * smooth * 2,
      mapImg.height * smooth * 2
    );

    ctx.beginPath();
    ctx.fillStyle = '#F34FC5';
    ctx.arc(
      65 + 10 + (cx * smooth) / 2,
      310 + 32.75 + (cy * smooth) / 2,
      4,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 26px roboto';
    ctx.fillText(`(${sx + w / 2}, ${sy + w / 2})`, 51 + 54, 189 + 40);

    ctx.fillText('Unique', 51 + 54, 755 + 40);
    ctx.fillText('ESTATE', 51 + 244, 755 + 40);
    ctx.fillText('Area:', 51 + 54, 668 + 40);

    ctx.fillStyle = '#FEEE3C';
    ctx.fillText(`${w} × ${w}`, 51 + 146, 755 + 40);
    ctx.fillText(`Central City`, 51 + 126, 668 + 40);

    ctx.fillStyle = '#DBC2FC';
    ctx.font = 'normal 22px roboto';
    ctx.fillText(`${account?.slice(2, 11)}`, 1028, 164 + 28);

    const url = canvas.toDataURL('image/png', 1);
    setUrl(url);
  }, [account, building]);

  useEffect(() => {
    load();
  }, [load]);

  const handleShare = useCallback(() => {
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
  }, [account, building.tokenId, run, token]);

  return (
    <div>
      <Dialog
        backdrop={false}
        header=""
        footer=""
        open={open}
        className={cx('dialog')}
      >
        <Flex fd="column" ai="center" gap="24px">
          <div className={cx('poster')}>
            <img src={url} alt="" />
          </div>

          <div className={cx('text')}>
            Successful purchase! Share to Twitter to get rewards
          </div>

          <Flex ai="center" jc="center" gap="32px">
            <Button
              className={cx('btn')}
              loading={loading}
              onClick={handleShare}
            >
              Tweet and Claim MG
            </Button>
            <Button onClick={onClose} className={cx('btn')} danger type="">
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
            MG will be credited to your account within 5 minute
          </div>

          <Flex ai="center" jc="center" gap="32px">
            <Button
              className={cx('btn')}
              loading={loading}
              onClick={() => {
                setData();
                setSuccess(false);
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => {
                setData();
                setSuccess(false);
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
    </div>
  );
}
