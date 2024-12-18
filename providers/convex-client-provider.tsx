'use client'

import {ClerkProvider, SignInButton, SignOutButton, useAuth} from '@clerk/nextjs'
import {ConvexProviderWithClerk} from 'convex/react-clerk'
import {Authenticated, AuthLoading, ConvexReactClient, Unauthenticated} from 'convex/react'
import {Loading} from '@/components/auth/loading'
import React from "react";

interface ConvexClientProviderProps {
    children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!
const publicKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!

const convex = new ConvexReactClient(convexUrl as string)

export const ConvexClientProvider = ({
                                         children,
                                     }: ConvexClientProviderProps) => {
    return (
        <ClerkProvider publishableKey={publicKey}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Authenticated>{children}</Authenticated>
                <AuthLoading>
                    <Loading/>
                </AuthLoading>
                <Unauthenticated>
                    <SignInButton/>
                </Unauthenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
