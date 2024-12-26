"use client"

import {Info} from "@/app/board/[boardId]/_components/info";
import {Participants} from "@/app/board/[boardId]/_components/participants";
import {Toolbar} from "@/app/board/[boardId]/_components/toolbar";
import React, {useCallback, useState} from "react";
import {Camera, CanvasMode, CanvasState} from "@/types/canvas";
import {useCanRedo, useCanUndo, useHistory, useMutation} from "@liveblocks/react";
import {CursorsPresence} from "@/app/board/[boardId]/_components/cursors-presece";
import {pointerEventToCanvasPoint} from "@/lib/utils";


interface CanvasProps {
    params: {
        boardId: string;
    }
}

export const Canvas = ({params}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    const [camera, setCamera] = useState<Camera>({
        x: 0,
        y: 0
    })

    const onWheel = useCallback((e: WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }))
    }, [])

    const onPointerMove = useMutation(({setMyPresence}, e: PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera)
        setMyPresence({cursor: current})
    }, [])

    const onPointerLeave = useMutation(({
                                            setMyPresence
                                        }) => {
        setMyPresence({
            cursor: null
        })
    }, [])

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

            <svg className={"h-[100vh] w-[100vw]"} onWheel={onWheel} onPointerLeave={onPointerLeave}
                 onPointerMove={onPointerMove}>
                <g>
                    <CursorsPresence/>
                </g>
            </svg>
        </main>
    )
}