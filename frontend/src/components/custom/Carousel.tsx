import React, { useState, useEffect } from "react";
import "./Carousel.css";

interface CarouselProps {
    images: string[];
    transitionTime: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, transitionTime }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [transformValue, setTransformValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTransformValue(0);
            setCurrentIndex(nextIndex);
            setNextIndex((nextIndex + 1) % images.length);
        }, transitionTime);
        return () => clearInterval(interval);
    }, [nextIndex, images, transitionTime]);

    const handlePrevClick = () => {
        if (currentIndex === 0) {
            setNextIndex(images.length - 1);
        } else {
            setNextIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex === images.length - 1) {
            setNextIndex(0);
        } else {
            setNextIndex(currentIndex + 1);
        }
    };

    const handleTransitionStart = () => {
        setTransformValue(-100);
    };

    return (
        <div className="carousel-container">
            <button onClick={handlePrevClick} className="prev-btn">
                &#10094;
            </button>
            <img
                src={images[currentIndex]}
                alt="Slide"
                className="current-image"
                style={{ transform: `translateX(${transformValue}%)` }}
                onTransitionEnd={handleTransitionStart}
            />
            <img
                src={images[nextIndex]}
                alt="Slide"
                className="next-image"
                style={{ transform: `translateX(${transformValue + 100}%)` }}
            />
            <button onClick={handleNextClick} className="next-btn">
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;
