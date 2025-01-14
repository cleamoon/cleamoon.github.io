---
title: FFmpeg video compression benchmark
date: 2025-01-14
tags: [FFmpeg]
---

There are many modern video encoding algorithm that can be used for video compression. This article tests several of them and gives a simple benchmark.

<!-- more -->

# Benchmark setup

The video to compress is the lossless version of the trailer of the short film [Sintel](http://www.sintel.org/). The video file can be found [here](https://media.xiph.org/). I use the 1080p version of the video. 

The video will be encoded with [H.264](https://en.wikipedia.org/wiki/Advanced_Video_Coding), [H.265](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding), [VP9](https://en.wikipedia.org/wiki/VP9) and [AV1](https://en.wikipedia.org/wiki/AV1) encoding algorithms on difference options. 

The results will contain the size of the encoded video, the compression time, three screen shorts at the same frame and a subjective view for the video. The encoding is performed on a laptop with other running programs so the compression times will be less representative. The screenshots are taken at the 13th second, 17th second and 39th second with the following bash script: 

```sh
#!/usr/bin/env bash
if [ $# -lt 1 ]; then
    echo "Usage: $0 <input_video>"
    exit 1
fi

input_video=$1

ffmpeg -ss 00:00:13 -i "$input_video" -vframes 1 -q:v 2 s13.jpg
ffmpeg -ss 00:00:17 -i "$input_video" -vframes 1 -q:v 2 s17.jpg
ffmpeg -ss 00:00:39 -i "$input_video" -vframes 1 -q:v 2 s39.jpg
```

# Original video

## Result

* Size: 3,805,996KB or 3.6GB. 
* Compression time: 0s.
* Screenshots:
  * 13th second:
  ![s13_original](/images/ffmpeg-video-compression/s13_orig.jpg)
  * 17th second:
  ![s17_original](/images/ffmpeg-video-compression/s17_orig.jpg)
  * 39th second:
  ![s39_original](/images/ffmpeg-video-compression/s39_orig.jpg)
* Subjective view: Scene transitions are crisp, with rich details and saturated colors.

# H.264 with low quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v libx264 -preset slow -crf 30 -b:v 0 -c:a libopus output.mkv
```

## Result

* Size: 4,840KB or 4.7MB.
* Compression time: 12.95s.
* Screenshots:
  * 13th second:
  ![s13_h264_low](/images/ffmpeg-video-compression/s13_h264_low.jpg)
  * 17th second:
  ![s17_h264_low](/images/ffmpeg-video-compression/s17_h264_low.jpg)
  * 39th second:
  ![s39_h264_low](/images/ffmpeg-video-compression/s39_h264_low.jpg)
* Subjective view: There are noticeable blurry areas near the edges, and the overall scene lacks sharpness. The details of the falling snow are indistinct and difficult to recognize. While the colors are acceptable, they appear slightly dim. Additionally, the action sequence is too fast-paced, making it hard to follow.

# H.264 with high quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v libx264 -preset slow -crf 18 -b:v 0 -c:a libopus output.mkv
```

## Result

* Size: 22,644KB or 22MB.
* Compression time: 29.03s.
* Screenshots:
  * 13th second:
  ![s13_h264_high](/images/ffmpeg-video-compression/s13_h264_high.jpg)
  * 17th second:
  ![s17_h264_high](/images/ffmpeg-video-compression/s17_h264_high.jpg)
  * 39th second:
  ![s39_h264_high](/images/ffmpeg-video-compression/s39_h264_high.jpg)
* Subjective view: The blur on the edges are gone. The sharpness is OK and the details of the falling snow are back. The overall impression is actually quite good. 

# H.265 with low quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v libx265 -preset slow -crf 30 -b:v 0 -c:a libopus output.mkv
```

## Result

* Size: 3,436KB or 3.4MB.
* Compression time: 57.96s.
* Screenshots:
  * 13th second:
  ![s13_h265_low](/images/ffmpeg-video-compression/s13_h265_low.jpg)
  * 17th second:
  ![s17_h265_low](/images/ffmpeg-video-compression/s17_h265_low.jpg)
  * 39th second:
  ![s39_h265_low](/images/ffmpeg-video-compression/s39_h265_low.jpg)
* Subjective view: Almost as blurry as the H.264 encoding with high compression rate. With more clear action scenes and a little richer details. 

# H.265 with high quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -pix_fmt yuv420p10le -c:v libx265 -preset slow -crf 21 -b:v 0 -c:a libopus -x265-params profile=main10 output.mkv
```

## Result

* Size: 11,200KB or 11MB.
* Compression time: 180.05s.
* Screenshots:
  * 13th second:
  ![s13_h265_high](/images/ffmpeg-video-compression/s13_h265_high.jpg)
  * 17th second:
  ![s17_h265_high](/images/ffmpeg-video-compression/s17_h265_high.jpg)
  * 39th second:
  ![s39_h265_high](/images/ffmpeg-video-compression/s39_h265_high.jpg)
* Subjective view: Very close to the original video. However the dark scenes feel a little dark than the original. I'm not sure about the reason.

# AV1 with low quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v libsvtav1 -crf 26 -preset 2 -quality quality output.mp4
```

## Result

* Size: 7,292KB or 7.1MB.
* Compression time: 364.20s
* Screenshots:
  * 13th second:
  ![s13_av1_low](/images/ffmpeg-video-compression/s13_av1_low.jpg)
  * 17th second:
  ![s17_av1_low](/images/ffmpeg-video-compression/s17_av1_low.jpg)
  * 39th second:
  ![s39_av1_low](/images/ffmpeg-video-compression/s39_av1_low.jpg)
* Subjective view: It has surprisingly good quality considering its size. Only get blurry when there are lots of moving particles. But the falling snow is still quite visible.


# AV1 with high quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v libsvtav1 -crf 21 -preset 2 -quality quality output.mp4
```

## Result

* Size: 9,640KB or 9.4MB.
* Compression time: 384.28s.
* Screenshots:
  * 13th second:
  ![s13_av1_high](/images/ffmpeg-video-compression/s13_av1_high.jpg)
  * 17th second:
  ![s17_av1_high](/images/ffmpeg-video-compression/s17_av1_high.jpg)
  * 39th second:
  ![s39_av1_high](/images/ffmpeg-video-compression/s39_av1_high.jpg)
* Subjective view: Almost as good as the original video. Some less visible details get even harder to see. Generally good. 

# AV1 with high quality and another encoder

`libaom-av1` is another AV1 encoder. `Libaom` is the reference encoder for the AV1 format. `libaom-av1` is often slower than `libsvtav1`. 

## Command 

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v  libaom-av1 -b:v 0 -crf 25 -preset 2 -c:a libopus -f matroska output.mkv
```

## Result

* Size: 6,528KB or 6.4MB.
* Compression time: 104.44mins or 6,266s.
* Screenshots:
  * 13th second:
  ![s13_av1_high_slow](/images/ffmpeg-video-compression/s13_av1_high_slow.jpg)
  * 17th second:
  ![s17_av1_high_slow](/images/ffmpeg-video-compression/s17_av1_high_slow.jpg)
  * 39th second:
  ![s39_av1_high_slow](/images/ffmpeg-video-compression/s39_av1_high_slow.jpg)
* Subjective view: Almost as good as the original video. Some less visible details get even harder to see. Generally good. 

# VP9 with low quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

## Result

* Size: 9,064KB or 8.9M.
* Compression time: 86.19s
* Screenshots:
  * 13th second:
  ![s13_vp9_low](/images/ffmpeg-video-compression/s13_vp9_low.jpg)
  * 17th second:
  ![s17_vp9_low](/images/ffmpeg-video-compression/s17_vp9_low.jpg)
  * 39th second:
  ![s39_vp9_low](/images/ffmpeg-video-compression/s39_vp9_low.jpg)
* Subjective view: The quality is surprisingly good. There are noticeable blurry areas but not as much as the low quality H.264 one. The action scenes has a little lower quality. 

# VP9 with high quality

## Command

```sh
ffmpeg -i sintel_trailer_2k_1080p24.y4m -c:v libvpx-vp9 -crf 18 -b:v 0 -c:a libopus output.webm
```

## Result

* Size: 19,500KB or 19MB.
* Compression time: 83.71s
* Screenshots:
  * 13th second:
  ![s13_vp9_high](/images/ffmpeg-video-compression/s13_vp9_high.jpg)
  * 17th second:
  ![s17_vp9_high](/images/ffmpeg-video-compression/s17_vp9_high.jpg)
  * 39th second:
  ![s39_vp9_high](/images/ffmpeg-video-compression/s39_vp9_high.jpg)
* Subjective view: Almost as good as the original. Some typical web stream artifacts are visible.





# Table of some result data

| Type                                      | Size        | Time    |
| ----------------------------------------- | ----------- | ------- |
| Original                                  | 3,805,996KB | -       |
| H.264 with low quality                    | 4,840KB     | 12.95s  |
| H.264 with high quality                   | 22,644KB    | 29.03s  |
| H.265 with low quality                    | 3,436KB     | 57.96s  |
| H.265 with high quality                   | 11,200KB    | 180.05s |
| AV1 with low quality                      | 7,292KB     | 364.20s |
| AV1 with high quality                     | 9,640KB     | 384.28s |
| AV1 with high quality and another encoder | 6,528KB     | 6266s   |
| VP9 with low quality                      | 9,064KB     | 86.19s  |
| VP9 with high quality                     | 19,500KB    | 83.71s  |






# References

1. [H.264 Video Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)
2. [H.265/HEVC Video Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/H.265)
3. [AV1 Video Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/AV1)
4. [Stackexchange.com](https://unix.stackexchange.com/questions/28803/how-can-i-reduce-a-videos-size-with-ffmpeg)
5. [How can I reduce a video's size with ffmpeg?](https://unix.stackexchange.com/questions/28803/how-can-i-reduce-a-videos-size-with-ffmpeg)
