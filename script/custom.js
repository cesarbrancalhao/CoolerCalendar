Date.prototype.$format = function (format) {
    const map = {
        'd': this.getDate(),
        'm': this.getMonth() + 1,
        'Y': this.getFullYear(),
        'H': this.getHours(),
        'i': this.getMinutes(),
        's': this.getSeconds(),
    };

    return format.replace(/[d,m,Y,H,i,s]/g, matched => map[matched]);
};