const oneDigit = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const twoDigit = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
const tensPower = ["","","hundred", "thousand","","","million","","","billion"]

const less10 = (digit) => oneDigit[digit]
const less20 = (digit) => twoDigit[digit]
const less100 = (number) => number < 20 ? less20(number % 10) : tens[number.toString()[0]] + " " + less10(number.toString()[1])
const less1000 = (number) => {
    const [n3,n2,n1] = ('000'+number).slice(-3);
    let str = ""
    str += n3 != 0 ? less10(n3) +" "+ tensPower[2]+" " : ""
    str += n2 != 0 ? less100(+(n2+n1)) + " " : ""
    str += n1 != 0 && n2 == 0 ? less10(n1) : ""
    return str.trim()
}
const splitNum = (number) => {
    let numStr = number.toString()
    let l = numStr.length
    let i = l
    let splitedNum = ""

    while(i --> 0) {
        splitedNum = numStr.charAt(i) + splitedNum;
        if ((l - i) % 3 === 0 && i > 0) {
            splitedNum = ' ' + splitedNum;
        }
    }
    return splitedNum.split(" ")
}

module.exports = function toReadable(number) {
    const num = Number(number);
    if(typeof num !== "number" ) return ''
    if(num === 0) return "zero"

    const splitedNum = splitNum(num);

    

    
    return splitedNum.reverse().map((partOfNumber,index) => (
        less1000(partOfNumber) + ((index > 0) ? " "+ tensPower[index*3] : "")
        )).reverse().join(" ")
}