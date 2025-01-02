"use client";
import {useStorage} from "@liveblocks/react";
import {LayerType} from "@/types/canvas";
import React, {memo, PointerEvent} from "react";
import {Rectangle} from "./rectangle";
import {Ellipse} from "@/app/board/[boardId]/_components/ellipse";
import {Text} from "@/app/board/[boardId]/_components/text";
import {Note} from "@/app/board/[boardId]/_components/note";
import {Path} from "@/app/board/[boardId]/_components/path";
import {colorToCss} from "@/lib/utils";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const  LayerPreview = memo(
    ({id, onLayerPointerDown, selectionColor}: LayerPreviewProps) => {
        const layer = useStorage((root) => root.layers.get(id));
        if (!layer) return null;
        switch (layer.type) {
            case LayerType.Path:
                return (
                    <Path
                        key={id}
                        points={layer.points}
                        onPointerDown={(e) => onLayerPointerDown(e, id)}
                        stroke={layer.fill}
                        x={layer.x}
                        y={layer.y}
                        fill={layer.fill ? colorToCss(layer.fill) : "#000"}
                    />
                )
            case LayerType.Rectangle:
                return (
                    <Rectangle
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                )
            case LayerType.Ellipse:
                return (
                    <Ellipse
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                );
            case LayerType.Text:
                return (
                    <Text
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                );
            case LayerType.Note:
                return (
                    <Note
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                )
            default:
                console.warn("Unsupported layer type");
        }
    }
);
LayerPreview.displayName = "LayerPreview";