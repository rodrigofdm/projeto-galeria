import $ from 'jquery'

const loadHtmlSucssCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSucssCallbacks.includes(callback)) {
        loadHtmlSucssCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find("[wm-include").each(function(i,e) {
        const url = $(e).attr("wm-include")
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr("wm-include")

                loadHtmlSucssCallbacks.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()