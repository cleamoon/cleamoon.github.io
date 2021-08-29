---
title: Several FFmpeg examples
date: 2020-08-14
mathjax: true
tags: [FFmpeg, Shell]
---

In this article, several FFmpeg examples that I used are listed. 

<!-- more -->

#### Convert flv to mp3
``` shell
$ ffmpeg -i video.flv -vn -acodec libmp3lame -ab 128k audio.mp3
```



#### Batch converting mkv to mp4

```shell
$ for f in *.mkv; do ffmpeg -i "$f" -c copy "${f%.mkv}.mp4"; done
```



#### Convert animated gif to mp4

```shell
$ ffmpeg -i animated.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.mp4
```



#### Burn subtitles into a video

```shell
$ ffmpeg -i video.avi -vf subtitles=subtitle.srt out.avi
```
If the subtitles is embedded in the container `video.mkv`
```shell
$ ffmpeg -i video.mkv -vf subtitles=video.mkv out.avi
```
More complex, if the video has several sound tracks and subtitles, and the subtitles use different resolution than the video: 
````shell
ffmpeg -i in.mkv -filter_complex "[0:s]scale=1280:-1[sub];[0:v][sub]overlay[v]" -map "[v]" -map 0:a -c:a copy out.mp4
````



#### Split video in chunks with same length

````shell
$ ffmpeg -i input.mp4 -c copy -map 0 -segment_time 00:20:00 -f segment output%03d.mp4
````



#### Split video in chunks with different lengths

````shell
$ ffmpeg -i source.m4v -ss 0 -t 593.3 -c copy part1.m4v
$ ffmpeg -i source.m4v -ss 593.3 -t 551.64 -c copy part2.m4v
$ ffmpeg -i source.m4v -ss 1144.94 -t 581.25 -c copy part3.m4v
````



#### Compression the video using libx265

````shell
ffmpeg -i input.mp4 -vcodec libx264 -crf 20 output.mp4
````
Vary the CRF between around 18 and 24 — the lower, the higher the bitrate



#### Simple rescaling

````shell
ffmpeg -i input.avi -vf scale=320:240 output.avi
````
Keeping the aspect radio
````shell
ffmpeg -i input.jpg -vf scale=320:-1 output_320.png
````



#### Speeding up/down audio

```shell
ffmpeg -i input.mkv -filter:a "atempo=2.0" -vn output.mkv
```



#### References

1. [Stackoverflow](https://stackoverflow.com/)
2. [FFmpeg Official Webiste](https://ffmpeg.org)
3. [Github Gist](https://gist.github.com)



#### To be continued