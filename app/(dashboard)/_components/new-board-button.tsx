"use client"

import {cn} from "@/lib/utils";
import {PlusIcon} from "lucide-react";
import {api} from "@/convex/_generated/api";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {toast} from "sonner";

export const NewBoardButton = ({orgId, disabled}: { orgId: string, disabled: boolean }) => {

    const {mutate, pending} = useApiMutation(api.board.create)

    const onClick = () => {
        mutate({
            orgId: orgId,
            title: "Untitled"
        }).then(() => {
            toast.success("Board created")
        }).catch(() => {
            toast.error("failed to create board")
        })
    }

    return (
        <button
            className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                (disabled || pending) && "opacity-75")}
            disabled={disabled || pending} onClick={onClick}>
            <div/>
            <PlusIcon className={"h-12 w-12 text-white stroke-1"}/>
            <p className={"text-sm text-white font-light"}>
                New Board
            </p>
        </button>
    )
}