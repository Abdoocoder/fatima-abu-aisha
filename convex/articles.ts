import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    author: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("articles", {
      title: args.title,
      slug: args.slug,
      content: args.content,
      excerpt: args.excerpt,
      imageUrl: args.imageUrl,
      author: args.author,
      publishedDate: new Date().toISOString(),
      tags: args.tags,
      published: args.published,
    });
  },
});

export const update = mutation({
  args: {
    articleId: v.id("articles"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { articleId, ...fields } = args;
    await ctx.db.patch(articleId, fields);
  },
});

export const remove = mutation({
  args: { articleId: v.id("articles") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.articleId);
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("articles").collect();
  },
});

export const getPublished = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("articles")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});
