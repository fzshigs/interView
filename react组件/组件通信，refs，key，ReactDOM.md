('https://blog.csdn.net/u013510838/article/details/60744715')
1 组件间通信
  父组件向子组件通信
    利用props将数据从父组件传递给子组件
  子组件向父组件通信
    父组件利用props传递方法给子组件，子组件回调这个方法的同时，将数据传递进去，使得父组件的相关方法得到回调，这个时候就可以把数据从子组件传递给父组件了
    class Parent extends React.Component {
        handleChildMsg(msg) {
            // 父组件处理消息
            console.log("parent: " + msg);
        }

        render() {
            return (
            <div>
                <Child transferMsg = {msg => this.handleChildMsg(msg)} />
            </div>
            );
        }
        }

        class Child extends React.Component {
        componentDidMount() {
            // 子组件中调用父组件的方法，将数据以参数的方式传递给父组件，这样父组件方法就得到回调了，也收到数据了
            this.props.transferMsg("child has mounted");
        }

        render() {
            return (
            <div>child</div>
            )
        }
        }
  兄弟组件通信 — 发布/订阅
     兄弟组件可以利用父组件进行中转
     利用观察者模式来解决这个问题。观察者模式采用发布/订阅的方法，可以将消息发送者和接收者完美解耦。React中可以引入eventProxy模块，利用eventProxy.trigger()方法发布消息，eventProxy.on()方法监听并接收消息
  嵌套层级深组件 — context
     使用context全局变量。使用方法：

        祖父组件中定义getChildContext()方法，将要传递给孙子的数据放在其中
        祖父组件中childContextTypes申明要传递的数据类型
        孙子组件中contextTypes申明可以接收的数据类型
        孙子组件通过this.context访问祖父传递进来的数据。
2 refs
   在getRender()返回的JSX中，可以在标签中加入ref属性，然后通过refs.ref就可以访问到我们的Component了
      componentDidMount() {
            // 通过refs可以拿到子元素,然后就可以访问到子元素的方法了
            let child = this.refs.child;
            child.test();
        }
   attachRef 将子组件引用保存到父组件refs对象中
      mountComponent中，如果element的ref属性不为空，则会以transaction事务的方式调用attachRefs方法，而attachRefs方法中则会调用attachRef方法，将子组件的引用保存到父组件的refs对象中。
   detachRef 从父组件refs对象中删除子组件引用
      unmountComponent会调用detachRefs方法，而detachRefs中则会调用detachRef，从而将子元素引用从refs中释放掉，防止内存泄漏。也就是说在unmountComponent时，React自动帮我们完成了子元素ref删除，防止内存泄漏。
3 key
   对于数组，其内部包含长度不确定的子项。当组件state变化时，需要重新渲染组件。那么有个问题来了，React是更新组件，还是先销毁再新建组件呢。key就是用来解决这个问题的。如果前后两次key不变，则只需要更新，否则先销毁再更新。
   对于子项的key，必须是唯一不重复的。并且尽量传不变的属性，千万不要传无意义的index或者随机值。这样才能尽量以更新的方式来重新渲染
4 无状态组件
   无状态组件其实本质上就是一个函数，传入props即可，没有state，也没有生命周期方法。组件本身对应的就是render方法。例子如下

    function Title({color = 'red', text = '标题'}) {
    let style = {
        'color': color
    }
    return (
        <div style = {style}>{text}</div>
    )
    }
5 React DOM
    React通过findDOMNode()可以找到组件实例对应的DOM节点，但需要注意的是，我们只能在render()之后，也就是componentDidMount()和componentDidUpdate()中调用
    React不建议我们碰底层的DOM，因为React有一套性能比较高的DOM diff方式来更新真实DOM。并且容易导致DOM引用忘记释放等内存泄漏问题 除非不得已，不要碰DOM
