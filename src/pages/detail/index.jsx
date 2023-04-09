import { useParams } from 'react-router-dom';

// import LandDetail from './LandDetail';
// import VoxelDetail from './VoxelDetail';
import VoxelPart from './VoxelPart';

export default function Detail() {
  const { item, id } = useParams();

  return (
    <>
      {/* {item === 'land' && <LandDetail />}
          {item === 'voxelrole' && <VoxelDetail />} */}
      {item === 'voxelpart' && <VoxelPart id={id} />}
    </>
  );
}
