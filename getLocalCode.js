import request from "request";


async function getData(key, localName) {
    let url = 'http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList';
    let inputs = {
        'serviceKey': key,
        'pageNo': '1',
        'numOfRows': '3',
        'type': 'json',
        'locatadd_nm': encodeURIComponent(localName)
    }
    var queryParams = '?'
    for (const [key, value] of Object.entries(inputs)) {
        queryParams += encodeURIComponent(key)
        queryParams += '='
        queryParams += value
        queryParams += '&'
    }
    return new Promise((resolve, reject) => {
        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(response.body)
            } else {
                reject(error);
            }

        });
    })

}
export default async function getLocalCode(key, localName) {
    let strData = await getData(key, localName)
    let jsonData = JSON.parse(strData);
    if (jsonData['StanReginCd'] == undefined) {
        return {
            sigunguCd: undefined,
            bjdongCd: undefined
        }
    }
    let sigunguCd = jsonData['StanReginCd'][1]['row'][0]['sido_cd'] + jsonData['StanReginCd'][1]['row'][0]['sgg_cd']
    let bjdongCd = jsonData['StanReginCd'][1]['row'][0]['umd_cd'] + jsonData['StanReginCd'][1]['row'][0]['ri_cd']
    let code = {
        sigunguCd: sigunguCd,
        bjdongCd: bjdongCd
    }
    return code
}

// for test -----
//const apiKey = 'aQUDbtf5%2FhnQfDD1QlTQDIXg4u8ehBMJaznXm30DRArJYAZDb%2Fj4VM%2BeRqccmtjRfyxv5RCYirQST6j4w6%2BrlA%3D%3D'
//console.log(await getLocalCode(apiKey, '서울특별시'))