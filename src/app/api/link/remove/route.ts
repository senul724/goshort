import { redis } from "~/server/redis";
import { NextRequest } from "next/server";
import { db } from "~/server/db";
import { links } from "~/server/db/schema";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "~/server/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Failed to add link!", { status: 500 });
    }
    const { linkId } = await req.json() as { linkId: string };

    await db.delete(links).where(eq(links.id, linkId));
    await redis.del(linkId);

    return new Response("Successfully logged out!", { status: 200 });
  } catch (e) {
    return new Response("Failed to add link!", { status: 500 });
  }
}
