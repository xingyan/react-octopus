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

    var div = document.createElement('div');
    var el = document.getElementById('back2top_container');
    el.appendChild(div);

    React.render(
        <Back2top data={options}/>,
        div
    );

})();