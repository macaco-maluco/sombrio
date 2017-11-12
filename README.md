![Sombrio](https://raw.githubusercontent.com/Hackbit/nko2017-sombrio/master/image.png)

[![Build Status](https://travis-ci.org/Hackbit/nko2017-sombrio.svg)](https://travis-ci.org/Hackbit/nko2017-sombrio)

# Sombrio

There is a Monster chasing you. Your objective is escaping your horrible fate by running around the strange Maze Reality you are in while building/removing walls. The longer you survive the better ;)

Some walls will vanish or appear now and then, blocking your way or heping you (who knows, huh?). It is the very magical nature of the Maze Reality affecting you. Only this is not completely true.

Sombrio is a peer-to-peer game built on top of SSB (Secure Scuttlebut). Just gather your friends and play a LAN game.

## Download the game

Versions for Mac, Linux and Windows x64 here:  

https://hackbit.github.io/nko2017-sombrio/

https://sombrio.herokuapp.com/

## Playing the game

There are three ways of playing this game:

1. Play it by your by downloading the app and running it locally.

1. Play with friends in a local network. Fire the app and changes to the world will be seen by all players.  

1. Join the distributed world by first installing [ssbc/patchwork](https://github.com/ssbc/patchwork/releases/latest) and joining a Pub like http://ssb-pub.macacomaluco.space/ then fire Patchwork and after that start the game.

## Compile the app

Before you can start distribution of the app, first you need to install some dependencies:

```bash
./scripts/install.sh
```

Then package it with:

```sh
./scripts/distribute.sh
```

## Attributions

Logo and Monster:

Cute Monster  
By Symbolon, IT  
https://thenounproject.com/term/cute-monster/831319/  

Player:

Eyes  
By Sean Maldjian, US  
https://thenounproject.com/term/eyes/912607/  

Walls:

Blocks  
By Cris Dobbins, US  
https://thenounproject.com/search/?q=bricks&i=33639  

Pointer:

Assembly Point  
By Ayub Irawan, ID  
https://thenounproject.com/search/?q=gathering%20point&i=1013299  

Gravestone:

Gravestone  
By anbileru adaleru  
https://thenounproject.com/search/?q=gravestone&i=225333  

Resurrect:

Resurrection  
By Andrew Doane  
https://thenounproject.com/search/?q=resurrect&i=912475  
