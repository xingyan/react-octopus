/**
 * @file 轮播图中的图片
 */
var React = require('react');
var util = require('g-octopus').util;

var SliderImg = React.createClass({

  /**
   * @desc 默认参数
   * @property defaultConfig
   */
  getDefaultProps: function() {
    return {
      isLon: false,
      isLast: false,
      index: 0
    }
  },

  /**
   * @desc 会发生变化的参数
   * @returns {boolean}
   */
  getInitialState: function() {
    return {
      width: this.props.width || 0,
      height: this.props.height || 0,
      src: this.props.src
    };
  },

  /**
   * @desc 渲染方法
   * @method render
   */
  render: function() {
    var props = this.props;
    var containerStyle = {
        'position': 'relative',
        'WebkitTransform': 'translate3d(0, 0, 0)',
        'overflow': 'hidden',
        'width': this.state.width,
        'height': this.state.height,
        'float': this.state.isLon ? 'none' : 'left'
      },
      imgStyle = {
        'position': 'absolute',
        'left': 0,
        'right': 0,
        'top': 0,
        'bottom': 0,
        'margin': 'auto',
        'maxWidth': '100%',
        'maxHeight': '100%'
      };
    if(props.isLast) {
      var k = props.isLon ? 'top' : 'left',
        v = props.isLon ? this.state.height : this.state.width;
      containerStyle[k] = -(props.index + 1) * v;
    }
    return (
      <div className='octopusui-slider-children' style={ containerStyle }>
        <img className='octopusui-slider-imgChildren' style={ imgStyle } src={this.state.src} />
      </div>
    );
  }
});

module.exports = SliderImg;
