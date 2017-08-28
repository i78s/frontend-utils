import * as assert from 'power-assert';
import { rafTimeout } from './index';

it('raf-timeout', (done) => {
  let count = 0;
  rafTimeout(() => {
    count++;
  }, 50);

  rafTimeout(() => {
    assert(count === 1);
    done();
  }, 100);
});
