import WritableLogger from '../logger';

const loggerSpeed = 150;
const feedSpeed = 50;

const writable = new WritableLogger(50);
writable.speed = loggerSpeed;

const dataLimit = 100;
let data = 0;

let interval: NodeJS.Timeout;

function sendData(): void {
  data += 1;

  if (data < dataLimit) {
    const isWritable = writable.write(data.toString());

    if (!isWritable) {
      clearInterval(interval);
      writable.once('drain', feedStream);
    }
  } else {
    clearInterval(interval);
    writable.end(data.toString());
  }
}

function feedStream(): void {
  interval = setInterval(sendData, feedSpeed);
}

feedStream();
