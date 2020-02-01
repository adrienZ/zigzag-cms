---
layout: projects
title: Time-saving CSS techniques to create responsive images
date: 2020-02-01T19:44:48.245Z
---
#### As a web developer, there is a high probability that you have encountered the two enemies of this article: images and deadlines. Sometimes, for some reasons, your images won’t fit the layout and you don’t want to wrap your head around this for hours.

##### This situation has happened to me many times and I have learned from my mistakes. No more black magic hacks — here are my five favorites techniques to handle image resizing.

### the “OMG I NEED THIS ASAP” way

It’s 5:00 pm on Friday, you have to finish this page, but the images won’t fit the layout. It’s time to use your magic trick!

```css
.myImg {
  background-image: url("my-image.png");
  background-size: cover;
}
```

Sounds familiar? We’ve all done it once, doesn’t it feel like cheating to you?

Using `background` properties is very useful, they just work. Yet, remember that you should use them only for non-content images or as a replacement of text and in [some particular cases](https://stackoverflow.com/a/1469139).

### The way from the future

What if I told you this kind of magic exists also for `<img>` elements? Say “hi” to the object-fit property — which also works for videos, by the way!

```css
.myImg {
  object-fit: cover;
  width: 320px;
  height: 180px;
}
```

That’s all folks! See how when we retrieve the friendly value `cover`, we can also use `contain`.

### Okay what’s the trap?

Unfortunately object-fit will not work on IE and older versions of Safari, but there is a [polyfill](https://github.com/fregante/object-fit-images).

![](/api/medias/1_d0wZwFpXGiAYH9_NrJCroA.png "https://github.com/fregante/object-fit-images")

<iframe id="cp_embed_VBQJYg" src="https://codepen.io/adri_zag/embed/preview/VBQJYg?height=300&amp;slug-hash=VBQJYg&amp;default-tabs=html,result&amp;host=https://codepen.io" title="Responsive images #2" scrolling="no" frameborder="0" height="300" allowtransparency="true" class="cp_embed_iframe" style="width: 100%; overflow: hidden;"></iframe>

### The “Netflix” way

You may think “nice trick man, one more way that doesn’t work in old browsers like IE ?”. Don’t worry, this one works everywhere and it is my favorite! You’ll need to wrap your image with a relative padded parent.

We will keep the image ratio with a percentage on the `padding` property. Your image will be a full size absolute child.

The code looks like this:

```css
.wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
}
``
```

![](/api/medias/1_rTrhAIVolZR2oQh2ou1jXg.png "Take a look at the class names !")
