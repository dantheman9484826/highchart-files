/*
@author Daniel Berzanti <deebee2012@rocketmail.com>
*/

//flag to check whether swapOpenClose has run
var swappedClosePrice_raff=0;
var swappedClosePrice_se=0;
var drawOn=0;

// click event listner for RAFF profile

$(document).ready(function() {

	
	// Series Types Selection
	$("#set_candlestick").click(function() {	
		if (swappedClosePrice_raff==1) pageLoad('candlestick',0);
		else {
				// update method
				var stockchart = $('#container').highcharts('StockChart');
				stockchart.series[0].update({
					type: 'candlestick'});
		}
	});
	
	
	$("#set_ohlc").click(function() {	
		if(swappedClosePrice_raff==1) pageLoad('ohlc',0);
		else {
				// update method
				var stockchart = $('#container').highcharts('StockChart');
				stockchart.series[0].update({
					type: 'ohlc'});
		}
	});
	
	
	$("#set_spline").click(function() {
		if(swappedClosePrice_raff!=1) pageLoad('spline',1); // reload with swap
		else {
				var stockchart = $('#container').highcharts('StockChart');
				stockchart.series[0].update({
					type: 'spline'});
		}
	});

		
	$("#set_line").click(function() {
		if(swappedClosePrice_raff!=1)  pageLoad('line',1);  // reload with swap
		else {
				var stockchart = $('#container').highcharts('StockChart');
				stockchart.series[0].update({
				type: 'line'});
		}
	});
	
	
 	$("#set_area").click(function() {
		if(swappedClosePrice_raff!=1) pageLoad('area',1);  // reload with swap
		else {
				var stockchart = $('#container').highcharts('StockChart');
				stockchart.series[0].update({
				type: 'area', zIndex: 0});
		}
	}); 

	
	$("#set_log").click(function() {
		var stockchart = $('#container').highcharts('StockChart');
		stockchart.yAxis[0].update({
			type: 'logarithmic'});
	});
	
	
	var hidden=0;
	$("#hide_series").click(function() {
		// .toggle() doesnt work, use if/else
		var stockchart = $('#container').highcharts('StockChart');
		if (hidden) {
		stockchart.series[0].setVisible();
		//stockchart.series[4].setVisible();
		//stockchart.series[5].setVisible();
		hidden=0;
		} else {
		stockchart.series[0].setVisible();
		//stockchart.series[4].setVisible();
		//stockchart.series[5].setVisible();
		hidden=1;
		}
	});
	
		
});

