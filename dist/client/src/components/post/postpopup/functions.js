"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSmoothScroll = void 0;
const startSmoothScroll = (container, targetTop, duration) => {
    if (!container)
        return;
    let start = container.scrollTop;
    const distance = targetTop - start;
    const startTime = performance.now();
    const step = (timestamp) => {
        const elapsedTime = timestamp - startTime;
        const scrollProgress = Math.min(elapsedTime / duration, 1);
        const scrollValue = start + distance * scrollProgress;
        container.scrollTop = scrollValue;
        if (elapsedTime < duration && container.scrollTop !== targetTop)
            requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};
exports.startSmoothScroll = startSmoothScroll;
