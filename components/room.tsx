"use client"

import {ReactNode} from "react";
import {ClientSideSuspense, RoomProvider} from "@liveblocks/react";

interface RoomProps {
    children: ReactNode
    roomId: string
    fallback: NonNullable<ReactNode> | null
}

export const Room = ({children, roomId, fallback}: RoomProps) => {
    return (
        <RoomProvider id={roomId} initialPresence={{
            cursor: {x: 0, y: 0},
        }}>
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}