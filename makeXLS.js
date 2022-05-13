import xlsx from "json-as-xlsx";

export default function makeXLS(jsonData, outputs) {
    let columns = []
    outputs.forEach(output => {
        columns.push({
            label: output[0],
            value: output[1]
        })
    });
    let data = [{
        sheet: "Sample",
        columns: columns,
        content: jsonData
    }]

    let settings = {
        fileName: "output", // Name of the resulting spreadsheet
        extraLength: 10, // A bigger number means that columns will be wider
        writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    }

    xlsx(data, settings) // Will download the excel file
    console.log('출력완료')
}