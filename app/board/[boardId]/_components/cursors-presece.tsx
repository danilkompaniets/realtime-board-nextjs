"use client"

import {memo} from "react";
import {shallow, useOthersConnectionIds, useOthersMapped} from "@liveblocks/react";
import {Cursor} from "@/app/board/[boardId]/_components/cursor";
import {Path} from "@/app/board/[boardId]/_components/path";
import {colorToCss} from "@/lib/utils";

const Cursors = () => {
    const ids = useOthersConnectionIds()
    return (
        <>
            {ids.map((connectionId) => (
                <Cursor key={connectionId} connectionId={connectionId}/>
            ))}
        </>
    )
}

const Drafts = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
    }), shallow)

    return (
        <>
            {others.map(([key, other]) => {
                return (
                    <Path x={0} y={0} points={other.pencilDraft!}
                          fill={other.penColor ? colorToCss(other.penColor) : "#000"}/>
                )
            })}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return (
        <>
            <Drafts/>
            <Cursors/>
        </>
    )
})


CursorsPresence.displayName = "CursorsPresence"