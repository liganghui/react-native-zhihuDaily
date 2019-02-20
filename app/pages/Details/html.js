const HTML = `
<!DOCTYPE html>
<html>
<head>
    <link href="http://news.at.zhihu.com/css/news_qa.auto.css?v=4b3e3" rel="stylesheet" />
    <style>
        .root-wrapper {
            width: 100%;
            overflow: hidden;
        }
        .detail-banner {
            width: 100%;
            height: 200px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            position: fixed;
            top: 55px;
            left: 0;
            z-index: 1;
        }
        .detail-banner:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));
            z-index: 5;
        }
        .title {
            margin: 0 18px 18px !important;
            position: absolute;
            left: 0;
            z-index: 10;
            bottom: 10px;
            color: #fff;
            line-height: 1.3;
            font-size: 22px;
            text-shadow: rgba(0, 0, 0, 0.6) 0 0 2px;
        }
        .image-source {
            z-index: 10;
            position: absolute;
            right: 15px;
            bottom: 8px;
            font-size: 10px;
            color: #eeeeee;
        }
        // 重置部分样式
        .main-wrap {
            position: absolute;
            z-index: 100;
        }
        .img-place-holder {
            display: 'none';
            height: 250px !important;
            background: transparent !important;
        }
        .content-inner,
        .headline-background {
            background: #fff;
        }
        .content-wrap {
            background: none;
        }
    </style>
<body>
    <div class="root-wrapper">
        <div class="detail-banner" id="detailBanner">
            <p class="title" id="title"></p>
            <span class="image-source" id="imageSource"></span>
        </div>
        <div id='detailBody'></div>
    </div>
    <script>
        // 用于显示日报大图
        var dom = document.getElementById('detailBanner');
        var y; //记录滚动方向
        // 监听外部发送到WebView的数据 更新页面
        document.addEventListener('message', function (e) {
            // 转换数据字符串为数组
            var msgArray = e.data.split('$R%N*D5A+F4HAA0O');
            // 通知外部处理异常
            if (!msgArray || msgArray.length !== 4) {
                if (!!window.postMessage) {
                    window.postMessage('error:服务器数据异常')
                }
            }
            // 更新页面数据
            document.getElementById('title').innerText = msgArray[2];
            document.getElementById('imageSource').innerText = msgArray[3];
            // 错位加载,等待图像加载完成 ,再显示其他内容.
            loadImage(msgArray[0], function () {
                dom.setAttribute("style", "background-image:url('" + this.src + "')");
                setTimeout(function () {
                    document.getElementById('detailBody').innerHTML = msgArray[1];
                }, 200)
            });
        })
        /*  
         * 功能描述：
         *  监听滚动事件     
         * 	当滚动条处于banner高度区间时，使标题栏渐隐与渐显。
         */
        document.onscroll = function () {
            var scrollTop = document.body.scrollTop;
            if (scrollTop <= 250) { //banner+bar高度
                var top = parseInt(50 - scrollTop / 2) + 'px';
                dom.style.top = top;
                var scrollDirection = y > scrollTop ? 'up' : 'down';
                y = scrollTop;
                if (!!window.postMessage) {
                    // 函数节流 , 避免高频次调用
                    throttle(window.postMessage, scrollDirection, 250, 500)
                }
            }
        }
        /*  图片加载
         *  
         *  @param {String} url  图片url地址
         *  @param {Function} callback  图片加载完成回调函数
         */
        function loadImage(url, callback) {
            var img = new Image();
            img.src = url;
            img.onload = function () {
                callback.call(img);
            }
        }
        // 函数节流
        function throttle(fn, context, delay, mustApplyTime) {
            clearTimeout(fn.timer);
            fn._cur = Date.now(); //记录当前时间

            if (!fn._start) { //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
                fn._start = fn._cur;
            }
            if (fn._cur - fn._start > mustApplyTime) {
                //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
                fn(context);
                fn._start = fn._cur;
            } else {
                fn.timer = setTimeout(function () {
                    fn(context);
                }, delay);
            }
        }
    </script>
</body>
</html>`;
export default HTML;