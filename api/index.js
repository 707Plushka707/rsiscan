const app = require('express')();
const { v4 } = require('uuid');

var fs = require('fs');
var express = require('express');
var router = express.Router();
const path = require('path');
const delay = require('delay')
const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'sDZIAFhiLkf9k9ii4DHMVXIjtaqTE833Kp7Gjigg68KfvndwhfhlPkyz0Ofq3aRI',
    APISECRET: 'SHUuUgl7rzCtxV0n0liii09RCcj47OuDkdxDqNzb2gmHMYGOFwzbHes9hSeXbV1Z'
});
var RSI = require('technicalindicators').RSI;

app.get('/api', (req, res) => {
    res.header("Content-Type", 'application/json');
    res.sendFile(path.resolve('rsi.json'));
});
const main = async () => {

    console.time("Running");
    let pairList = [
        "RAYUSDT",
        "SUSHIUSDT",
        "CVCUSDT",
        "BTSUSDT",
        "HOTUSDT",
        "ZRXUSDT",
        "QTUMUSDT",
        "IOTAUSDT",
        "BTCBUSD",
        "WAVESUSDT",
        "ADAUSDT",
        "LITUSDT",
        "XTZUSDT",
        "BNBUSDT",
        "AKROUSDT",
        "HNTUSDT",
        "ETCUSDT",
        "XMRUSDT",
        "YFIUSDT",
        "FTTBUSD",
        "ETHUSDT",
        "ALICEUSDT",
        "ALPHAUSDT",
        "SFPUSDT",
        "REEFUSDT",
        "BATUSDT",
        "DOGEUSDT",
        "RLCUSDT",
        "TRXUSDT",
        "STORJUSDT",
        "SNXUSDT",
        "AUDIOUSDT",
        "XLMUSDT",
        "IOTXUSDT",
        "NEOUSDT",
        "UNIUSDT",
        "SANDUSDT",
        "DASHUSDT",
        "KAVAUSDT",
        "RUNEUSDT",
        "CTKUSDT",
        "LINKUSDT",
        "CELRUSDT",
        "RSRUSDT",
        "ADABUSD",
        "DGBUSDT",
        "SKLUSDT",
        "RENUSDT",
        "LPTUSDT",
        "TOMOUSDT",
        "MTLUSDT",
        "LTCUSDT",
        "DODOUSDT",
        "KSMUSDT",
        "EGLDUSDT",
        "BNBBUSD",
        "VETUSDT",
        "ONTUSDT",
        "IMXUSDT",
        "TRBUSDT",
        "MANAUSDT",
        "FLOWUSDT",
        "COTIUSDT",
        "CHRUSDT",
        "BAKEUSDT",
        "GRTUSDT",
        "FLMUSDT",
        "MASKUSDT",
        "EOSUSDT",
        "OGNUSDT",
        "SCUSDT",
        "BALUSDT",
        "STMXUSDT",
        "LUNAUSDT",
        "DENTUSDT",
        "KNCUSDT",
        "SRMUSDT",
        "ENJUSDT",
        "C98USDT",
        "ZENUSDT",
        "ATOMUSDT",
        "NEARUSDT",
        "SOLBUSD",
        "ENSUSDT",
        "BCHUSDT",
        "ATAUSDT",
        "IOSTUSDT",
        "HBARUSDT",
        "ZECUSDT",
        "TLMUSDT",
        "ANTUSDT",
        "ETHBUSD",
        "GALAUSDT",
        "AAVEUSDT",
        "GTCUSDT",
        "ALGOUSDT",
        "ICPUSDT",
        "LRCUSDT",
        "AVAXUSDT",
        "ARPAUSDT",
        "CELOUSDT",
        "ROSEUSDT",
        "MATICUSDT",
        "1INCHUSDT",
        "MKRUSDT",
        "PEOPLEUSDT",
        "THETAUSDT",
        "UNIUSDT",
        "LINAUSDT",
        "ARUSDT",
        "RVNUSDT",
        "FILUSDT",
        "NKNUSDT",
        "KLAYUSDT",
        "COMPUSDT",
        "SOLUSDT",
        "BTCUSDT",
        "OMGUSDT",
        "ICXUSDT",
        "BLZUSDT",
        "FTMUSDT",
        "YFIIUSDT",
        "BANDUSDT",
        "XRPBUSD",
        "DOGEBUSD",
        "XRPUSDT",
        "SXPUSDT",
        "CRVUSDT",
        "BELUSDT",
        "DOTUSDT",
        "XEMUSDT",
        "ONEUSDT",
        "ZILUSDT",
        "AXSUSDT",
        "DYDXUSDT",
        "OCEANUSDT",
        "CHZUSDT",
        "ANKRUSDT",
        "DUSKUSDT",
        "CTSIUSDT"
    ]
    let RSIlist = []
    console.log('===========================')
    console.log('Start RSI on binance socket')
    pairList.forEach(i => {
        RSIlist.push(getRSI(i, '5m', 6))
        RSIlist.push(getRSI(i, '15m', 6))
    })
    Promise.all(RSIlist).then(data => {
        //  console.log(data)
        fs.writeFile('rsi.json', JSON.stringify(data), err => {
            const t = new Date();
            if (err) {
                console.log(err)
                console.log("DB Error :" + t)
                console.log('Start Again')
                return
            } else {
                console.log("DB Suscces at :" + t)
                console.timeEnd("Running");
                console.log('End')
                console.log('===========================')
            }
            delay(10 * 1000).then(data => {

                main()
            });

        })


    })

}
main();


module.exports = app;