import React, { useState, useRef, useEffect } from 'react'
import styles from "../../styles/AudioPlayer.module.css";
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

const AudioPlayer = ({ src }) => {
    useEffect(() => {
        if(src != null){
            setAutoplay(true)
        }
    },[src])
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [autoplay,setAutoplay] = useState(true);

    // references
    const audioPlayer = useRef();   // reference our audio component
    const progressBar = useRef();   // reference our progress bar
    const animationRef = useRef();  // reference the animation

    useEffect(() => {
        if(src != ''){
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            // progressBar.current.max = seconds;
        }
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState, src]);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }
    useEffect(() => {
        if (autoplay && src != null) {
            setIsPlaying(true);
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
            setAutoplay(false);
        }

    }, [autoplay])
    const whilePlaying = () => {
        if(audioPlayer.current){
            // progressBar.current.value = audioPlayer.current.currentTime;
            // changePlayerCurrentTime();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
       
    }

    // const changeRange = () => {
    //     audioPlayer.current.currentTime = progressBar.current.value;
    //     changePlayerCurrentTime();
    // }

    // const changePlayerCurrentTime = () => {
    //     progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    //     setCurrentTime(progressBar.current.value);
    // }

    // const backThirty = () => {
    //     progressBar.current.value = Number(progressBar.current.value - 30);
    //     changeRange();
    // }

    // const forwardThirty = () => {
    //     progressBar.current.value = Number(progressBar.current.value + 30);
    //     changeRange();
    // }

    return (
        <div className={styles.audioPlayer}>
            
            <audio ref={audioPlayer} src={src} onEnded={() => setIsPlaying(false)} preload="metadata"></audio>
            <button onClick={togglePlayPause} className={styles.playPause}>
                {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
            </button>
            {/* current time */}
           

            {/* progress bar */}
            {/* <div>
                <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
            </div> */}

            {/* duration */}
         
        </div>
    )
}

export { AudioPlayer }