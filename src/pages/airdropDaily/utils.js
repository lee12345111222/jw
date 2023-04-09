const formatResultSuccess = (id) => {
  const ids = ['1', '4', '5', '6'];
  return ids.some((item) => item === id);
};
const formatResultScore = (id, score) => {
  if (id === '7') {
    return `+${score} scores/invitation`;
  }
  if (id === '8') {
    return `+5000~10000 scores`;
  }
  return `+${score} scores`;
};

const formatBtnText = (id, title) => {
  if (id === '7') {
    return 'Invite';
  }
  return title.split(' ')[0];
};

export const formatResultTask = (res) => {
  if (res.code === 200) {
    let tasks = res.data.tasks;
    tasks = tasks.map((item) => {
      item.btnText = formatBtnText(item.task_id, item.title);
      item.necessary = formatResultSuccess(item.task_id);
      item.score = formatResultScore(item.task_id, item.score);
      return item;
    });
    return tasks;
  }
};

export function getWindow(url) {
  const width = 720;
  const height = 720;
  const left = (window.screen.width - width) / 5;

  const newWindow = window.open(
    url,
    'title',
    `width=${width},height=${height},top=10,left=${left}`
  );

  // window.addEventListener('message', (event) => {
  //   console.log(event.data);
  //   if (event.data.info) console.log(event.data);
  // });

  // setInterval(() => {
  //   const twitterBindStatus = localStorage.getItem('twitterBindStatus');
  //   console.log(twitterBindStatus);
  // }, 1000);

  // newWindow.addEventListener('unload', () => {
  //   console.log('load');
  //   newWindow.addEventListener('beforeunload', (event) => {
  //     console.log('beforeunload', event);
  //   });
  //   // newWindow.postMessage({ type: 'airdrop', url }, '*');
  // });

  // newWindow.postMessage();

  // setInterval(() => {
  //   console.log(newWindow);
  // }, 1000);

  // // var page = window.open('xxx');

  // console.log({ ...newWindow });

  // newWindow.addEventListener('unload', (event) => {
  //   setTimeout(() => {
  //     console.log('unload', event.currentTarget);
  //   }, 100);
  // });
}
