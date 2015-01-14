var TwitterList = {
	list: [],
	listFile: "twitterLists/defaultList.json",
	getList: function(){
		var xhr = new XMLHttpRequest();
	    // Use blocking XHR to ensure everything is loaded by the time
	    // we return.
	    //var that = this;
	    //xhr.onreadystatechange = function() { that.loadRuleSet(xhr); }
	    xhr.open("GET", chrome.extension.getURL(this.listFile), false);
	    //xhr.open("GET", chrome.extension.getURL(rule_list[i]), true);
	    xhr.send(null);
	    return this.loadList(xhr.response);
	},
	loadList: function(listData){
		return JSON.parse(listData);
	}
}