var when = require('when');
var api = require('request-promise').defaults({auth: require('./password.json')});

var source = 'http://regionmap-dev.nationalmap.nicta.com.au/admin_bnds_abs/rest';
var dest =       'http://geoserver.nationalmap.nicta.com.au/admin_bnds_abs/rest';

api({ url: source + '/styles.json',  json: true }).then(function(body) {
    var styles = body.styles.style;
    console.log(styles[0]);
    var p = [];
    styles.forEach(function(s) {
        if (s.name.match(/^border_/)) {
            console.log('Loading ' + s.name);
            p.push(api({
                url: s.href.replace(/\.json$/, '.sld')
            }).then(function(body) {
                var replacing = false;
                var testprefix = '';
                return api({ 
                    url: dest + '/styles' + (replacing ? '/' + testprefix + s.name + '.sld' : ''),
                    qs: { name: testprefix + s.name, raw: true }, 
                    method: replacing ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/vnd.ogc.sld+xml' },
                    body: body
                });
            }));
        }
    });
    return when.all(p);
});
