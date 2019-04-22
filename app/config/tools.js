import Toast from "react-native-root-toast";
import NetInfo from "@react-native-community/netinfo";

//  工具函数库
const Tools = {
    /* 
     * 获取当前年月日
     * @param {String} 日期分割字符  
     * @return xxxx xx xx
     */
    getNowadays(symbol) {
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
            nowDate.getMonth() + 1;
        let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate()
        if (symbol) {
            return yaer + symbol + month + symbol + day
        } else {
            return year + month + day;
        }
    },

    /*
     *  获取日期对象
     *  @param {String} date 日期字符串(可选)
     */
    getDate(date) {
        if (date) {
            let dateStr = String(date);
            if (dateStr.length === 8) {
                dateStr = dateStr.substring(0, 4) + '/' + dateStr.substring(4, 6) + '/' + dateStr.substring(6, 8);
            } else if (dateStr.length === 10) {
                dateStr = dateStr * 1000
            }
            return new Date(dateStr) ? new Date(dateStr) : '';
        } else {
            return new Date();
        }
    },
    /*
     *  格式化日期
     *   @param {String} date 日期字符串(可选)
     *   @param {String } symbol 日期分隔符 (可选 默认为 "-")
     */
    formatDay(date, symbol) {
        let currentDate = this.getDate(date);
        if (currentDate) {
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) :
                currentDate.getMonth() + 1;
            let day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate()
            if (symbol) {
                return yaer + symbol + month + symbol + day
            } else {
                return year + "-" + month + "-" + day;
            }
        } else {
            return ''
        }
    },
    /*
     *   格式化日期 返回月日
     *   @param {String} date 日期字符串(可选)
     *   @return {String} 返回月日
     */
    formatMonthDay(date, symbol) {
        let currentDate = this.getDate(date);
        if (currentDate) {
            let month = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) :
                nowDate.getMonth() + 1;
            let day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate()
            if (symbol) {
                return month + symbol + day;
            } else {
                return month + "月" + day + "日";
            }
        } else {
            return ''
        }
    },
    /*
     *   格式化日期 返回星期 
     *   @param {String} date 日期字符串(可选)
     *   @return {String} 返回日期中的星期
     */
    formatWeek(date) {
        let currentDate = this.getDate(date);
        if (currentDate) {
            let day = currentDate.getDay();
            let weekAry = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            return weekAry[day]
        } else {
            return ''
        }
    },
    /*
     *   格式化日期 返回时分
     *   @param {String} date 日期字符串(可选)
     *   @return {String} 小时和分钟
     */
    formatTime(date) {
        let currentDate = this.getDate(date);
        if (currentDate) {
            let hours = currentDate.getHours() < 10 ? "0" + currentDate.getHours() :
                currentDate.getHours();
            let minutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()
            return hours + ":" + minutes;
        } else {
            return ''
        }

    },
    /*
     * 
     */
    async getNetworkState() {
        let info = await NetInfo.getConnectionInfo().then(connectionInfo => {
            let data = {
                type: '', //链接类型
                online: '' //是否连接网络
            }
            data.type = connectionInfo.type;
            data.online = connectionInfo.type == "wifi" || connectionInfo.type == "cellular" ? true : false;
            return data;
        })
        return info;
    },
    // 显示提示框
    // @param {String} text 提示文本
    toast(text) {
        Toast.show(text, {
            position: Toast.positions.BOTTOM,
            shadow: false,
            backgroundColor: "#d5d5d3",
            textColor: "#000000",
            opacity: 0.9,
            textStyle: {
                fontSize: 14
            }
        });
    }

}
export {
    Tools
}