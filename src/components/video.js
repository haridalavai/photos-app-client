import { Img } from '@chakra-ui/react';
import React from 'react';

const Video = ({ thumbnail, index }) => {
  const videoProps = JSON.stringify({
    source: [{ src: thumbnail.thumbnail, type: 'video/mp4' }],
    attributes: { preload: false, controls: true },
  });
  return (
    <>
      <a key={index} data-lg-size='1280-720' data-video={videoProps}>
        <video
          key={index}
          src={thumbnail.thumbnail}
          alt={thumbnail.name}
          h='100px'
          style={{
            height: '100px',
            marginRight: '8px',
            marginBottom: '8px',
            marginTop: '8px',
          }}
          cursor='pointer'
        />
      </a>
    </>
  );
};

export default Video;
