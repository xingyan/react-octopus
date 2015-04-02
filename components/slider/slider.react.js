/**
 * @file 轮播图
 * @type {exports}
 */

var React = require('react');
var o = require('g-octopus');
var util = o.util;
var SliderImg = require('./slider.img.react');

var Slider = React.createClass({

  /**
   * @desc 默认参数
   * @property defaultConfig
   */
  getDefaultProps: function() {
    return {
      dataField: {
        title: "title",
        url: "url",
        img_url: "image_url"
      },
      len: 0,
      animationType: 'ease-out',
      isLon: false,
      isLoop: true,
      hasButton: true,
      id: util.createUniqueID('react_octopus_slider_')
    }
  },

  /**
   * @desc 会发生变化的参数
   * @returns {boolean}
   */
  getInitialState: function() {
    return {
      current: {
        index: 0,
        el: null
      }
    };
  },

  /**
   * @desc 根据index获取相应的数据
   * @method getDataBy
   * @param index 数据的索引
   * @param pro 数据的类型
   */
  _getDataBy: function(index, pro) {
    var props = this.props;
    return props.data[index][props.dataField[pro]];
  },

  /**
   * @return {object}
   */
  render: function() {
    var props = this.props;
    if(!props.data && !props.doms)  return null;
    var tempData = props.data || props.doms;
    props.length = tempData.length;
    if(props.isLoop && tempData.length > 1) {
      tempData.push(tempData[0]);
      tempData.push(tempData[tempData.length - 2]);
    }
    var containerStyle = {
      'overflow': 'hidden',
      'width': '100%',
      'height': '100%',
      'position': 'relative'
    }
    var viewStyle = {
      'position': 'relative',
      'textAlign': 'center',
      'WebkitTransform': 'translate3d(0, 0, 0)',
      'WebkitBackfaceVisibility': 'hidden',
      'WebkitUserSelect': 'none',
      'WebkitUserDrag': 'none',
      'WebkitTransition': '-webkit-transform 0ms ' + props.animationType,
      'width': props.isLon ? '100%' : props.width * tempData.length,
      'height': props.isLon ? props.height * tempData.length : '100%'
    };
    var ChildSlider,
      that = this,
      selectBtn = (props.hasButton && props.length > 1) ?
        [0, 1].map(function(item, index) {
          var className = (index == 0) ? 'octopusui-slider-button octopusui-slider-prebutton'
            : 'octopusui-slider-button octopusui-slider-nextbutton';
          return (
            <div className={ className } onClick={ that._btnOnClick }></div>
          );
        }) : null;
    if(props.data) {
      ChildSlider = props.data.map(function(data, index) {
        var url = that._getDataBy(index, 'img_url'),
          title = that._getDataBy(index, 'title'),
          link = that._getDataBy(index, 'url');
        return (
          <SliderImg src={ url } width={ props.width } height= { props.height } isLon={ props.isLon }
            isLast={ props.length > 1 && props.isLoop && index == (tempData.length - 1) }
            index={ index }
          />
        );
      });
    } else if(props.doms) {
      ChildSlider = props.doms.map(function(dom) {
        return dom;
      });
    }
    return (
      <div id={ this.props.id } style={ containerStyle }>
        { selectBtn }
        <div className="octopusui-slider-view" style={ viewStyle }>
          { ChildSlider }
        </div>
      </div>
    );
  },

  /**
   * @desc 上下一张按钮被点击
   */
  _btnOnClick: function(e) {
    var target = e.target;
    return o.dom.hasClass(target, 'octopusui-slider-prebutton') ? this._selectPre() : this._selectNext();
  },

  /**
   * @desc 选择上一张
   */
  _selectPre: function() {
    console.log('pre');
  },

  /**
   * @desc 选择下一张
   */
  _selectNext: function() {
    console.log('next');
  }
});

module.exports = Slider;