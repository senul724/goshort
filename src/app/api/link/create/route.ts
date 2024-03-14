import { redis } from "~/server/redis";
import { NextRequest } from "next/server";
import { makeid } from "~/utils/utils";
import { db } from "~/server/db";
import { links } from "~/server/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Failed to add link!", { status: 500 });
    }
    const { url } = await req.json() as { url: string };
    const linkId = makeid(6);

    await db.insert(links).values({
      url,
      id: linkId,
      createdById: session.user.id,
    });
    await redis.set(linkId, url);

    return new Response("Successfully logged out!", { status: 200 });
  } catch (e) {
    return new Response("Failed to add link!", { status: 500 });
  }
}
