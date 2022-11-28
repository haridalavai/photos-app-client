import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { getUploadUrl, uploadPhotos } from '../api/photos';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'flex',
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const UploadPhotos = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/heic': [],
        'video/mp4': [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const uploadImages = async () => {
    try {
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        const resp = await getUploadUrl(files);
        if (files[i]) {
          const rr = await uploadPhotos(files[i], resp.data.url);
          console.log(rr);
        }
        setUploaded(i + 1);
      }
      toast({
        title: 'Photos uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setUploading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Error uploading photos',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setUploading(false);
    }
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    setFiles([]);
    setUploaded(0);
    setUploading(false);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <Tooltip label='Upload photos' placement='left' colorScheme='blue'>
        <IconButton
          colorScheme='blue'
          size='lg'
          borderRadius='100'
          icon={<FontAwesomeIcon icon={faCloudArrowUp} />}
          onClick={onOpen}
          position='fixed'
          bottom='20'
          right='5'
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setFiles([]);
          onClose();
        }}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent w='80vw'>
          <ModalHeader>Upload Photos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width={'100%'} h='100%' className='container'>
              <Box
                h='80'
                border={'1px dashed'}
                borderColor='blue.400'
                borderRadius='5px'
                // bg='blue.50'
                {...getRootProps({ className: 'dropzone' })}
              >
                <Flex
                  // h='100%'
                  alignItems={files.length === 0 ? 'center' : ''}
                  justifyContent={files.length === 0 ? 'center' : ''}
                  flexWrap='wrap'
                  overflowY='scroll'
                  overflowX='hidden'
                  maxHeight='100%'
                >
                  <input {...getInputProps()} />
                  {files.length === 0 ? (
                    <VStack>
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                      <em>
                        (Only *.jpeg, *.png, *heic images will be accepted)
                      </em>
                    </VStack>
                  ) : (
                    thumbs
                  )}
                </Flex>
              </Box>
              <Text>{`uploaded ${uploaded} of ${files.length}`}</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              loadingText={`uploading photos...`}
              isLoading={uploading}
              colorScheme='blue'
              mr={3}
              onClick={uploadImages}
              size='lg'
              w='100%'
              m='0'
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadPhotos;
