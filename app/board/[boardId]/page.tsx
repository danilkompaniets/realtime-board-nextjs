"use client"

import React, {Suspense, use} from 'react';
import {CanvasLoading} from "@/app/board/[boardId]/_components/canvas-loading";
import {Room} from "@/components/room";
import {Canvas} from "@/app/board/[boardId]/_components/canvas";
import {Loader} from "lucide-react";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string
    }>
}


const BoardIdPage = (props: BoardIdPageProps) => {
    const params = use(props.params);


    return (
        <Room roomId={params.boardId} fallback={<CanvasLoading/>}>
            <Suspense fallback={<Loader/>}>
                <Canvas boardId={params.boardId}/>

            </Suspense>
        </Room>
    );
};

export default BoardIdPage;