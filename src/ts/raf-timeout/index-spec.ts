import { rafTimeout } from './index';

xit('raf-timeout', (done) => {
  rafTimeout(() => {}, 50);

  rafTimeout(() => {
    done();
  }, 100);
});
