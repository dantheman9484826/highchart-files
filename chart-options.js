/*
@author Daniel Berzanti <deebee2012@rocketmail.com>
*/


var locationStr, intick, getTick;


getTick = "XJO";
locationStr = "data/" + getTick + ".json";
document.title = "[" + getTick + "] Chart";


// global start date to store the zoom properties
var startX = 1332734400000; // the xAxis min value to set chart range at 2 years

var sma1Period_raff = 50; 
var sma2Period = 99;
var emaPeriod = 9;
var emaSmooth = 0.19;

var macd_shortPeriod = 12;
var macd_longPeriod = 26;
var macd_smoothPeriod = 9;

var kline_inputTxt = 5;
var dline_inputTxt = 3;
var regPeriod = 500;


function pageLoad(series_type, swap) {



		$.getJSON(locationStr, function(data) {
		

	

				// -------------INDICATORS SECTION ------------------

						var sma9Data = new Array();
						var sma50Data = new Array();
						var sma100Data = new Array();
						var St_data_K = new Array();
						var St_data_d = new Array();
						var macd_data = new Array();
						var macdSignal_data = new Array();
						var regressionData = new Array(); // this holds the lrData and raffData objects for the doRegression call
						var lrData  = new Array();
						var raffData  = new Array();

						var sma9 = simple_ma(9);
						//var sma20bb = simple_ma(20);
						var sma50 = simple_ma(parseFloat(sma1Period_raff));
						var sma100 = simple_ma(parseFloat(sma2Period));
						var ema9 = exp_ma(parseFloat(emaPeriod), parseFloat(emaSmooth)); // some hacking required for smoothing period. Aim for best fit to data
						var sma3_St = simple_ma(parseFloat(dline_inputTxt));
						var ema9macd = exp_ma(parseFloat(macd_smoothPeriod), 2);
						var ema12macd = exp_ma(parseFloat(macd_shortPeriod), 1);
						var ema26macd = exp_ma(parseFloat(macd_longPeriod), 1);
					
						
						for (var i in data) {
							
							// Declare SMA arrays >> [[date][data]...]
							 sma9Data[i] = new Array(2);
							 sma50Data[i] = new Array(2);
							 sma100Data[i] = new Array(2);
							 
							// Declare upper & lower Bollinger Bands arrays >> [[date][lo][hi]..]
							//BB_data[i] = new Array(3);
							
							//  Declare Stochastic arrays >> [date][K-line] and [date][d-line]
							St_data_K[i] = new Array(2);
							St_data_d[i] = new Array(2);
							
							// Declare MACD arrays [date][MACDLine] and [date][SignaLine]
							macd_data[i] = new Array(2);
							macdSignal_data[i] = new Array(2);
							
							
							// Declare  price data arrays and other variables 
							 var n = data[i][0];			// date
							 var hi = data[i][2];			// high
							 var lo = data[i][3];			// low
							 var n2 = data[i][4];			// close price
							 //var bbmid = sma20bb(n2);
							 var KLine, dLine;
							 var macd=0;
							 var macdSignal=0;
							
							 
							 // SMAs
							 sma9Data[i][0] = n;
							 sma9Data[i][1] = ema9(n2);
							 //sma9Data[i][1] = sma9(n2);
							 
							 // Populate the SMA series
							 sma50Data[i][0] = n;
							 sma50Data[i][1] = sma50(n2);     
							 sma100Data[i][0] = n;
							 sma100Data[i][1] = sma100(n2);
							 
							 // Stochatics series
							 var K2avg=0;
							 var loopbackHi = [];
							 var loopbackLo = [];
							 var maxHi = 0;
							 var minLo = 0;
							 var stoch_loopback = parseFloat(kline_inputTxt);
							   
							 if (i >= stoch_loopback) {      // loopback period in days
								  
								for (var tw=0; tw < stoch_loopback; tw++)  {
									var reset = i-stoch_loopback;
									loopbackHi[tw] = data[reset+tw][2];
									loopbackLo[tw] = data[reset+tw][3];
									}
									
								// KLine
								maxHi = Math.max.apply(null, loopbackHi);		// get max high in loopback period
								minLo = Math.min.apply(null, loopbackLo);     	// get min low in loopback period		
								loopbackHi.length=0; loopbackLo.length=0; 		// reset arrays
								
								KLine = stochastic_KLine(maxHi,minLo,n2);
								
								// Force boundaries at 0 and 100
								if (KLine>=100) KLine=98; if (KLine<1) KLine=2;
								St_data_K[i][0] = n;
								St_data_K[i][1] = KLine;
								
								// d-line     	
								St_data_d[i][0] = n;
								dLine = sma3_St(KLine);
								if (dLine>=100) dLine=98; if (dLine<1) dLine=2;
								St_data_d[i][1] = dLine;
						 
							 } else { 
							 
								// K-line
								St_data_K[i][0] = n;
								KLine = stochastic_KLine(hi,lo,n2);
								if (KLine>=100) KLine=98; if (KLine<1) KLine=2;
								St_data_K[i][1] = KLine;
							 
								// d-line
								St_data_d[i][0] = n;
								dLine = sma3_St(KLine);
								if (dLine>=100) dLine=98; if (dLine<1) dLine=2;
								St_data_d[i][1] = dLine;
							 
							 }// endif
							 
							 
								
							// MACD indicator
								
							macd = ema12macd(n2) - ema26macd(n2);
							macdSignal = ema9macd(macd);
							// optional histogram as 3rd series
							// macdHistogram = macd - macdSignal;
								 
							// Populate the MACD series
							macd_data[i][0] = n;
							macd_data[i][1] = macd;
							macdSignal_data[i][0] = n;
							macdSignal_data[i][1] = macdSignal;
								 
										
						} //endfor
							
							
							
						regressionData = doLinearRegression(data, regPeriod, 1);
						lrData = regressionData[0];
						raffData = regressionData[1];
							
							
							
							
						if(!(series_type)) series_type="candlestick"; // load candle as default if blank
							
							
						//wait until series has been constructed before doing the swap so they are based on proper ohlc
					    if(swap==1) { 
							swapOpenClose(data); 
							swappedClosePrice_raff=1; 
							//console.log('swap has run. flag = '+swappedClosePrice_raff);
						  } else
							swappedClosePrice_raff=0; // ensure flag is reset to 0
							
						
					    drawChart();
								
							
							/* dump whole array	for (var c in lrData)  {
									document.write('<br>'+c+'. ');
									document.write(lrData[c]);
								} 
							*/

						
						
						
					
			
					// ---------------- CHART SECTION -------------------

					function drawChart() {

						myChart = new Highcharts.StockChart({
							
							chart : {
								ignoreHiddenSeries: false,
								renderTo : 'container',
								alignTicks: false,
								marginLeft : 25
							},

							plotOptions : {
								line : {
									lineWidth : 0.7
								},
								series : {animation : true}
							},
							
							rangeSelector : {
								inputDateFormat: '%e %b, %Y',
								inputEditDateFormat: '%d/%m/%Y',
								//selected : 1,
								buttons: [{
									type: 'month',
									count: 6,
									text: '6m'
								}, {
									type: 'year',
									count: 1,
									text: '1y'
								}, {
									type: 'year',
									count: 2,
									text: '2y'
								}, {
									type: 'year',
									count: 3,
									text: '3y'
								}, {
									type: 'year',
									count: 5,
									text: '5y'
								},  {
									type: 'year',
									count: 10,
									text: '10y'
								},	{
									type: 'all',
									text: 'All'
								}]
							},

							title : {
								text : getTick
							},
							
							tooltip : {
								valueDecimals : 2,
							},
							
							navigator : {
								enabled : true
							},

							xAxis : {
								//minPadding : 0.05,
								//maxPadding : 0.05,
								min: startX,
								events: {
										setExtremes: function(e) {
											startX = e.min;
											setTimeout(function() {
													//localStorage["zoom_raff"] = startX;
													console.log('zoom_raff: ' + startX + ' saved to localStorage. Trigger: ' + e.trigger);
													//console.log(localStorage.length+' items in localstorage');
													}, 10000);

										}
								}			

							},			
							
							yAxis : [{
								//minPadding : 0.05,
								//maxPadding : 0.05,						
								gridLineWidth : 0.8,
								height : 410
							},		
							{
								//Stochastics pane
								title : {text : 'stochastic (5,3)', style : {color : '#697787', fontWeight : 'normal' }},
								top : 480,
								height : 100,
								lineWidth : 1.5,
								gridLineColor : '#000000',
								lineColor : '#000000',
								min : 0,
								max: 100,
								plotBands : { color : '#282e3e', from : 0, to : 100 },
								plotLines : [{
									value : 20,
									color : '#000',
									dashStyle : 'dot',
									width : 1,
									}, {
									value : 80,
									color : '#000',
									dashStyle : 'dot',
									width : 1,
									zIndex : 1
									}],
								labels : {
									style : { color : '#333333' }
										}
							},  
							{ 
								//MACD pane
								title : {text : 'MACD (12,26)', style : {color : '#697787', fontWeight : 'normal' }},
								top : 584,
								height : 120,
								lineWidth : 0.8,
								gridLineColor : '#000000',
								lineColor : '#000000',
								plotBands : {color : '#282e3e', from : -1000, to : 1000 }
							}],
							
							series : [{
							// >>> SERIES DISPLAY TYPES <<<
								type : series_type, // ohlc, candlestick, spline...
								step : true,
								name : getTick,
								data : data,
								lineWidth : 1,
								dataGrouping : {
									enabled : false,
									units : [[
										'week', 		// unit name
										[1] 			// allowed multiples
									], [
										'month', 
										[1, 2, 3, 4, 6]
									],[
										'year',
										null
									]]
								}
								
							},
							{
								type : 'line',
								name : 'EMA',
								data : sma9Data,
								color : '#000000',
								enableMouseTracking : true,
								lineWidth : 0.8,
								index : 1
							},
							{
								type : 'line',
								name : 'SMA1',
								data : sma50Data,
								color : '#FF0000',
								enableMouseTracking : false,
								lineWidth : 0.8
							},
							{
								type : 'line',
								name : 'SMA2',
								data : sma100Data,
								color : '#00FF00',
								enableMouseTracking : false,
								lineWidth : 0.8
							},
			
							{
								type: 'spline',
								name : 'linReg',
								data : lrData,
								enableMouseTracking : true,
								color : '#F0F0F0',
								dashStyle : 'Dash',
								lineWidth : 1
							},
							{
								type: 'areasplinerange',
								name : 'RaffChannel',
								data : raffData,
								enableMouseTracking : false,
								color : '#839bfc',
								dashStyle : 'Dash',
								fillOpacity : 0.2,
								lineWidth : 1,
								yAxis : 0
							},
							{
								type : 'spline',
								name : 'Stochastic_K',
								data : St_data_K,
								color : '#0000FF',
								enableMouseTracking : false,
								yAxis : 1,
								lineWidth : 0.8

							}, 
							{
								type : 'spline',
								name : 'Stochastic_d',
								data : St_data_d,
								color : '#FF5050',
								enableMouseTracking : false,
								yAxis : 1,
								lineWidth : 0.8 
							}, 
							{
								type : 'spline',
								name : 'MACD Line',
								data : macd_data,
								color : '#00ff80',
								enableMouseTracking : false,
								yAxis : 2,
								lineWidth : 0.8
							},
							{
								type : 'line',
								name : 'Signal Line',
								data : macdSignal_data,
								color : '#FF5050',
								enableMouseTracking : false,
								yAxis : 2,
								lineWidth : 0.8
							}] //end series
						}); //ends chart	
					
					} // ends drawChart
		}); //ends $.getJSON
	



} //ends pageLoad

pageLoad();






