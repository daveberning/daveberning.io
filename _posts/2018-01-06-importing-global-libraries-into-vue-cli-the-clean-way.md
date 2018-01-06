---
title: Importing Global Libraries into Vue CLI (The Clean Way)
layout: post
author: Dave Berning
backgroundImage: "/_site/images/codepen-bkg.png"
date: 2018-01-06 00:00:00 +0000
seo:
  name: Importing Global Libraries into Vue CLI (The Clean Way)
  type: post
  author: Dave Berning
  publisher: ''
  image: ''
---
If you're working with the Vue CLI and you're trying to import global JS/CSS libraries you're not alone. Some [solutions](https://github.com/vuejs/vue-loader/issues/144) will tell you to just add the package with a require statement or an @import statement. That's fine but there is a time and a place to use the @import statement in [Vue](https://vuejs.org/) and importing a global CSS library isn't one of them. Instead, let's use an ES6 'import' statement. 

> ...\[T\]here is a time and a place to use the @import statement in Vue and importing a global CSS library isn't one of them.

## What We Will Be Importing

We will be importing [Bulma](https://bulma.io/), the up-and-coming Flexbox CSS framework. I won't get into too much detail about it here but it's all based on Flexbox. It's very easy to pick up and learn and requires less markup than Bootstrap.

## What We Will Be Doing

For this, we will be creating an alias for our Bulma dependency. This will be very familiar to you if you read my [other post](https://daveberning.io/creating-alias-for-package-imports-in-react) about creating an alias for a React dependency.

For this, I'm assuming that you already have the [Vue CLI](https://github.com/vuejs/vue-cli) installed. If not, it's easy to install. Just run **npm install -g vue-cli**, **vue init webpack my-project**, and follow the prompts.

### Creating the Alias

First, to add the dependency let's use run the follow NPM command:

    npm install bulma --save

After that is done, let's dive into our _build/webpack.dev.conf.js_ file and paste the following code right above the _module_ object.

    resolve: {
        extensions: ['.css'],
        alias: {
          'bulma': resolve('node_modules/bulma/css/bulma.css'),
        }
    }

**NOTE:** If you want to use the SCSS file, there are additional steps you should take prior to this article.

Now that your alias is created, let's import it into our _src/main.js_ file. Importing the dependency here will allow it to be used across the entire application.

    import bulma from 'bulma';

That's it! Really.

Granted, you could just add the relative path Bulma but this is much cleaner to read. Plus, you now how to create alias' in Webpack for Vue!

Thanks for reading. If this helped you at all, please share and [follow me on Twitter](https://twitter.com/daveberning)!