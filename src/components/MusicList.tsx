// components/MusicList.tsx

interface Music {
  title: string;
  fileUrl: string;
}

const musicList: Music[] = [
  { title: "Song One", fileUrl: "/music/song1.mp3" },
  { title: "Song Two", fileUrl: "/music/song2.mp3" },
  { title: "Song Three", fileUrl: "/music/song3.mp3" },
];

export default function MusicList() {
  return (
    <div className="space-y-6 mt-4">
      {musicList.map((track, idx) => (
        <div key={idx} className="p-4 border rounded-md shadow-sm">
          <h3 className="font-medium">{track.title}</h3>
          <audio controls className="mt-2 w-full">
            <source src={track.fileUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
}
