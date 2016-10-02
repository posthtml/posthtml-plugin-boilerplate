'use strict';

module.exports = function () {
  return function posthtml_webp (tree) {
    tree.match({ tag: 'img' }, function (imgNode) {
      if(imgNode.skip) return imgNode;
      return getPicture(imgNode);
    });

    return tree;
  }
};

function getPicture(imgNode) {
  imgNode.skip = true;
  return {
    tag: 'picture',
    content: [
      {
        tag: 'source',
        attrs: {
          type: 'image/webp',
          srcset: imgNode.attrs.src + '.webp'
        }
      },
      imgNode
    ]
  };
}