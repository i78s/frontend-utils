// IE10以上, Android4.4.2以上
export function getTransitionEndName (): string {
  const el = document.createElement('div');
  const transitions = {
    'transition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for (let key in transitions) {
    if (transitions.hasOwnProperty(key) && typeof el.style[key] !== 'undefined') {
      return transitions[key];
    }
  }
}

const transitionEndName = getTransitionEndName();
export default transitionEndName;