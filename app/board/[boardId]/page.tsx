import React from "react";
import {Canvas} from "@/app/board/[boardId]/_components/canvas";

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = ({
                         params,
                     }: BoardIdPageProps) => {
    return (
        <Canvas boardId={params.boardId} />
    )
}

export default BoardIdPage;