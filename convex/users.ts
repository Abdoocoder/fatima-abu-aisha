import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const upsertFromClerk = internalMutation({
  args: {
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const data = args.data;
    const clerkUserId = data.id;
    const email = data.email_addresses?.[0]?.email_address || "";
    const name =
      data.first_name && data.last_name
        ? `${data.first_name} ${data.last_name}`
        : data.first_name || email;
    const image = data.image_url;
    const role = data.public_metadata?.role || "client";

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name,
        email,
        image,
        role,
      });
    } else {
      await ctx.db.insert("users", {
        clerkUserId,
        name,
        email,
        image,
        role,
      });
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});
