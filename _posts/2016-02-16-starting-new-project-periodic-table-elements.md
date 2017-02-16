---
layout: post
title:  "Starting a New Project: Periodic Table of Elements"
date:   2017-2=02-16 00:21:08 -0400
author: Dave Berning
seo:
    name: Starting a New Project: Periodic Table of Elements
    type: BlogPosting
    author: Dave Berning
    publisher: Dave Berning
    image: application.jpg
backgroundImage:  application.jpg
---

I know I'm late but, welcome 2017! I've been pretty busy lately and haven't had much time to dedicate a post to my loyal fan (One can dream...). I have been working diligently on my new business Parsec Digital's website over the past few weeks. I hope to get this site launched soon so I can begin working on other things!

Anyway, if you've already read my [timeline](https://daveberning.io/timeline), you'll know that I just recently started working at Drees Homes! At Drees, we have a big application that myself and the team have been working on since I've started. It's an AngularJS application that essentially provides marketers with tools to create a home from start to finish; it's pretty cool. You may also know that this is my first introduction to Angular and [web applications](https://daveberning.io/entering-the-exciting-world-web-applications) in general and I have to say, it's much more interesting!

The past few weeks, I've been struggling with Angular, I have to admit. It's a challenge, yes but challenge is good in this field. You have to constantly evolve and grow as a developer in order to stay relevant and employable. So, this past week I decided to start a new project to get better acquainted with Angular. I _love_ science so instead of mindlessly reading documentation, I decided to make learning more interesting by creating The Periodic Table of Elements (PToE).

## The UI

This application will have a simple UI (as everything should, am I right?). All you will see if the element's title in the top left, name and navigation arrows towards the bottom, and the PToE icon in the bottom right. In the center, will be an animating atom with the proper amount of electrons (organized by shell), protons, and neutrons. By clicking the navigation arrows towards the bottom, you can flip through elements in order or choose a specific one via the PToE icon in the bottom right.

Eventually, I'd like to have a fly-out with additional information about each element but that'll come at a later date.

## The Progress So Far

As of today, I have a factory that is fetching and process data from a [JSON file](https://github.com/diniska/chemistry/blob/master/PeriodicalTable/periodicTable.json). The JSON file I'm using as all the elements grouped up in groups. So, in my controller, I had to iterate each group and push every element within each group to a single general array. This way, I can just grab an element by it's index in one array.

Right now, the bare bones of the application is working. From Hydrogen (H-1), I can navigate to Helium (He-2), Lithium (Li-3), Beryllium (Be-4), and back. I also have 15px wide colored circles that represent the amount of quarks (sub-atomic particles) an atom has. For just a few hours of work it's quite impressive I think!

## Next Steps

I have all the data returning and the navigation working which is half of the Angular battle. Next, I plan to separate the electrons into certain groups based of the electrons in each shell or electron orbit. From there, I need to create a CSS animated atom with electrons actually orbiting the nucleus. It a fun project and if you want to learn a new technology, find something that interests you and just create something! Don't forget to [check out the repo]() if you want to keep up with my progress.
