import request from "request";
import getLocalCode from "./getLocalCode.js";



async function getData(inputs) {
    let url = 'http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo';
    let queryParams = '?'
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
            console.log('다운로드 완료')
            if (!error && response.statusCode === 200) {
                resolve(body)
            } else {
                reject(error);
            }

        });
    })

}
export default async function getBrTitleInfo(apiKey, address) {
    let localCode = await getLocalCode(apiKey, address)
    if (localCode['sigunguCd'] == undefined) {
        console.log('일치하는 주소 코드를 찾지 못했습니다. 종료합니다.')
        return false
    }
    console.log('주소 코드를 찾았습니다.')
    console.log('시군구코드 : ' + localCode['sigunguCd'] + ', 법정동코드 : ' + localCode['bjdongCd'])
    console.log('데이터 다운로드 중')
    let inputs = {
        'serviceKey': apiKey,
        'sigunguCd': localCode['sigunguCd'],
        'bjdongCd': localCode['bjdongCd'],
        'platGbCd': '0',
        'bun': '',
        'ji': '',
        'startDate': '',
        'endDate': '',
        'numOfRows': '9999',
        'pageNo': '1',
        '_type': 'json',
    }
    let strData = await getData(inputs)
    let jsonData = JSON.parse(strData);
    let data = jsonData['response']['body']['items']['item']
    if (data !== undefined) {
        let length
        if (data.length == undefined) {
            length = 0
        } else {
            length = data.length
        }
        console.log('총 ' + length + ' 개 자료를 발견했습니다.');
    } else {
        console.log('일치하는 주소의 자료를 발견하지 못했습니다.');
    }
    return data
}