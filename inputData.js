import readline from 'readline'


export function inputAddress() {
    let cli = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve, reject) => {
        cli.question('\'시도 시군구 읍면동 리\'를 입력해주세요.\n예시)서울특별시 강남구 개포동 || 충청남도 부여군 부여읍 동남리\n =>', answer => {
            cli.close();
            resolve(answer)
        });
    })
}

export function selectOutputs(outputs) {
    let cli = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve, reject) => {
        const selectedOutputs = []
        const selectedKorKeyList = []
        const keys = Object.keys(outputs);
        keys.forEach((korKey, index) => {
            console.log(index + ' : ' + korKey)
        })
        cli.question('출력하고 싶은 항목의 숫자를 쉼표(,)로 구분지어 입력해주세요. 예시)1,5,11 \n =>', answer => {
            answer = answer.replaceAll(' ', '') // 띄어쓰기 제거
            let selectedIndexList = answer.split(','); // 쉼표로 구분된 인덱스 리스트 생성
            selectedIndexList.forEach((keyIndex) => {
                if (!isNaN(keyIndex) && keyIndex !== '') {
                    selectedKorKeyList.push(keys[keyIndex])
                }

            })
            selectedKorKeyList.forEach((selectedKorKey) => {
                let obj = [selectedKorKey, outputs[selectedKorKey][0]]
                selectedOutputs.push(obj)
            })
            cli.close();
            resolve(selectedOutputs)
        })


    })
}

export function checkAddress(address) {
    let questionText = address
    questionText += '가 맞습니까? \n 맞으면 1, 틀리면 2 : ';
    let cli = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve, reject) => {
        cli.question(questionText, answer => {
            cli.close();
            if (answer == 1) {
                resolve(true)
            } else {
                console.log('다시입력해주세요');
                resolve(false)
            }
        });
    })
}