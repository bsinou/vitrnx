# Media Resources

## Video

### Various useful commands

```sh
# Reduce video size (see https://unix.stackexchange.com/questions/28803/how-can-i-reduce-a-videos-size-with-ffmpeg)
ffmpeg -i input.mp4 -vcodec libx264 -crf 20 output.mp4
```