'use client'
import { useEffect, useRef, useState } from "react"

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (started) return

    const startAudio = () => {
      const audio = audioRef.current
      if (!audio || started) return

      audio.volume = 0.9
      audio.play().then(() => {
        setStarted(true)
        console.log("running:");
      }).catch(() => {
        console.log("failed");
      })

      // cleanup after first success
      document.removeEventListener('click', startAudio)
      document.removeEventListener('keydown', startAudio)
      document.removeEventListener('touchstart', startAudio)
    }

    document.addEventListener('click', startAudio)
    document.addEventListener('keydown', startAudio)
    document.addEventListener('touchstart', startAudio)

    return () => {
      document.removeEventListener('click', startAudio)
      document.removeEventListener('keydown', startAudio)
      document.removeEventListener('touchstart', startAudio)
    }
  }, [started])

  return (
    <audio
      ref={audioRef}
      src="/audio/mountain-war.mp3"
      loop
      playsInline
    />
  )
}