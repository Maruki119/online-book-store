import React ,{useEffect,useState} from "react";
import "./Promote2.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Promote() {
        return (
            <div className="promote-container">
                <Carousel className="slider-container"
                    width={1535} //1535
                    interval={5000}
                    autoPlay={true}
                    infiniteLoop={true}
                    animationHandler={"slide"}
                    showArrows = {true}
                    showIndicators={true}
                    showStatus={false}
                    showThumbs={false}
                    centerMode={true}
                    stopOnHover={true}
                >
                    <div className="promote1">
                        <img src="./images/Welcome.png" alt="Welcome" />
                    </div>
                    <div className="promote2">
                        <img src="./images/jjk.png" alt="jjk" />
                    </div>
                    <div className="promote3">
                        <img src="./images/fad5.png" alt="fad5" />
                    </div>
                    <div className="promote4">
                        <img src="./images/komi.png" alt="komi" />
                    </div>
                    <div className="promote5">
                        <img src="./images/haikyu.png" alt="haikyu" />
                    </div>
            </Carousel>
            </div>
            );   
}
export default Promote;