var _ = require('./util')

/**
 * Virtual-dom Element.
 * @param {String} tagName
 * @param {Object} props - 道具 - 元素的属性，
 *                       使用对象来存储键值对
 * @param {Array<Element|String>} - 此元素的子元素。
 *                                - 可以是元素实例或只是一段纯文本。
 */
function Element (tagName, props, children) {
  if (!(this instanceof Element)) {
    if (!_.isArray(children) && children != null) {
      children = _.slice(arguments, 2).filter(_.truthy)
    }
    return new Element(tagName, props, children)
  }

  if (_.isArray(props)) {
    children = props
    props = {}
  }

  this.tagName = tagName
  this.props = props || {}
  this.children = children || []
  this.key = props
    ? props.key
    : void 666

  var count = 0

  _.each(this.children, function (child, i) {
    if (child instanceof Element) {
      count += child.count
    } else {
      children[i] = '' + child
    }
    count++
  })

  this.count = count
}

/**
 *渲染保持元素树。
 */
Element.prototype.render = function () {
  var el = document.createElement(this.tagName)
  var props = this.props

  for (var propName in props) {
    var propValue = props[propName]
    _.setAttr(el, propName, propValue)
  }

  _.each(this.children, function (child) {
    var childEl = (child instanceof Element)
      ? child.render()
      : document.createTextNode(child)
    el.appendChild(childEl)
  })

  return el
}

module.exports = Element