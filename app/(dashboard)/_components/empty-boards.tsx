"use client"

import {api} from "@/convex/_generated/api";
import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useOrganization} from "@clerk/nextjs";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {toast} from "sonner";

export const EmptyBoards = () => {
    const {organization} = useOrganization();
    const {mutate, pending} = useApiMutation(api.board.create)

    const onClick = () => {
        if (!organization) {
            return
        }
        mutate({
            orgId: organization.id!,
            title: "Untitled"
        }).then((id) => {
            toast.success("Board created") //TODO: redirect to board/id
        }).catch(() => {
            toast.error("failed to create board")
        })
    }

    return (
        <div className={"h-full flex flex-col justify-center items-center"}>
            <Image src={"/binocular.png"} alt={"empty"} width={140} height={140}/>
            <h2 className={"text-2xl font-semibold mt-6"}>
                No boards
            </h2>
            <p className={"text-muted-foreground text-sm mt-2"}>
                Create new board
            </p>
            <div className={"mt-6"}>
                <Button disabled={pending} onClick={onClick}>
                    {
                        pending
                            ? "Loading..."
                            : "Create board"
                    }
                </Button>
            </div>
        </div>
    );
};