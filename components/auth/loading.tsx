import React from 'react';
import Image from "next/image";

export const Loading = () => {
    return (
        <div className={"h-screen w-full flex flex-col gap-y-4 justify-center items-center"}>
            <Image src={"/logo.svg"} alt="logo" width={120} height={120}
                   className={"ease-in-out animate-pulse"}/>
        </div>
    );
};
