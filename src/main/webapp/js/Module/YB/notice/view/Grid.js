Ext.define('Module.YB.notice.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.noticegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn',
        'Module.YB.notice.Data',
        'Module.YB.notice.Renderer',
        'Module.YB.notice.Tools',
        'Module.YB.notice.Config',
        'Module.YB.notice.Operation'
    ],

    checkIndexes: [],
    disableIndexes: [],
    forceFit:true,
    initComponent: function () {
    	var me = this;
        var columns = new Array();
        var renders = Module.YB.notice.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text:'标题',
                dataIndex: 'title',
                searchType: 'string',
                align: 'center',
                width: 150
            },{
                text:'内容',
                dataIndex: 'content',
                searchType: 'string',
                align: 'center',
                width: 150
            }, {
                text: '图片', dataIndex: 'picture', searchType: 'string', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateBanner(v);
                }
            }, {
                text: '公告类型', dataIndex: 'type', searchType: 'string', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateNoticeType(v);
                }
            }, {
                text: '状态', dataIndex: 'status', searchType: 'string', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateNoticeState(v);
                }
            },  {
                text: '创建时间',
                dataIndex: 'ctime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var val = new Date(v);
                    return Ext.util.Format.date(val, 'Y-m-d H:i:s');
                }
            },{
                text:'创建者',
                dataIndex: 'createUserName',
                searchType: 'string',
                align: 'center',
                width: 150
            }
        );
        var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
					  var records = sm2.getSelection();
					  var transformbtn = me.portlet.down('button[name=editnotice]');
	                  if(records.length>0){
	                	 transformbtn.enable();
					  }else{
						  transformbtn.disable();
					  }
				} 
            
           
			}
		});
        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText:'无数据'
            },
            store: Ext.data.StoreManager.lookup("Module.YB.notice.store.NoticeStore")
        });

        this.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var sm = me.selModel;
        var callbackFun = function(){
            current = me.store.currentPage;
            if (me.fireEvent('beforechange', me, current) !== false) {
                me.store.loadPage(current);
            }
        };

        var editNotice = me.portlet.down('button[name=editnotice]');
        var addTopNotice = me.portlet.down('menuitem[name=addTopNotice]');
        var addPopNotice = me.portlet.down('menuitem[name=addPopNotice]');

        var keyupFunc = function(){
        };

        //新增
        var addPopNoticeFunc = function(){
            Module.YB.notice.Operation.doAddPopNotice(me,callbackFun);
        };
        addPopNotice.on('click', addPopNoticeFunc);

        var addTopNoticeFunc = function(){
            Module.YB.notice.Operation.doAddTopNotice(me,callbackFun);
        };
        addTopNotice.on('click', addTopNoticeFunc);


        editNotice.setHandler(function(){
        	var records = sm.getSelection();
            var notice=records[0].data;
            if(notice.type=="pop"){
                Module.YB.notice.Operation.doUpdatePopNotice(notice,callbackFun);
            }else {
                Module.YB.notice.Operation.doUpdateTopNotice(notice,callbackFun);
            }
		});
    }
});