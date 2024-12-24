"use client"

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
    children: React.ReactNode
    onConfirm: () => void
    disabled?: boolean
    header: string
    description?: string
}

export const ConfirmModal = ({
                                 children,
                                 onConfirm,
                                 disabled,
                                 header,
                                 description,
                             }: ConfirmModalProps) => {
    function handleConfirm(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        onConfirm()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild={true}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {header}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()

                    }}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={disabled}
                        onClick={(e) => {
                            handleConfirm(e)
                        }}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

