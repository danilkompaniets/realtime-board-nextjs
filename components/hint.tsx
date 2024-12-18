import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

export const Hint = ({label, children, side, alignOffset, sideOffset, align}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild={true}>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={"text-white bg-black border-black"} side={side} align={align}
                                alignOffset={alignOffset} sideOffset={sideOffset}>
                    <p className={"font-semibold capitalize"}>
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
