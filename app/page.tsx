import {UserButton} from "@clerk/nextjs";

const Page = () => {
    return (
        <div className={"flex flex-col gap-y-4 "}>
            <p>
                This is the screen for authenticated users only
            </p>
            <div>
                <UserButton/>
            </div>
        </div>
    );
}

export default Page;
