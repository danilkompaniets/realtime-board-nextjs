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
    function handleConfirm() {
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
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={disabled}
                        onClick={handleConfirm}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

