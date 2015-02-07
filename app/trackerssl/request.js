var TrackerSSL_Request = Backbone.Model.extend({
  initialize: function(params){
    var that = this;
    this.set('url', params.url);
    this.generateURLfragments();
    this.setTwitterHandle();
    this.setLabel();
    this.set('isIdentifier', false);

    this.set('requests', new TrackerSSL_RequestCollection());
    this.on("change:cookies", this.cookieTest);
    // this.get('requests').on('change:cookies', function(request, cookies){
    //   // that.yolo(request, cookies);
    // });
  },
  thirdPartyChecker: function(firstPartyDomain){
    if(this.get('domain') !== firstPartyDomain){
      this.set('isThirdParty', true);
    }
    else{
      this.set('isThirdParty', false);
    }
  },
  setLabel: function(){
    if(hostnameObj && hostnameObj[this.get('domain')]){
      this.set('label', hostnameObj[this.get('domain')]);
    }
    else{
      this.set('label', this.get('hostname'));
    }
  },
  setTwitterHandle: function(){
    var twitterHandle;
    if(twitterHostnames[this.get('hostname')]){
      twitterHandle = twitterHostnames[this.get('hostname')];
    }
    else if(twitterHostnames[this.get('domain')]){
      twitterHandle = twitterHostnames[this.get('domain')];
    }
    else{
      twitterHandle = this.get('domain');
    }
    this.set('twitterHandle', twitterHandle);
  },
  generateURLfragments: function(){
    var oldURL = this.get('url'),
    newURL;
    if(!oldURL){
      throw(new Error("No initial URL provided"));
    }
    // Parse old URL
    newURL = new URI(oldURL);
    // Normalise hosts such as "www.example.com."
    // From EFF's HTTPS Everywhere
    var canonical_host = newURL.hostname();
    if (canonical_host.charAt(canonical_host.length - 1) == ".") {
      while (canonical_host.charAt(canonical_host.length - 1) == ".")
        canonical_host = canonical_host.slice(0,-1);
      newURL.hostname(canonical_host);
    }
    this.set({
      hostname: newURL.hostname(),
      domain: newURL.domain(),
      path: newURL.path(),
      protocol: newURL.protocol(),
      href: newURL.href()
    });
  },
  isSSL: function(){
    return (this.get('protocol') === "https");
  },
  getUniqueHosts: function(){
    var requests = this.get('requests'),
    uniqueHosts;

    if(requests){
      uniqueHosts = _.uniq(requests.pluck('hostname'));
      this.set('uniqueHosts', uniqueHosts);
      console.log(uniqueHosts.length, requests.length);
      return this.get('uniqueHosts');
    }
    else{
      throw(new Error("No requests made from this URL"));
    }
  },
  getTotalUniqueHosts: function(){
    var uniqueHosts = this.get('requests');
    if(uniqueHosts){
      return uniqueHosts.length;
    }
    else{
      throw(new Error("No unique hosts set"));
    }
  },
  getSecureHosts: function(){
    var requests = this.get('requests');
    if(requests){
      var urls_supporting_https = requests.where({'supportsSSL': true});
      secureHosts = _.uniq(new TrackerSSL_RequestCollection(urls_supporting_https).pluck('hostname'));
      this.set('secureHosts', secureHosts);
      return this.get('secureHosts');
    }
    else{
      throw(new Error("No requests made from this URL"));
    }
  },
  getInsecureHosts: function(){
    var requests = this.get('requests');
    if(requests){
      var urls_not_supporting_https = requests.where({'supportsSSL': false});
      inSecureHosts = _.uniq(new TrackerSSL_RequestCollection(urls_not_supporting_https).pluck('hostname'));
      this.set('inSecureHosts', inSecureHosts);
      return this.get('inSecureHosts');
    }
    else{
      throw(new Error("No requests made from this URL"));
    }
  },
  hasBrokenHTTPS: function(){
    var requests = this.get('requests');
    if(requests && this.isSSL()){
      var urls_not_https = requests.where({'protocol': "http"});
      if(urls_not_https.length > 0){
        this.set('hasBrokenHTTPS', true);
        return true;
      }
      else{
        this.set('hasBrokenHTTPS', false);
        return false;
      }
    }
    else{
      this.set('hasBrokenHTTPS', false);
      return false;
    }
  },
  getIdentifiers: function(){
    var requests = this.get('requests');
    if(requests){
      var identifiers = requests.where({'isIdentifier': true});
      var identCollection = new TrackerSSL_IdentifierCollection();
      for(i in identifiers){
        identifier = identifiers[i].get('identifier');
        identifier.set('supportsSSL', identifiers[i].get('supportsSSL'));
        identCollection.add(identifier);
      }
      identifiers = identCollection.toJSON();
      this.set('identifiers', identifiers);
      return this.get('identifiers');
    }
    else{
      throw(new Error("No requests made from this URL"));
    }
  },
  getPercentageSSL: function(){
    var totalUniqueHosts = this.getTotalUniqueHosts();
    var secureHosts = this.get('secureHosts');

    if(totalUniqueHosts && secureHosts){
      return Math.floor(secureHosts.length / totalUniqueHosts * 100);
    }
    else{
      return 100;
    }
  },
  isMajorityTrackersSSL: function(){
    if(this.getPercentageSSL() > 50){
      return true;
    }
    else{
      return false;
    }
  },
  isCompleteTrackersSSL: function(){
    if(this.getPercentageSSL() == 100){
      return true;
    }
    else{
      return false;
    }
  },
  cookieTest: function(){
    var cookies = this.get('cookies');
    for(i in cookies){
      isIdent = false;
      cookie = cookies[i];
      name = cookie.name.toLowerCase();
      value = cookie.value.toLowerCase();
      if(name.match(".*id$") || name.match("ident") || name.match("_id_") || name.match("fingerprint")){
        isIdent = true;
      }
      else if(value.match(".*id$") || value.match("ident") || value.match("_id_") || value.match("id=") || isGUID(value)){
        isIdent = true;
      }
      if(isIdent){
        this.set("isIdentifier", true);
        this.set("identifier", new TrackerSSL_Identifier({
          "key_name": name,
          "unique_key": value,
          "hostname": this.get('hostname'),
          "label": this.get('label')
        }));
      }
    }
  }
});

var TrackerSSL_RequestCollection = Backbone.Collection.extend({
      model: TrackerSSL_Request,
      comparator: function( collection ){
        return( !collection.get( 'supportsSSL' ) );
      }
});
// Only add unique hostnames to request collection
TrackerSSL_RequestCollection.prototype.add = function(request){
  var isDupe = this.any(function(_request){
    return _request.get('hostname') === request.get('hostname');
  });
  return isDupe ? false : Backbone.Collection.prototype.add.call(this, request);
}