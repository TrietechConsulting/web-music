import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";
import { prisma } from "@/utils/prisma";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MusicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const music = await prisma.entity.findUnique({
    where: { id: parseInt(id) },
  });
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <main className="px-6 py-8 max-w-3xl mx-auto flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <MoveLeft />
            <p>Back To Home</p>
          </Link>
          <Image
            src={music?.imageUrl || ""}
            alt={music?.name || ""}
            width={400}
            height={400}
            className="rounded-lg mx-auto"
          />
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-xl">{music?.name}</p>
            <p className="text-muted-foreground">{music?.description}</p>
          </div>
          {music && <MusicPlayer music={music} />}
        </main>
      </div>
      <Footer />
    </div>
  );
}
