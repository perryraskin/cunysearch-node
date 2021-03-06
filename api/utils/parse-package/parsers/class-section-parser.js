import cheerio from 'cheerio';

const ClassSectionParser = function(nbr, section, status) {
    this.nbr = nbr;
    this.section = section.text().replace('\n', ' ');
    this.section = section.text().replace('<br />', ' ');
    this.htmlKey = section.attr('id');
    this.status = status;
};

export default ClassSectionParser;