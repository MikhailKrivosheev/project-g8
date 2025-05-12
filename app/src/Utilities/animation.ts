/* eslint-disable no-restricted-properties */
// import BezierEasing from 'bezier-easing';

let instance;

export function cubicInOut(fraction) {
  return fraction < 0.5
    ? 4 * Math.pow(fraction, 3)
    : (fraction - 1) * (2 * fraction - 2) * (2 * fraction - 2) + 1;
}

export function sinInOut(fraction) {
  return (1 + Math.sin(Math.PI * fraction - Math.PI / 2)) / 2;
}

export function easeOutBack(fraction) {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(fraction - 1, 3) + c1 * Math.pow(fraction - 1, 2);
}

export function linear(fraction) {
  return fraction;
}

// function generateBezierInterpolation({ x1, y1, x2, y2 }) {
//   return BezierEasing(x1, y1, x2, y2);
// }

function generateInterpolation(easing) {
  if (easing === 'sin') return sinInOut;
  if (easing === 'linear') return linear;
  // if (easing?.bezier === 'bezier')
  //   return generateBezierInterpolation(easing.bezier);
  return cubicInOut;
}

export function stop(closure = instance) {
  cancelAnimationFrame(closure.frame);
}

function runAnimation(
  startTime,
  duration,
  task,
  resolve,
  object,
  easing = cubicInOut
) {
  const closure = object;
  closure.frame = requestAnimationFrame(() => {
    const fraction = (Date.now() - startTime) / duration;
    if (fraction < 1) {
      task(easing(fraction));
      runAnimation(startTime, duration, task, resolve, object, easing);
    } else {
      stop(closure);
      task(1);
      if (resolve) resolve();
    }
  });
}

export function go(duration, task, easing, closure) {
  const interpolation = generateInterpolation(easing);
  instance = closure || { frame: null };
  task(0);
  return new Promise((resolve) => {
    runAnimation(Date.now(), duration, task, resolve, instance, interpolation);
  });
}
