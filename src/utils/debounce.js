export function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
export function throttle(fn, interval = 200) {
    let last = 0;
    let pending = null;
    return (...args) => {
        const now = Date.now();
        if (now - last >= interval) {
            last = now;
            fn(...args);
        }
        else {
            clearTimeout(pending);
            pending = setTimeout(() => {
                last = Date.now();
                fn(...args);
            }, interval - (now - last));
        }
    };
}
