---
title: 'picoCTF: Hidden in Plainsight Writeup'
published: 2025-10-28
draft: false
series: 'picoCTF'
tags: ['picoctf', 'forensics', 'writeup', 'ctf']
toc: false
coverImage:
  src: './question.png'
  alt: 'A screenshot of a Capture The Flag (CTF) challenge titled "Hidden in plainsight" in the Forensics category. The challenge is tagged as Easy, Forensics, picoMini by CMU-Africa, and browser_webshell_solvable.'
---

# Hidden in plainsight

:::penguin_oldmoney
This is an easy forensics challenge. The clue is to discover "hidden" payload and "extract" the flag.

Whenever I got an image in a forensics challenge, first step is to use exiftool. The image given is named img.jpg. I downloaded the image to my local linux machine.
:::

```shell
exiftool img.jpg
```

Below is the result of the command.

```shell
…/forensics/hidden-in-plainsights ❯ exiftool img.jpg
ExifTool Version Number         : 13.36
File Name                       : img.jpg
Directory                       : .
File Size                       : 73 kB
File Modification Date/Time     : 2025:10:27 20:54:44+08:00
File Access Date/Time           : 2025:10:27 20:59:18+08:00
File Inode Change Date/Time     : 2025:10:27 20:55:25+08:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Resolution Unit                 : None
X Resolution                    : 1
Y Resolution                    : 1
Comment                         : c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9
Image Width                     : 640
Image Height                    : 640
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 640x640
Megapixels                      : 0.410
```

As you can see in the comment, there's a weird looking string. I would assume it is a base64 encoded string. So I try to decode the string using below command.

```shell
echo "c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9" | base64 --decode
```

Output = ` steghide:cEF6endvcmQ= `

There's another clue given there, `steghide`, that means we need to use steghide tool to solve this challenge, but first let's decode the base64 string given. I would assume that's the password to be used with steghide.

```shell
echo "cEF6endvcmQ=" | base64 --decode
```

Output = `pAzzword`

Now that we know what tool to use and the password, we can move on to the next step.

:::tip
Run `steghide --help` if you don't know what command and flags to use.
:::

```shell
steghide --extract -sf img.jpg -p pAzzword
```

Output = `wrote extracted data to "flag.txt".`

I run `ls` to list all available files inside my directory, and yes there's a new file created named `flag.txt`

Next just run `cat` command to print the content of the text file

```shell
cat flag.txt
```

Output = `picoCTF{h1dd3n_1n_1m4g3_1c55ccd0}`

_Voila!_