import { useState } from 'react';

export default function Sample() {
  return (
    <div>
      <Mysterybox />
    </div>
  );
}

const Mysterybox = () => {
  return (
    <div>
      <MysteryboxTitle />
      <Tabs />
    </div>
  );
};

const MysteryboxTitle = () => {
  return (
    <div>
      <span>Mystery Box Collection</span>
    </div>
  );
};

const Tabs = () => {
  const [selcetKey, setSelcetKey] = useState(0);

  return (
    <div>
      <TabsItems onChange={setSelcetKey} selcetKey={selcetKey} />
      <BoxCard selcetKey={selcetKey} />
      <Probability selcetKey={selcetKey} />
    </div>
  );
};

const TabsItems = ({ selcetKey, onChange }) => {
  return (
    <div>
      <ul
        style={{
          listStyleType: 'none',
          display: 'flex',
          gap: '16px',
        }}
      >
        {['VoxelRole', 'Genesis', 'Blurprint', 'Jetpack'].map((item, index) => (
          <li
            key={index}
            onClick={() => onChange(index)}
            style={{
              backgroundColor: selcetKey === index ? 'red' : 'blue',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const BoxCard = ({ selcetKey }) => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <BoxCardLeft />
      <BoxCardRight />
      {selcetKey}
    </div>
  );
};

const BoxCardLeft = () => {
  return <div>BoxCardLeft</div>;
};

const BoxCardRight = () => {
  return <div>BoxCardRight</div>;
};

const Probability = ({ selcetKey }) => {
  return <div>Probability {selcetKey}</div>;
};
