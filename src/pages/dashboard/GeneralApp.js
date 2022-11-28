import React, { useEffect } from 'react';
import { getThumbnails } from '../../api/photos';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import { Box, Flex, Grid, Img, Link, Spinner, VStack } from '@chakra-ui/react';
import UploadPhotos from '../../components/UploadPhotos';
import InfiniteScroll from 'react-infinite-scroller';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import './GeneralApp.css';
import Video from '../../components/video';

const GeneralApp = () => {
  const [thumbnails, setThumbnails] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalCount, settotalCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    console.log('GeneralApp');

    fetchThumbnails();
  }, []);

  async function fetchThumbnails() {
    console.log(currentPage, totalCount);
    setLoading(true);
    const response = await getThumbnails(currentPage + 1, 5);
    setCurrentPage(currentPage + 1);
    console.log(response.data.thumbnails);
    setThumbnails([...thumbnails, ...response.data.thumbnails]);
    settotalCount(response.data.totalCount);
    setLoading(false);
  }

  const loadMore = async () => {
    console.log('loadMore');
    if (!loading) {
      fetchThumbnails();
    }
  };

  return (
    <>
      <Flex w={'100%'} alignItems={'flex-end'}>
        <UploadPhotos />
      </Flex>
      <InfiniteScroll
        dataLength={thumbnails.length}
        pageStart={1}
        loadMore={loadMore}
        hasMore={totalCount > currentPage * 5 ? true : false}
        loader={<Spinner />}
      >
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgVideo]}
          elementClassNames='gclass'
        >
          {thumbnails.map((thumbnail, index) => (
            <>
              {thumbnail.type === 'image' ? (
                <a
                  key={index}
                  data-src={thumbnail.webView}
                  data-download-url={thumbnail.original}
                >
                  <Img
                    key={index}
                    src={thumbnail.thumbnail}
                    alt={thumbnail.name}
                    marginRight='2'
                    marginBottom='2'
                    marginTop='2'
                    h='100px'
                    cursor='pointer'
                  />
                </a>
              ) : (
                <Video thumbnail={thumbnail} index={index} />
              )}
            </>
          ))}
        </LightGallery>
      </InfiniteScroll>
    </>
  );
};

export default GeneralApp;
