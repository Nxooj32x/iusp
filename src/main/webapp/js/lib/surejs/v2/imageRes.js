(function($) {
	var baseUrl = "/api/imageRes/";
	window.SureIR = {

		allIR : [],

		copyBookIl : function(bookId, srcBookIds, callback) {
			SureAjax.ajax({
				url : '/book/' + bookId + "/imageLink/copy",
				type : "PUT",
				headers : {
					Accept : "application/json"
				},
				contentType : 'application/json',
				dataType : "json",
				data : JSON.stringify({
					srcIds : srcBookIds
				}),

				success : callback
			});
		},

		getBookIL : function(bookId, callback){
			SureAjax.ajax({
				url : '/book/' + bookId + "/imageLink/",
				type : "GET",
				headers : {
					Accept : "application/json"
				},

				success : callback
			});
		},

		getBookIL_paging : function(bookId,start,limit, callback){
			SureAjax.ajax({
				url : '/book/' + bookId + "/imageLink/",
				type : "GET",
				headers : {
					Accept : "application/json"
				},
				data : {
					start : start,
					limit : limit
				},
				success : callback
			});
		},

		deleteIL : function(bookId, checksum, callback){
			SureAjax.ajax({
				url : "/book/" + bookId + "/imageLink/" + checksum,
				type : "DELETE",
				headers : {
					Accept : "application/json"
				},
				success : callback,
				parseError : false,
				error : function(response){
					SureMsg.msg("图片已经入册，不能删除 !");
				}
			});
		},

		deleteILBatch : function(bookId, checksumList, callback){
			SureAjax.ajax({
				url : "/book/" + bookId + "/imageLinkbatch",
				type : "DELETE",
				headers : {
					Accept : "application/json"
				},
				data:JSON.stringify({checksumList:checksumList}),
				success : function(successresult){
					if(typeof (callback) == 'function'){
						callback(successresult);
					}
				},
				parseError : false,
			});
		},


		deleteILByChecksum : function(bookid, checksum, callback){
			SureAjax.ajax({
				url : "/book/"+ bookid + "/imageLink/" + checksum,
				type : "DELETE",
				headers : {
					Accept : "application/json"
				},
				success : callback,
				parseError : false,
				error : function(response){
					SureMsg.msg("图片已经入册，不能删除 !");
				}
			});
		},

	    addIR : function(ir, callback){
	    	SureAjax.ajax({
		        url : baseUrl,
		        type : "POST",
		        headers : {
			        Accept : "application/json"
		        },
		        contentType : 'application/json',
		        dataType : "json",
		        data : JSON.stringify(ir),
		        success : callback
		    });
	    },

		addIL : function(bookId, name, desc, ir, callback){
			SureAjax.ajax({
				url : '/book/' + bookId + "/imageLink/?name=" + name + "&desc=" + desc,
				type : "POST",
				headers : {
					Accept : "application/json"
				},
				contentType : 'application/json',
				dataType : "json",
				data : JSON.stringify(ir),
				success : callback
			});
		},

		addILInAlbum : function(bookId, name, desc, ir, albumId,  callback){
			SureAjax.ajax({
				url : '/book/' + bookId + "/imageLink/?albumId="+ albumId +"&name=" + name + "&desc=" + desc,
				type : "POST",
				headers : {
					Accept : "application/json"
				},
				contentType : 'application/json',
				dataType : "json",
				data : JSON.stringify(ir),
				success : callback
			});
		},
	    
	    addIRFromWechat : function(serverId, callback){
			SureAjax.ajax({
		        url : baseUrl + "wechat/" + serverId,
		        type : "POST",
		        headers : {
			        Accept : "application/json"
		        },
		        success : callback
		    });
	    },
	    
	    getIRByChecksum : function(checksum, found, notFound){
	    	var ir = null;
	    	var async = typeof(found) == "function"? true : false;
	    	SureAjax.ajax({
	    		async:async,
	    		parseError : false,
		        url : baseUrl + "checksum/" + checksum,
		        type : "GET",
		        headers : {
			        Accept : "application/json"
		        },
		        success : function(ret){
					ir=ret;
		        	if(typeof(found) == "function")found(ret);
		        },
		        error : function(ret){
		        	if(typeof(notFound) == "function")notFound();
		        }
		    });
	    	return ir;
	    },

		checkILByChecksum : function(checksum, bookId, found, notFound, isAddToBook){
			var il = null;
			var async = typeof(found) == "function"? true : false;
			var url = '/book/' + bookId + "/imageLink/" + checksum;
			if (isAddToBook == false) {
				url = url + "?addToBook=false";
			}
			SureAjax.ajax({
				async:async,
				parseError : false,
				url : url,
				type : "GET",
				headers : {
					Accept : "application/json"
				},
				success : function(ret){
					if(typeof(found) == "function")found(ret);
				},
				error : function(ret){
					if(typeof(notFound) == "function")notFound();
				}
			});
			return il;
		},
	    
	    getImageExif : function(irId, found){
	    	var ir = null;
	    	SureAjax.ajax({
		        url : baseUrl + irId + "/exif",
		        type : "GET",
		        headers : {
			        Accept : "application/json"
		        },
		        success : function(ret){
		        	if(typeof(found) == "function")found(ret);
		        },
		        error : function(ret){
		        	if(typeof(notFound) == "function")notFound();
		        }
		    });
	    	return ir;
	    },

	    toDate : function(str){
			// 2015-12-10 17:18:02 -->  2015/12/10 17:18:02
			var strs = str.replace(':', '/').replace(':', '/');
			return new Date(strs);
	    },
	    
	    /**
	     * 通过七牛文件构建ImageRes对象
	     * @param up
	     * @param file
	     * @param res
	     * @param exif
	     * @returns {___anonymous4896_4897}
	     */
	    createIRFromQiniu : function(up, file, res, exif){
	    	var ir = {};
	    	exif = exif || {};
	    	var domain = up.getOption('domain');
	    	Qiniu.domain = domain;
	    	var imageInfo = Qiniu.imageInfo(res.key);
	    	if (domain.charAt(domain.length-1) == "/"){
				domain = domain.substring(0, domain.length - 1);
			}
	        var url = domain + "/"+ encodeURI(res.key);
	    	ir.name = file.name;
	    	ir.src = url;
	    	ir.uploadTime = new Date();
	    	ir.checksum = file.md5;
	    	var photoTime = exif.DateTime || exif.DateTimeOriginal;
	    	ir.photoTime = photoTime ? SureIR.toDate(photoTime) : null;
	    	ir.format = imageInfo.format;
	    	ir.width = imageInfo.width;
	    	ir.height = imageInfo.height;
	    	ir.colorModel = imageInfo.colorModel;
			ir.orientation = imageInfo.orientation;
	    	ir.linkNum = 0;
	    	if (exif.Model)
	    		ir.model = exif.Model;
			else if (exif.Software)
				ir.model = exif.Software;
	    	ir.exif = {
	    		checksum : ir.checksum,
	    		jsonExif :  JSON.stringify(exif)
	    	};
	    	return ir;
	    },

		isExist : function(file, bookId, existCb, noExistCb, isAddToBook){
			SureIR.calMd5(file, function(md5){
				SureIR.checkILByChecksum(md5, bookId, function(ret){
					if(ret){
						if(typeof(existCb) === "function")existCb(ret);
					}
				}, function(){
					if(typeof(noExistCb) === "function")noExistCb(md5);
				}, isAddToBook);
			});
		},
	    
	    isIRExist : function(file, existCb, noExistCb){
    		SureIR.calMd5(file, function(md5){
    			SureIR.getIRByChecksum(md5, function(ret){
    				if(ret){
        				if(typeof(existCb) === "function")existCb(ret);
        			} 
    			}, function(){
        			if(typeof(noExistCb) === "function")noExistCb(md5);
    			});
    		});
	    },
	    
	    calMd5 : function(file, cb){

			try {
				//文件分割方法（注意兼容性）
				var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;

				//最小需要截取部分进行MD5计算的文件大小 1MB
				var minNeedSliceSize=1048576;

				//取前后及中间多少字节进行MD5计算
				var len=50;

				var blob;
				if(minNeedSliceSize<file.size){
					var file1=blobSlice.call(file, 0, len);
					var file2=blobSlice.call(file, file.size/2-len, file.size/2+len);
					var file3=blobSlice.call(file, file.size-len, file.size);
					blob=new Blob([file1,file2,file3])
				}else {
					blob=new Blob([blobSlice.call(file, 0, file.size)]);
				}

				var fileReader = new FileReader();
				//创建md5对象（基于SparkMD5）
				var	spark = new SparkMD5();
				fileReader.onload = function(e) {
					spark.appendBinary(e.target.result);
					var md5 = spark.end();
					console.info("计算的-Hash", md5);
					if(typeof(cb) === "function"){
						cb(md5);
					}
				};

				fileReader.readAsDataURL(blob);
			}catch (e){
				console.log(e);
				this.calMd5_fullFile(file, cb);
			}

	    },
		calMd5_fullFile : function(file, cb){
			//文件分割方法（注意兼容性）
			var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
			//2M分割
				chunkSize = 2097152,
				chunks = Math.ceil(file.size / chunkSize),
				currentChunk = 0,

			//创建md5对象（基于SparkMD5）
				spark = new SparkMD5();

			var fileReader = new FileReader();
			fileReader.onload = function(e) {
				console.log("读取文件", currentChunk + 1, "/", chunks);
				//每块交由sparkMD5进行计算
				spark.appendBinary(e.target.result);
				currentChunk++;

				//如果文件处理完成计算MD5，如果还有分片继续处理
				if (currentChunk < chunks) {
					loadNext();
				} else {
					var md5 = spark.end();
					console.log("finished loading");
					console.info("计算的Hash", md5);
					if(typeof(cb) === "function"){
						cb(md5);
					}
				}
			};
			//处理单片文件的上传
			function loadNext() {
				var start = currentChunk * chunkSize, end = start + chunkSize >= file.size ? file.size : start + chunkSize;

				if("readAsBinaryString" in fileReader)
					fileReader.readAsBinaryString(blobSlice.call(file, start, end));
				else
					fileReader.readAsText(blobSlice.call(file, start, end));
			}
			loadNext();
		},
	    
	    uploader : function(options, init){
	    	/**
	    	 * 所属ID
	    	 */
	    	this.belongId = options.belongId;
	    	
	    	/**
	    	 * 所属类型
	    	 */
	    	this.belongType = 'book';
	    	
	    	this.bucket = options.bucket || 'yearbook-album';
	    	this.domain = options.domain || 'http://' + me.bucket + '.yearbook.com.cn/';
	    	
	    	init = $.extend({}, {
	    		'Error': function(up, err, errTip) {
		        	if  (err.code === plupload.FILE_SIZE_ERROR) {
		        		errTip = "图片太大了，换一个小的吧";
		        		SureMsg.alert(errTip);
		        	} else {
		        		console.log(errTip);
		        	}
		        },
		        'Key' : function(up, file) {
					var uuid = file.md5 || new UUID().id; 
					return "imageRes/" + uuid;
				}
	    	}, init);

	    	
	    	var tokenOpts = {uptoken_url : "/qiniu/upToken?scope=" + this.bucket};
			if (options.uptoken){tokenOpts = {};}
	    	
	    	options = $.extend({}, SureIR.qiniuDefaults, tokenOpts, options, {
	    	    init: init
	    	});
	    	
	    	if (!options.container) {
	    		options.container = 'j-uploadParent';
	    		options.browse_button = 'j-brower_button';
	            if ($("#j-uploadParent").length == 0) {
	                $("body").append('<div class="hidden" id="j-uploadParent">   <input type="button" class="hidden" id="j-brower_button">  </div>');
	            }
	    	} 
	    	
	    	this.qiniuUploader = Qiniu.uploader(options);
	    	this.qiniuUploader.originalUrl = {};
	    	
	    	this.startUpload = function(){this.qiniuUploader.start();} ;

	    	this.stopUpload =function(){this.qiniuUploader.stop();} ;
	    	
	    	var  qiniuUp = this;

	    	this.addLoaclImg = function (img) {
	            if (qiniuUp.currentFile) {
	                qiniuUp.qiniuUploader.removeFile(qiniuUp.currentFile);
	                qiniuUp.currentFile = null;
	            }
	            if (typeof(img) === 'object') {
	                qiniuUp.qiniuUploader.addFile(img);
	            } else if (typeof(img) === 'string') {
	                var upImg = new mOxie.Image();
	                upImg.onload = function () {
	                    var file = upImg.getAsBlob();
	                    qiniuUp.qiniuUploader.originalUrl[file.uid] = img;
	                    qiniuUp.qiniuUploader.addFile(file);
	                };
	                upImg.onerror = function () {
	                    SureMsg.hideLoadBar();
	                };
	                upImg.load(img);
	            }
	        };
	    
	    },
	    
	   qiniuDefaults : {
		   runtimes:'gears,html5,flash',
		   flash_swf_url: '/js/lib/plupload/Moxie.swf',
		   silverlight_xap_url: '/js/lib/plupload/Moxie.xap',
		   dragdrop: true,
		   chunk_size: '4Mb', // 分割上传，七牛那边会报上传错误：请求报文格式错误
		   max_retries:1,//当发生plupload.HTTP_ERROR错误时的重试次数
		   filters: {
			 // 
			   max_file_size: '30mb',
			   prevent_duplicates : true //不允许选取重复文件
		   },
		   mime_types : 'image/*',
		   auto_start: false,
	   }
	    
	};
}(jQuery));