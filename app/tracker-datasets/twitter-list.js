var TwitterList = {
	list: [],
	listFile: "app/tracker-datasets/twitterLists/defaultList.json",
	getList: function(){
		var xhr = new XMLHttpRequest();
	    xhr.open("GET", chrome.extension.getURL(this.listFile), false);
	    xhr.send(null);
	    return this.loadList(xhr.response);
	},
	loadList: function(listData){
		return JSON.parse(listData);
	}
}