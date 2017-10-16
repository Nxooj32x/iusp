/**
 * Created by tao on 2017/9/23.
 */
(function () {
    Ext.onReady(function () {
        var data = {
            name: 'Tommy Maintz',
            title: 'Lead Developer',
            company: 'Sencha Inc.',
            email: 'tommy@sencha.com',
            address: '5 Cups Drive',
            city: 'Palo Alto',
            state: 'CA',
            zip: '44102',
            drinks: ['Coffee', 'Soda', 'Water'],
            kids: [
                {
                    name: 'Joshua',
                    age: 3
                },
                {
                    name: 'Matthew',
                    age: 2
                },
                {
                    name: 'Solomon',
                    age: 0
                }
            ]
        };


        var userData = {
            total: 200,
            user: {
                userId: '1',
                name: 'tao.wang',
                orders: [
                    {id: '001', name: 'pen'},
                    {id: '001', name: 'book'}
                ]
            }
        };

        Ext.regModel('user', {
            fields: [
                {name: 'userId', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            hasMany: {
                model: 'order'
            }
        });

        Ext.regModel('order', {
            fields: [
                {name: 'id', type: 'string'},
                {name: 'name', type: 'string'}
            ],
            belognsTo: {
                type: 'belongsTo', model: 'user'
            }
        });

        var mproxy = Ext.create("Ext.data.proxy.Memory", {
            model: 'user',
            data: userData,
            reader: {
                type: 'json',
                root: 'user'
            }
        });

        mproxy.read(new Ext.data.Operation(), function (result) {
            var datas = result.resultSet;
            console.dir(datas);
        }, this);

        /*        Ext.regModel("person",{
         fields:[
         {name:"name",type:"string"}
         ]
         });

         var ajaxProxy = new Ext.data.proxy.Ajax({
         url:'/suresecurity/user',
         model:'person',
         reader:'json',
         startParam:'page'
         });
         ajaxProxy.doRequest(new Ext.data.Operation({
         action:"read",
         start:1,
         limit:10
         }),function(o){
         console.dir(Ext.JSON.decode(o.response.responseText));
         });*/


        /*  浏览器代理
         Ext.regModel("user",{
         fields:[
         {name:"name",type:"string"}
         ],
         proxy:{
         type:"sessionstorage",
         id:"twitter-Serarches"
         }
         });

         var store = new Ext.data.Store({
         model:user
         });

         store.add({name:'111'});
         store.sync();
         store.load();

         store.each(function(records){
         console.dir(records);
         });

         var userData = [
         {name:"yy521.com",age:1},
         {name:"want@qq.com",age:27}
         ];
         var memeoryProxy = Ext.create("Ext.data.proxy.Memory",{
         data:userData,
         model:"user"
         });
         userData.push({name:"wt",age:12});
         memeoryProxy.update(new Ext.data.Operation({
         action:'update',
         data:userData
         }),function(result){},this);

         memeoryProxy.read(new Ext.data.Operation(),function(result){
         Ext.Array.each(result.resultSet.records,function(model){
         console.dir(model.get('name'))
         })
         },this);
         */

    });
})();