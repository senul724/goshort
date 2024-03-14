"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getbaseurl } from "~/utils/utils";

export default function ManageLinks(
  props: { links: { url: string; id: string }[] },
) {
  const { links } = props;
  const [removingLink, setRemovingLink] = useState(false);

  const handleLinkRemove = async (linkId: string) => {
    if (removingLink) {
      return;
    }

    try {
      setRemovingLink(true);
      toast.loading("removing link...", { id: "remove_link" });
      const res = await fetch("/api/link/remove", {
        method: "POST",
        body: JSON.stringify({ linkId }),
      });

      setRemovingLink(false);
      return res.ok
        ? toast.success("successfully removed the link!", { id: "remove_link" })
        : toast.error("something went wrong. try again later", {
          id: "remove_link",
        });
    } catch (e) {
      console.error(e);
      setRemovingLink(false);
      toast.error("something went wrong. try again later", {
        id: "remove_link",
      });
    }
  };
  return (
    <div className="flex z-10 flex-col gap-4 justify-center items-center mb-20 w-full bg-white">
      {links.length > 0
        ? (
          <>
            {links.map((el, index) => (
              <div className="flex p-2 w-2/3 rounded-xl border-b mb-2" key={index}>
                <p className="w-4/5 font-medium">{el.url}</p>
                <div className="flex justify-around w-1/5">
                  <button
                    className="px-4 text-lg font-medium hover:scale-105 text-sky-500 rounded-xl border "
                    onClick={() => {
                      toast.success("link copied to clipboard!");
                      void navigator.clipboard.writeText(
                        `${getbaseurl()}/${el.id}`,
                      );
                    }}
                  >
                    copy link
                  </button>
                  <button
                    className="px-4 text-lg font-medium hover:scale-105 text-red-500 rounded-xl border "
                    onClick={() =>
                      handleLinkRemove(el.id)}
                  >
                    remove link
                  </button>
                </div>
              </div>
            ))}
          </>
        )
        : (
          <div className="flex p-2 w-2/3 border">
            <p className="w-2/3 text-xl">No shortened links to show here!</p>
          </div>
        )}
    </div>
  );
}
