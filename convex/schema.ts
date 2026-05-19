import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("client")),
  }).index("by_clerk_id", ["clerkUserId"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
  }),

  documents: defineTable({
    userId: v.id("users"),
    fileName: v.string(),
    fileUrl: v.string(),
    uploadDate: v.string(),
  }).index("by_user", ["userId"]),

  appointments: defineTable({
    userId: v.id("users"),
    dateTime: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
    notes: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    author: v.string(),
    publishedDate: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
  }).index("by_slug", ["slug"]),
});
