export const startSmoothScroll = (
  container: any,
  targetTop: number,
  duration: number
) => {
  if (!container) return;

  let start = container.scrollTop;
  const distance = targetTop - start;
  const startTime = performance.now();

  const step = (timestamp: number) => {
    const elapsedTime = timestamp - startTime;
    const scrollProgress = Math.min(elapsedTime / duration, 1);
    const scrollValue = start + distance * scrollProgress;

    container.scrollTop = scrollValue;

    if (elapsedTime < duration && container.scrollTop !== targetTop)
      requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};
