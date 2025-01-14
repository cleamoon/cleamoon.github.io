---
title: Collection of varies command line one liner
date: 2024-06-08
mathjax: true
tags: [Shell]
---

Collection of various one-liners for archiving. Always being updated.

<!-- more -->


## Convert GIF to AVIF

```shell
ffmpeg -i input.gif -strict -1 -f yuv4mpegpipe -pix_fmt yuva444p - | avifenc --stdin  output.avif
```
## Convert JPEF/PNG to AVIF

```shell
magick input.jpeg -quality 90% output.avif
magick input.png -quality 50% output.avif
```

## Compress files with 7z

```shell
7z a -t7z -m0=lzma -mx=9 -mfb=64 -md=32m -ms=on archive.7z dir1
```

## Compress files with 7z and standard zip

```shell
7z a -mm=Deflate -mfb=258 -mpass=15 -r foo.zip dir1
```



## References

1. [Convert images to AVIF/AVIFS with open-source tools](https://ivonblog.com/en-us/posts/convert-images-to-avif-command-lines/)
2. [What are the best options to use when compressing files using 7 Zip?](https://superuser.com/questions/281573/what-are-the-best-options-to-use-when-compressing-files-using-7-zip)

