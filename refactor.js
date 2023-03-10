import invoices from "C:\Users\a0107\OneDrive\바탕 화면\학교\파이썬\invoices.json"
import plays from "C:\Users\a0107\OneDrive\바탕 화면\학교\파이썬\plays.json"

function statement(invoices,plays){
    let totalAmount = 0;
    let volumneCredits = 0;
    let result = '청구 내역 (고객명: ${invoice.customer})\n';
    const format = new Intl.NumberFormat("en-us",{style:"currency",currency:"USD",minimumFractionDigits:2}).format;
    for (let perf of invoices.performance){
        const play = plays[perf.playID];
        let thisAmount = 0;

        switch(play.type){
            case "tragedy"://비극
            thisAmount = 40000;
            if(perf.audience > 30){
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
            case "comedy": // 희극
            thisAmount = 30000;
            if(perf.audience > 20){
                thisAmount += 1000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
            default:
                throw new Error('알 수 없는 장르:${play.type}');

        }
        //포인트를 적립한다.
        volumneCredits += Math.max(perf.audience - 30, 0);
        //희극 관객 5명 마다 추가 포인트를 제공한다.
        if("comedy" === play.type) volumneCredits += Math.floor(perf.audience / 5);
        //청구 내역을 출력한다
        result += '${format(thisAmount/100)}(${perf.audience}석)\n';
        totalAmount += thisAmount;
    }
    result += '총액: ${format(totalAmount/100)}\n';
    result += '적립 포인트: ${volumeCredits}점\n';
    return result;

}

console.log(statement(invoices,plays));