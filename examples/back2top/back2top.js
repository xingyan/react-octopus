/**
 * Created by zhuyingda on 2015/3/31.
 */
;(function () {

    'use strict';

    var options = {
        id : 'toTop',
        bottom : '50px',
        offsetV : '20px'
    };

    var React = require('react');
    var o = require('g-octopus');
    var Back2top = require('../../components/back2top/back2top.react');

    React.render(
        <Back2Top data={options}/>,
        o.g('back2top_container')
    );

})();