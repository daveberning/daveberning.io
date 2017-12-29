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
The more I work in React, the more I love it. It's a very mature framework that is immensely popular. While working with the [Vue ](https://vuejs.org/)CLI, there was one thing that I _really_ liked; default alias for the **src** directory. Having an alias for a commonly referenced directory eliminates fragile relative paths, produces cleaner code, and is much easier to read. Let's dive in.

## Importing Packages Without An Alias

Let's see how messy importing code without an alias is. Let's imagine that our component (SomeComponent.jsx) is nested deep within our directory structure. I want to be able to access anotherComponent.jsx that is a few levels up...

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

As you can see, the relative paths are ugly. But they're also fragile. What if you update your directory structure? Physically moving a component up a level with all it's dependencies, will break and ka-boom. Failed to compile...

## Importing Packages With An Alias

Let's look at packages with an alias. This is the end goal.

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

First, I am assuming that you are using create-react-app, React's CLI. Second, you will need to open up your **config/webpack.config.dev.js** file.

Once opened...

1. Run: **npm run eject** 
2. Find the 'alias' object in your dev config file
3. Add the following code...

    '@': path.resolve('src'),

Your alias object should look something like this...

    alias: { 
      '@': path.resolve('src'),
      'react-native': 'react-native-web'
    },

I also like to add alias' to some commonly used node_modules as well. For my projects, I usually create an alias for [Bulma](https://bulma.io/), the Flexbox CSS framework. **Note**: your alias doesn't have to start with or a '@'; it be can anything you want.

    'bulma': path.resolve('node_modules/bulma/css/bulma.css')

So, in my components, I can just import it like any other package, stylesheet, image, or component.

    import Bulma from 'bulma';

If this helped you at all, please share and [follow me on Twitter](https://twitter.com/daveberning)!