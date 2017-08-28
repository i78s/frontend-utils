
export function rafTimeout(fn: any, delay: number) {
  const start = performance.now();

  function loop(timestamp: number){
    let delta = timestamp - start;
    delta >= delay ? fn.call() : requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}