import React from "react";

import {
    trackRender,
} from "../utils/renderTracker";

function CalendarEvent({
    post,
    onClick,
    onDragStart,
}) {
    trackRender(
        `Post ${post.id}`
    );

    const platform =
        String(post.platform || "default")
            .toLowerCase()
            .replace(/\s+/g, "-");

    return (
        <button
            type="button"
            draggable
            className={`calendar-event platform-${platform}`}
            onClick={(event) => {
                event.stopPropagation();
                onClick(post);
            }}
            onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData(
                    "postId",
                    post.id
                );

                onDragStart?.(post);
            }}
            title={`${post.title} — ${post.platform}`}
        >
            <span className="event-time">
                {post.time}
            </span>

            <span className="event-title">
                {post.title}
            </span>

            <span className="event-platform">
                {post.platform}
            </span>
        </button>
    );
}

export const MemoizedCalendarEvent =
    React.memo(CalendarEvent);

export default CalendarEvent;