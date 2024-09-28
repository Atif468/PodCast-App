import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="bg-slate-900 h-full text-white p-10">
      <img src="https://static.vecteezy.com/system/resources/previews/001/937/625/original/online-education-application-learning-worldwide-on-phone-mobile-website-background-social-distance-concept-the-classroom-training-course-library-illustration-flat-design-vector.jpg" alt="" className='h-1/2 w-1/2 bg-white m-auto bg-cover rounded-lg' />
      <audio src="./sample-3s.mp3" className='m-auto' controls></audio>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ea
        earum ad debitis impedit atque nobis labore quasi iure ipsum autem
        possimus beatae ipsam dolores, optio corrupti accusamus nesciunt quidem.
      </p>
    </div>
  );
};

export default VideoPlayer;
