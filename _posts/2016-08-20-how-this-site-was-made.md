---
layout: post
title:  "How This Site Was Made"
date:   2016-08-20 00:06:05 -0400
author: Dave Berning
backgroundImage: macbook-pro.jpg
categories:
    - web development
tags:
    - Dave
    - test tag
    - tag
---
This article will not be going over the design in anyway, nor will it go over the UI. The reason being is 1) I'm trying to show the technical achievements and 2) I shouldn't need to explain a user interface.

## Bit of a Background
This redesign started when I realized that my current website at the time (old one now) was outdated, cookie cutter, and "hey look parallax". I mean, it wasn't a terrible site; it got me my first job. I just wanted something that was cleaner and something that advanced my technical skills and challenged me.

I started this redesign knowing I wanted to use a server-side language for convenience...nobody wants to update the same header twenty times. However, I wasn't working with a database or doing complex logic. All these includes added requests which contributed to my load times.

### Hello Static Site Generator

After some research I found the static site generator, Jekyll! It does everything I was trying to do and it exports into flat HTML. No includes, no server-side compiling, no PHP.

You might be asking, "bro, why not use a CMS like Wordpress". My answer to that is 1) Wordpress is __overkil__ and 2) I'm a web developer. My personal website should showcase my ability to handcraft websites. I already have [plenty examples of Wordpress websites](/work/bearcast-media) in my portfolio.

I've heard of Jekyll before but briefly. I've never really used it until now. I won't be going back to PHP if I don't need too.

## Archtecture

One very important mindset that I adopted while working in the field is "object oriented CSS (OOCSS)". Basically, I created a base CSS file with generic reusable classes like __.bkg-primary__ and __.gutter-top__. These classes give me features and styles that I need, simply by adding including them in an HTML element. Every button on my site that has my primary blue color (#356a7a), has the class __.btn-primary__. If I want to change my primary blue to a primary green color, I can easily do so in the SASS.

On top of my base CSS, this site is built off of the Bootstrap framework, generated in Jekyll, and hosted on GitHub Pages. Every portfolio item, testimonial, and blog post is a markdown file that gets generated into HTML by Jekyll.

## The Code
Okay, here is the exciting part. As stated before, this site was built using Jekyll and hosted on GitHub Pages. The markdown files I add to my GitHub repo get generated into flat HTML for your viewing pleasure.

### Portfolio Pieces
How the portfolio pieces are 
