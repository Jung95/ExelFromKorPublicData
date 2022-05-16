import fs from 'fs'
import readline from 'readline';

// 한 줄씩 읽어들이는 함수 정의
export default function parserByLocal(filename, local) {
    const header = '관리_건축물대장_PK|대장_구분_코드|대장_구분_코드_명|대장_종류_코드|대장_종류_코드_명|신_구_대장_구분_코드|신_구_대장_구분_코드_명|대지_위치|도로명_대지_위치|건물_명|시군구_코드|법정동_코드|대지_구분_코드|번|지|특수지_명|블록|로트|외필지_수|새주소_도로_코드|새주소_법정동_코드|새주소_지상지하_코드|새주소_본_번|새주소_부_번|대지_면적(㎡)|건축_면적(㎡)|건폐_율(%)|연면적(㎡)|용적_률_산정_연면적(㎡)|용적_률(%)|주_용도_코드|주_용도_코드_명|기타_용도|세대_수(세대)|가구_수(가구)|주_건축물_수|부속_건축물_수|부속_건축물_면적(㎡)|총_주차_수|옥내_기계식_대수(대)|옥내_기계식_면적(㎡)|옥외_기계식_대수(대)|옥외_기계식_면적(㎡)|옥내_자주식_대수(대)|옥내_자주식_면적(㎡)|옥외_자주식_대수(대)|옥외_자주식_면적(㎡)|허가_일|착공_일|사용승인_일|허가번호_년|허가번호_기관_코드|허가번호_기관_코드_명|허가번호_구분_코드|허가번호_구분_코드_명|호_수(호)|에너지효율_등급|에너지절감_율|에너지_EPI점수|친환경_건축물_등급|친환경_건축물_인증점수|지능형_건축물_등급|지능형_건축물_인증점수|생성_일자'
    var instream = fs.createReadStream(filename);
    var reader = readline.createInterface(instream, process.stdout);
    fs.open('./data/' + local + '.csv', 'w', function (err, fd) {
        if (err) throw err;
        console.log('file open complete');
    });
    fs.appendFile('./data/' + local + '.csv', header + '\n', function (err) {
        if (err) throw err;
    });

    var count = 0;

    // 한 줄씩 읽어들인 후에 발생하는 이벤트
    reader.on('line', function (line) {
        console.log('#: ' + count);
        count += 1;

        // 공백으로 구분
        var tokens = line.split('|');
        if (tokens.some((element) => {
                return element.includes(local)
            })) {
            fs.appendFile('./data/' + local + '.csv', line + '\n', function (err) {
                if (err) throw err;
            });
        }
    });

    // 모두 읽어들였을 때 발생하는 이벤트
    reader.on('close', function (line) {
        console.log('파일을 모두 읽음.');
    });
}

// 함수 실행
var filename = './data/metadata.txt';
parserByLocal(filename, '부여군');