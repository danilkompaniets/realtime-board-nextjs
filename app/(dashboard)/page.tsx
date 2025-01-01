"use client"

import React, { use } from 'react';
import {EmptyOrg} from "@/app/(dashboard)/_components/empty-org";
import {useOrganization} from "@clerk/nextjs";
import {BoardList} from "@/app/(dashboard)/_components/board-list";

interface DashboardPageProps {
    searchParams: Promise<{
        search?: string,
        favorites?: string
    }>
}

const DashboardPage = (props: DashboardPageProps) => {
    const searchParams = use(props.searchParams);
    const {organization} = useOrganization()
    return (
        <div className={"h-[calc(100%-80px)] p-6 "}>
            {!organization ?
                (
                    <EmptyOrg/>
                ) :
                (
                    <BoardList
                        orgId={organization.id}
                        query={searchParams}
                    />
                )}
        </div>
    );
};

export default DashboardPage;