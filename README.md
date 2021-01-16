# VT100.js

Player for VT100-Animations.
Play & enjoy old school animations on your terminal.

## Intro

VT100-Animations are files containing special [escaped character sequences](https://en.wikipedia.org/wiki/ANSI_escape_code), that old [VT100-Terminals](https://en.wikipedia.org/wiki/VT100) recognize and render.

Every modern Terminal can emulate this behaviours, but unfortunately they are too fast for this goal.
 
[VT100.js](https://www.npmjs.com/package/vt100) comes to the rescue!

## Quickstart

### Install

```bash
nmp -g install vt100
```


### Enjoy
```bash
curl https://raw.githubusercontent.com/gr3p1p3/vt100/master/animations/blinkeyes.vt | vt100
```

or 

```bash
vt100 --src=absolute/path/to/file.vt
```


### Enjoy more

You will find more animations on official [vt100 GitHub](https://github.com/gr3p1p3/vt100/tree/master/animations) page.



## Bugs & Issues

This is actually a beta, fixes & issues are welcome.