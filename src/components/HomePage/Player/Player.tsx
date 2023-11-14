import React, {useState, useRef, useEffect, MouseEvent } from 'react'
import style from './style/Player.module.scss'

import poster from '../../../img/icons/Screenshot 2022-06-04 at 20.09.svg'
import like from '../../../img/icons/like.svg'
import playButton from '../../../img/icons/PlayButton.svg'
import pauseButton from '../../../img/icons/PauseButton.svg'
import prevButton from '../../../img/icons/PrevButton.svg'
import nextButton from '../../../img/icons/NextButton.svg'
import peremeshkaButton from '../../../img/icons/PeremeshkaButton.svg'
import repeatButton from '../../../img/icons/RepeatButton.svg'

import song from '../../../img/song.mp3'


const Player = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number>(0); // Длительность видео
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
  
    if (videoElement) {
      videoElement.addEventListener('timeupdate', () => {
        if (!isDragging) {
          const duration = videoElement.duration;
          const currentTime = videoElement.currentTime;
          setVideoProgress((currentTime / duration) * 100);
        }
      });
  
      // Устанавливаем длительность видео после того, как метаданные загрузились
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoDuration(videoElement.duration);
      });
    }
  
  }, [isPlaying, isDragging]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const checkWidth = (e: MouseEvent) => {
    const clickElement = clickRef.current;
  
    if (clickElement) {
      const width = clickElement.clientWidth;
      const offset = e.nativeEvent.offsetX;
      const progress = (offset / width) * 100;
  
      const videoElement = videoRef.current;
  
      if (videoElement) {
        const duration = videoElement.duration;
        videoElement.currentTime = (progress / 100) * duration;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  


  return (
    <div className={style.block}>
      <div className={style.content}>
        <div className={style.left__block}>
          <img src={poster} alt="" />
          <div className={style.names}>
            <h4>Название песни</h4>
            <h5>Название плейлиста</h5>
          </div>
          <div className={style.like__wrapper}>
            <img src={like} alt="" />
          </div>
        </div>
        
        <div className={style.middle__block}>
          <div className={style.buttons}>
            <audio src={song} ref={videoRef}>
            </audio>
            <img src={peremeshkaButton} alt="" />
            <img src={prevButton} alt="" />
            <img className={style.play__icon} src={isPlaying ? pauseButton : playButton} onClick={PlayPause} alt="" />
            <img src={nextButton} alt="" />
            <img src={repeatButton} alt="" />
          </div>
          
          <div className={style.navigation}>
            <h4>
              {formatTime((videoProgress / 100) * videoDuration)}
            </h4>
            <div className={style.navigation_wrapper} onClick={checkWidth} ref={clickRef}>
              <div className={style.seek_bar} style={{ width: `${videoProgress}%` }}>
                <div className={style.cursor}></div>
              </div>
            </div>
            <h4>
              {formatTime(videoDuration)}
            </h4>
          </div>


        </div>

        <div className={style.right__block}>

        </div>
      </div>
    </div>
  )
}

export default Player