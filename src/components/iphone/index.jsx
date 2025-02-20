import React, { useState, useEffect } from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import { icecream } from "../../assets";

export const Phone = () => {
    const scaleFactor = 300 / 667;
    const [isFlipped, setIsFlipped] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [initialRotation, setInitialRotation] = useState(0);
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);
    const [hoverEffect, setHoverEffect] = useState({ x: 0, y: 0, blur: 20 });

    // Initial Rotation Animation
    useEffect(() => {
        if (showInitialAnimation) {
            const initialInterval = setInterval(() => {
                setInitialRotation((prev) => {
                    if (prev >= 360) {
                        clearInterval(initialInterval);
                        setShowInitialAnimation(false);
                        return 0;
                    }
                    return prev + 5;
                });
            }, 15);

            return () => clearInterval(initialInterval);
        }
    }, [showInitialAnimation]);

    // Regular Flip Animation
    useEffect(() => {
        if (!showInitialAnimation) {
            const flipInterval = setInterval(() => {
                setIsFlipped((prev) => !prev);
            }, 3000);
            return () => clearInterval(flipInterval);
        }
    }, [showInitialAnimation]);

    useEffect(() => {
        setRotation(isFlipped ? 180 : 0);
    }, [isFlipped]);

    // Handle hover effect for tilt and shadow
    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = ((clientX - left) / width - 0.5) * 25; // Tilt range: -12.5 to 12.5 degrees
        const y = ((clientY - top) / height - 0.5) * 25;
        const blur = 35 - Math.abs(x) - Math.abs(y); // Adjust shadow blur dynamically
        setHoverEffect({ x, y, blur });
    };

    const handleMouseLeave = () => {
        setHoverEffect({ x: 0, y: 0, blur: 20 });
    };

    return (
        <div className="flex justify-center items-center h-96 perspective-[1000px] relative">
            {/* Shadow Effect (Moves & Rotates Dynamically) */}
            <div
                className="absolute w-[220px] h-[50px] bg-black opacity-40 rounded-full transition-all duration-300"
                style={{
                    bottom: "-35px",
                    left: "50%",
                    transform: `translateX(-50%) 
                                translate(${-hoverEffect.x * 0.4}px, ${hoverEffect.y * 0.4}px) 
                                rotateX(${-hoverEffect.y * 0.2}deg) rotateY(${-hoverEffect.x * 0.2}deg) 
                                rotateY(${rotation}deg)`, // Rotate with phone
                    filter: `blur(${hoverEffect.blur}px)`,
                }}
            ></div>

            {/* Phone Frame (Now Shadow Moves Along) */}
            <div
                className="transition-all mt-5 duration-1000 ease-in-out cursor-pointer"
                style={{
                    transform: showInitialAnimation
                        ? `scale(${scaleFactor}) rotateX(${initialRotation}deg)`
                        : `scale(${scaleFactor}) rotateY(${hoverEffect.x}deg) rotateX(${hoverEffect.y}deg) rotateY(${rotation}deg)`,
                    transformOrigin: "center center",
                    transition: "transform 0.3s ease-out",
                }}
                onClick={() => !showInitialAnimation && setIsFlipped((prev) => !prev)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <DeviceFrameset device="iPhone 8" color="gold">
                    <div className="w-[375px] h-[667px] bg-gray-100 flex items-center justify-center">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${icecream})`,
                            }}
                        />
                    </div>
                </DeviceFrameset>
            </div>
        </div>
    );
};

export default Phone;
