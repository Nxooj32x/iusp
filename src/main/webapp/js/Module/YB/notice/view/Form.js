/**
 * 用户form组件
 */
Ext.define('Module.YB.notice.view.Form', {
   extend : 'Ext.form.Panel',
   bodyStyle : 'padding:0px 10px 0',
   requires  : [
          ],
   /**
    * 表单数据
    * @type 
    */
   data:null,
   /**
    * 页面类型
    * @type 
    */
   pageType:null,
   /**
    * 按钮位置
    * @type String
    */
   buttonAlign: 'center',
   
   store:null,
   
   /**
    * 组件初始化
    * @param {} scope
    */
   initComponent : function() {
		var me = this;
		//表单字段
		me.items=[{
	        fieldLabel:'是否开启',
	        name: 'notice_isopen',
	        xtype: 'textfield',
	        value:me.data?me.data.get('notice_isopen'):'',
	        allowBlank: false
	    },{
	        fieldLabel:'内容',
	        name: 'notice_content',
	        xtype: 'textarea',
	        value:me.data?me.data.get('notice_content'):'',
	        width:700,		
	        allowBlank: false
	    },{
	        fieldLabel:'跳转URL',
	        name: 'notice_content_url',
	        xtype: 'textfield',
	        width:700,
	        value:me.data?me.data.get('notice_content_url'):''
	    },{
	        fieldLabel:'显示页面',
	        name: 'notice_view_page',
	        xtype: 'textfield',
	        width:700,
	        value:me.data?me.data.get('notice_view_page'):''
	    }],
	    me.dockedItems=[{
		    xtype: 'toolbar',
		    dock: 'bottom',
		    layout:{
				type:'hbox',
				pack:'center'
		    },
		    style: {
            	background: '#fff'
            },
		    items: [{
						xtype : 'button',
						text : '保存',
						iconCls:'save', 
						handler: function(){
							Module.YB.notice.Operation.updateNotice(me,me.data,me.store);
						}
				    }]
		}];
		me.callParent();
	}
});
