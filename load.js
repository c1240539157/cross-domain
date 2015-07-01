/**
 *
 */
var RemoteInvoke = RemoteInvoke || {}; //生命我一个对象
var iframe = document.createElement("iframe");
RemoteInvoke = {
    /**
     * divID：div的id
     * url:调用的url地址
     * msg:消息,需要发送的消息
     * width:显示的宽度，默认占满整个网页
     * height:显示的高度,默认占满整个网页
     * border:是否显示边框1|0,
     * scroll:是否显示滚动条auto|yes|no
     */
    loadHtml: function (container, url, msg, width, height, border, scroll) {
        var w = document.documentElement.clientWidth
            || document.body.clientWidth;
        var h = document.documentElement.clientHeight
            || document.body.clientHeight;
        iframe.style.display = 'block';
        iframe.height = height > 0 ? height : h;
        iframe.width = width > 0 ? width : w;
        iframe.src = url;
        iframe.frameborder = border == 0 ? border : 1;
        iframe.scrolling = scroll;
        iframe.style.clear = 'both';
        container.appendChild(iframe);
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                var win = iframe.contentWindow;
                win.postMessage(msg, url);
            });
        } else {
            iframe.onload = function () {
                var win = iframe.contentWindow;
                win.postMessage(msg, url);
            };
        }
    },
    loadHtml: function (container, url, msg, width, height) {
        var w = document.documentElement.clientWidth
            || document.body.clientWidth;
        var h = document.documentElement.clientHeight
            || document.body.clientHeight;

        iframe.style.display = 'block';
        iframe.height = height > 0 ? height : h;
        iframe.width = width > 0 ? width : w;
        iframe.src = url;
        iframe.style.clear = 'both';
        container.appendChild(iframe);
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                var win = iframe.contentWindow;
                win.postMessage(msg, url);
            });
        } else {
            iframe.onload = function () {
                var win = iframe.contentWindow;
                win.postMessage(msg, url);
            };
        }
    },
    /**
     * msg:发送的消息
     *
     * url:发送的地址
     */
    sendMsg: function (msg, url) {
        var win = iframe.contentWindow;
        win.postMessage(msg, url);
    },
    /**
     * 事件监听
     */
    onLoad: function () {
        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', this.onmessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', this.onmessage);
        }
    },
    onmessage: function (event) {
        var data = event.data;
        var origin = event.origin;
        console.log(data);
        //监听其他页面的消息
        alert("这个是主页" + data);
        alert("这个是主页" + origin);

    }
};
