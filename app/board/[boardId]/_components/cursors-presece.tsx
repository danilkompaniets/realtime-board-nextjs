"use client"

import {memo} from "react";
import {useOthersConnectionIds} from "@liveblocks/react";
import {Cursor} from "@/app/board/[boardId]/_components/cursor";

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

export const CursorsPresence = memo(() => {
    return (
        <>
            <Cursors />
        </>
    )
})


CursorsPresence.displayName = "CursorsPresence"