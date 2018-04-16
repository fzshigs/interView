####[redux]('https://blog.csdn.net/u013510838/article/details/75579405')
1 redux使用步骤
React仅仅是一个前端View框架库，可以看做是MVC里面的V。没有解决组件间通信，MVC分离，数据共享等问题。Redux的出现使得这些都不是问题。使用Redux也比较简单，步骤大概如下

编写React Component，这里不涉及Redux
编写reducer，它接收一个state和action，返回一个新的state
createStore(reducer) 得到store对象，它是Redux的核心对象。包含的主要API如下 
getState(), 得到store中保存的state对象
dispatch(action), 发送action消息给store，它会调用reducer更新state，并回调subscribe的监听器
subcribe(listener), 注册监听器，dispatch触发时会回调
编写React Component中的事件回调，比如onClick。使用store.dispatch(action)发送消息，reducer此时会得到调用，更新state。
2 createStore()源码分析
   调用reducer更新state
   回调subscribe注册的listeners
3 React-redux 使用步骤
    编写UI组件，也就是React Component。这部分和Redux无关

    编写mapStateToProps, mapDispatchToProps,然后connect(mapStateToProps, mapDispatchToProps)(UI组件)来生成容器组件。容器组件包含了UI，数据和逻辑。

    编写reducers，完成控制逻辑。这部分和只是用Redux相同

    应用顶层做整合

    createStore(reducers) 生成store

    使用Provider包装顶层组件，如下

    ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')
    );
4 connect源码分析
   mapStateToProps，mapDispatchToProps，最终会经过selectorFactory，与React组件本身的props进行合并。
    mapStateToProps注册了subscribe，这样每次dispatch时，回调完reducer后，就会调用mapStateToProps，将新的state传递过来。此时再将state合并到组件的props上，会引起props的改变，从而触发一次forceUpdate，从而自动刷新view
    connect方法对React组件进行了包装，返回一个容器型组件。