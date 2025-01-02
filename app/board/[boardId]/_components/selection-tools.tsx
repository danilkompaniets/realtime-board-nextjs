"use client"

import {Camera, Color} from "@/types/canvas";
import React, {FC} from "react";
import {useMutation, useSelf} from "@liveblocks/react";
import {useSelectionBounce} from "@/app/board/[boardId]/_components/use-selection-bounds";
import {ColorPicker} from "@/app/board/[boardId]/_components/color-picker";
import {useDeleteLayers} from "@/hooks/use-delete-layers";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {BringToFront, SendToBackIcon, Trash2} from "lucide-react";

interface SelectionToolsProps {
    camera: Camera,
    setLastUsedColorAction: (color: Color) => void
}


export const SelectionTools: FC<SelectionToolsProps> = ({camera, setLastUsedColorAction}) => {
    const deleteLayers = useDeleteLayers()
    const selection = useSelf((me) => me.presence.selection)
    const selectionBounds = useSelectionBounce()

    const moveToBack = useMutation(({storage}) => {
        const liveLayerIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayerIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayerIds.move(indices[i], i)
        }
    }, [selection])

    const moveToFront = useMutation(({storage}) => {
        const liveLayerIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayerIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
            liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
        }
    }, [selection])


    const setFill = useMutation(({storage}, fill: Color) => {
        const liveLayers = storage.get("layers")
        setLastUsedColorAction(fill)

        selection?.forEach(id => {
            liveLayers.get(id)?.set("fill", fill)
        })
    }, [selection, setLastUsedColorAction])

    if (!selectionBounds) {
        return null
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y

    return (
        <div className={"absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"} style={{
            transform: `translate(
                calc(${x}px - 50%),
                calc(${y - 16}px - 100%)    
            )`
        }}>
            <ColorPicker onChange={setFill}/>
            <div className={"flex flex-col gap-y-0.5"}>
                <Hint label={"Bring to front"} side={"top"}>
                    <Button onClick={moveToFront} variant={"board"} size={"icon"}>
                        <BringToFront/>
                    </Button>
                </Hint>

                <Hint label={"Send to back"} side={"bottom"}>
                    <Button onClick={moveToBack} variant={"board"} size={"icon"}>
                        <SendToBackIcon/>
                    </Button>
                </Hint>

            </div>
            <div className={"flex items-center pl-2 ml-2 border-l border-neutral-200"}>
                <Hint label={"Delete"}>
                    <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
                        <Trash2/>
                    </Button>
                </Hint>
            </div>
        </div>
    )
}