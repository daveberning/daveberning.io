---
title: Creating Reusable Vue Components
layout: post
author: Dave Berning
date: 2017-06-24 22:38:21 +0000
seo:
  name: ''
  type: ''
  author: ''
  publisher: ''
  image: ''
backgroundImage: ''
---
There are a lot of articles out on the web that outline Vue and it’s nuances. Vue’s documentation is great, but there are numerous ways to create a component.

Let’s create a reusable component and use it as an XML tag.

#### App.vue

    <template>
      <custom-name></custom-name>
    </template>
    
    <script>
      import ComponentName from './components/ComponentName'
      export default {
        name: 'app'
        components: {
          'custom-name': ComponentName
        }
      }
    </script>

#### ./components/ComponentName.vue

    <template>
      <p>Hello, Medium</p>
    </template>
    
    <styles>
      /* CSS Here */
    </styles>
    
    <script>
      // JS Here
    </script>

It’s pretty simple actually. Just create your component, import it like any other Vue component and reference in your view.