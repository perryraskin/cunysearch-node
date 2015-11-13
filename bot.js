var qs = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');
var formTemplate = require('./form');

var Bot = function() {

};

Bot.prototype.submitSearch = function(inst, term, dept) {
    var options = {
        url: 'https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/GUEST/HRMS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?PortalActualURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fGUEST%2fHRMS%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&amp;PortalContentURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fGUEST%2fHRMS%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&amp;PortalContentProvider=HRMS&amp;PortalCRefLabel=Class%20Search&amp;PortalRegistryName=GUEST&amp;PortalServletURI=https%3a%2f%2fhome.cunyfirst.cuny.edu%2fpsp%2fcnyepprd%2f&amp;PortalURI=https%3a%2f%2fhome.cunyfirst.cuny.edu%2fpsc%2fcnyepprd%2f&amp;PortalHostNode=ENTP&amp;NoCrumbs=yes',
        headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'},
        jar: request.jar()
    };

    request.post(options, function(err, res, body) {
        if(err) {
            console.error(err);
            return;
        } 
        
        var parsed = cheerio.load(body);
        var key = parsed('form[name=\'win0\']>input[name=\'ICSID\']').val();

        var submit_options = {
            url: 'https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/GUEST/HRMS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL',
            form: qs.stringify(formTemplate.getTemplate(key, inst, term, dept)),
            headers: options.headers,
            jar: options.jar
        };

        request.post(submit_options, function(err, res, body) {
            request.post(submit_options, function(err, res, body) {
                console.log("Done", dept);
            });
        });
    });
};


module.exports = {
    Bot: Bot
}