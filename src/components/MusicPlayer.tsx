"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const audioLists = [
  {
    name: "Jump",
    src: "/music/jump.mp3",
    cover: "/cover/jump.png",
    singer: "Blackpink",
    lyric: "/lrc/jump.lrc",
  },
];

interface LyricLine {
  time: number;
  text: string;
}

function parseLrc(lrc: string): LyricLine[] {
  return lrc
    .split("\n")
    .map((line) => {
      const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (!match) return null;
      const minute = parseInt(match[1]);
      const second = parseFloat(match[2]);
      return {
        time: minute * 60 + second,
        text: match[3].trim(),
      };
    })
    .filter(Boolean) as LyricLine[];
}

export default function MusicPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  const currentTrack = audioLists[currentIdx];

  useEffect(() => {
    fetch(currentTrack.lyric)
      .then((res) => res.text())
      .then((text) => setLyrics(parseLrc(text)));
  }, [currentTrack.lyric]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  // Handle playback speed changes
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  const activeIndex =
    lyrics.findIndex(
      (line, i) =>
        currentTime >= line.time &&
        (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
    ) ?? 0;

  // Scroll to active lyric line
  useEffect(() => {
    if (lyrics.length === 0) return;
    const container = lyricsContainerRef.current;
    if (!container) return;
    if (activeIndex === 0) {
      container.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const lineElement = document.getElementById(`lyric-${activeIndex}`);
    if (container && lineElement) {
      const containerRect = container.getBoundingClientRect();
      const lineRect = lineElement.getBoundingClientRect();
      if (
        lineRect.top < containerRect.top ||
        lineRect.bottom > containerRect.bottom
      ) {
        container.scrollTo({
          top:
            lineElement.offsetTop -
            container.offsetTop -
            container.clientHeight / 2 +
            lineElement.clientHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex, lyrics]);

  return (
    <div
      className="w-full max-w-md mx-auto py-4 px-2 sm:py-8 sm:px-4 rounded-xl shadow
                    flex flex-col space-y-4"
    >
      {/* Audio Player */}
      <audio
        ref={audioRef}
        controls
        className="w-full"
        src={currentTrack.src}
      />

      {/* Playback Speed Selector */}
      <div className="flex flex-wrap items-center gap-3 my-2">
        {([0.5, 0.75, 1, 1.25, 1.5, 2] as const).map((s) => (
          <Button
            key={s}
            onClick={() => setSpeed(s)}
            className={`px-3 py-1.5 rounded border flex-1
              ${
                speed === s
                  ? "bg-blue-500 text-white border-blue-600 font-bold"
                  : "bg-white text-blue-700 border-blue-300"
              }
            `}
          >
            {s}x
          </Button>
        ))}
      </div>

      {/* Lyrics Section */}
      <div
        ref={lyricsContainerRef}
        className="h-96 overflow-y-auto border rounded-xl p-3 bg-accent"
      >
        {lyrics.map((line, i) => (
          <p
            key={i}
            id={`lyric-${i}`}
            className={`
              transition-all duration-200 text-base py-[0.35rem] px-0
              ${
                i === activeIndex
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"
              }
            `}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
