Ext.define('Module.YB.approve.view.DataView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bookgrid',
	//需要的类列表（数组） 实例化类之前必须加载的类列表
	requires  : [    
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.YB.approve.Data',
		'Module.YB.approve.Renderer',
		'Soul.util.ObjectView'
	],   
	frame: true,
    collapsible: true,
    width: 535,
    autoScroll  : true,
	initComponent : function() {
		//此处为相关字段的展示
		var me = this;
		var renders = Module.YB.approve.Renderer;
		Ext.apply(this, {//请求查询没有数据时的提示
			layout : 'anchor',
			items : [{
				xtype : 'panel',
				name : 'search',
				height : 59,
				anchor : '100%',
				autoHeight:false,
				border : true,
				layout : {
					type : 'column',
					align : 'left',
					pack : 'center'
				},
				items : [{
					xtype : 'panel',
					border : false,
					style : 'top:5px',
					items :renders.getSearchBarConfig(me)
				}]
			},{
				xtype : 'panel',
				name : 'gridPanel',
				border : false,
				anchor : '100% -59',
				layout : 'fit',
				items : [Ext.create('Ext.view.View', {
					 	title: BOOK_LABEL.list,
					 	store :  Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore"),
					 	id: 'orders',
					    itemSelector: 'div.order',
					    multiSelect: true,
					    width:1024,
					    autoScroll  : true,
					 	tpl  : Ext.create('Ext.XTemplate',
								 '<tpl for=".">',
							        '<div  class="order" onclick="Module.YB.approve.Tools.showOrderInEast(\'{id}\')">',
							        	'<table>',
							        		'<tr>',
							        			'<th width="150">',
//							        				'<img src="../../img/book/yearbookThumbnail.png" height="100px" />',
							        				'<img src={coverThumbNail} height="100px"/>',
							        			'</th>',
							        			'<th width="200" align="left">',
							        				'<span>',YB_APPROVE_PROPERTY.bookName,' :{bookName}</span>',
							        				'</br><span>',YB_APPROVE_PROPERTY.orderId,' :{orderId}</span>',
							        				'</br><span>',YB_APPROVE_PROPERTY.creator,' :{creator}</span>',
						        				'</th>',
						        				'<th width="200" align="left">',
							        				'<span>',YB_APPROVE_PROPERTY.goodsNum,' :{goodsNum}</span>',
						        					'</br><span>',YB_APPROVE_PROPERTY.price,' :{price}</span>',
						        					'</br><span>',YB_APPROVE_PROPERTY.address,' :{address}</span>',
						        				'</th>',
						        				'<th width="200" align="left">',
							        				'<span>',YB_APPROVE_PROPERTY.printStatus,' : {[Module.YB.order.Renderer.translatePrintStatus(values.printStatus)]}</span>',
						        					'</br><span>',YB_APPROVE_PROPERTY.postStatus,' : {[Module.YB.order.Renderer.translatePostStatus(values.postStatus)]}</span>',
						        					'</br><span>',YB_APPROVE_PROPERTY.status,' : {[Module.YB.order.Renderer.translateStatus(values.status)]}</span>',
						        				'</th>',
						        				'<th width="200" align="left">',
							        				'<span>',YB_APPROVE_PROPERTY.invoiceId,' :{invoiceId}</span>',
						        					'</br><span>',YB_APPROVE_PROPERTY.ctime,' :{[fm.date(new Date(values.ctime),"Y-m-d")]}</span>',
						        					'</br><span>',YB_APPROVE_PROPERTY.ctime,' :{[fm.date(new Date(values.mtime),"Y-m-d")]}</span>',
						        				'</th>',
							        		'</tr>',
							        	'</table>',
							         '</div>',
							    '</tpl>'
					     ),
						viewConfig : {
							emptyText : "暂无数据"
						}
				})
				],
				listeners : {
					afterrender : function(){
			    		Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").loadPage(1);
			    		var approvalBar = me.portlet.down('menuitem[name=approval]');
			    		approvalBar.disable();
			    	}
				}
			}
			]
		});
		this.callParent(arguments);
	}
});

