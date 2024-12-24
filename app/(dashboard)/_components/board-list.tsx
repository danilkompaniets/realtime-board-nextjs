"use client"

import React, {use} from 'react';
import {EmptySearch} from '@/app/(dashboard)/_components/empty-search';
import {EmptyFavorites} from '@/app/(dashboard)/_components/empty-favorites';
import {EmptyBoards} from '@/app/(dashboard)/_components/empty-boards';
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {BoardCard} from "@/app/(dashboard)/_components/board-card";
import {NewBoardButton} from "@/app/(dashboard)/_components/new-board-button";

interface Query {
    search?: string;
    favorites?: string;
}

interface BoardListProps {
    orgId: string;
    query: Query;
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = useQuery(api.boards.get, {orgId});

    if (data === undefined) {
        return (
            <div>
                <h2 className={"text-3xl"}>
                    {query.favorites ? "Favorite boards" : "Team boards"}
                </h2>
                <div
                    className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10"}>
                    <NewBoardButton orgId={orgId} disabled={true}/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                    <BoardCard.Skeleton/>
                </div>
            </div>
        )

    }

    // Указываем тип аргумента для use()
    const safeQuery = use<Query>(query);

    if (!data.length && safeQuery.search) {
        return <EmptySearch />;
    }

    if (!data.length && safeQuery.favorites) {
        return <EmptyFavorites />;
    }

    if (!data.length) {
        return <EmptyBoards />;
    }


    return (
        <div>
            <h3 className={"text-3xl"}>
                {query.favorites ? "Favorite boards" : "Team boards"}
            </h3>
            <div
                className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10"}>
                <NewBoardButton orgId={orgId} disabled={false}/>
                {
                    data.map((board) => (
                        <BoardCard
                            key={board._id}
                            id={board._id}
                            title={board.title}
                            imageUrl={board.imageUrl}
                            authorName={board.authorName}
                            authorId={board.authorId}
                            createdAt={board._creationTime}
                            orgId={board.orgId}
                            isFavorite={board.isFavorite}
                        />
                    ))
                }
            </div>
        </div>
    );
};