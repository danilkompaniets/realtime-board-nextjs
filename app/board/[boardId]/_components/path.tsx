import {colorToCss, getSvgPathFromStroke} from "@/lib/utils";
import getStroke from "perfect-freehand";
import {Color} from "@/types/canvas";
import React from "react";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    stroke?: Color;
}

export const Path = ({
                         x,
                         y,
                         points,
                         fill,
                         onPointerDown,
                         stroke,
                     }: PathProps) => {
    if (!points) {
        return null
    }
    return (
        <path
            className="drop-shadow-md"
            onPointerDown={onPointerDown}
            d={getSvgPathFromStroke(
                getStroke(points, {
                    size: 16,
                    thinning: 0.5,
                    smoothing: 0.5,
                    streamline: 0.5,
                })
            )}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            x={0}
            y={0}
            fill={fill}
            stroke={stroke ? colorToCss(stroke) : "#000"}
            strokeWidth={1}
        />
    );
};