"use client"

import React from 'react';
import {CanvasLoading} from "@/app/board/[boardId]/_components/canvas-loading";
import {Room} from "@/components/room";
import {Canvas} from "@/app/board/[boardId]/_components/canvas";

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}


const BoardIdPage = ({params}: BoardIdPageProps) => {


    return (
        <Room roomId={params.boardId} fallback={<CanvasLoading/>}>
            <Canvas boardId={params.boardId}/>
        </Room>
    );
};

export default BoardIdPage;