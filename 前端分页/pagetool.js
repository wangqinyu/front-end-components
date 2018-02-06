/**
 * Created by wangqinyu on 2017/7/25.
 */
page(function (content,aim,firstUrl,nextUrl) {
    $.ajax({
        type: "post",
        url: "\""+firstUrl+"\"",
        success: function (data) {
            var pageTotal = data.pageTotal;//总页数
            //alert("总页数："+pageTotal)
            var resourceData = data.resourceData;//当前页数据
            var searchId = data.searchId;//查询ID
            $(aim).empty();//清空插件
            //插件实例化
            nw.paging(aim, {
                total: pageTotal,
                current: 1,
                firstText: "首页",
                lastText: "尾页",
                prevText: "上一页",
                nextText: "下一页",
                jumpText: "跳转",
                showPage: 8,
                //autoHide:true,
                clickBack: function (api) {//再次点击页码查询数据操作
                    $.ajax({
                        type: "post",
                        url:"\""+nextUrl+"\"",
                        success: function (data1) {
                            var nextPageData = data1.resourceData;
                            setPage(nextPageData);
                        }
                    });
                    api.refresh(api.getConfig().current, pageTotal);
                },
                initBack: function (api) {
                    setPage(resourceData);
                }
            });
        }
    })
});
