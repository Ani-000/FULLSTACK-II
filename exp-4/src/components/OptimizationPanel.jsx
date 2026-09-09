function OptimizationPanel({
    optimizations,
    setOptimizations,
    clockEnabled,
    setClockEnabled,
}) {
    const toggle = (name) => {
        setOptimizations((previous) => ({
            ...previous,
            [name]: !previous[name],
        }));
    };

    return (
        <section className="optimization-panel">

            <div className="optimization-info">

                <h2>
                    Performance Controls
                </h2>

                <p>
                    Toggle each optimization independently
                    to compare rendering behavior.
                </p>

            </div>

            <div className="optimization-controls">

                <div className="toggle-row">

                    <span>
                        React.memo
                    </span>

                    <button
                        type="button"
                        className={`toggle ${
                            optimizations.memo
                                ? "on"
                                : ""
                        }`}
                        onClick={() =>
                            toggle("memo")
                        }
                        aria-pressed={
                            optimizations.memo
                        }
                    >
                        <span />
                    </button>

                </div>

                <div className="toggle-row">

                    <span>
                        useMemo
                    </span>

                    <button
                        type="button"
                        className={`toggle ${
                            optimizations.useMemo
                                ? "on"
                                : ""
                        }`}
                        onClick={() =>
                            toggle("useMemo")
                        }
                        aria-pressed={
                            optimizations.useMemo
                        }
                    >
                        <span />
                    </button>

                </div>

                <div className="toggle-row">

                    <span>
                        useCallback
                    </span>

                    <button
                        type="button"
                        className={`toggle ${
                            optimizations.useCallback
                                ? "on"
                                : ""
                        }`}
                        onClick={() =>
                            toggle("useCallback")
                        }
                        aria-pressed={
                            optimizations.useCallback
                        }
                    >
                        <span />
                    </button>

                </div>

                <div className="toggle-divider" />

                <div className="toggle-row">

                    <span>
                        Live Clock
                    </span>

                    <button
                        type="button"
                        className={`toggle ${
                            clockEnabled
                                ? "on"
                                : ""
                        }`}
                        onClick={() =>
                            setClockEnabled(
                                (value) => !value
                            )
                        }
                        aria-pressed={
                            clockEnabled
                        }
                    >
                        <span />
                    </button>

                </div>

            </div>

        </section>
    );
}

export default OptimizationPanel;