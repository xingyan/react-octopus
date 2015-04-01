/**
 * @file 回到顶部
 * @type {exports}
 */

var React = require('react');
var o = require('g-octopus');

var Back2top = React.createClass({

    /**
     * @desc 缺省参数
     * @property defaultConfig
     */
    getDefaultProps: function() {
        return {
            /*
             *  @desc 是否有动画
             *  @type {Boolean}
             * */
            animation : true,
            /*
             *  @desc 滚动中是否隐藏
             *  @type {Boolean}
             * */
            isFast : false,
            /*
             *  @desc 动画计数
             *  @type {Number}
             * */
            count : 0,
            /*
             *  @desc 用来优化性能的scroll时的定时器
             *  @type {Number}
             * */
            scrollTimer: null,
            /*
             *  @desc 动画的内存寻址
             *  @type {Object}
             * */
            loop : null,
            /*
             *  @desc 某些机器不支持fixed属性 用absolute代替
             *  @type {Boolean}
             * */
            isAbsolute : false,
            /*
             *  @desc 当前是否在scroll的标志位
             *  @type {Boolean}
             * */
            isScroll: false,
            /*
             *  @desc 是否用户自定义点击事件
             *  @type {Boolean}
             * */
            customize: false,
            /*
             *  @desc 是否测试过是否支持fixed属性
             *  @type {Boolean}
             * */
            testFixed: false,
            /*
             *  @desc 用来判断设备是否支持fixed的节点
             *  @type {DOMElement}
             * */
//                testFixableDom: null,
            /*
             *  @desc 节点ID
             *  @type {String}
             * */
            id : 'toTop',
            /*
             *  @desc 样式宽度
             *  @type {String}
             * */
            width : '50px',
            /*
             *  @desc 样式高度
             *  @type {String}
             * */
            height : '50px',
            /*
             *  @desc 样式底部距离
             *  @type {String}
             * */
            bottom : '10px',
            /*
             *  @desc 样式侧面距离
             *  @type {String}
             * */
            offsetV : '10px',
            /*
             *  @desc 控件在左侧还是右侧 默认右侧 "right" || "left"
             *  @type {String}
             * */
            direction : 'right',
            /*
             *  @desc 样式背景参数，支持设置图片背景样式，例如 'url("../img/skin_dark_dc373b68.png") no-repeat -688px -406px'
             *  @type {String}
             * */
            background : 'rgba(0, 0, 0, .8)'
        }
    },

    /**
     * @desc 状态机初态
     * @property initConfig
     */
    getInitialState: function () {
        return {
            visible : false
        }
    },

    /**
     * @desc 设置参数
     * @property initConfig
     */
    componentDidMount: function() {
        if(this.props.data){
            this.props.id = this.props.data.id || 'toTop';
            this.props.width = this.props.data.width || '50px';
            this.props.height = this.props.data.height || '50px';
            this.props.bottom = this.props.data.bottom || '10px';
            this.props.offsetV = this.props.data.offsetV || '10px';
            this.props.direction = this.props.data.direction || 'right';
            this.props.background = this.props.data.background || 'rgba(0, 0, 0, .8)';
        }
        //o.dom.addClass(this.el, "octopusui-back2top");
        this.props.loop = {};
        this.initFixed();
        window.addEventListener('scroll', this.handleScroll);
    },

    /**
     * @desc 解绑监听，避免内存泄露
     * @property unbind event with react method
     */
    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    /**
     * @private
     * @method initFixed
     * @desc 初始化fix属性 让其兼容所有浏览器
     */
    initFixed: function() {
        if(/M031/.test(navigator.userAgent)) {
            this.setAbsolute();
        }
    },

    /**
     * @private
     * @method setAbsolute
     * @desc 将不支持fixed的节点设置为absolute
     */
    setAbsolute: function() {
        this.props.isAbsolute = true;
        o.event.on(window, "ortchange", o.util.bind(this.onOrientationChanged, this));
    },

    /**
     * @private
     * @method testFixable
     * @desc 判断当前设备是否支持fixed属性
     */
    testFixable: function() {
        var element = document.createElement('div');
        if('position' in element.style){
            element.style['position'] = 'fixed';
            if(element.style['position'] !== 'fixed')this.setAbsolute();
        }
    },

    /**
     * @private
     * @method onOrientationChanged
     */
    onOrientationChanged: function() {
        this.startFixed();
    },

    /**
     * @private
     * @method startFixed
     * @desc 当设备不支持fixed时用absolute的滚动
     */
    startFixed: function() {
//            if(!this.active)    return;
        var direction = this.direction == "right" ? "left" : "right";
        o.dom.setStyles(this.el, {
            top: window.pageYOffset + window.innerHeight - parseInt(this.getHeight()) - this.bottom + "px"
        });
        this.el.style[direction] = document.body.offsetWidth - parseInt(this.getWidth()) - this.offsetV + "px";
    },

    /**
     * @private
     * @method clearTimer
     */
    clearTimer: function() {
        if(this.props.scrollTimer) {
            window.clearTimeout(this.props.scrollTimer);
            this.props.scrollTimer = null;
        }
    },

    /**
     * @private
     * @desc 设置状态机当前模式：显示
     */
    show : function () {
        this.setState({
            visible : true
        })
    },

    /**
     * @private
     * @desc 设置状态机当前模式：隐藏
     */
    hide : function () {
        this.setState({
            visible : false
        })
    },

    /**
     * @private
     * @method checkIfVisible
     */
    checkIfVisible: function() {
        window.pageYOffset > document.documentElement.clientHeight ? this.show() : this.hide()
    },

    /**
     * @private
     * @method onScrollStop
     */
    onScrollStop: function() {
        this.props.isAbsolute && this.startFixed();
        !this.props.testFixed && this.testFixable();
        this.checkIfVisible();
    },

    /**
     * @private
     * @desc 滚动事件处理函数
     */
    handleScroll : function (e) {
        this.clearTimer();
        this.isFast && this.hide();
        this.props.scrollTimer = window.setTimeout(o.util.bind(this.onScrollStop, this), 300);
    },

    /**
     * @private
     * @desc 执行组件功能：回到顶部
     */
    _run : function () {
        this.onTap();
    },

    /**
     * @private
     * @method onTap
     */
    onTap: function(e) {
        //this.notify("back2top-ontap", e);
        !this.customize && this.goTo(1, this.props.animation);
    },

    /**
     * @public
     * @method octopus.Widget.Back2top.goTo
     * @param y {Number}
     * @param animation {Boolean}
     * @desc 使页面滚到指定位置
     */
    goTo: function(y, animation) {
        if(!animation) {
            window.scrollTo(0, y);
        } else {
            var _y = window.pageYOffset;
            this.props.count = 0;
            var that = this;
            ++this.props.count;
            this.props.loop[this.props.count] = function() {
                if(that.props.loop[that.props.count]) {
                    if (_y > (y - 1)) {
                        window.scrollBy(0, -Math.min(150, _y - y + 1));
                        _y -= 150;
                        o.util.requestAnimation(that.props.loop[that.props.count]);
                    } else {
                        that.props.loop[that.props.count] = null;
                    }
                } else {
                    that.props.loop[that.props.count] = null;
                }
            };
            o.util.requestAnimation(this.props.loop[this.props.count]);
        }
    },

    /**
     * @return {object}
     */
    render : function () {
        var componentStyle = {
            'position' : 'fixed',
            'zIndex' : '999',
            'cursor' : 'pointer',
            'display' : this.state.visible? 'block': 'none',
            'width' : this.props.width,
            'height' : this.props.height,
            'background' : this.props.background
        };
        if(!this.props.isAbsolute){
            this.props.direction === 'left' ? componentStyle['left'] = this.props.offsetV : componentStyle['right'] = this.props.offsetV;
            componentStyle['bottom'] = this.props.bottom;
        }else{
            componentStyle['position'] = 'absolute';
        }
        return (
            <div className="octopusui-back2top" style={ componentStyle } id={ this.props.id } onClick={ this._run }></div>
        );
    }
});


module.exports = Back2top;