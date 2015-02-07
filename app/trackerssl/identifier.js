var TrackerSSL_Identifier = Backbone.Model.extend({
  unique_key: null,
  hostname: null,
  label: null,
  supports_ssl: false
});
var TrackerSSL_IdentifierCollection = Backbone.Collection.extend({
  model: TrackerSSL_Identifier,
  comparator: function( collection ){
    return( !collection.get( 'supportsSSL' ) );
  }
});

TrackerSSL_IdentifierCollection.prototype.add = function(identifier){
  var isDupe = this.any(function(_identifier){
    isDupe = (_identifier.get('unique_key') === identifier.get('unique_key'));
    if(isDupe && identifier.get('supports_ssl')){
      // this is to accommodate case where same identifier is used across supporting and non-ssl-supporting hostnames. 
      //Assumes that if SSL is turned on, then ID will be exclusively transmitted thru SSL.
      _identifier.set('supports_ssl', true);
    }
    return isDupe;
  });
  return isDupe ? false : Backbone.Collection.prototype.add.call(this, identifier);
}