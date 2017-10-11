Ext.define('Module.Template.page.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil', 'Module.Template.page.Renderer', 'Soul.util.ObjectView'],

	/**
	 * 基础属性显示
	 */
	showProperties : [ 'name', 'type', 'code', 'status', 'ctime', , 'etime', 'usedNum'],
			
	/**
	 * 模板相关属性
	 */
	tplProperties : [  'imageNum', 'textNum', 'lrSame', 'dbMode', 'needTwo'],

	/**
	 * 获取封面下拉列表
	 * @returns {Ext.form.field.ComboBox}
	 */
	coverCombo : function(){
		var combo = new Ext.form.field.ComboBox({
            store:  Ext.data.StoreManager
			.lookup("Module.Template.page.store.CoverPtplStore"),
            displayField: 'name',
            anchor: '100%',
            name : 'coverCode',
            valueField : 'code',
            width : 250,
            listConfig: {
                // Custom rendering template for each item
                getInnerTpl: function() {
                    return '<img height="150" src="/pageTplRes/{type}/{code}/img/thumbnail/left.jpg" /><strong>{name}</strong>';
                }
            },
            pageSize: 10
        });
		return combo;
	},
	
	/**
	 * 获取封面下拉列表
	 * @returns {Ext.form.field.ComboBox}
	 */
	backCoverCombo : function(){
		var combo = new Ext.form.field.ComboBox({
            store:  Ext.data.StoreManager
			.lookup("Module.Template.page.store.BackCoverPtplStore"),
            displayField: 'name',
            anchor: '100%',
            name : 'backCoverCode',
            valueField : 'code',
            width : 250,
            listConfig: {
                // Custom rendering template for each item
                getInnerTpl: function() {
                    return '<img height="150" src="/pageTplRes/{type}/{code}/img/thumbnail/left.jpg" /><strong>{name}</strong>';
                }
            },
            pageSize: 10
        });
		return combo;
	},
	
	PROP : {},
	  	
	COMBO_CFG : {},
	
	getRendererConfig : function() {
		var renderer = Module.Template.page.Renderer;
		var ret = renderer.config;
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildPROP();
		this.buildCOMBOCFG();
	},
	
	buildCOMBOCFG : function(){
		this.COMBO_CFG.type = Soul.util.RendererUtil.buildComBo(PAGETPL_TYPE);
		this.COMBO_CFG.status = Soul.util.RendererUtil.buildComBo(PAGETPL_STATUS,[0,1,2,3]);
		this.COMBO_CFG.statusEdit = Soul.util.RendererUtil.buildComBo(PAGETPL_STATUS,[0,1,2]);
		this.COMBO_CFG.dbMode = Soul.util.RendererUtil.buildComBo(PAGETPL_DBMODE);
	},
	
	buildPROP : function(){
		//封面模板属性
		this.PROP.COVER = new Array();
		this.PROP.COVER = Ext.Array.merge(this.PROP.COVER, this.tplProperties);
		this.PROP.COVER.push('backCoverCode');
		
		//封底模板属性
		this.PROP.BACK_COVER = new Array();
		this.PROP.BACK_COVER = Ext.Array.merge(this.PROP.BACK_COVER, this.tplProperties);
		this.PROP.BACK_COVER.push('coverCode');
		
		//目录模板属性
		this.PROP.CATALOGUE = new Array();
		this.PROP.CATALOGUE = Ext.Array.merge(this.PROP.CATALOGUE, this.tplProperties);
		this.PROP.CATALOGUE.push('catalogItemNum');
		
		//通讯索引模板属性
		this.PROP.PINDEX = new Array();
		this.PROP.PINDEX = Ext.Array.merge(this.PROP.PINDEX, this.tplProperties);
		this.PROP.PINDEX.push('pIndexNum');
		
		//个人页模板属性
		this.PROP.PERSONAL = new Array();
		this.PROP.PERSONAL = Ext.Array.merge(this.PROP.PERSONAL, this.tplProperties);
		this.PROP.PERSONAL.push('userInfoNum', 'hasInteraction');
		
		//个人页模板属性
		this.PROP.VOTE = new Array();
		this.PROP.VOTE = Ext.Array.merge(this.PROP.VOTE, this.tplProperties);
		this.PROP.VOTE.push('voteNum');
		
		//图文模板属性
		this.PROP.IMAGE_TEXT = new Array();
		this.PROP.IMAGE_TEXT = Ext.Array.merge(this.PROP.IMAGE_TEXT, this.tplProperties);
		
		//扉页空白页模板属性
		this.PROP.FLYLEAF = new Array();
		this.PROP.FLYLEAF = Ext.Array.merge(this.PROP.FLYLEAF, this.tplProperties);
		
		//扉页空白页模板属性
		this.PROP.PANO = new Array();
		this.PROP.PANO = Ext.Array.merge(this.PROP.PANO, this.tplProperties);
	}

});
