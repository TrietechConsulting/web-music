import MusicPlayer from "../MusicPlayer";

export default function HomeContent() {
  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Personal Audio Hub 🎧</h2>
        <p className="text-gray-600">
          Stream your favorite tracks with a clean minimal interface.
        </p>
      </div>

      <MusicPlayer />
    </main>
  );
}
