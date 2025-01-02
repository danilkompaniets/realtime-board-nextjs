"use client"

import {useRenameModal} from "@/store/use-rename-modal";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {FormEventHandler, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

export const RenameModal = () => {
    const {isOpen, onClose, initialValues} = useRenameModal()
    const {mutate, pending} = useApiMutation(api.board.update)

    const [title, setTitle] = useState("")

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        mutate({
            id: initialValues.id,
            title: title
        }).then(() => {
            toast.success("Board renamed")
        }).catch(() => {
            toast.error("Failed to rename board")
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board here
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form className={"space-y-4"} onSubmit={onSubmit}>
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"title"}
                    />
                    <DialogFooter>
                        <DialogClose asChild={pending}>
                            <Button type={"button"} variant={"outline"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type={"submit"} variant={"default"}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}