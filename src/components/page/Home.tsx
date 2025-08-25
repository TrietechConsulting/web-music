import { prisma } from "@/utils/prisma";
import MusicCard from "../MusicCard";

export default async function HomeContent() {
  const musics = await prisma.entity.findMany();

  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Personal Audio Hub 🎧</h2>
        <p className="text-gray-600">
          Stream your favorite tracks with a clean minimal interface.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {musics?.map((music) => {
          return <MusicCard key={music.id} {...music} />;
        })}
      </div>
    </main>
  );
}
