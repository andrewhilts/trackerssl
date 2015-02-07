(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popup'] = template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.ssl : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(7, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.ssl : depth0), {"name":"if","hash":{},"fn":this.program(9, data, depths),"inverse":this.program(24, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.identifiers : depth0), {"name":"if","hash":{},"fn":this.program(41, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.identifiers : depth0), {"name":"if","hash":{},"fn":this.program(43, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.uniqueHosts : depth0), {"name":"if","hash":{},"fn":this.program(70, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.brokenSSL : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  return "        <div class=\"bad\">\n";
  },"5":function(depth0,helpers,partials,data) {
  return "        <div class=\"good\">\n";
  },"7":function(depth0,helpers,partials,data) {
  return "    <div class=\"bad\">\n";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.brokenSSL : depth0), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.program(12, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.uniqueHosts : depth0), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.program(22, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"10":function(depth0,helpers,partials,data) {
  return "        <h1 id=\"leadMessage\">Website has a security hole.</h1>\n";
  },"12":function(depth0,helpers,partials,data) {
  return "        <h1 id=\"leadMessage\">This website is secured</h1>\n";
  },"14":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.brokenSSL : depth0), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"15":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "          <p id=\"trackerCount\"><strong>"
    + escapeExpression(((helper = (helper = helpers.percentageSSL || (depth0 != null ? depth0.percentageSSL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"percentageSSL","hash":{},"data":data}) : helper)))
    + "%</strong> of the trackers on this site could be helping protect you from <a href=\"https://www.eff.org/deeplinks/2013/12/nsa-turns-cookies-and-more-surveillance-beacons\" target=\"_blank\">NSA snooping</a>.</p><p>\n            But, even though "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " uses HTTPS, there's at least one third party that's been communicating insecurely. </p>\n            <p>Tell "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to fix it.</p>\n            <div id=\"widget\">\n              <div class=\"btn-o\" data-scribe=\"component:button\">\n                <a href=\"https://twitter.com/intent/tweet?text=Thanks%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "%20for%20supporting%20HTTPS%2C%20but%20since%20some%20of%20your%20site%27s%20trackers%20don%27t%2C%20it%20breaks%20your%20security!%20Fix%20that.%20%23trackerSSL\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n              </div>\n            </div>\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "          <p id=\"trackerCount\"><strong>"
    + escapeExpression(((helper = (helper = helpers.percentageSSL || (depth0 != null ? depth0.percentageSSL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"percentageSSL","hash":{},"data":data}) : helper)))
    + "%</strong> of the trackers on this site are helping protect you from <a href=\"https://www.eff.org/deeplinks/2013/12/nsa-turns-cookies-and-more-surveillance-beacons\" target=\"_blank\">NSA snooping</a>.\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.completeTrackersSSL : depth0), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.program(20, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"18":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            Why not thank "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " for being secure?</p>\n            <div id=\"widget\">\n              <div class=\"btn-o\" data-scribe=\"component:button\">\n                <a href=\"https://twitter.com/intent/tweet?text=Thank%20you%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "%20for%20supporting%20HTTPS%20on%20your%20site%20and%20securing%20your%20readership!%20%23trackerSSL\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n              </div>\n            </div>\n";
},"20":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            Tell "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to fix it.</p>\n            <div id=\"widget\">\n              <div class=\"btn-o\" data-scribe=\"component:button\">\n                <a href=\"https://twitter.com/intent/tweet?text=Thank%20you%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "%20for%20supporting%20HTTPS%20on%20your%20site%2C%20but%20since%20some%20of%20your%20trackers%20don%27t%2C%20it%20breaks%20your%20security!%20Might%20wanna%20fix%20that.%20%23trackerSSL\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n              </div>\n            </div>\n";
},"22":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <p id=\"trackerCount\">No 3rd party trackers on this site. Why don&lsquo;t you thank "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " for supporting HTTPS?</p>\n        <div id=\"widget\">\n          <div class=\"btn-o\" data-scribe=\"component:button\">\n            <a href=\"https://twitter.com/intent/tweet?text=Thank%20you%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "%20for%20supporting%20HTTPS%20on%20your%20site%20and%20securing%20your%20readership!%20%23trackerSSL\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n          </div>\n        </div>\n";
},"24":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.couldBeSSL : depth0), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.program(33, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"25":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <h1 id=\"leadMessage\">Website is insecure by default</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.uniqueHosts : depth0), {"name":"if","hash":{},"fn":this.program(26, data),"inverse":this.program(31, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"26":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "          <p id=\"trackerCount\"><strong>"
    + escapeExpression(((helper = (helper = helpers.percentageSSL || (depth0 != null ? depth0.percentageSSL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"percentageSSL","hash":{},"data":data}) : helper)))
    + "%</strong> of the trackers on this site could be protecting you from <a href=\"https://www.eff.org/deeplinks/2013/12/nsa-turns-cookies-and-more-surveillance-beacons\" target=\"_blank\">NSA snooping</a>.\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.majorityTrackersSSL : depth0), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.program(29, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"27":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            Tell "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to fix it.</p></p>\n            <div id=\"widget\">\n            <div class=\"btn-o\" data-scribe=\"component:button\">\n              <a href=\"https://twitter.com/intent/tweet?text=Hey%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "%20Why%20don't%20you%20secure%20your%20readership%20and%20enable%20HTTPS%20by%20default%20on%20your%20site%3F%20%23trackerssl\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n            </div>\n          </div>\n";
},"29":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            Tell "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to fix it.</p></p>\n            <div id=\"widget\">\n            <div class=\"btn-o\" data-scribe=\"component:button\">\n              <a href=\"https://twitter.com/intent/tweet?text=Hey%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + ",%20most%20of%20your%20site%27s%20ad%20trackers%20don't%20support%20HTTPS.%20Consider%20some%20that%20do!%20Secure%20your%20readership.%20%23trackerSSL\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n            </div>\n          </div>\n";
},"31":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "          <p id=\"trackerCount\">No 3rd party trackers on this site.</p>\n          <p>Since there are no third party dependencies preventing it, why don&lsquo;t you ask "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to adopt SSL by default?</p>\n          <div id=\"widget\">\n            <div class=\"btn-o\" data-scribe=\"component:button\">\n              <a href=\"https://twitter.com/intent/tweet?text=Hey%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "%20Why%20don't%20you%20secure%20your%20readership%20and%20enable%20HTTPS%20by%20default%20on%20your%20site%3F%20%23trackerssl\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n            </div>\n          </div>\n";
},"33":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <h1 id=\"leadMessage\">This website is insecure.</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.uniqueHosts : depth0), {"name":"if","hash":{},"fn":this.program(34, data),"inverse":this.program(39, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"34":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "          <p id=\"trackerCount\"><strong>"
    + escapeExpression(((helper = (helper = helpers.percentageSSL || (depth0 != null ? depth0.percentageSSL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"percentageSSL","hash":{},"data":data}) : helper)))
    + "%</strong> of the trackers on this site could be protecting you from <a href=\"https://www.eff.org/deeplinks/2013/12/nsa-turns-cookies-and-more-surveillance-beacons\" target=\"_blank\">NSA snooping</a>.\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.majorityTrackersSSL : depth0), {"name":"if","hash":{},"fn":this.program(35, data),"inverse":this.program(37, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"35":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            Tell "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to fix it.</p>\n            <div id=\"widget\">\n            <div class=\"btn-o\" data-scribe=\"component:button\">\n              <a href=\"https://twitter.com/intent/tweet?text=Hey%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + ",%20most%20of%20your%20site%27s%20ad%20trackers%20support%20HTTPS.%20Why%20don't%20you%20secure%20your%20readership%20and%20do%20the%20same%3F%20%23trackerSSL\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n            </div>\n          </div>\n";
},"37":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            Tell "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to fix it.</p>\n            <div id=\"widget\">\n            <div class=\"btn-o\" data-scribe=\"component:button\">\n              <a href=\"https://twitter.com/intent/tweet?text=Hey%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + ",%20most%20of%20your%20site%27s%20ad%20trackers%20don't%20support%20HTTPS.%20Consider%20some%20that%20do!%20Secure%20your%20readership.%20%23trackerSSL\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n            </div>\n          </div>\n";
},"39":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "          <p id=\"trackerCount\">No 3rd party trackers on this site.</p>\n          <p>Since there are no third party dependencies preventing it, why don&lsquo;t you ask "
    + escapeExpression(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"domain","hash":{},"data":data}) : helper)))
    + " to adopt SSL?</p>\n          <div id=\"widget\">\n            <div class=\"btn-o\" data-scribe=\"component:button\">\n              <a href=\"https://twitter.com/intent/tweet?text=Hey%20"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "%20Why%20don't%20you%20secure%20your%20readership%20and%20enable%20HTTPS%20by%20default%20on%20your%20site%3F%20%23trackerssl\" target=\"_blank\" class=\"btn\" id=\"b\"><i></i><span class=\"label\" id=\"l\">Tweet</span></a>\n            </div>\n          </div>\n";
},"41":function(depth0,helpers,partials,data) {
  return "      <div class=\"menu\">\n        <span id=\"identifierBtn\" class=\"\">Identifiers</span> | \n        <span id=\"trackerBtn\" class=\"\">All Trackers</span>\n      </div>\n";
  },"43":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "      <div id=\"identifiers\" class=\"\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.ssl : depth0), {"name":"if","hash":{},"fn":this.program(44, data, depths),"inverse":this.program(60, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "              <p class=\"small\"><strong>Legend</strong></p>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.ssl : depth0), {"name":"if","hash":{},"fn":this.program(63, data, depths),"inverse":this.program(68, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div>\n";
},"44":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.brokenSSL : depth0), {"name":"if","hash":{},"fn":this.program(45, data, depths),"inverse":this.program(47, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        \n        <div class=\"hostsContainer\">\n        <ul id=\"badHosts\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.identifiers : depth0), {"name":"each","hash":{},"fn":this.program(49, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        </ul>\n        </div>\n";
},"45":function(depth0,helpers,partials,data) {
  return "        <h2><i class=\"fa fa-user\"></i> Insecure Identifiers</h2>\n        <p>Unique IDs about your web browsing habits have been <strong>insecurely sent</strong> to third parties.</p>\n";
  },"47":function(depth0,helpers,partials,data) {
  return "        <h2><i class=\"fa fa-user\"></i> Secure Identifiers</h2>\n        <p>Unique IDs about your web browsing habits have been <strong>securely sent</strong> to third parties.</p>\n";
  },"49":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "            <li>\n";
  stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1].brokenSSL : depths[1]), {"name":"if","hash":{},"fn":this.program(50, data, depths),"inverse":this.program(55, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </li>\n";
},"50":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "              <span class=\"unique_key\"><i class=\"fa fa-search\"></i> "
    + escapeExpression(lambda((depth0 != null ? depth0.unique_key : depth0), depth0))
    + "</span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsSSL : depth0), {"name":"if","hash":{},"fn":this.program(51, data),"inverse":this.program(53, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "              <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</span> <span class=\"identifier\">"
    + escapeExpression(lambda((depth0 != null ? depth0.key_name : depth0), depth0))
    + "</span>\n";
},"51":function(depth0,helpers,partials,data) {
  return "                <i class=\"fa fa-unlock\"></i>\n";
  },"53":function(depth0,helpers,partials,data) {
  return "                <i class=\"fa fa-ban\"></i>\n";
  },"55":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsSSL : depth0), {"name":"if","hash":{},"fn":this.program(56, data),"inverse":this.program(58, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"56":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                <span class=\"unique_key\"><i class=\"fa fa-search\"></i> "
    + escapeExpression(lambda((depth0 != null ? depth0.unique_key : depth0), depth0))
    + "</span>\n                <i class=\"fa fa-lock\"></i> <span title=\""
    + escapeExpression(((helper = (helper = helpers.hostname || (depth0 != null ? depth0.hostname : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hostname","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</span> <span class=\"identifier\">"
    + escapeExpression(lambda((depth0 != null ? depth0.key_name : depth0), depth0))
    + "</span>\n";
},"58":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                <span class=\"unique_key\"><i class=\"fa fa-search\"></i> "
    + escapeExpression(lambda((depth0 != null ? depth0.unique_key : depth0), depth0))
    + "</span>\n                <i class=\"fa fa-ban\"></i> <span title=\""
    + escapeExpression(((helper = (helper = helpers.hostname || (depth0 != null ? depth0.hostname : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hostname","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</span> <span class=\"identifier\">"
    + escapeExpression(lambda((depth0 != null ? depth0.key_name : depth0), depth0))
    + "</span>\n";
},"60":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <h2><i class=\"fa fa-user\"></i> Insecure Identifiers</h2>\n        <p>Unique IDs about your web browsing habits have been <strong>insecurely sent</strong> to third parties.</p>\n        <div class=\"hostsContainer\">\n        <ul id=\"badHosts\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.identifiers : depth0), {"name":"each","hash":{},"fn":this.program(61, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </ul>\n        </div>\n";
},"61":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <li>\n              <span class=\"unique_key\"><i class=\"fa fa-search\"></i> "
    + escapeExpression(lambda((depth0 != null ? depth0.unique_key : depth0), depth0))
    + "</span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsSSL : depth0), {"name":"if","hash":{},"fn":this.program(51, data),"inverse":this.program(53, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "              <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</span> <span class=\"identifier\">"
    + escapeExpression(lambda((depth0 != null ? depth0.key_name : depth0), depth0))
    + "</span>\n            </li>\n";
},"63":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.brokenSSL : depth0), {"name":"if","hash":{},"fn":this.program(64, data),"inverse":this.program(66, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"64":function(depth0,helpers,partials,data) {
  return "            <p class=\"small\"><i class=\"fa fa-unlock\"></i> Tracking IDs <strong>could</strong> be sent safely if this site was secure.</p>\n            <p class=\"small\"><i class=\"fa fa-ban\"></i> Tracking IDs <strong>do not</strong> support secure transmission.</p>\n";
  },"66":function(depth0,helpers,partials,data) {
  return "          <p class=\"small\"><i class=\"fa fa-lock\"></i> Tracking IDs <strong>are</strong> sent with some safety measures.</p>\n          <p class=\"small\"><i class=\"fa fa-ban\"></i> Tracking IDs <strong>do not</strong> support secure transmission.</p>\n";
  },"68":function(depth0,helpers,partials,data) {
  return "          <p class=\"small\"><i class=\"fa fa-unlock\"></i> Tracking IDs <strong>could</strong> be sent safely if this site was secure.</p>\n          <p class=\"small\"><i class=\"fa fa-ban\"></i> Tracking IDs <strong>do not</strong> support secure transmission.</p>\n";
  },"70":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "        <div id=\"trackers\" class=\"\">\n        <h2><i class=\"fa fa-cloud-upload\"></i> All trackers</h2>\n        <p>At least "
    + escapeExpression(((helper = (helper = helpers.uniqueHostsTotal || (depth0 != null ? depth0.uniqueHostsTotal : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"uniqueHostsTotal","hash":{},"data":data}) : helper)))
    + " third parties know you are on this webpage.</p>\n        <div class=\"hostsContainer\">\n        <ul id=\"thirdPartyHosts\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.ssl : depth0), {"name":"if","hash":{},"fn":this.program(71, data, depths),"inverse":this.program(81, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </ul>\n                <p class=\"small\"><strong>Legend</strong></p>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.ssl : depth0), {"name":"if","hash":{},"fn":this.program(84, data, depths),"inverse":this.program(89, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n";
},"71":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.requests : depth0), {"name":"each","hash":{},"fn":this.program(72, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"72":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "              <li>\n                <span class=\"unique_key\"><i class=\"fa fa-globe\"></i> "
    + escapeExpression(lambda((depth0 != null ? depth0.hostname : depth0), depth0))
    + "</span>\n";
  stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1].brokenSSL : depths[1]), {"name":"if","hash":{},"fn":this.program(73, data, depths),"inverse":this.program(78, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                \n                <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</span>\n              </li>\n";
},"73":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsSSL : depth0), {"name":"if","hash":{},"fn":this.program(74, data),"inverse":this.program(76, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"74":function(depth0,helpers,partials,data) {
  return "                  <i class=\"fa fa-unlock\"></i>\n";
  },"76":function(depth0,helpers,partials,data) {
  return "                  <i class=\"fa fa-ban\"></i>\n";
  },"78":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsSSL : depth0), {"name":"if","hash":{},"fn":this.program(79, data),"inverse":this.program(76, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"79":function(depth0,helpers,partials,data) {
  return "                  <i class=\"fa fa-lock\"></i>\n";
  },"81":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.requests : depth0), {"name":"each","hash":{},"fn":this.program(82, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"82":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "              <li>\n                <span class=\"unique_key\"><i class=\"fa fa-globe\"></i> "
    + escapeExpression(lambda((depth0 != null ? depth0.hostname : depth0), depth0))
    + "</span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.supportsSSL : depth0), {"name":"if","hash":{},"fn":this.program(74, data),"inverse":this.program(76, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</span>\n              </li>\n";
},"84":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.brokenSSL : depth0), {"name":"if","hash":{},"fn":this.program(85, data),"inverse":this.program(87, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"85":function(depth0,helpers,partials,data) {
  return "            <p class=\"small\"><i class=\"fa fa-unlock\"></i> Tracker <strong>could</strong> be tracking safely if this site was secure.</p>\n            <p class=\"small\"><i class=\"fa fa-ban\"></i> Tracker <strong>does not</strong> support secure transmission.</p>\n";
  },"87":function(depth0,helpers,partials,data) {
  return "            <p class=\"small\"><i class=\"fa fa-lock\"></i> Tracker <strong>is</strong> tracking with some safety measures.</p>\n            <p class=\"small\"><i class=\"fa fa-ban\"></i> Tracker <strong>does not</strong> support secure transmission.</p>\n";
  },"89":function(depth0,helpers,partials,data) {
  return "        <p class=\"small\"><i class=\"fa fa-unlock\"></i> Tracker <strong>could</strong> be tracking safely if this site was secure.</p>\n        <p class=\"small\"><i class=\"fa fa-ban\"></i> Tracker <strong>does not</strong> support secure transmission.</p>\n";
  },"91":function(depth0,helpers,partials,data) {
  return "<div class=\"bad\">  \n  <h1>Error</h1>\n  <p>Page loaded before extension initialized.</p>\n  <p>Please <strong>Refresh the page</strong> to see the report!</p>\n  <p>If error persists, the page is probably not a normal web page loaded through HTTP or HTTPS.</p>\n</div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.tab : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.program(91, data, depths),"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true,"useDepths":true});
})();