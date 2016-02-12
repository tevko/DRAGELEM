![](http://vignette2.wikia.nocookie.net/uncyclopedia/images/b/b4/Count-chocula.jpeg/revision/latest?cb=20110419172355)

# DRAGELEM
A simple ES6 library that allows click/touch &amp; drag on dom elements

##TO USE

```
const myDraggableElem = Object.create(dragElem);

myDraggableElem.inint(`.my-selector`);
```

##Options

You can pass in an object with options.

```
const myDraggableElem = Object.create(dragElem);

myDraggableElem.init(`.my-selector`, {stay : true, accelerateHardware : true});
```


###stay
If set to true, the element will remain in place when released. If set to false the element will return to its original position when released.

###accelerateHardware
If set to true, the `will-change: transform;` css property will be applied to the element

###callBack
You can pass a callback function to fire after the element is released.

```
myDraggableElem.init(`.my-selector`, {callBack : function() { console.log(this) });
```

##Does it do the mobile things?
Yes. It does the mobile things.


##Try it out

http://codepen.io/tevko/pen/VeqNYZ?editors=0010
