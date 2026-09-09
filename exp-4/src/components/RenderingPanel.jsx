import {
    useEffect,
    useState,
} from "react";

import {
    getRenderStats,
    resetRenderStats,
    subscribeToRenderStats,
} from "../utils/renderTracker";

function RenderingPanel() {
    const [stats, setStats] =
        useState(getRenderStats());

    useEffect(() => {
        return subscribeToRenderStats(() => {
            setStats(
                getRenderStats()
            );
        });
    }, []);

    const sortedComponents =
        Object.entries(
            stats.counts
        ).sort(
            (a, b) => b[1] - a[1]
        );

    return (
        <aside className="rendering-panel">

            <div className="rendering-header">

                <div>

                    <h2>
                        Rendering Monitor
                    </h2>

                    <p>
                        Live component render activity.
                    </p>

                </div>

                <button
                    type="button"
                    className="rendering-reset"
                    onClick={resetRenderStats}
                >
                    Reset
                </button>

            </div>

            <div className="rendering-stats">

                <div className="render-stat">

                    <span className="render-stat-label">
                        Total Renders
                    </span>

                    <strong className="render-stat-value">
                        {stats.total}
                    </strong>

                </div>

                <div className="render-stat">

                    <span className="render-stat-label">
                        Components
                    </span>

                    <strong className="render-stat-value">
                        {sortedComponents.length}
                    </strong>

                </div>

            </div>

            <div className="rendering-list">

                {sortedComponents.length === 0 ? (

                    <div className="render-empty">
                        Interact with the calendar
                        to record renders.
                    </div>

                ) : (

                    sortedComponents.map(
                        ([component, count]) => (

                            <div
                                className="rendering-item"
                                key={component}
                            >

                                <span>
                                    {component}
                                </span>

                                <strong className="rendering-count">
                                    {count}
                                </strong>

                            </div>

                        )
                    )

                )}

            </div>

            <div className="last-render">

                <span className="last-render-label">
                    Last Render
                </span>

                <strong className="last-render-value">

                    {stats.lastRender
                        ? `${stats.lastRender.component} — ${stats.lastRender.time}`
                        : "—"}

                </strong>

            </div>

        </aside>
    );
}

export default RenderingPanel;