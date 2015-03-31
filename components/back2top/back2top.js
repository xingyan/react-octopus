/**
 * @file 回到顶部
 * @type {exports}
 */

var React = require('react');
var o = require('g-octopus');

var Back2Top = React.createClass({

    /**
     * @desc 默认参数
     * @property defaultConfig
     */
    getDefaultProps: function() {
        return {
            animation : true,
            isFast: false,
            id: 'top',
            direction: "right",
            windowHeight: window.innerHeight,
            count : 0,
            loop : {}
        }
    },

    handleResize: function(e) {
        this.setState({windowHeight: window.innerHeight});
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },


    /**
     * @private
     * @method onTap
     */
    onTap: function(e) {
//            this.notify("back2top-ontap", e);
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

    render : function () {
        var componentStyle = {
            'position' : 'fixed',
            'bottom' : '10px',
            'cursor' : 'pointer'
        };
        this.props.direction === 'left' ? componentStyle['left']=0 : componentStyle['right']=0;
        return (
            <div className="octopusui-back2top" style={ componentStyle } id={ this.props.id } onClick={ this.onTap }></div>
        );
    }
});

module.exports = Back2Top;