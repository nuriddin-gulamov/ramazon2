const date = document.getElementById('date');
const time = document.getElementById('time');
const closeTime = document.getElementById('sahar-time');
const closeText = document.getElementById('sahar-title');
const openTime = document.getElementById('iftar-time');
const leftTime = document.getElementById('left-time');
const leftText = document.getElementById('left-text');

const ramadanTimes = {
  Aprel2: '04:42, 18:54',
  Aprel3: '04:41, 18:55',
  Aprel4: '04:39, 18:56',
  Aprel5: '04:37, 18:57',
  Aprel6: '04:35, 18:58',
  Aprel7: '04:33, 18:59',
  Aprel8: '04:31, 19:00',
  Aprel9: '04:29, 19:01',
  Aprel10: '04:28, 19:02',
  Aprel11: '04:26, 19:04',
  Aprel12: '04:24, 19:05',
  Aprel13: '04:22, 19:06',
  Aprel14: '04:20, 19:07',
  Aprel15: '04:18, 19:08',
  Aprel16: '04:17, 19:09',
  Aprel17: '04:15, 19:10',
  Aprel18: '04:13, 19:11',
  Aprel19: '04:11, 19:12',
  Aprel20: '04:09, 19:13',
  Aprel21: '04:07, 19:14',
  Aprel22: '04:06, 19:15',
  Aprel23: '04:04, 19:16',
  Aprel24: '04:02, 19:18',
  Aprel25: '04:00, 19:19',
  Aprel26: '03:59, 19:20',
  Aprel27: '03:57, 19:21',
  Aprel28: '03:55, 19:22',
  Aprel29: '03:53, 19:23',
  Aprel30: '03:52, 19:24',
  May1: '03:50, 19:25',
};

const sixtySeconds = 59;

setInterval(() => {
  // const catchedDate = new Date('4 Aprel, 2022 19:00:00');
  const catchedDate = new Date();

  // date
  const currentDateData =
    (catchedDate.getDate().toString().length === 1
      ? '0' + catchedDate.getDate() + ' '
      : catchedDate.getDate() + ' ') +
    (catchedDate.getMonth() === 3 ? 'Aprel' : 'May') +
    ', 2022';
  date.innerHTML = currentDateData;

  // time
  const currentTimeData =
    (catchedDate.getHours().toString().length === 1
      ? '0' + catchedDate.getHours() + ':'
      : catchedDate.getHours() + ':') +
    (catchedDate.getMinutes().toString().length === 1
      ? '0' + catchedDate.getMinutes() + ':'
      : catchedDate.getMinutes() + ':') +
    (catchedDate.getSeconds().toString().length === 1
      ? '0' + catchedDate.getSeconds()
      : catchedDate.getSeconds());
  time.innerHTML = currentTimeData;

  // close time
  let closeTimeData =
    ramadanTimes[
      (catchedDate.getMonth() === 3 ? 'Aprel' : 'May') +
        catchedDate.getDate().toString()
    ].split(', ')[0];
  closeTime.innerHTML = closeTimeData;

  // open time
  const openTimeData =
    ramadanTimes[
      (catchedDate.getMonth() === 3 ? 'Aprel' : 'May') +
        catchedDate.getDate().toString()
    ].split(', ')[1];
  openTime.innerHTML = openTimeData;

  // left time
  if (
    +(
      catchedDate.getHours().toString() +
      (catchedDate.getMinutes().toString().length === 1
        ? '0' + catchedDate.getMinutes()
        : catchedDate.getMinutes())
    ) > +closeTimeData.replace(':', '') &&
    +(
      catchedDate.getHours().toString() +
      (catchedDate.getMinutes().toString().length === 1
        ? '0' + catchedDate.getMinutes()
        : catchedDate.getMinutes())
    ) < +openTimeData.replace(':', '')
  ) {
    leftText.innerHTML =
      "O'g'iz ochish (Iftorlik) <br /> uchun quyidagi vaqt qoldi:";
    const openTimeMilliseconds = new Date(
      catchedDate.getDate() + catchedDate.getMonth() === 3
        ? 'Aprel'
        : 'May' + ', ' + catchedDate.getFullYear() + ' ' + openTimeData + ':00'
    ).getTime();
    const timeInMilliseconds = catchedDate.getTime();
    const millisecondsLeft = openTimeMilliseconds - timeInMilliseconds;
    const leftSeconds =
        Math.floor((millisecondsLeft / 1000) % 60).toString().length === 1
          ? '0' + Math.floor((millisecondsLeft / 1000) % 60)
          : Math.floor((millisecondsLeft / 1000) % 60),
      leftMinutes =
        Math.floor((millisecondsLeft / (1000 * 60)) % 60).toString().length ===
        1
          ? '0' + Math.floor((millisecondsLeft / (1000 * 60)) % 60)
          : Math.floor((millisecondsLeft / (1000 * 60)) % 60),
      leftHours =
        Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24).toString()
          .length === 1
          ? '0' + Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24)
          : Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24);
    leftTime.innerHTML = leftHours + ':' + leftMinutes + ':' + leftSeconds;
  } else {
    closeTimeData =
      ramadanTimes[
        (catchedDate.getMonth() === 3 ? 'Aprel' : 'May') +
          (catchedDate.getDate() + 1).toString()
      ].split(', ')[0];
    closeTime.innerHTML = closeTimeData;
    closeText.innerHTML =
      "O'g'iz yopish (Saharlik) vaqti: " +
      ((catchedDate.getDate() + 1).toString().length === 1
        ? '0' + (catchedDate.getDate() + 1)
        : (catchedDate.getDate() + 1).toString()) +
      (catchedDate.getMonth() === 3 ? ' Aprel' : ' May');
    leftText.innerHTML =
      "O'g'iz yopish (Saharlik) <br /> uchun quyidagi vaqt qoldi:";
    const openTimeMilliseconds = new Date(
      catchedDate.getDate() + catchedDate.getMonth() === 3
        ? 'Aprel'
        : 'May' + ', ' + catchedDate.getFullYear() + ' ' + closeTimeData + ':00'
    ).getTime();
    const timeInMilliseconds = catchedDate.getTime();
    const millisecondsLeft = openTimeMilliseconds - timeInMilliseconds;
    const leftSeconds =
        Math.floor((millisecondsLeft / 1000) % 60).toString().length === 1
          ? '0' + Math.floor((millisecondsLeft / 1000) % 60)
          : Math.floor((millisecondsLeft / 1000) % 60),
      leftMinutes =
        Math.floor((millisecondsLeft / (1000 * 60)) % 60).toString().length ===
        1
          ? '0' + Math.floor((millisecondsLeft / (1000 * 60)) % 60)
          : Math.floor((millisecondsLeft / (1000 * 60)) % 60),
      leftHours =
        Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24).toString()
          .length === 1
          ? '0' + Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24)
          : Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24);
    leftTime.innerHTML = leftHours + ':' + leftMinutes + ':' + leftSeconds;
  }
}, 1000);
