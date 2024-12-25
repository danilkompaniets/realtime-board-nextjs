"use client"

import {LiveblocksProvider} from "@liveblocks/react";
import React from "react";

const liveBlocksApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY!

interface LiveBlocksClientProviderProps {
    children: React.ReactNode
}


export const LiveBlocksClientProvider = ({children}: LiveBlocksClientProviderProps) => {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            {children}
        </LiveblocksProvider>
    )
}