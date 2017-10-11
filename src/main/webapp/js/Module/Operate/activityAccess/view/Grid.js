Ext.define('Module.Operate.activityAccess.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.activitygrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Operate.activityAccess.Data',
		'Module.Operate.activityAccess.Renderer'
	],
    
	checkIndexes : [], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Operate.activityAccess.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:ACTIVITYACCESS_LABEL.name, dataIndex:'name', searchType:'string', align:'center', flex:1
			},{
				text:ACTIVITYACCESS_LABEL.isOpen, dataIndex:'isOpen', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateActivityAccessIsopen(v);
				},
				comboData : ACTIVITYACCESS_LABEL.isOpen
			},{
				text:ACTIVITYACCESS_LABEL.accessName,dataIndex:'activity.name', searchType:'string', align:'center', flex:1
			},{
				text:ACTIVITY_LABEL.banner, dataIndex:'banner',sortable: false,  searchType:'string', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateBanner(v);
				}

			},{
				text:ACTIVITYACCESS_LABEL.state, dataIndex:'activity.state', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateActivityStatus(v);
				},
				comboData : ACTIVITYACCESS_LABEL.state
			},{
				text:ACTIVITYACCESS_LABEL.ctime, dataIndex:'ctime', searchType:'date', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateCtime(v);
				}
			},{
				text:ACTIVITYACCESS_LABEL.userName, dataIndex:'userName', searchType:'string', align:'center', flex:1
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildActivityAccessOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					var statusT = -1;			
					/*判断所选状态是否一致*/
					Ext.each(records, function(record, index, rs){
						if (statusT == -1) {
							statusT = record.data.isOpen;
						} else if (statusT != record.data.isOpen){
							statusT = -1;
							return false;
						}
					});


					var rightAddActivity = me.contextMenu.down('menuitem[name=addActivityAccess]');
					var topAddActivity = me.portlet.down('menuitem[name=addActivityAccess]');
					
					var delActivityRight = me.contextMenu.down('menuitem[name=delActivityAccess]');
					var delActivityTop = me.portlet.down('menuitem[name=delActivityAccess]');
							
					
					var openActivityRight = me.contextMenu.down('menuitem[name=openActivityAccess]');
					var openActivityTop = me.portlet.down('menuitem[name=openActivityAccess]');
					
					var closeActivityRight = me.contextMenu.down('menuitem[name=closeActivityAccess]');
					var closeActivityTop = me.portlet.down('menuitem[name=closeActivityAccess]');
					
					rightAddActivity.enable();
					topAddActivity.enable();						
					
					if(records.length > 0)
					{
						delActivityRight.enable();
						delActivityTop.enable();						
					}else{
						delActivityRight.disable();
						delActivityTop.disable();				
					}

					if(records.length == 1){
						if(statusT == Module.Operate.activityAccess.model.ActivityAccessModel.ISOPEN_TRUE)
						{
							closeActivityRight.enable();
							closeActivityTop.enable();
							openActivityRight.disable();
							openActivityTop.disable();
							
						}else{
							openActivityRight.enable();
							openActivityTop.enable();
							closeActivityRight.disable();
							closeActivityTop.disable();
						}
				
					}else{
	
						if(statusT == -1)
						{
							openActivityRight.disable();
							openActivityTop.disable();
							closeActivityRight.disable();
							closeActivityTop.disable();
						}else{						
							if(statusT == Module.Operate.activityAccess.model.ActivityAccessModel.ISOPEN_TRUE)
							{
								closeActivityRight.enable();
								closeActivityTop.enable();
								openActivityRight.disable();
								openActivityTop.disable();
								
							}else{
								openActivityRight.enable();
								openActivityTop.enable();
								closeActivityRight.disable();
								closeActivityTop.disable();
							}
						}

					}
					
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : ACTIVITY_MESSAGE.noActivity
			},
			store : Ext.data.StoreManager.lookup("Module.Operate.activityAccess.store.ActivityAccessStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};

		var sm = me.selModel;
		

		var rightAddActivity = me.contextMenu.down('menuitem[name=addActivityAccess]');
		var topAddActivity = me.portlet.down('menuitem[name=addActivityAccess]');
		
		var delActivityRight = me.contextMenu.down('menuitem[name=delActivityAccess]');
		var delActivityTop = me.portlet.down('menuitem[name=delActivityAccess]');
		
		var openActivityRight = me.contextMenu.down('menuitem[name=openActivityAccess]');
		var openActivityTop = me.portlet.down('menuitem[name=openActivityAccess]');
		
		var closeActivityRight = me.contextMenu.down('menuitem[name=closeActivityAccess]');
		var closeActivityTop = me.portlet.down('menuitem[name=closeActivityAccess]');
		
		
        //新增
        var rightAddActivityFunc = function(){
        	Module.Operate.activityAccess.Operation.doAddActivityAccessFunction(callbackFun);
        };
        rightAddActivity.on('click', rightAddActivityFunc);
        topAddActivity.on('click', rightAddActivityFunc);
           
        //删除 
        var delActivityFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {

        		Module.Operate.activityAccess.Operation.doDelActivityAccessFunc(records, callbackFun);
        	}
        };
        
        delActivityRight.on('click', delActivityFunc);
        delActivityTop.on('click', delActivityFunc);

        //开启
        var openActivityFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
        		Module.Operate.activityAccess.Operation.doChangeActivityAccessIsopenFunc(records,Module.Operate.activityAccess.model.ActivityAccessModel.ISOPEN_TRUE, callbackFun);
        	}
        };
        openActivityRight.on('click', openActivityFunc);
        openActivityTop.on('click', openActivityFunc);
        
        
        //关闭
        var closeActivityFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
        		Module.Operate.activityAccess.Operation.doChangeActivityAccessIsopenFunc(records,Module.Operate.activityAccess.model.ActivityAccessModel.ISOPEN_FALSE, callbackFun);
        	}
        };
        closeActivityRight.on('click', closeActivityFunc);
        closeActivityTop.on('click', closeActivityFunc);
    }
});