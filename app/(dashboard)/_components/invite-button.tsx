import React from 'react';
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {PlusIcon} from "lucide-react";
import {OrganizationProfile} from "@clerk/nextjs";

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger className={"flex items-center justify-center"}>
                <PlusIcon className={"h-4 w-4 mr-2"}/>
            </DialogTrigger>
            <DialogContent className={"p-0 bg-transparent border-none max-w-[480px]"}>
                <OrganizationProfile/>
            </DialogContent>
        </Dialog>
    );
};
