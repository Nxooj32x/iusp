Ext.define('Module.Operate.vote.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Operate.vote.Tools',
 		'Module.Operate.vote.model.VoteTopicModel'
  	],

	translateVoteTopicSource : function(v){
		return VOTE_TOPIC_COMBO.source[v];
	}
});