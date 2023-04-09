import { useMemo, useState, useCallback } from 'react';

import Dialog from '@/ui/dialog/index';
import { ConfirmDialog } from '@/ui/dialog/index';
import { LoadingDialog, SuccessDialog, FailDialog } from '@/ui/dialog/index';

import useLoginToken from '@/hooks/useLoginToken';

import { Flex } from '@/custom-ui/index';

import backpackIcon from 'src/assets/icon/backpack-icon.png';

import { prebuildingfitparcels, prebuildingpublish } from '@/api/parcel';
import useApi from '@/hooks/useApi';

import { BasicCard } from '@/components/Cards/index';
import CardList from '@/components/CardList/index';
import union from '@/assets/icon/union.png';

export default function PublishToParcel({
  loginToken,
  address,
  uuid,
  onClose
}) {
  const { data, loading } = useApi(() =>
    prebuildingfitparcels({ login_token: loginToken, address, uuid })
  );

  const { run: publish } = useApi(prebuildingpublish, { manual: true });

  const [selectedId, setSelectedId] = useState();

  const [loadingOpen, setLoadingOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

  const childList = useMemo(() => {
    return data?.data?.parcels.map(
      ({ image, name, custom_name, token_id, x1, x2 }) => (
        <ChildCard
          onClick={() => setSelectedId(token_id)}
          img={image}
          name={custom_name || name}
          width={x2 - x1}
          key={token_id}
        />
      )
    );
  }, [data?.data?.parcels]);

  const [getToken] = useLoginToken();

  const handleConfirm = useCallback(() => {
    const asyncFn = async () => {
      const token = await getToken();
      const { code, data } = await publish({
        login_token: token,
        address,
        uuid,
        token_id: tokenId
      });

      setTimeout(() => {
        setLoadingOpen(false);

        if (code === 200 && data?.msg === 'success') {
          setSuccessOpen(true);
        } else {
          setFailOpen(true);
        }
      }, 400);
    };

    const tokenId = selectedId;
    setSelectedId();
    setLoadingOpen(true);
    asyncFn();
  }, [address, getToken, publish, selectedId, uuid]);

  return (
    <>
      <Dialog
        title={
          <Flex ai="center" gap="12px">
            <img src={backpackIcon} alt="" />
            <span>My Parcel</span>
          </Flex>
        }
        footer=""
        open={true}
        onCancel={onClose}
      >
        <div style={{ width: 756, height: 640 }}>
          <CardList style={{ padding: 0 }} loading={loading}>
            {childList}
          </CardList>
        </div>
      </Dialog>

      <ConfirmDialog
        open={!!selectedId}
        onCancel={() => setSelectedId()}
        onConfirm={handleConfirm}
        msg="If confirmed to publish to the parcel,the original buildings on the parcel will be covered"
      />

      <LoadingDialog
        open={loadingOpen}
        msg="Please wait a moment, publishing ..."
      />

      <SuccessDialog
        onClose={() => setSuccessOpen(false)}
        title="Successful Publish !"
        open={successOpen}
      />
      <FailDialog
        onClose={() => setFailOpen(false)}
        title="Publish failed !"
        open={failOpen}
      />
    </>
  );
}

const ChildCard = ({ name = '-', img, width, onClick }) => {
  return (
    <BasicCard title={name} img={img} onClick={onClick}>
      <Flex ai="center" jc="space-between">
        <Flex ai="center" gap="8px">
          <img height="16" style={{}} src={union} alt="" />
          <span style={{ fontSize: '16px' }}>
            {width ? `${width} × ${width} × ${width}` : '-'}
          </span>
        </Flex>
      </Flex>
    </BasicCard>
  );
};
