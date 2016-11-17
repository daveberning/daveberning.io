---
layout: post
title:  "Making the Web Work For Everyone with LeftyRighty.js"
date:   2016-11-17 00:14:36 -0400
author: Dave Berning
seo:
    name: Making the Web Work For Everyone with LeftyRighty.js
    type: BlogPosting
    author: Dave Berning
    publisher: Dave Berning
    image: seo.jpg
backgroundImage: seo.jpg
---

I'm excited to share with you my latest project...[LeftyRighty.js](https://github.com/parsecdigital/LeftyRighty.js)! This has been in development for a few months now and I am finally ready to release it into the wild. This is my first JavaScript plugin. I plan on releasing regular updates to this. So, if you'd like to contribute, please fork and submit a pull request.

## What Does It Do?

I'm glad you asked. LeftyRighty is a JavaScript plugin developed to make the mobile web easier to use for everyone. This plugin was developed specifically for the physically impaired or handicapped. With phones getting larger (5.5") these days, reaching important elements on the webpage can be difficult to do with one hand.

> I'm glad you asked. LeftyRighty is a JavaScript plugin developed to make the mobile web easier to use for everyone. This plugin was developed specifically for the physically impaired or handicapped.

Look at these heat maps. The green areas are the comfortable areas that require no reach. The yellow areas require some reach and the red areas require a reach which can be difficult with one hand.

![Heat maps of thumb reach on mobile phones]({{site.imagesURL}}mobile-heatmap.png){:class="img-responsive"}

Imagine a CTA or a navigation icon that is on the opposite side of the phone. That hard to reach button would be very difficult to tap with one hand. But, what if they were flipped? That would make that CTA much easier to reach and tap with one hand.

## How Do I Use It?

Before I get into detail, please reference the [repo](https://github.com/parsecdigital/LeftyRighty.js) for more information located in the README.

LeftyRighty.js basically can perform one of three functions on a row; reverse the full row, flip the first and last items, or flip two specific items. You can also nest these row functions within one another; the parent can reverse the while row while the child can flip specific items, for example.

With that said, let's get into the tutorial.

### Usage
Connect your JavaScript and CSS dependancies and initialize.

```html
<link rel="stylesheet" href="css/lefty-righty.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="js/lefty-righty.min.js"></script>

<script>
    $('body').leftyrighty();
</script>
```

### HTML Structure
LeftyRighty was built with a grid format in mind. Meaning, for this to work, you'll need to code your website with rows and columns. LeftyRighty does support Bootstrap through the API.

#### Without Bootstrap (Default)
Basic row structure with LeftyRighty's .lr-item class.
```html
<div class="row">
    <div class="lr-item">
        Column 1
    </div>

    <div class="lr-item">
        Column 2
    </div>

    <div class="lr-item">
        Column 3
    </div>
</div>
```
#### With Bootstrap (via API option)
If you are using Bootstrap, you will need to initialize the plugin with the Bootstrap API call.
```html
<div class="row">
    <div class="col-sm-4">
        Column 1
    </div>

    <div class="col-sm-4">
        Column 2
    </div>

    <div class="col-sm-4">
        Column 3
    </div>
</div>

<script>
    $('body').leftyrighty({
        bootstrap: true // API call
    });
</script>
```

There are __three__ main core functions that LeftyRighty supports. These can be nested and mixed and matched for greater control.

1. Flip the entire row
2. Flip the first and last item of the row
3. Flip _two_ specific items in a row

These functions can be done by simply adding a class to the row or in the third case, an item.

##### Row Reverse
```html
<div class="row lr-reverse">
    <!-- columns -->
</div>
```

##### Flip First and Last Item
```html
<div class="row lr-first-last">
    <!-- columns -->
</div>
```


##### Flip Two Specific Items
Add the .lr-spec class to two items you want to flip on click.
```html
<div class="row">
    <div class="lr-item">
        Column 1
    </div>

    <div class="lr-item lr-spec">
        Column 2
    </div>

    <div class="lr-item">
        Column 3
    </div>

    <div class="lr-item">
        Column 4
    </div>

    <div class="lr-item lr-spec">
        Column 5
    </div>

    <div class="lr-item">
        Column 6
    </div>
</div>
```
That's pretty much it. There are various API options that you can specify in your initialization; things like showing a dialog box to select a hand, and specifying the website's default intended hand.

Full documentation is on its way but this is pretty much it. If you'd like to contribute, please fork and submit pull requests. Any contribution is greatly appreciated and will go a long way. Comment below your thoughts and share!
