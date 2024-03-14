"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

export default function AddLink() {
  const urlRef = useRef<HTMLInputElement>(null);
  const [addingLink, setAddingLink] = useState(false);

  const handleLinkAdd = async () => {
    const url = urlRef.current?.value;
    if (addingLink) {
      return;
    }

    if (!url || !z.string().url().safeParse(url).success) {
      toast.error("please enter a valid url", { id: "invalid url" });
      return;
    }

    try {
      setAddingLink(true);
      toast.loading("shortning link...", { id: "link_add" });

      const res = await fetch("/api/link/create", {
        method: "POST",
        body: JSON.stringify({ url }),
      });

      setAddingLink(false);
      return res.ok
        ? toast.success("successfully shortened the link!", { id: "link_add" })
        : toast.error("something went wrong. try again later", {
          id: "link_add",
        });
    } catch (e) {
      console.error(e);
      setAddingLink(false);
      toast.error("something went wrong. try again later", { id: "link_add" });
    }
  };

  return (
    <div className="flex justify-center items-center w-1/2">
      <input
        type="url"
        placeholder="paste your link here"
        ref={urlRef}
        className="p-2 w-2/3 text-2xl rounded-l-xl shadow-lg"
      />
      <button
        className="p-2 w-1/3 text-2xl font-bold text-center text-white rounded-r-xl shadow-lg hover:scale-105 bg-sky-600"
        onClick={async () => await handleLinkAdd()}
      >
        Shorten
      </button>
    </div>
  );
}
