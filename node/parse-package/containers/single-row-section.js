var SingleRowSection = function(overhead, handler) {
    this.htmlKey = overhead.htmlKey;
    this.nbr = overhead.nbr;
    this.section = overhead.section;
    this.status = overhead.status;
    this.enrollmentInfo = null;

    this.time = handler.time;
    this.room = handler.room;
    this.instr = handler.instr;
};

SingleRowSection.prototype.attachEnrollmentInfo = function(e) {
    this.enrollmentInfo = e;
};

module.exports = SingleRowSection;