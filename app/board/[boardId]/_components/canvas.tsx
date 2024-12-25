"use client"

import {Info} from "@/app/board/[boardId]/_components/info";
import {Participants} from "@/app/board/[boardId]/_components/participants";
import {Toolbar} from "@/app/board/[boardId]/_components/toolbar";
import React, {useState} from "react";
import {CanvasMode, CanvasState} from "@/types/canvas";
import {useCanRedo, useCanUndo, useHistory} from "@liveblocks/react";


interface CanvasProps {
    params: {
        boardId: string;
    }
}

export const Canvas = ({params}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    return (
        <main
            className={"h-full w-full relative bg-neutral-100 touch-none"}>
            <Info boardId={params.boardId}/>
            <Participants/>
            <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo}
                     undo={history.undo} redo={history.redo}/>
        </main>
    )
}