// import './index.css';

import MainBg from '@/components/MainBg';

// import classes from './index.module.css';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(classes);

export default function Sample() {
  // useEffect(() => {
  //   const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  //   const gainNode = audioCtx.createGain();

  //   (async () => {
  //     const audioStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true
  //     });

  //     const source = audioCtx.createMediaStreamSource(audioStream);

  //     source.connect(gainNode);
  //     gainNode.connect(audioCtx.destination);

  //     console.log(gainNode.gain.value = 0);
  //   })();
  // }, []);

  // const { connect, disconnect } = useChat(account, '12345678');

  // const handleConnect = useCallback(() => {
  //   connect();
  // }, [connect]);

  // const handleDisconnect = useCallback(() => {
  //   disconnect();
  // }, [disconnect]);

  return (
    <MainBg />
    // <div style={{ color: '#fff' }}>
    //   <label htmlFor="standard-select">Standard Select</label>
    //   <div class="select">
    //     <select id="standard-select">
    //       <option value="Option 1">
    //         Option 1 Option 1 Option 1 Option 1 Option 1 Option 1 Option 1
    //       </option>
    //       <option value="Option 2">Option 2</option>
    //       <option value="Option 3">Option 3</option>
    //       <option value="Option 4">Option 4</option>
    //       <option value="Option 5">Option 5</option>
    //       <option value="Option 6">Option 6</option>
    //       <option value="Option 7">Option 7</option>
    //       <option value="Option 8">Option 8</option>
    //       <option value="Option 9">Option 9</option>
    //       <option value="Option 10">Option 10</option>
    //       <option value="Option 11">Option 11</option>
    //     </select>
    //   </div>
    //   <div style={{ display: 'flex' }}>
    //     <button>click me</button>
    //     <button>click me</button>
    //     <button>click me</button>
    //     <button>click me</button>
    //     <button>click me</button>
    //     <button>click me</button>
    //     <button>click me</button>
    //     <button>click me</button>
    //     <button>click me</button>
    //   </div>
    // </div>
  );

  // return (
  //   <div>
  //     <button onClick={handleConnect}>connect</button>
  //     <button onClick={handleDisconnect}>disconnect</button>
  //     <button
  //       onClick={() => {
  //         async function run() {
  //           const res = await test();
  //           console.log(res);
  //         }
  //         try {
  //           run();
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }}>
  //       Test
  //     </button>
  //     <button
  //       onClick={async () => {
  //         const res = await roleMint2([
  //           1001, 0, 0, 1307, 1419, 1505, 1603, 1714, 0, 1903, 0
  //         ]);
  //         console.log(res);
  //       }}>
  //       roleMint
  //     </button>

  //     <button
  //       onClick={() => {
  //         isBindingBlueprint(1, 2).then(console.log);
  //       }}>
  //       isBindingBlueprint
  //     </button>
  //   </div>
  // );
}
