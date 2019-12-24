/**
 * Created by Heath on 2019/11/6.
 */
const fs = require('fs-extra');
const path = require('path');
const JSONP = require('node-jsonp');
const FilesCreateTime = require('../src/data/FilesCreateTime.json');

function buildEntry(file, res) {
    fs.writeFileSync(path.join(__dirname, '../src/data/' + file + '.json'), JSON.stringify(res));
}

function getList() {
    let parames = {
        key: "RSNBZ-7DULW-2POR3-RCEVZ-ADLA5-VPBNZ"
    };
    let url = "https://apis.map.qq.com/ws/district/v1/list";
    parames.output = "jsonp";
    let addressJson = {};
    JSONP(url, parames, res => {
        if (res.result && res.result[0].length > 0) {
            addressJson.list = res.result[0];
            buildEntry('province', addressJson);
            getNext(addressJson);
        }
    });
}

function getNext(data) {
    let parames = {
        key: "RSNBZ-7DULW-2POR3-RCEVZ-ADLA5-VPBNZ"
    };
    let url = "https://apis.map.qq.com/ws/district/v1/getchildren";
    parames.output = "jsonp";
    let addressObj = {};
    let index = 0;
    let a = setInterval(e => {
        parames.id = data.list[index].id;
        JSONP(url, parames, res => {
            if (res.result && res.result[0].length > 0) {
                addressObj[parames.id] = res.result[0];
                index++;
                if (index === data.list.length) {
                    buildEntry('city', addressObj);
                    clearInterval(a);
                    getNext2(addressObj, data);
                }
            }
        });
    }, 250);
}

function getNext2(data, data2) {
    let parames = {
        key: "RSNBZ-7DULW-2POR3-RCEVZ-ADLA5-VPBNZ"
    };
    let url = "https://apis.map.qq.com/ws/district/v1/getchildren";
    parames.output = "jsonp";
    let addressObj = {};
    let i = 0;
    let j = 0;
    let a = setInterval(e => {
        let json = data[data2.list[i].id];
        parames.id = json[j].id;
        JSONP(url, parames, res => {
            if (res.result && res.result[0].length > 0) {
                addressObj[parames.id] = res.result[0];
            }
            j++;
            if (j === json.length) {
                j = 0;
                i++;
            }
            if (i === 34) {
                buildEntry('county', addressObj);
                clearInterval(a);
            }
        });
    }, 250);
}

const pathsToCheck = ['./src/data/county.json', './src/data/city.json', './src/data/province.json'];
let check = true;
pathsToCheck.forEach(val => {
    if (!fs.existsSync(val))
        check = false;
});
let nowTime = new Date().getTime();
if (check) {
    if (FilesCreateTime.allAddress) {
        if (Math.floor((nowTime - FilesCreateTime.allAddress) / (1000 * 60 * 60 * 24)) > 30) {
            FilesCreateTime.allAddress = nowTime;
            buildEntry('FilesCreateTime', FilesCreateTime);
            getList();
        }
    } else {
        FilesCreateTime.allAddress = nowTime;
        buildEntry('FilesCreateTime', FilesCreateTime);
        getList();
    }
} else {
    FilesCreateTime.allAddress = nowTime;
    buildEntry('FilesCreateTime', FilesCreateTime);
    getList();
}
