import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./auth";

export const upload = mutation({
  args: {
    fileName: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.insert("documents", {
      userId,
      fileName: args.fileName,
      fileUrl: args.fileUrl,
      uploadDate: new Date().toISOString(),
    });
  },
});

export const getMyDocuments = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});
