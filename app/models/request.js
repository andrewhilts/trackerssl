var TrackerSSL_Request = Backbone.Model.extend({
  initialize: function(params){
    this.set('url', params.url);
    this.generateURLfragments();

    this.set('requests', new TrackerSSL_RequestCollection());
  },
  thirdPartyChecker: function(firstPartyDomain){
    if(this.get('domain') !== firstPartyDomain){
      this.set('isThirdParty', true);
    }
    else{
      this.set('isThirdParty', false);
    }
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
  getPercentageSSL: function(){
    var totalUniqueHosts = this.getTotalUniqueHosts();
    var secureHosts = this.get('secureHosts');

    if(totalUniqueHosts && secureHosts){
      return Math.floor(secureHosts.length / totalUniqueHosts * 100);
    }
    else{
      throw(new Error("No hosts or secure hosts found for this URL"));
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
  }
});

var TrackerSSL_RequestCollection = Backbone.Collection.extend({
  model: TrackerSSL_Request,
  comparator: function( collection ){
    return( collection.get( 'supportsSSL' ) );
  }
});

// Only add unique hostnames to request collection
TrackerSSL_RequestCollection.prototype.add = function(request){
  var isDupe = this.any(function(_request){
    return _request.get('hostname') === request.get('hostname');
  });
  return isDupe ? false : Backbone.Collection.prototype.add.call(this, request);
}