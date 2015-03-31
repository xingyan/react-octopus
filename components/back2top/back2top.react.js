/**
 * @file 回到顶部
 * @type {exports}
 */

var React = require('react');
var o = require('g-octopus');

var Back2Top = React.createClass({

    /**
     * @desc 缺省参数
     * @property defaultConfig
     */
    getDefaultProps: function() {
        return {
            animation : true,
            isFast : false,
            count : 0,
            scrollTimer: null,
            loop : null,
            isAbsolute : false,
            isScroll: false,
            customize: false,
            testFixed: false,
            testFixableDom: null,
            id : 'toTop',
            width : '50px',
            height : '50px',
            bottom : '10px',
            offsetV : '10px',
            direction : 'right',
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
        if(!this.active)    return;
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
     * @desc 滚动事件处理函数
     */
    handleScroll : function (e) {
        this.clearTimer();
        this.isFast && this.hide();
        this.props.scrollTimer = window.setTimeout(o.util.bind(this.checkIfVisible, this), 300);
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
     * @method octopus.Widget.Back2Top.goTo
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
            'z-index' : '999',
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

module.exports = Back2Top;