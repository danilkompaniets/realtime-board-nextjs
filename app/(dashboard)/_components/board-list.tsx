import React, { use } from 'react';
import { EmptySearch } from '@/app/(dashboard)/_components/empty-search';
import { EmptyFavorites } from '@/app/(dashboard)/_components/empty-favorites';
import { EmptyBoards } from '@/app/(dashboard)/_components/empty-boards';

interface Query {
    search?: string;
    favorites?: string;
}

interface BoardListProps {
    orgId: string;
    query: Query;
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = [];

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
            {/* Ваш остальной код */}
        </div>
    );
};