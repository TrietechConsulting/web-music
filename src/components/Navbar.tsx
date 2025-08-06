"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">🎵 My Audio Player</h1>
      <div>
        <Button>Login</Button>
      </div>
    </header>
  );
}
