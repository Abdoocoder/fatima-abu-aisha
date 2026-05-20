import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const fixAdminClerkId = internalMutation({
  args: {
    oldClerkId: v.string(),
    newClerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", args.oldClerkId))
      .unique();

    if (!user) {
      return { success: false, message: "User not found with old clerk ID" };
    }

    await ctx.db.patch(user._id, { clerkUserId: args.newClerkId });
    return { success: true, message: `Updated clerkUserId to ${args.newClerkId}` };
  },
});
