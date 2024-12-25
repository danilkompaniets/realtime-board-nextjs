"use client"

import {Info} from "@/app/board/[boardId]/_components/info";
import {Participants} from "@/app/board/[boardId]/_components/participants";
import {Toolbar} from "@/app/board/[boardId]/_components/toolbar";

interface CanvasProps {
    params: {
        boardId: string;
    }
}

export const Canvas = ({params}: CanvasProps) => {
    return (
        <main
            className={"h-full w-full relative bg-neutral-100 touch-none"}>
            <Info boardId={params.boardId}/>
            <Participants/>
            <Toolbar/>
        </main>
    )
}