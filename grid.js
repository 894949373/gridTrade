#!/usr/bin/env node

let initialPrice = 1 //初始价格
let initialBuySum = 10000 //初始买入金额
let totalSum = 0 //总的买入金额
let maxLoss = 60 // 最大跌幅
let oneGridRange = 5 //每一格跌幅
const fixPrice = function(price){
	let result = Math.round(price * 10000)
	return (Math.round(result / 100) / 100).toFixed(2);
}
const calcBuySum = function(lossRange){
	//跌幅小于20%，金额不变，跌幅大于20%,每一格金额增加20%
	let increaseRange = 20 //每次增加幅度
	if (lossRange <=20) {
		return initialBuySum;
	}else{
		let t = Math.round((lossRange - 20) / oneGridRange)
		let result =  Math.pow(1+increaseRange/100,t) * initialBuySum
		return Math.round(result)
	}
}
console.log('买入价格', '卖出价格', '幅度','买入金额')
let previousGridBuyPrice = 0;
for (let i = 100; i >= 100 - maxLoss; i-= oneGridRange) {
	let buyPrice = fixPrice(i * initialPrice / 100)
    let sellPrice =  previousGridBuyPrice == 0 ? fixPrice(buyPrice * ( 100 + oneGridRange) / 100) : previousGridBuyPrice
    previousGridBuyPrice = buyPrice
    let buySum = calcBuySum(100-i)
    totalSum += buySum
    console.log(`  ${buyPrice}  `,`  ${sellPrice}  `,`${fixPrice(i/100)}`,`  ${buySum}`)
}
console.log('总计买入：',totalSum)