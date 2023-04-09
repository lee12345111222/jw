// import { isTest } from '@/utils/common';
import { useParams } from 'react-router-dom';

import {
  PartDetail,
  GenesisDetail,
  BlueprintDetail,
  AircraftDetail
} from './details/index';

export default function BoxDetail() {
  const { type } = useParams();

  return (
    <div>
      {type === 'part' && <PartDetail />}
      {type === 'genesis' && <GenesisDetail />}
      {type === 'blueprint' && <BlueprintDetail />}
      {type === 'jetpack' && <AircraftDetail />}
    </div>
  );
}
