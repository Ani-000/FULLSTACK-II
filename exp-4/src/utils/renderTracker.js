const listeners = new Set();

const renderCounts = {};

let totalRenders = 0;

let lastRender = null;

export function trackRender(componentName) {
    renderCounts[componentName] =
        (renderCounts[componentName] || 0) + 1;

    totalRenders += 1;

    lastRender = {
        component: componentName,
        time: new Date().toLocaleTimeString(),
    };

    listeners.forEach((listener) => {
        listener();
    });
}

export function getRenderStats() {
    return {
        counts: { ...renderCounts },

        total: totalRenders,

        lastRender,
    };
}

export function subscribeToRenderStats(listener) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function resetRenderStats() {
    Object.keys(renderCounts).forEach((key) => {
        delete renderCounts[key];
    });

    totalRenders = 0;

    lastRender = null;

    listeners.forEach((listener) => {
        listener();
    });
}