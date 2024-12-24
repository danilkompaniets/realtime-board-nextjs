"use client"

import {Info} from "@/app/board/[boardId]/_components/info";
import {Participants} from "@/app/board/[boardId]/_components/participants";
import {Toolbar} from "@/app/board/[boardId]/_components/toolbar";

interface CanvasProps {
    boardId: string
}

export const Canvas = ({boardId}: CanvasProps) => {
    return (
        <main
            className={"h-full w-full relative bg-neutral-50 touch-none"}>
            <Info/>
            <Participants/>
            <Toolbar/>
        </main>
    )
}