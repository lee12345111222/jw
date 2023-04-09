import { useParams } from 'react-router-dom';

import LandDetail from './LandDetail';
import VoxelDetail from './VoxelDetail';
import VoxelPartDetail from '@/pages/detail/VoxelPart';
import BlueprintDetail from '../create/tabs/BlueprintDetail';
import AircraftDetail from '../create/tabs/AircraftDetail';
// import { isTest } from '@/utils/common';

export default function Detail() {
  const { tab, id } = useParams();

  return (
    <>
      {tab === 'parcel' && <LandDetail id={id} />}
      {tab === 'voxelrole' && <VoxelDetail id={id} />}
      {tab === 'voxelpart' && <VoxelPartDetail id={id} />}
      {tab === 'blueprint' && <BlueprintDetail id={id} />}
      {tab === 'jetpack' && <AircraftDetail id={id} />}
    </>
  );
}
