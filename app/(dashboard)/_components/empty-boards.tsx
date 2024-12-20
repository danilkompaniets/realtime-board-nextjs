import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";

export const EmptyBoards = () => {
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
                <Button>
                    Create board
                </Button>
            </div>
        </div>
    );
};