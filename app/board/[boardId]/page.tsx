"use client"

import React, { use } from 'react';
import {CanvasLoading} from "@/app/board/[boardId]/_components/canvas-loading";
import {Room} from "@/components/room";
import {Canvas} from "@/app/board/[boardId]/_components/canvas";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string
    }>
}


const BoardIdPage = (props: BoardIdPageProps) => {
    const params = use(props.params);


    return (
        <Room roomId={params.boardId} fallback={<CanvasLoading/>}>
            <Canvas boardId={params.boardId}/>
        </Room>
    );
};

export default BoardIdPage;