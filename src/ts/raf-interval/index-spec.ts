import { rafInterval, rafClearInterval } from './index';

it('raf-interval', (done) => {
  let count = 0;
  let timer = rafInterval(() => {
    count++;

    if (count == 2) {
      done();
      rafClearInterval(timer)
    }
  }, 100);
});
