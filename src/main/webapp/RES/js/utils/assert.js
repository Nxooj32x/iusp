function Assert(){
   this.fnMap = {
     isEmpty:function(obj,eMsg){
		if(obj == "undefined" || obj == "" || obj.length <= 0) {
        	throw new Error(eMsg);
		}
     }
   };
}

Assert.trigger=function(obj,type,eMsg){
  try{
    var assert = new Assert();
	  assert.fnMap[type](obj,eMsg);
    assert = null;
  }catch(e){
	IuspMsg.tip("提示",e.message);
    throw new Error(eMsg);
  }
}