# Mobile interactive ads

Another javascript POC ads for mobile I've wrote 2 years ago.
This lib use the Smartadserver MRAID javascript SDK.

Need to be refactored and improved :)

## Usage

#### Create your scene

You need to set the *window.scene* variable configuration.

```javascript
  window.scene = {
    config: {},
    template: {}
  };
```

This template can be overwritten with portrait or landscape version like this:

```javascript
  window.scene = {
    config: {},
    template: {},
    templatePortrait: {},
    templateLandscape: {}
  };
```

#### config

Your scene behavior and properties
* required
  * scene ID
  * min_height
* optional
  * title
  * max_height
  * resize
  * bg_color

#### template

Your scene html markup with required scaffold

```html
<div class="lmd-ads-scene state-first-half  lmd-ads-{scene_id}" id="lmd-ads-{scene_id}">
  <div class="lmd-ads-layer layer-bg"></div>
  <div class="lmd-ads-container lmd-ads-layer" id="lmd-ads-container-{scene_id}">
    <a class="lmd-ads-redirect" id="lmd-ads-redirect" href="" target="_blank"></a>
    ...
    <div class="lmd-ads-layer"></div>
    <div class="lmd-ads-layer"></div>
    <div class="lmd-ads-layer"></div>
    ...
  </div>
</div>
```

#### Available animation

Use class attribute and combine with data-x additionnal info to define some cool animations

* anim-slide (data-offset, data-speed, data-direction, data-slideto)
* anim-slideXY (data-offset, data-speed, data-speedY, data-direction, data-directionY)
* anim-scale (data-offset, data-speed)
* anim-rotation (data-speed)
* anim-fade-in (data-offset, data-speed)
* anim-fade-out (data-speed)
* anim-fade-inout  (data-center, data-width)
* anim-fade-easeinout (data-center, data-width)
* anim-fade-easeoutin (data-center, data-width)

#### MRAID bridge

* iOs:
```javascript
  <script src="mraid.js"></script>
```
* Android:
```javascript
  <script src="http://ak-ns.sascdn.com/diff/templates/js/mobile/mraid/bridges/android-sdk-mraid-bridge-2.1.js"></script>
```

## Scenes samples

#### Slider

```javascript
  {
   'scene1': {
    config: {
      scene: 'scene1',
      title: 'Land Rover Slider',
      min_height: 75,
      max_height: 75,
      resize: false,
      bg_color: '#000'
    },
    template: '<div class="lmd-ads-scene lmd-ads-scene1 state-first-half" id="lmd-ads-scene1">' +
      '<div class="lmd-ads-layer layer-bg anim-slide" data-speed="10" style="background-image: url(https://dl.dropboxusercontent.com/u/128437882/landrover.jpg)"></div>' +
      '<div class="lmd-ads-container lmd-ads-layer lmd-ads-layer-car" id="lmd-ads-container-scene1">' +
      '<a href="" class="lmd-ads-layer layer-fixed layer-link">Acc&eacute;dez</a>' +
      '<div class="lmd-ads-layer layer-car">' +
      '<img class="lmd-ads-layer layer-fixed layer-front-wheel anim-rotation" data-speed="30" src="http://i57.tinypic.com/160q7ug.png" />' +
      '<img class="lmd-ads-layer layer-fixed layer-back-wheel anim-rotation" data-speed="30" src="http://i57.tinypic.com/14cheuf.png" />' +
      '<img class="lmd-ads-layer layer-fixed layer-car-body" src="http://i60.tinypic.com/xofvao.png" />' +
      '</div>' +
      '</div>' +
      '</div>'
  }
```

#### Resize

```javascript
  {
    config: {
      scene: 'scene2',
      title: 'Chanel Resize',
      min_height: 50,
      max_height: 150,
      resize: true,
      bg_color: '#000'
    },
    template: '<div class="lmd-ads-scene lmd-ads-scene2 state-first-half" id="lmd-ads-scene2">' +
      '<div class="lmd-ads-layer layer-bg anim-fade-inout" data-center="0.5" data-width="2" style="background-image: url(http://i57.tinypic.com/29girmv.png)"></div>' +
      '<div class="lmd-ads-container lmd-ads-layer lmd-ads-layer-watch" id="lmd-ads-container-scene2">' +
      '<div class="lmd-ads-layer layer-fixed layer-watch-hands">' +
      '<img class="lmd-ads-layer layer-fixed layer-hand1 anim-rotation anim-fade-inout" data-center="0.5" data-width="2" data-speed="2" src="http://i58.tinypic.com/faps34.png" />' +
      '<img class="lmd-ads-layer layer-fixed layer-hand2 anim-rotation anim-fade-inout" data-center="0.5" data-width="2" data-speed="0.3" src="http://i60.tinypic.com/w2lzdh.png" />' +
      '<img class="lmd-ads-layer layer-fixed layer-hand3 anim-rotation anim-fade-inout" data-center="0.5" data-width="2" data-speed="0.05" src="http://i60.tinypic.com/t85b0g.png" />' +
      '</div>' +
      '<img class="lmd-ads-layer layer-fixed layer-txt" src="http://i62.tinypic.com/2wd2f60.png" />' +
      '</div>' +
      '</div>'
  }
```

#### Others

```javascript
  'scene3': {
    config: {
      scene: 'scene3',
      title: 'Sony Experia Parallax',
      min_height: 75,
      max_height: 200,
      resize: true,
      bg_color: '#000'
    },
    template: '<div class="lmd-ads-scene lmd-ads-scene3 state-first-half" id="lmd-ads-scene3">' +
      '<div class="lmd-ads-layer layer-bg" style="background-image: url(http://172.30.1.55/~rasoahaingo/03-PARALLAXE/ASSET/background_piscine@2x.png)"></div>' +
      '<div class="lmd-ads-container lmd-ads-layer lmd-ads-layer-phone" id="lmd-ads-container-scene3">' +
      '<img class="lmd-ads-layer layer-fixed layer-phone anim-fade anim-fade-easeinout" data-center="0.4"  src="http://172.30.1.55/~rasoahaingo/03-PARALLAXE/ASSET/mobile_xperia@2x.png" />' +
      '<img class="lmd-ads-layer layer-fixed layer-txt anim-fade anim-fade-easeinout" data-center="0.6"  src="http://172.30.1.55/~rasoahaingo/03-PARALLAXE/ASSET/logo_accroche@2x.png" />' +
      '</div>' +
      '</div>'
  },
  'scene4': {
    config: {
      scene: 'scene4',
      title: 'Land Rover Resize v2',
      min_height: 75,
      max_height: 75,
      resize: false,
      bg_color: '#000',
      max_frames: 630
    },
    template: '<div class="lmd-ads-scene lmd-ads-scene4" id="lmd-ads-scene4">' +
        '<div id="bg" class="lmd-ads-layer layer-bg anim-slide" data-direction="1"></div>' +
        '<div id="lmd-ads-container-scene4" class="lmd-ads-container lmd-ads-layer">' +
          '<a class="lmd-ads-redirect" id="lmd-ads-redirect" href="http://www.landrover.com/fr/fr/lr/?gclid=CMy16vvC8b4CFabItAodMVgAdA" target="_blank"></a>' +
          '<div id="logo" class="lmd-ads-layer" data-center="1"></div>' +
          '<div id="main-copy" class="lmd-ads-layer anim-fade anim-fade-out" data-speed="2"></div>' +
          '<div id="car" class="lmd-ads-layer anim-slide" data-speed="7" data-direction="1">' +
            '<div id="rwheel" class="wheel lmd-ads-layer anim-rotation" data-speed="15"></div>' +
            '<div id="fwheel" class="wheel lmd-ads-layer anim-rotation" data-speed="15"></div>' +
          '</div>' +
          '<button id="main-button" class="lmd-ads-layer anim-scale anim-fade anim-fade-in" data-speed="2">' +
            '<span id="btn-copy" class="lmd-ads-layer"></span>' +
            '<span id="arrow" class="lmd-ads-layer"></span>' +
          '</button>' +
        '</div>' +
      '</div>'
  },
  'scene4-ipad': {
    config: {
      scene: 'scene4-ipad',
      title: 'Land Rover Resize v2 iPad',
      min_height: 150,
      max_height: 150,
      resize: false,
      bg_color: '#000',
      max_frames: 630
    },
    template: '<div class="lmd-ads-scene lmd-ads-scene4-ipad" id="lmd-ads-scene4-ipad">' +
        '<div id="bg" class="lmd-ads-layer layer-bg anim-slide" data-direction="1" data-speed="2"></div>' +
        '<div id="lmd-ads-container-scene4-ipad" class="lmd-ads-container lmd-ads-layer">' +
          '<a class="lmd-ads-redirect" id="lmd-ads-redirect" href="http://www.landrover.com/fr/fr/lr/?gclid=CMy16vvC8b4CFabItAodMVgAdA" target="_blank"></a>' +
          '<div id="logo" class="lmd-ads-layer" data-center="1"></div>' +
          '<div id="main-copy" class="lmd-ads-layer anim-fade anim-fade-easeoutin" data-center="0.25" data-width="1"></div>' +
          '<div id="car" class="lmd-ads-layer anim-slide" data-speed="18" data-direction="1">' +
            '<div id="rwheel" class="wheel lmd-ads-layer anim-rotation" data-speed="30"></div>' +
            '<div id="fwheel" class="wheel lmd-ads-layer anim-rotation" data-speed="30"></div>' +
          '</div>' +
          '<button id="main-button" class="lmd-ads-layer anim-scale anim-fade anim-fade-in" data-speed="10" data-offset="50">' +
            '<span id="btn-copy" class="lmd-ads-layer"></span>' +
            '<span id="arrow" class="lmd-ads-layer"></span>' +
          '</button>' +
        '</div>' +
      '</div>'
  },
  'scene5': {
    config: {
      scene: 'scene5',
      title: 'Sony Experia Slider v2',
      min_height: 75,
      max_height: 75,
      resize: false,
      bg_color: '#000',
      max_frames: 630
    },
    template: '<div class="lmd-ads-scene lmd-ads-scene5" id="lmd-ads-scene5">' +
        '<div id="lmd-ads-container-scene5" class="lmd-ads-container lmd-ads-layer">' +
          '<a class="lmd-ads-redirect" id="lmd-ads-redirect" href="http://www.sony.com" target="_blank"></a>' +
          '<div id="crouching" class="lmd-ads-layer anim-fade anim-fade-out anim-slide" data-direction="-1" data-speed="8"></div>' +
          '<div id="flying" class="lmd-ads-layer anim-fade anim-fade-in anim-slideXY" data-slideto="300" data-direction="-1" data-directionY="1" data-speed="8" data-speedY="2"></div>' +
          '<div id="logo" class="lmd-ads-layer"></div>' +
          '<div id="cta" class="lmd-ads-layer anim-fade anim-fade-in anim-slide" data-slideto="200" data-offset="20" data-direction="-1" data-speed="6">' +
            '<span id="cta-copy" class="lmd-ads-layer"></span>' +
            '<span id="arrow" class="lmd-ads-layer"></span>' +
          '</div>' +
        '</div>' +
      '</div>'
  },
  'scene5-ipad': {
    config: {
      scene: 'scene5-ipad',
      title: 'Sony Experia Slider v2 iPad',
      min_height: 150,
      max_height: 150,
      resize: false,
      bg_color: '#000',
      max_frames: 100
    },
    template: '<div class="lmd-ads-scene lmd-ads-scene5-ipad" id="lmd-ads-scene5-ipad">' +
        '<div id="lmd-ads-container-scene5-ipad" class="lmd-ads-container lmd-ads-layer">' +
          '<a class="lmd-ads-redirect" id="lmd-ads-redirect" href="http://www.sony.com" target="_blank"></a>' +
          '<div id="crouching" class="lmd-ads-layer anim-fade anim-fade-out anim-slide" data-direction="-1" data-speed="8"></div>' +
          '<div id="flying" class="lmd-ads-layer anim-fade anim-fade-in anim-slideXY" data-slideto="800" data-direction="-1" data-directionY="1" data-speed="14" data-speedY="3.2"></div>' +
          '<div id="logo" class="lmd-ads-layer"></div>' +
          '<div id="cta" class="lmd-ads-layer anim-fade anim-fade-in anim-slide" data-slideto="700" data-offset="20" data-direction="-1" data-speed="7">' +
            '<span id="cta-copy" class="lmd-ads-layer"></span>' +
            '<span id="arrow" class="lmd-ads-layer"></span>' +
          '</div>' +
        '</div>' +
      '</div>'
  }
```

## Export

For maximum weight optimization just paste all css/js into the index.html like this:

```html
<html>
<head>
  <title>Sample</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  <meta name="msapplication-tap-highlight" content="no"/>
  <style>
    /* style.css */
  </style>
  <style>
    /* scene.css */
  </style>
</head>
<body>
  <div id="ads-in-content"></div>
  <script src="mraid.js"></script>
  <script>
  window.scene = {
    /* scene config */
  };
  </script>
  <script>
    /* script.js*/
  </script>
  <script>
  LMD_ADS.init();
  </script>
</body>
</html>
```

#### WARNING: images link must be relative

## Next step

* Add timer?
* Use specific data for each animation (e.g. data-speed -> data-speed-scale, data-speed-rotation, ...)
* Allow custom animation
* Create custom project with grunt/gulp that do the Export job