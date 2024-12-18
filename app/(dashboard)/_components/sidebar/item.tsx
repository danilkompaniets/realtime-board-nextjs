"use client"

import Image from "next/image";
import {cn} from "@/lib/utils";
import {useOrganization, useOrganizationList} from "@clerk/nextjs";
import {Hint} from "@/components/hint";

interface ItemProps {
    id: string,
    name: string,
    imageUrl: string
}

const Item = ({id, name, imageUrl}: ItemProps) => {
    const {organization} = useOrganization()
    const {setActive} = useOrganizationList()

    const isActive = organization?.id === id

    const onClick = () => {
        if (!setActive) {
            return
        }
        if (isActive) {
            setActive({organization: id})
        }
    }
    return (
        <div className={"aspect-square relative"}>
            <Hint label={name} side={"right"} align={"start"} sideOffset={18 }>
                <Image src={imageUrl} alt={name} fill onClick={onClick}
                       className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100 transition", isActive && "opacity-100")}/>

            </Hint>
        </div>
    );
};

export default Item;