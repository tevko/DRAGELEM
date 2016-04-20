![](http://vignette2.wikia.nocookie.net/uncyclopedia/images/b/b4/Count-chocula.jpeg/revision/latest?cb=20110419172355)

# DRAGELEM
A simple ES6 library that allows click/touch &amp; drag on dom elements. **541 bytes minified + gzipped.**

##TO USE

```
const myDraggableElem = Object.create(dragElem);

myDraggableElem.inint(`.my-selector`);
```

##Options

You can pass in a callback function.

```
const myDraggableElem = Object.create(dragElem);

myDraggableElem.init(`.my-selector`, e => {
  console.log(this, e);
});
```

##Does it do the mobile things?
Yes. It does the mobile things.


##Try it out

http://codepen.io/tevko/full/qZYwdG
