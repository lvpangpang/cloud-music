"use strict";
(function() {
    // 控制根字体大小
    let winWidth = document.body.clientWidth;
    if ( winWidth > 640 ) {
        winWidth = 640;
    }
    document.querySelector('html').style.fontSize = winWidth/640 * 25 + 'px';
    window.addEventListener('orientationchange', function(event){
        winWidth = document.body.clientWidth;
        if ( winWidth > 640 ) {
            winWidth = 640;
        }
        document.querySelector('html').style.fontSize = winWidth/640 * 25 + 'px';
    });
})();

let commonMethods = {
    param : function(obj) {
        let str = '';
        for ( let x in obj ) {
            str += `${x}=${obj[x]}&`;
        }
        return str.substr( 0, str.length-1 );
    }
};
export default commonMethods;
