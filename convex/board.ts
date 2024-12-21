import {mutation} from "./_generated/server";
import {v} from "convex/values";

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: "/lamp.png"
        })

        return board;
    }
})

export const remove = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async (ctx, args) => {
        const identity = ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthorized")
        }

        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string()
    },
    handler: async (ctx, args) => {

        const title = args.title.trim()
        const identity = ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        if (!title) {
            throw new Error("title is required")
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title
        })

        return board
    }
})