# Media Resources

## Managing images:

- A good starting point: [A full tutorial for image upload and manipulation](https://css-tricks.com/image-upload-manipulation-react/https://css-tricks.com/image-upload-manipulation-react/)
- a library [Blob management on github](https://github.com/nolanlawson/blob-util) or the same [on npm](https://www.npmjs.com/package/blob-util)
- [React Cropper](https://github.com/roadmanfong/react-cropper): crop your images before uploading, with the [online demo](https://react.rocks/example/react-cropper)
- or [an alternative: React Image Crop](https://github.com/DominicTobias/react-image-crop)


For the record, [Cloudinary the most spread SaaS on the subject](https://cloudinary.com/): sexy, easy to use and free... But closed sources and with your data hosted somewhere in the US :(
-


## Video

### Various useful commands

```sh
# Reduce video size (see https://unix.stackexchange.com/questions/28803/how-can-i-reduce-a-videos-size-with-ffmpeg)
ffmpeg -i input.mp4 -vcodec libx264 -crf 20 output.mp4
```