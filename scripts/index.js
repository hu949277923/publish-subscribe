(function(){
    function createChart() {
        var data = Math.random() * 1000;
        var option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: ['11-20', '11-27', '12-04', '12-11', '12-18', '12-25', '01-01', '01-08','01-14']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '价格',
                data: [910,920,911,925,933,945,966,999, data],
                type: 'line'
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
    //  图标
    var dom = document.getElementById("chart");
    var myChart = echarts.init(dom);
    var data = [
        {
            areaCode: 1,
            areaName: '俄罗斯',
            subData: [
                {
                    typeCode: 4,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 5,
                    typeName: '木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 6,
                    typeName: '方木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 7,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode:8,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 9,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                }
            ]
        },
        {
            areaCode: 2,
            areaName: '成都',
            subData: [
                {
                    typeCode: 40,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 41,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 42,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 43,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 44,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                },
                {
                    typeCode: 45,
                    typeName: '圆木',
                    time: '11/11',
                    price: '111',
                    priceSpread: '-111',
                    percentage: '+99%'
                }
            ]
        }
    ]
    // 发布订阅
    var pubSub = {};
    (function(p){
        var topics = {}
        // 发布
        p.publish = function(topic) {
            if (!topics[topic]) {
                return;
            }
            var subscribes = topics[topic];
            var len = subscribes.length - 1;
            while(len >= 0) {
                var args = Array.prototype.slice.call(arguments, 1, arguments.length)
                subscribes[len](topic, args);
                len--;
            }
        }
        // 订阅
        p.subscribe = function(topic, func) {
            if (!topics[topic]) {
                topics[topic] = []
            }
            console.log(func)
            topics[topic].push(func)
        }
        // 取消订阅
        p.unSubscribe = function(topic, func) {
            if (!topics[topic]) return;
            topics[topic].splice(topics[topic].indexof(func), 1);
        }
    })(pubSub)

    var $tabBarItem, $area, $category;
    $tabBarItem = $(".tabBar-item");
    $area = $("#area");
    $category = $("#category");

    pubSub.subscribe('data', function(e, data) {
        var tplAreaDataModel, tplCategoryDataModel,
            tplPriceQuotesItem, tplPriceQuotesContent,
            tplAreaSelect, tplCategorySelect,
            $tabBarContent;

        tplAreaDataModel = {
            areaList: data[0],
            currIndex: data[1]
        }
        tplCategoryDataModel = {
            typeList: data[0][data[1]].subData
        }
        console.log(tplAreaDataModel)
        console.log(tplCategoryDataModel)
        tplPriceQuotesItem = template('tpl-priceQuotes-item',tplAreaDataModel);
        tplPriceQuotesContent= template('tpl-priceQuotes-content',tplCategoryDataModel);

        tplAreaSelect = template('tpl-area-select',tplAreaDataModel );
        tplCategorySelect = template('tpl-category-select',tplCategoryDataModel);

        $tabBarContent = $(".tabBar-content");

        $tabBarItem.html(tplPriceQuotesItem);
        $tabBarContent.html(tplPriceQuotesContent);
        $area.html(tplAreaSelect);
        $category.html(tplCategorySelect);
        console.log('publish---------')
        console.log($category.val())
        createChart();
    })
    pubSub.publish('data',data, 0);
    $tabBarItem.on("click", ".tabBar-item-unit", function() {
        var $this = $(this);

        $this.addClass('tabBar-item-unit-current')
            .siblings().removeClass('tabBar-item-unit-current');

        pubSub.publish('data',data, $this.index());
    })
    $area.on("change",function() {
        var index = $(this).find("option:selected").index()
        pubSub.publish('data',data, index);
    })
    $category.on("change", function() {
        console.log($(this).val())
        createChart();
    })
})()