---
layout: post
title:  "My Take on the Big Three: React, Angular, and Vue"
date:   2017-05-27 00:14:54 -0400
author: Dave Berning
seo:
    name: My Take on the Big Three
    type: BlogPosting
    author: Dave Berning
    publisher: Dave Berning
    image: seo.jpg
backgroundImage: seo.jpg
---

<div class="row">
    <div class="col-sm-4">
        <a href="#react"><img src="https://daveberning.io/images/react-logo.svg" alt="ReactJS Logo" class="img-responsive"></a>
    </div>
    <div class="col-sm-4">
        <a href="#angular"><img src="https://daveberning.io/images/angular-logo.png" alt="Angular Logo" class="img-responsive"></a>
    </div>
    <div class="col-sm-4">
        <a href="#vue"><img src="https://daveberning.io/images/vue-logo.png" alt="VueJS Logo" class="img-responsive"></a>
    </div>
</div>

[As I mentioned before](https://daveberning.io/entering-the-exciting-world-web-applications), it really is a great time to be a web developer. The gap between web development and mobile app development has never been smaller thanks in part to javascript frameworks. [There are so many front-end frameworks out there](https://colorlib.com/wp/javascript-frameworks/), it can be a bit overwhelming at first. Out of the many frameworks and libraries, these three stand out; React, Angular, and Vue.

I recently started working with these frameworks in web applications a few months back. I hope this comparison is useful to those eager to step outside their comfort zone but not sure where to start.

## My Past Experience With Frameworks

Just so you understand where I am coming from, I started working on web applications using AngularJS (Angular 1). When I started my current job, my employer was using AngularJS for their modern web apps. So, I didn’t have much of a choice in choosing a framework initially.

A lot of my time outside of work was spent researching and getting caught up with AngularJS. So at the end of the day, I become an AngularJS developer. However, there are many that I wanted evaluate before just committing to what I know; especially for freelance projects. With the recent release of Angular (Angular 2), I thought this was a great opportunity to reevaluate my primary framework of choice. More on that specifically in a bit.

> With the recent release of Angular (Angular 2), I thought this was a great opportunity to reevaluate my primary framework of choice.

## The Big Three: React, Angular, and Vue

The big three that have separated themselves from the rest of the pack are React, Angular, and Vue. React is a front-end library created by Facebook, Angular is a MVC framework created by Google, and Vue is a library created by [Evan You](http://evanyou.me/). All three are great and all do similar things, but there’s a lot of differences between the three.

<div id="#react"></div>

### React

As mentioned above, React is a UI library created by Facebook and Instagram in 2013. React was built by the Facebook team in order to overcome unique front-end obstacles. Some popular sites that use React include, Facebook, Instagram, CodeAcademy, and Airbnb, [to name a few](https://github.com/facebook/react/wiki/sites-using-react).

React utilizes a Virtual DOM which is what makes React so quick and popular. React does not directly modify the DOM directly. It instead modified a Virtual DOM that then evaluates what has changed, _then_ updates the actual DOM. This is done so that the DOM doesn’t have to re-render each time a small or large change was made.

> React utilizes a Virtual DOM which is what makes React so quick. React does not directly modify the DOM directly.

React also uses a component based model. Similar to web components, a component in React generally has HTML (as JSX), JS, and CSS all in one file or chunk of code. React components are generally written in a JS file. There is no traditional HTML file with a clear separation between the view and logic; each component is in one JS file.

#### React: Pros and Cons

{:.table .table-bordered .table-striped}
| Pros                                        | Cons                                                       |
|---------------------------------------------|------------------------------------------------------------|
| Utilizes Virtual DOM                        | No clear separation between HTML, CSS, and JS              |
| Lightweight                                 | Setting up a development environment is long and difficult |
| Fast                                        | No MVC framework out of the box                            |
| Backed by Facebook                          | No routers or module management                            |
| Open Source                                 | Fairly steep learning curve                                |
| Great Open Source Community on GitHub       | Bad documentation                                          |
| Create native mobile apps with React Native |                                                            |
| UI automatically updates when data changes  |                                                            |

#### Summarize

To summarize, React is a great UI library that is easier to learn than Angular. There's a lot that it can do for the view out of the box but that's about it; it isn't a fully fledged MVC framework.

With that said, it is extremely popular with over 67k starts on [GitHub](https://github.com/facebook/react) proving that. The open source community is very active and you should be able to find other plugins that makeup for what it lacks. Something that React has over it's competitors is native mobile application support with [React Native](https://github.com/facebook/react-native).

__NOTE:__ Facebook [recently announced](https://techcrunch.com/2017/04/18/facebook-announces-react-fiber-a-rewrite-of-its-react-framework/) React Fiber; a rewrite of React.

<div id="#angular"></div>

### Angular

Angular is a fully fledged front-end MVC framework created by Google in 2010. Like Facebook, Google created Angular to solve various problems that were not done easily at the time. For a few years, AngularJS (Angular 1) was the king of frameworks. It was overwhelmingly popular a few years ago but has since dropped in popularity and adoption rate over the past few years.

This drop (along with React's component based approach) prompted Google to completely rewrite it's already popular framework to...wait for it...Angular (Angular 2+). Despite sharing the same name, __AngularJS and Angular are really two completely different frameworks__. Honestly, Google should have rebranded Angular to something else and ditch AngularJS entirely.

__NOTE:__ Angular 1 is referred to as [AngularJS](https://angularjs.org/) while Angular 2+ is referred to as just [Angular](https://angular.io).

AngularJS has things called scopes, factories, controllers, directives. Your view, controller and factory logic are clearly separated and data is traversed in a classic MVC like fashion. Or in AngularJS' case, FVM (factory, view, controller).

Angular on the other hand is more component driven like it's counter part, React. Angular was rewritten in this component mode to compete with React but tries to maintain it's full framework status as before. The logic written for your Angular application is done using [Typescript](https://www.typescriptlang.org/); a superset of JS created by Microsoft. Typescript resembles that of traditional back-end programming languages like Java. I could write another article on Typescript alone.

#### Angular: Pros and Cons

{:.table .table-bordered .table-striped}
 | Pros                                                    | Cons                                                                         |
 |---------------------------------------------------------|------------------------------------------------------------------------------|
 | Backed by Google                                        | Confusion...is it Angular 1 or Angular 2? Oh, it's AngularJS and Angular.... |
 | MVC framework out of the box (AngularJS/Angular)        | Overkill for smaller applications (AngularJS/Angular)                        |
 | Two-way data binding (AngularJS/Angular)                | Setting up a development environment is long and very difficult (Angular)    |
 | DOM manipulation (AngularJS/Angular)                    | Dropped in popularity (AngularJS/Angular)                                    |
 | Clear separation of HTML, CSS, and JS (Angular)         | Lost in developer's trust                                                    |
 | Open Source (AngularJS/Angular)                         | Very steep learning curve (AngularJS/Angular)                                |
 | Decent Community on GitHub (AngularJS/Angular)          | Bad documentation (AngularJS/Angular)                                        |
 | One framework for web and native applications (Angular) | Lack of native mobile support (AngularJS)                                    |
 | Very fast and efficient (Angular)                       | Very slow and large in size (Angular)                                        |
 | Usage of Typescript (Angular)                           | Usage of Typescript (Angular)                                                |
 | Very robust                                             | Skipped version 3 and went straight to 4. Adds to the confusion. (Angular)   |
 | Back-end developer friendly                             | Intimidating for front-end developers (AngularJS/Angular)                    |
 | Unit test friendly                                      | AngularJS support; moving towards Angular                                    |

#### Summarize

Angular is a great, robust, and mature framework that is great for large scale applications. Angular's two-way data binding is a huge advantage over it's competitors. Angular is also great for native development as it's described as "one framework" for mobile and desktop.

With that said, the popularity and reputation of Angular has dropped significantly over the last few years. Google has managed to lose a lot of developer's trust during the rewrite. A lot of people are hesitant to move to Angular from AngularJS or move to React or Vue entirely; and for good reason.

> Google has managed to lose a lot of developer's trust during the rewrite. A lot of people are hesitant to move to Angular from AngularJS or move to React or Vue entirely; and for good reason.

All those companies that created applications in AngularJS are forced to either convert or move. Which is a shame because each one of those applications where "cutting edge" and now are outdated.

Google has said however, that they'll continue to support AngularJS with security updates until 50% or more of applications are converted over to Angular. However, I personally do not see that happening. I don't think it'll take off like AngularJS did. The rewrite left a poor taste in many developer's mouths.

<div id="#vue"></div>

### Vue

VueJS is a newcomer to the fight. It was created by ex-Google employee, [Evan You](https://github.com/yyx990803). It's the fastest growing framework out there and even surpassing React! It's been around since 2015 and already as over _54k stars_ on [GitHub](https://github.com/vuejs/vue)!

Vue continues to push the framework competition forward with it's recent release of version 2 (not a rewrite). Vue is progressive and "just makes sense". The learning curve is shallow compared to React and Angular and the setup is easy with the official Vue CLI. It's also gained a lot of momentum over the past year with sites like [Grammerly](https://www.grammarly.com/) using it.

#### Best of Both
Vue has been described as the perfect combination of React and Angular. Vue takes all the successful parts of each framework and then some.

Vue has the same component based approach as React, while clearly separating view and controller logic like Angular. Vue has a Virtual DOM and (with the help of third parties) performs CRUD operations like Angular, so it's very scalable.

> Vue has been described as the perfect combination of React and Angular. Vue has the component based approach as React, while clearly separating view and controller logic like Angular

If you are coming from AngularJS, transitioning to Vue is much easier than if you were to switch to React. The best things from AngularJS like the ng-if, ng-repeat directives were brought over as v-if, v-repeat and so on.

Components are much easier to manage in Vue as well. Languages aren't mushed together like React/JSX and components aren't stretched across several files as is the case with AngularJS.

__Simplified Vue Component__

There's more to it but your standard Component.vue file is similar to something like this.

```HTML
<template>
    <p>Hello {{name}}</p>
</template>

<style lang="sass" scoped>
    p {
        color: black;
    }
</style>

<script>
    // Javascript or Typescript
</script>
```

#### Vue: Pros and Cons

{:.table .table-bordered .table-striped}
| Pros                                        | Cons                                         |
|---------------------------------------------|----------------------------------------------|
| Large open source community                 | Does not have the backing of a large company |
| Very active community                       | No native mobile support (yet)               |
| Setting up environment is easy              | Language barrier                             |
| Virtual DOM                                 | Smaller ecosystem                            |
| Lightweight                                 | Not used much in production (yet)            |
| Great performance -  fast                   |                                              |
| Two-way data binding                        |                                              |
| Separates HTML, CSS, JS                     |                                              |
| Fantastic documentation                     |                                              |
| Flexible - Can use Javascript or Typescript |                                              |


#### Summarize
In my experience, Vue is much simpler and easier to use. The development environment is much easier to setup compared to the other two, especially with their CLI. Vue is newer to the game with a fantastic open source community. It has surpassed React in popularity in the past year and the future continues to look bright.

The major downfall to Vue (which ultimately is preventing large companies from adopting it) is the lack of backing from a large company. React has Facebook and Angular has Google. Vue is managed by one person and a large open source community. The lack of a large corporation could be offsetting to some people; it was for me initially. However, I would argue that you should not steer away from it completely.

If you want to know more about Vue, I highly recommend [Sarah Drasner's CSS-Tricks series](https://css-tricks.com/intro-to-vue-1-rendering-directives-events/).

## So, Which Framework Did I Choose?

If you follow me on [Twitter](https://twitter.com/daveberning) you'll know that I recently have been considering switching from AngularJS to a new framework. My co-worker and I had some reservations with Angular as a whole and wanted to reevaluate our options. This conversation at work really prompted me to write this article. As posted on Twitter, I said I would write and post about it and reveal the framework I decided on.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I already made my decision. I&#39;ll write a blog post comparing the big three: <a href="https://twitter.com/hashtag/React?src=hash">#React</a> <a href="https://twitter.com/hashtag/Angular?src=hash">#Angular</a> and <a href="https://twitter.com/hashtag/Vue?src=hash">#Vue</a>. I&#39;ll also share why I went with _____.</p>&mdash; Dave Berning (@daveberning) <a href="https://twitter.com/daveberning/status/868159584506195968">May 26, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So...after hours of research, setting up environments, and playing around with each...I decided to make the switch to Vue. Sorry, various Angular Twitter profiles that retweeted and liked my tweet.

<div class="row">
    <div class="col-sm-6 col-sm-3">
        <img src="https://daveberning.io/images/vue-logo.png" alt="VueJS Logo" class="img-responsive">
    </div>
</div>

If you enjoyed this article, please share and comment below. I want to hear what you think. Did I make the right decision?
