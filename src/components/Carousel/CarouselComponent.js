import React from "react"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function CarouselComponent() {
    return (
        <div className="carousel-wrapper">
            <Carousel
                autoPlay
                showThumbs={false}
                centerMode={false}
                swipeable={true}
                infiniteLoop={true}
                interval={5000}
                transitionTime={1000}
            >
                <div>
                    <img src="./img/carousel/pic1.jpg" alt="pic1" />
                    <p className="legend">Pic 1</p>
                </div>
                <div>
                    <img src="./img/carousel/pic2.jpg" alt="pic2" />
                    <p className="legend">Pic 2</p>
                </div>
                <div>
                    <img src="./img/carousel/pic3.jpg" alt="pic3" />
                    <p className="legend">Pic 3</p>
                </div>
            </Carousel>
        </div>
    )
}