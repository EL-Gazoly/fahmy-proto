import React, { useState } from 'react';
import './style.css';

// Define the type for the project data
type Project = {
  name: string;
  description: string;
  video: string;
};

const projects: Project[] = [
  {
    name: "360 VR Video",
    description: "An immersive virtual reality experience where users can watch 360 video and interact with it. With the power of hand tracking, you can control the video through the video player.",
    video: "src/assets/360 XR/360 VR Video.mp4"
  },
  // Add more project entries as needed
];

const ImageCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <div className="relative w-[459px] h-[275px]" key={index}>
    <video controls width="400" src={project.video} className="video" />
    <div className="description">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  </div>
);

const HorizontalScrollGallery: React.FC = () => {
  const [scrollX, setScrollX] = useState(0);

  const scrollLeft = () => {
    const maxScrollX = -((projects.length - 1) * 500); // Adjust the width of the content as needed
    const newScrollX = Math.max(scrollX - 500, maxScrollX);
    setScrollX(newScrollX);
  };

  const scrollRight = () => {
    const newScrollX = Math.min(scrollX + 500, 0);
    setScrollX(newScrollX);
  };

  const hideLeftArrow = scrollX === 0;
  const hideRightArrow = scrollX === -((projects.length - 1) * 500);

  return (
    <div className="horizontal-scroll-container w-[1132px] overflow-x-hidden relative">
      <div className="image-container gap-x-4" style={{ transform: `translateX(${scrollX}px)` }}>
        {projects.map((project, index) => (
          <ImageCard key={index} project={project} index={index} />
        ))}
      </div>
      <div className="scroll-buttons">
        {!hideLeftArrow && <div className="scroll-button left" onClick={scrollLeft}>Scroll Left</div>}
        {!hideRightArrow && <div className="scroll-button right" onClick={scrollRight}>Scroll Right</div>}
      </div>
    </div>
  );
};

export default HorizontalScrollGallery;
