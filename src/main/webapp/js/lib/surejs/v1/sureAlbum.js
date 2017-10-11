/**
 * 
 * 幻灯片相册显示
 * 
 * @param options
 * 			albumId ： 相册ID，必须
 * 			currentId ： 当前显示照片ID
 * @returns
 */
function SlideAlbum(options){
	
	options = options || {};
	
	
	/**
	 * 相册ID，必需
	 */
	this.albumId = options.albumId;
	
	/**
	 * 相册显示div
	 */
	this.showDiv = options.showDiv || "#albumArea";
	
	/**
	 * 当前相册显示照片，不存在使用用传入参数，参数必需传入
	 */
	currentId = options.currentId;
	
	/**
	 * 大图显示的img元素
	 */
	this.imgDiv = options.imgDiv || ".zoompic .imgbox img";
	
	/**
	 * 图片在相册的序号显示div
	 */
	this.imgSeq = options.imgSeq || ".color2";
	
	/**
	 * 图片点赞个数显示div
	 */
	this.imgPraiseNum = options.imgPraiseNum || ".btnArea .good";
	
	/**
	 * slide所有缩略图
	 */
	this.thumbnailArray = options.thumbnailArray || "#thumbnail li";
	/**
	 * 缩率图像向右滑动的button
	 */
	this.slideRightBtn = options.slideRightBtn || "#btn-right";
	/**
	 * 缩率图像向左滑动的button
	 */
	this.slideLeftBtn = options.slideRightBtn || "#btn-left";
	
	/**
	 * 当前显示图片，在slide中的li元素
	 */
	this.currentImgLi = $("#" + currentId);
	
	/**
	 * 显示当前照片
	 */
	this.showCurrentImg = function(){
		if (this.currentImgLi.length > 0)
			this.showImg(this.currentImgLi);
	};
	
	/**
	 * 显示下一张照片
	 */
	this.showNextImg = function showNextImg(){
		var next = this.currentImgLi.next('li');
		if (next.length > 0) {
			this.showImg(next);
			$(this.slideRightBtn).click();
		} else 
			SureMsg.msg("别点了，童鞋！", "后面没有照片了，这是最后一张！");
	};

	/**
	 * 显示前一张照片
	 */
	this.showPreImg = function showPreImg(){
		var prev = this.currentImgLi.prev('li');
		if (prev.length > 0) {
			this.showImg(prev);
			$(this.slideLeftBtn).click();
		} else 
			SureMsg.msg("别点了，童鞋！", "前面没有照片了，这是第一张！");
	};
	
	
	/**
	 * 显示相册图片
	 * @param imgLi 包含图片缩略图的li
	 */
	this.showImg = function (imgLi){
		var imgSrc = imgLi.find('a').attr("href") + "-albumshow";//显示url
		var title = imgLi.find('img').attr("title");//图片title
		var praiseNum = imgLi.find('a').attr("name");
		praiseNum = praiseNum == ''? 0 : praiseNum;//点赞个数
		var imgSeq = imgLi.find('a').attr("id");//图片排序
		$(this.thumbnailArray).removeClass("current");//取消当前所有current class
		imgLi.addClass("current");//设置current css
		this.updateImgBox(imgSrc, title, praiseNum, imgSeq);//更新页面
		this.currentImgLi = imgLi;//设置当前
	};

	/**
	 * 更新单个页面显示信息
	 * @param imgSrc  照片url
	 * @param praiseNum	点赞个数
	 * @param imgSeq	照片序号
	 */
	this.updateImgBox = function  (imgSrc, title, praiseNum, imgSeq){
		//$(this.imgDiv).hide().attr({ "src": imgSrc, "title": title });
		$(this.imgDiv).attr({ "src": imgSrc, "title": title });
		$(this.imgSeq).html(imgSeq);
		$(this.imgPraiseNum).html("("+praiseNum+")");
	};
	/**
	 * 删除当前照片
	 * 	删除完成后更新照片显示区域
	 */
	this.deleteCurrentImg = function(){
		var me = this;
		function removeCallback(){
			SureAlbum.gotoAlbumShow(me.albumId, $(me.showDiv),'slider');
		}
		SureAlbum.removeImage(this.albumId, this.currentImgLi.attr("id"), removeCallback);
	};
	
	var me = this;
	
	//小图片左右滚动
	this.$slider = $('.slider ul');//slider区域
	this.$slider_child_l = $('.slider ul li').length;//图片个数
	this.$slider_width = $('.slider ul li').width();//缩略图宽度
	this.$slider.width(this.$slider_child_l * this.$slider_width);
	
	this.slider_count = 0;	//当前
	
	if (this.$slider_child_l < 5) {
		$(this.slideRightBtn).css({cursor: 'auto'});
		$(this.slideRightBtn).removeClass("dasabled");
	}
	
	$(this.slideRightBtn).click(function() {
		if (me.$slider_child_l < 5 || me.slider_count >= me.$slider_child_l - 5) {
			return false;
		}
		me.slider_count++;
		me.$slider.animate({left: '-=' + me.$slider_width + 'px'}, 'fast');
		me.slider_pic();
	});
	
	$(this.slideLeftBtn).click(function() {
		if (me.slider_count <= 0) {
			return false;
		}
		me.slider_count--;
		me.$slider.animate({left: '+=' + me.$slider_width + 'px'}, 'fast');
		me.slider_pic();
	});
	
	this.slider_pic = function () {
		if (this.slider_count >= this.$slider_child_l - 5) {
			$(this.slideRightBtn).css({cursor: 'auto'});
			$(this.slideRightBtn).addClass("dasabled");
		}
		else if (this.slider_count > 0 && this.slider_count <= this.$slider_child_l - 5) {
			$(this.slideLeftBtn).css({cursor: 'pointer'});
			$(this.slideLeftBtn).removeClass("dasabled");
			$(this.slideRightBtn).css({cursor: 'pointer'});
			$(this.slideRightBtn).removeClass("dasabled");
		}
		else if (this.slider_count <= 0) {
			$(this.slideLeftBtn).css({cursor: 'auto'});
			$(this.slideLeftBtn).addClass("dasabled");
		}
	};
}

SureAlbum = {
		/**
		 * 添加imge对象
		 * @param albumId	相册ID
		 * @param image		image对象
		 * @param callback	回调函数
		 */
		addImage : function (albumId, image, callback){
			SureAjax.ajax({
		    	method : 'put',
		    	dataType : 'json',
		    	contentType : 'application/json',
		    	url : "/album/" + albumId + "/image/" + image.name,
		    	data : $.toJSON(image),
		    	success : function(data) {
					if (typeof(callback) === "function")
						callback(data);							
				}
		    });
		},
		
		/**
		 * 从相册中删除图片
		 * @param albumId	相册ID
		 * @param imageName	图片名称
		 * @param callback  回调函数
		 */
		removeImage : function(albumId, imageName, callback){
			SureAjax.ajax({
		    	method : 'delete',
		    	dataType : 'json',
		    	url : "/album/" + albumId + "/image/" + imageName,
		    	success : function(data) {
					if (typeof(callback) === "function")
						callback(data);							
				}
		    });
		},
		
		/**
		 * 删除相册
		 * @param albumId	相册ID
		 * @param callback	回调函数
		 */
		delAlbum : function (albumId, callback){	
			SureAjax.ajax({
				type : "DELETE",
				url : "/album/"+albumId,
				success : function(data) {
					if (typeof(callback) === "function")
						callback(data);							
				}
			});
			return;
		},
		
		/**
		 * 修改相册信息
		 * @param albumId	相册ID
		 * @param name		相册名
		 * @param description	相册描述
		 * @param callback		回调函数
		 */
		updateAlbum : function (albumId, name, description, callback){
			SureAjax.ajax({
				type : "PUT",
				url : "/album/"+albumId,
				dataType : "json",
				data : {
					name : name,
					description : description
				},
				success : function(data) {
					if (typeof(callback) === "function")
						callback(data);			
				}
			});	
		},
		
		/**
		 * 新建相册
		 * @param name	相册名字
		 * @param desc	相册内容
		 * @param groupId	相册所属组ID，null标示私人相册
		 * @param callback
		 */
		createAlbum : function (name, desc, groupId, callback){
			var param = {};
			param.name = name;
			param.description = desc;
			if (groupId != null)
				param.groupid = groupId;
			SureAjax.ajax({
				type : "POST",
				url : '/album/',
				dataType : "json",
				data : param,
				success : function(data) {
					callback(data);
				}
			});	
		},

		/**
		 * 显示相册上传照片页面
		 * @param albumId	相册ID
		 * @param frame		上传完成后更新相册显示的div
		 */
		gotoAlbumUploadPage : function (albumId, callback) {
			var url = "/album/" + albumId + "/uploader";
			PopupWindow.showUrl(url, {}, callback,"上传照片");
		},

		/**
		 * 显示相册内容
		 * @param albumId	相册ID
		 * @param showDiv	显示DIV
		 */

		gotoAlbumShow : function (albumId, showDiv,viewType,id) {
					if(viewType=="slider"){
						if(id!=null){
							showDiv.load('/album/'+ albumId  + '/image/?viewType=slider&&imgId='+id);
						}else{
							showDiv.load('/album/'+ albumId  + '/image/?viewType=slider');
						}
						$('#albumPagination').hide();
					}else{
						paging = new PagingTool2({
							url : '/album/'+ albumId  + '/image/?viewType=common',
							start : 0,
							limit : 8,
							totalUrl:'/album/'+ albumId  + '/image/',
							link_to : "javascript:void(0)",
							showDiv : showDiv,
							prev_text : "前一页",
							next_text : "后一页",
							paginationDiv : "#albumPagination",});
						paging.show();
					}
					
				},

		/**
				 * 从相册中批量删除图片
				 * @param albumId	相册ID
				 * @param imageNames	图片名称
				 * @param callback  回调函数
				 */
				removeImages : function(albumId, imageNames, callback){
					SureAjax.ajax({
						contentType: 'application/json',
				    	method : 'delete',
				    	dataType : 'json',
				    	url : "/album/" + albumId + "/images/",
				    	data : $.toJSON(imageNames),
				    	success : function(data) {
							if (typeof(callback) === "function")
								callback(data);							
						}
				    });
				},


		/**
		 * 到相册列表页
		 * @param pageLoader 相册的分页工具
		 */
		gotoAlbumList : function (pageLoader) {
			pageLoader.reload();
		},
		
		/**
		 * 到选择相册上传的页面
		 * @param groupId
		 */
		gotoGroupAlbumUploadPage : function (groupId, callback){
			var url = "/group/" + groupId + "/uploader";
			PopupWindow.showUrl(url, {}, callback,"上传照片");
		}

};


function buildUploader(albumId, uploader){
	SureAjax.ajax({
		url : "/album/" + albumId + "/image/",
		async : false,
		success : function(xhr){
			if (uploader != null)
				uploader.destroy();
			uploader = new ImgUploader({
				albumId : albumId,
				images : xhr.data,
			});
		}
	});
	return uploader;
}
