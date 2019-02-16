const fs = require('fs')
const content = JSON.parse(fs.readFileSync('./area.json', {
    encoding: 'utf-8'
}));
var data = [];
let p = Object.keys(content.province_list);
let c = Object.keys(content.city_list)
let d = Object.keys(content.county_list)
let district = {};

for (let i = 0; i < d.length; i++) {
    let ccode = d[i].substr(0, 4).padEnd(6, 0);
    if (!district[ccode]) {
        district[ccode] = [];
    }
    district[ccode].push({
        value: d[i],
        label: content.county_list[d[i]]
    })
}
let citys = {};

for (let i = 0; i < c.length; i++) {
    let ccode = c[i].substr(0, 2).padEnd(6, 0);
    if (!citys[ccode]) {
        citys[ccode] = [];
    }
    citys[ccode].push({
        value: c[i],
        label: content.city_list[c[i]],
        children: district[c[i]]
    })
}

for (let i = 0; i < p.length; i++) {
    data.push({
        value: p[i],
        label: content.province_list[p[i]],
        children: citys[p[i]]
    })
}

fs.writeFileSync("area.iview.json", JSON.stringify(data));