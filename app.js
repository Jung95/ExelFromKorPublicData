import * as inputData from './inputData.js'
import getBrTitleInfo  from './getBrTitleInfo.js'
import makeXLS from './makeXLS.js'
import outputs from './outputs.js'
import config from './config.js'

const apiKey = config['apiKey']
async function main() {
    let address
    let addressFlag = false
    while (!addressFlag) {
        address = await inputData.inputAddress()
        addressFlag = await inputData.checkAddress(address)
    }
    console.log('검색중')
    let data = await getBrTitleInfo(apiKey, address)
    if(!data){
        return false
    }
    let selectedOutputs = await inputData.selectOutputs(outputs);
    makeXLS(data, selectedOutputs)
}

main()
