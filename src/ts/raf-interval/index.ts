
export interface RafInterval {
  id: number;
}

export function rafInterval(fn: any, delay: number): RafInterval {
  let start = performance.now();
  let handle: RafInterval = {
    id: 0
  };

  function loop(timestamp: number) {
    const delta = timestamp - start;
    handle.id = requestAnimationFrame(loop);

    if(delta >= delay) {
      fn.call();
      start = performance.now();
    }
  }

  handle.id = requestAnimationFrame(loop);
  return handle;
}

export function rafClearInterval(handle: RafInterval) {
  cancelAnimationFrame(handle.id)
}
