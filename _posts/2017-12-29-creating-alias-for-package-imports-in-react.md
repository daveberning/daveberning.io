---
title: Creating Alias' For Package Imports in React
layout: post
author: Dave Berning
backgroundImage: "/images/codepen-bkg.png"
date: 2017-12-29 00:00:00 +0000
seo:
  name: ''
  type: ''
  author: ''
  publisher: ''
  image: ''
---
The more I work in React, the more I love it. It's a very mature framework that is immensely popular. While working with the [Vue ](https://vuejs.org/)CLI, there was one thing that I really like and that was a default alias or the **src** directory. Having an alias for a commonly referenced directory eliminates fragile relative paths, cleaner code, and readability. Let's dive in.

## Importing Packages Without An Alias

Let's see how messy importing code without an alias is. Let's imagine that our component (SomeComponent.jsx) is nested deep within our directory structure. I want to be about to access a directory that is a few levels up...

    import React, { Component } from 'react';
    import AnotherComponent from './../../../../../components/anotherComponent/AnotherComponent';
    import ProfileImage from './../../../../../../assets/profile.jpg';
    
    class SomeComponent extends Component {
      render() {
        return (
          <div>
          	<img src={ProfileImage} alt="My profile image!" />
            <AnotherComponent />
          </div>
        );
      }
    }
    
    export default SomeComponent;

As you can see, the relative paths are ugly. But their also fragile. What if you update your directory structure? Physically moving a component up a level with all it's dependencies will break and ka-boom. Failed to compile...

## Importing Packages With An Alias

Let's look at packages with an alias. This is the end goal that we are going to reach.

    import React, { Component } from 'react';
    import AnotherComponent from '@/components/anotherComponent/AnotherComponent';
    import ProfileImage from '@/assets/profile.jpg';
    
    class SomeComponent extends Component {
      render() {
        return (
          <div>
          	<img src={ProfileImage} alt="My profile image!" />
            <AnotherComponent />
          </div>
        );
      }
    }
    
    export default SomeComponent;

See, isn't that a lot better? Our code is cleaner and since we are using absolute paths, our code isn't as fragile!

## That's Awesome But How Do I Do That?

First, I am assuming that you are using create-react-app, React's CLI. Second, you will need to open up your config/webpack.config.dev.js file.

Once opened...

1. Run: npm run eject 
2. Find the 'alias' object in your dev config file
3. Add the following code...

    '@': path.resolve('src'),

Your alias object should look something like this...

    alias: { 
      '@': path.resolve('src'),
      'react-native': 'react-native-web'
    },

I also like to add alias' to some commonly used node_modules as well. For my projects, I usually create an alias for [Bulma](), the Flexbox CSS framework.

    'bulma': path.resolve('node_modules/bulma/css/bulma.css')

So, in my components, I can just import it like any other package, stylesheet, image, or component.

    import Bulma from 'bulma';

If this helped you at all, please share and [follow me on Twitter]()!