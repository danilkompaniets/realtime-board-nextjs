"use client";

import {Info} from "@/app/board/[boardId]/_components/info";
import {Participants} from "@/app/board/[boardId]/_components/participants";
import {Toolbar} from "@/app/board/[boardId]/_components/toolbar";
import React, {useCallback, useMemo, useState} from "react";
import {nanoid} from "nanoid";
import {Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH,} from "@/types/canvas";
import {useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage,} from "@liveblocks/react";
import {CursorsPresence} from "@/app/board/[boardId]/_components/cursors-presece";
import {connectionIdToColor, pointerEventToCanvasPoint, resizeBounds} from "@/lib/utils";
import {LiveObject} from "@liveblocks/client";
import {LayerPreview} from "./layer-preview";
import {SelectionBox} from "@/app/board/[boardId]/_components/selection-box";
import {SelectionTools} from "@/app/board/[boardId]/_components/selection-tools";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({boardId}: CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });


    const [camera, setCamera] = useState<Camera>({x: 0, y: 0});
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation(
        (
            {storage, setMyPresence},
            layerType:
                | LayerType.Ellipse
                | LayerType.Rectangle
                | LayerType.Text
                | LayerType.Note,
            position: Point
        ) => {
            const liveLayers = storage.get("layers");
            if (liveLayers.size >= MAX_LAYERS) {
                return;
            }

            const liveLayerIds = storage.get("layerIds");
            const layerId = nanoid();
            const layer = new LiveObject({
                type: layerType,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: lastUsedColor,
            });

            liveLayerIds.push(layerId);
            liveLayers.set(layerId, layer);

            setMyPresence({selection: [layerId]}, {addToHistory: true});
            setCanvasState({mode: CanvasMode.None});
        },
        [lastUsedColor]
    );

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => {
            return {
                x: camera.x - e.deltaX,
                y: camera.y - e.deltaY,
            };
        });
    }, []);

    const translateSelectedLayers = useMutation(({storage, self}, point: Point) => {
        if (canvasState.mode !== CanvasMode.Translating) {
            return
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y
        }

        const liveLayers = storage.get("layers")


        for (const id of self.presence.selection) {
            const layer = liveLayers.get(id)

            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y,
                })
            }
        }

        setCanvasState({mode: CanvasMode.Translating, current: point})
    }, [canvasState])

    const unselectLayers = useMutation(({self, setMyPresence}) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({
                selection: []
            }, {addToHistory: true});
        }
    }, [])


    const resizeSelectedLayer = useMutation(({storage, self}, point: Point) => {
        if (canvasState.mode !== CanvasMode.Resizing) {
            return
        }

        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point
        )

        const liveLayers = storage.get("layers")
        const layer = liveLayers.get(self.presence.selection[0])


        if (layer) {
            layer.update(bounds)
        }

    }, [canvasState])

    const onPointerMove = useMutation(
        ({setMyPresence}, e) => {
            e.preventDefault();
            const current = pointerEventToCanvasPoint(e, camera);
            if (canvasState.mode === CanvasMode.Translating) {

                translateSelectedLayers(current)
            } else if (canvasState.mode === CanvasMode.Resizing) {
                resizeSelectedLayer(current)

            }

            if (canvasState.mode === CanvasMode.Resizing) {
                resizeSelectedLayer(current)
            }

            setMyPresence({cursor: current});
        },
        [
            canvasState,
            resizeSelectedLayer,
            camera
        ]
    );

    const onPointerDown = useCallback((e) => {
        const point = pointerEventToCanvasPoint(e, camera)
        if (canvasState.mode === CanvasMode.Inserting) {
            return
        }

        setCanvasState(
            {origin: point, mode: CanvasMode.Pressing}
        )
    }, [camera, canvasState.mode, setCanvasState])

    const onPointerLeave = useMutation(({setMyPresence}) => {
        setMyPresence({cursor: null});
    }, []);

    const onPointerUp = useMutation(
        ({}, e) => {
            const point = pointerEventToCanvasPoint(e, camera);

            if (
                canvasState.mode === CanvasMode.None
                || canvasState.mode === CanvasMode.Pressing
            ) {
                unselectLayers()
                setCanvasState({
                    mode: CanvasMode.None,
                })
            } else if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point);
            } else {
                setCanvasState({mode: CanvasMode.None});
            }
            history.resume();
        },
        [camera, canvasState, history, insertLayer, unselectLayers]
    );


    const selections = useOthersMapped((other) => other.presence.selection)

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {}
        for (const user of selections) {
            const [connectionId, selection] = user
            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
            }
        }

        return layerIdsToColorSelection;
    }, [selections])

    const onLayerPointerDown = useMutation(
        (
            {self, setMyPresence},
            e,
            layerId: string
        ) => {
            if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) {
                return
            }

            history.pause()
            e.stopPropagation()

            const point = pointerEventToCanvasPoint(e, camera);
            if (!self.presence.selection.includes(layerId)) {
                setMyPresence({selection: [layerId]}, {addToHistory: true});
            }
            setCanvasState({mode: CanvasMode.Translating, current: point});
        }, [
            setCanvasState, camera, history, canvasState.mode
        ])

    const onResizeHandlePointerDown = useCallback((corner: Side, initialBounds: XYWH) => {
        history.pause()
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        })
    }, [history])

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canUndo={canUndo}
                canRedo={canRedo}
                undo={history.undo}
                redo={history.redo}
            />
            <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor}/>
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
                onPointerDown={onPointerDown}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    {layerIds && layerIds.map((layerId) => {
                        return (
                            <LayerPreview
                                key={layerId}
                                id={layerId}
                                onLayerPointerDown={onLayerPointerDown}
                                selectionColor={layerIdsToColorSelection[layerId]}
                            />
                        );
                    })}
                    <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown}/>
                    <CursorsPresence/>
                </g>
            </svg>
        </main>
    );
};