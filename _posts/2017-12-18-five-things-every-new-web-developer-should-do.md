---
title: " Five Things Every New Web Developer Should Do"
layout: post
author: Dave Berning
date: 2017-08-19 18:36:37 -0400
seo:
  name: ''
  type: ''
  author: ''
  publisher: ''
  image: ''
backgroundImage: ''
---
Lately, I’ve been getting asked the same question by a lot of web developers that are just starting out: “What should I do next?” So, in a cliché post, here are _my_ five things every new web developer should be doing.

### 1. Start Marketing Yourself as a Web Developer

“What?! But I barely know how to code!” Yeah, I know. This may seem a bit abnormal if you’re just starting out but it’s true, all of it; you’re a web developer 🎉! One of the most productive ways to get the development ball rolling is networking and marketing yourself as web developer.

![](/han-solo.jpeg)

Spoilers…Han Solo dies

I cannot stress this enough; networking is crucial to your success. Web development is a growing industry every single year. Everyone and their mother knows someone that needs a website, a progressive web application, or a mobile application.

#### Anyone Can Be a Contact

Anyone can be a contact and a part of your network. Make business cards and carry them around. You’ll never know if a random officer of a courthouse is need of a website or knows someone in the industry….

Which I have to say, actually happend to me. My wife works at our county’s courthouse and was on her way to night court. My wife and the officer that was driving got caught up and a conversation and it turns out, his wife’s company desperately needed a website. My wife had my business cards handy and within a day, the company contacted me. So, now I have an exciting freelance job _and_ an additional person in my network.

Michael Hauge perfectly defines “networking” in his book, _Writing Screenplays That Sell_ as…“simply the process of meeting two people and having them each introduce you to two people who in turn each introduce you to two more.”

Every single job I’ve had in the industry has been the result of networking.

### 2. Start With the Basics

I recognize the cliché in this cliché post but again, it’s true. Start off with the basics — **HTML and CSS**. Every website on the World Wide Web contains some degree of HTML and CSS. These are the two most important building blocks of any website. There’s also JavaScript of course but we’ll get to that later.

![](/web-stack.png)

Notice “JavaScript” and not “jQuery”…we’ll get to that later

It’s important to know that without a good solid foundation in HTML and CSS, your website will become fragile, harder to maintain, and will _not_ age gracefully.

As HTML and CSS practices evolve, you will still need to code good HTML and CSS that is standard’s compliment and meaningful to the website that you’re working on. You should also know what clean and productive code looks like. You don’t want to pass your website along to another developer and have them say, “Wow…this code is awful. I need to refactor this entire website first!”

In short, the more HTML and CSS you know, the better.

### 3. Vanilla Script, Script, Baby!

If I were to start my career over again, I would not spend much time learning jQuery. Instead, I would learn vanilla JavaScript from the start. jQuery can become a crutch for many and admittedly, it was to me. It was very easy to just grab pre-written code and add it to my website. But when I took a step back, I never really learned _how_ to program anything for the web and that is a problem. To be fair, when I started back in 2011, jQuery was very much relevant and modern JavaScript frameworks like [Vue](https://vuejs.org/) and [React](https://facebook.github.io/react/) didn’t really take off yet.

> jQuery can become a crutch for many and admittedly, it was to me. It was very easy to just grab pre-written code and add it to my website. But when I took a step back, I never really learned _how_ to program anything for the web and that’s a problem.

Don’t get me wrong, plugins and libraries are great if they add something useful and common to your website like a carousel for example. You shouldn’t have to rewrite a carousel each time but jQuery shouldn’t be used for _everything_ like basic DOM manipulation. You can do something simple like adding a class to a <div> on click in vanilla without requiring an outdated dependency.

    // jQuery - Add a class
    $('.some-div').click(function() {
        $(this).addClass('new-class');
    });
    
    // Vanilla JavaScript - Add a class
    var someDiv = document.getElementByClassName('some-div');
    someDiv.onclick = function () {
        this.classList.add('new-class');
    };

#### If You Didn’t Know

Vanilla JS is just a nickname given to raw JavaScript. It [started out a joke](http://vanilla-js.com/) but it kind of stuck.

* VanillaJS === JavaScript
* jQuery !== JavaScript

### 4. Find Your “Hello World!”

I won’t delve too deep into this because [I’ve already covered it](https://medium.com/@daveberning/the-best-way-to-learn-a-new-framework-find-a-topic-youre-passionate-about-and-run-with-it-1f35a5fdf7d6). But the general idea is to find your own “Hello World!” tutorial. Following tutorials is a great way to get a general feel of a language or framework but these tutorials can become rehearsed, stale, and redundant.

Instead of echoing out “Hello World!” to a screen, how about creating something that’s meaningful to you and portfolio worthy? For me, I needed to learn AngularJS for work. So, in order to learn it, I created a small “[Periodic Table of Elements](http://parsecdigital.io/elements/#!/)” application that let’s the user navigate between the elements and animate them.

This project kept me interested enough and pushed me to get past to basics and gradually move towards more advanced techniques. After the project was done, I was all caught up with AngularJS and had a pretty cool portfolio piece to share.

Use this general idea as your own tutorial for other languages and frameworks that you’ll need to learn in the future.

### 5. Start Collaborating With Other Developers

One of the best ways to learn is by doing. Find a developer or a small group of developers and start working on a project. Each one of you may be at a different skill level and everyone has different _experiences_. Leverage each others skills and experience to better your own.

Some of the best times I’ve had while working was having “Coding Saturdays” and a small group of developers. All we did was just eat pizza, drink beer, and code; it was a blast and very beneficial. My very first Wordpress website was completed over a few, “Coding Saturdays”. In that process, I was able to learn PHP and Wordpress from a more experienced developer at the time.

### 6. BONUS: Get Engaged in the Online Development Community

Okay, so I lied there’s not five things you should be doing, there are _six_. I just thought this one (like the others) was important to “@ mention” (🥁). The web development community is rich and full of smart and helpful people. Smart and helpful people that want to share code, help solve problems, and get their name out there just like you.

Some of the ways that developers get involved is by posting solutions on [Stack Overflow](https://stackoverflow.com/), contributing to [GitHub](https://github.com/) repos, and engaging with others on [Twitter](https://twitter.com/).

---

#### **Who You Should Follow:**

* [Chris Coyier](https://twitter.com/chriscoyier)
* [Sarah Drasner](https://twitter.com/sarah_edo)
* [David Walsh](https://twitter.com/davidwalshblog)
* [Dave Rupert](https://twitter.com/davatron5000)
* [Paul Irish](https://twitter.com/paul_irish)
* [Dave Berning](https://twitter.com/daveberning) 😉

#### What You Should Read:

* [CSS Tricks](https://css-tricks.com/)
* [David Walsh’s Blog](https://davidwalsh.name/)
* [Alligator.io](https://alligator.io/)
* [Scotch.io](https://scotch.io/)

#### What You Should Listen To:

* [Shop Talk Show](http://shoptalkshow.com/)
* [The Big Web Show](http://5by5.tv/bigwebshow)
* [The Changelog](https://changelog.com/podcast)
* [JavaScript Jabber](https://devchat.tv/js-jabber)