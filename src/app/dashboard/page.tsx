export const dynamic = "force-dynamic";

import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { redirect } from "next/navigation";
import SignOut from "~/components/auth/signOut";
import AddLink from "~/components/dash/addLink";
import ManageLinks from "~/components/dash/manageLinks";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { links as linksTable } from "~/server/db/schema";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const links = await db.query.links.findMany({
    where: eq(linksTable.createdById, session.user.id),
  });

  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta
          name="description"
          content="never worry about lengthy links anymore! we got you"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex z-50 flex-col w-full h-screen">
        <main className="w-full h-3/4 -skew-y-[15deg] bg-sky-500">
          <div className="w-full h-full skew-y-[15deg]">
            <div className="flex justify-center items-center w-full">
              <div className="flex gap-4 m-10 w-1/2 text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
                <div className="p-3 rounded-xl shadow-lg -skew-y-12 bg-sky-500">
                  GO
                </div>
                <div className="text-sky-500">Short</div>
              </div>
              <div className="flex gap-10 justify-end items-center px-10 w-1/2">
                <p className="text-2xl font-semibold text-white drop-shadow-xl">
                  welcome again {session.user.name}!
                </p>
                <SignOut label="logout" />
              </div>
            </div>
            <div className="flex flex-col gap-10 justify-center items-center w-full h-2/3">
              <h1 className="text-8xl font-extrabold text-white drop-shadow-xl">
                shorten your links in no time!
              </h1>
              <AddLink />
            </div>
          </div>
        </main>
        <div className="flex z-10 justify-center items-center w-full h-1/4 bg-white rounded-t-2xl border-t shadow-t-lg">
          <p className="text-5xl font-bold text-sky-800">
            Manage and view your links from here
          </p>
        </div>
      </div>
      <ManageLinks links={links} />
    </>
  );
}
