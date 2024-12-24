import {Loader} from "lucide-react";
import {Info} from "@/app/board/[boardId]/_components/info";
import {Participants} from "@/app/board/[boardId]/_components/participants";
import {Toolbar} from "@/app/board/[boardId]/_components/toolbar";

export const CanvasLoading = () => {
    return (
        <main
            className={"h-full relative bg-neutral-100 touch-none flex items-center justify-center"}>
            <Loader className={"h-6 w-60 text-muted-foreground animate-spin "}/>
            <Info.Skeleton/>
            <Participants.Skeleton/>
            <Toolbar.Skeleton/>
        </main>
    )
}