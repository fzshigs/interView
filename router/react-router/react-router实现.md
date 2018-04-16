####1. react-router依赖基础 - history('https://segmentfault.com/a/1190000004527878')
>1.1 History整体介绍
history是一个独立的第三方js库，可以用来兼容在不同浏览器、不同环境下对历史记录的管理，拥有统一的API。具体来说里面的history分为三类:

老浏览器的history: 主要通过hash来实现，对应createHashHistory

高版本浏览器: 通过html5里面的history，对应createBrowserHistory

node环境下: 主要存储在memeory里面，对应createMemoryHistory
>1.2 内部解析
三个API的大致的技术实现如下:

createBrowserHistory: 利用HTML5里面的history

createHashHistory: 通过hash来存储在不同状态下的history信息

createMemoryHistory: 在内存中进行历史记录的存储

1.2.1 执行URL前进
createBrowserHistory: pushState、replaceState

createHashHistory: location.hash=*** location.replace()

createMemoryHistory: 在内存中进行历史记录的存储
>1.2.2 检测URL回退
createBrowserHistory: popstate

createHashHistory: hashchange

createMemoryHistory: 因为是在内存中操作，跟浏览器没有关系，不涉及UI层面的事情，所以可以直接进行历史信息的回退
>1.2.3 state的存储
为了维护state的状态，将其存储在sessionStorage里面:
###2. react-router的基本原理
>实现URL与UI界面的同步。其中在react-router中，URL对应Location对象，而UI是由react components来决定的，这样就转变成location与components之间的同步问题。
>3.1 组件层面描述实现过程
在react-router中最主要的component是Router RouterContext Link，history库起到了中间桥梁的作用
  进入history:state管理找到匹配的url和组件
  然后组建渲染实现url和ui的同步
>3.2 API层面描述实现过程
  组件点击得到新的nextLoction，朴实进sessionStorage里：saveState，原生操作history.pushState实现URl更新history出发react的updateLocation进入下一个路由
  callback回调进行路由匹配得到新的state匹配location，params，routes，component，
  render更新页面实url和ui同步
###优点可以总结如下:
风格: 与React融为一体,专为react量身打造，编码风格与react保持一致，例如路由的配置可以通过component来实现
简单: 不需要手工维护路由state，使代码变得简单
强大: 强大的路由管理机制，体现在如下方面
路由配置: 可以通过组件、配置对象来进行路由的配置
路由切换: 可以通过<Link> Redirect进行路由的切换
路由加载: 可以同步记载，也可以异步加载，这样就可以实现按需加载
使用方式: 不仅可以在浏览器端的使用，而且可以在服务器端的使用