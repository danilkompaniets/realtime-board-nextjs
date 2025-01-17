"use client"

import {DropdownMenuContentProps} from "@radix-ui/react-dropdown-menu";
import React from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Link2, PencilIcon, Trash2} from "lucide-react";
import {toast} from "sonner";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {ConfirmModal} from "@/components/modals/confirm-modal";
import {Button} from "@/components/ui/button";
import {useRenameModal} from "@/store/use-rename-modal";

interface ActionProps {
    children: React.ReactNode

    side?: DropdownMenuContentProps["side"]
    sideOffset?: DropdownMenuContentProps["sideOffset"]
    id: string
    title: string
}

export const Actions = ({children, sideOffset, side, id, title}: ActionProps) => {
    const {mutate, pending} = useApiMutation(api.board.remove)

    const {onOpen} = useRenameModal()

    const onCopyLink = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Error occurred"))
    }

    const onDelete = () => {
        mutate({
            id: id
        })
            .then(() => toast.success("Board deleted"))
            .catch(() => toast.error("Error while deleting board"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side} sideOffset={sideOffset} className={"w-60"}>
                <DropdownMenuItem onClick={(event) => {
                    onCopyLink(event)
                }} className={"p-3 cursor-pointer"}>
                    <Link2 className={"h-4 w-4 mr-2"}/>
                    Copy board link
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    disabled={pending}
                    onConfirmAction={onDelete}
                >
                    <Button
                        variant="ghost"
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                    </Button>
                </ConfirmModal>
                <DropdownMenuItem onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    onOpen(id, title)
                }} className={"p-3 cursor-pointer"}>
                    <PencilIcon className={"h-4 w-4 mr-2"}/>
                    Rename
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}