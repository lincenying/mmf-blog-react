/* global $ */
import NProgress from 'nprogress'
import config from '../config'

$.ajaxSetup({
    global: true,
    dataType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Basic dGVzdDpwYXNzd2Q='
    }
})

$(document).ajaxStart(function() {
    NProgress.start()
})
$(document).ajaxComplete(function() {
    NProgress.done()
})

export default {
    get(url, data, global = true) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: config.api + url,
                type: 'get',
                data,
                global
            }).then(data => {
                resolve(data)
            }, error => {
                reject(error.responseText || error.statusText)
            })
        })
    },
    post(url, data, global = true) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: config.api + url,
                type: 'post',
                data,
                global
            }).then(data => {
                resolve(data)
            }, error => {
                reject(error.responseText || error.statusText)
            })
        })
    },
}
