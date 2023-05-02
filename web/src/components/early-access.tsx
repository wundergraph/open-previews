import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export const EarlyAccess = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/early-access.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, formId: "early-access-form" }),
    }).then(() => setSuccess(true));
  };

  const form = (
    <form onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle className="text-center">Request Access</DialogTitle>
        <DialogDescription className="text-center text-xs text-gray-400">
          Join our growing waitlist our team will reach out to you as soon as
          possible.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="rounded-md bg-gray-950  focus:border-pink-500 focus:ring-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <button
          type="submit"
          className="h-9 w-full rounded-md bg-white px-3 text-xs text-black hover:bg-gray-100"
        >
          Request access
        </button>
      </DialogFooter>
    </form>
  );

  const done = (
    <div>
      <DialogHeader>
        <DialogTitle className="text-center">Request Access</DialogTitle>
        <DialogDescription className="text-center text-xs text-gray-400">
          Thanks for signing up! Please star us on Github while you wait for
          access.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-center py-8">
        <a href="https://github.com/wundergraph/open-previews" target="_blank">
          <img src="https://img.shields.io/github/stars/wundergraph/open-previews.svg?style=social&amp;label=Star" />
        </a>
      </div>
      <DialogFooter>
        <button
          className="h-9 w-full rounded-md bg-white px-3 text-xs text-black hover:bg-gray-100"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </DialogFooter>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="relative z-10 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-white outline-offset-2 outline-pink-400/40 before:absolute before:inset-px before:-z-10 before:rounded-lg before:bg-black before:transition-all hover:text-white before:hover:inset-0 before:hover:opacity-0 focus-visible:border-0 focus-visible:outline-2"
        >
          <span>Early access</span>
        </button>
      </DialogTrigger>
      <DialogContent className="text-sm sm:max-w-sm">
        {success ? done : form}
      </DialogContent>
    </Dialog>
  );
};
