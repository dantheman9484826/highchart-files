/*
@author Daniel Berzanti <deebee2012@rocketmail.com>
*/


function loadDrawing() {
	if (drawOn) {
	drawOn=0;
	document.getElementById('canvas_container').style.visibility="hidden";
	document.getElementById('dtool').style.visibility="hidden";
									
	} else {
	drawOn=1;
	document.getElementById('canvas_container').style.visibility="visible";
	document.getElementById('dtool').style.visibility="visible";
			}
} //end loadDrawing


// Indicator functions

function simple_ma(period) {	// from http://rosettacode.org/wiki/Averages/Simple_moving_average#JavaScript
    var nums = [];
    return function(num) {
        nums.push(num); // progress to next element in series
        if (nums.length > period)
            nums.splice(0,1);  // remove the tail (1st element)
        var sum = 0;
        for (var i in nums)
            sum += nums[i];
        var n = period;
        if (nums.length < period)
            n = nums.length;
        return(sum/n);
    }
} //end sma


function exp_ma(period, smoothing) {
var nums = [];
var previousEMA, currentEMA;

if (smoothing=="") smoothing = 2;  //default smoothing is 2/(period+1); 
var multiplier = smoothing/(period + 1); 

return function(src) {		
	nums.push(src); // progress to next element in series
	if (nums.length > period)
		nums.splice(0,1);  // remove the tail (1st element )
				
	var initSMA = simple_ma(period);
						
	for (var i in nums) {
		if (nums.length < period) 			
			currentEMA = initSMA(nums[i]); //initialise with SMA				
		else
			currentEMA = multiplier*(nums[i] - previousEMA)  + previousEMA;
		//endif		
		previousEMA = currentEMA;
	} //endfor		
	return(currentEMA);
	} //end recursive function
} //end ema


function stochastic_KLine(h,l,c) {
	var K,t1,t2;
	t1 = c-l;
	t2 = h-l;
	if ((t1=='') | (t2=='')) K=0;
	else
	K = (t1/t2) * 100;
return K;	
} //stochastic_KLine

var errorCount=0;

function errorReport(errID, n) {

	var errText, errType;
	
	if (errID===0) { errText="Cannot build regression series: regression period is outside the chart boundary"; errType = "Fatal Error"; }
	if (errID===1) { errText="Sub-zero values present in lower Raff channel. Logarithmic scale will destabilise this chart. Use Linear or remove Raff channels"; errType = "Warning"; }
	if (isNaN(n)) n=1;

	console.log(n + ' ' + errType + 's: ' + errText);
}


function doLinearRegression(input_series, reg_lb_period, channels) {

	// 1. Linear regression line section
		
	var dataEnd = input_series.length;		// the last element of the price data series
	var lr_period = parseFloat(reg_lb_period);	// set the period for linear regression analysis 1130 878 250 342 530
	var lrStart = dataEnd - lr_period;  	// array pointer			
	var sum_x = 0;
	var sum_y = 0;
	var sum_xy = 0;
	var sum_xx = 0;
	var sum_yy = 0;
	var slope, intercept, rline;
	var n = lr_period;
		
	// define and prefill the lr output series
	var outputSeries = Array();
	var lrSeries = new Array();
	
	for (var x=0; x<dataEnd; x++)  {
		var prefill = input_series[x][0];
		// build a new second dimension each record
		lrSeries[x] = new Array(2);
		lrSeries[x][0] = prefill;
	}
		
		
	var start_i = 0;

	// data collection for loop: copies the data for selected period
	if ( (dataEnd > lr_period) && (lr_period > 1) ) {  //make sure enough data first
			
		for (var i=start_i; i<n; i++) {
			var reset = lrStart + i;
			// populate the lin. reg. data
			var X = input_series[reset][0];
			var Y = input_series[reset][4]; // hi=2 lo=3 close=4
		
			sum_x += X;
			sum_y += Y;
			sum_xy += (X*Y);
			sum_xx += (X*X);
			sum_yy += (Y*Y);
					
		} //endfor
			
				
		// Now calculate the slope, intercept & rline for that period
		//r2 = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
					
		slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
		slope = slope.toFixed(11); //an attempt to straighten the slope line
		intercept = (sum_y - slope * sum_x)/n;
				
		// collect the difference between rline and close so the min/max can be searched
		var diffs = [];  
			
		//  Now populate the linear regression series  'Y' with the results
		for (var i=start_i; i<n; i++) {
			var reset = lrStart + i;
			var X = input_series[reset][0];
			rline = (slope*X) + intercept; 
			diffs[i] = input_series[reset][4] - rline;
			lrSeries[reset][1] = parseFloat(rline);
		} //end 2nd for
				
		outputSeries[0] = lrSeries;	
				
				
		// 2. Channels section
			
		if (channels) {
				
			// define and prefill raff series
			var raffSeries = new Array();
									
			for (var x=0; x<dataEnd; x++)  {
				var prefill = input_series[x][0];
				// build a new second dimension each record
				raffSeries[x] = new Array(3);
				raffSeries[x][0] = prefill;
			}
			
			if (slope < 0)  {
				for (var i=start_i; i<n; i++) {
				var reset = lrStart + i;
				var lowerRaff, upperRaff, maxDiff;
				maxDiff = -1 * Math.min.apply(null, diffs);  // returns lowest -ve integer
				upperRaff = lrSeries[reset][1] + maxDiff;
				lowerRaff = lrSeries[reset][1] - maxDiff;
				raffSeries[reset][1] = parseFloat(upperRaff); 
				raffSeries[reset][2] = parseFloat(lowerRaff);
				if (lowerRaff < 0) errorCount+=1; // sub-zero value error
				}
			} else {
				for (var i=start_i; i<n; i++) {
				var reset = lrStart + i;
				var lowerRaff, upperRaff, maxDiff;
				maxDiff = Math.max.apply(null, diffs);  // returns highest +ve integer
				upperRaff = lrSeries[reset][1] + maxDiff;
				lowerRaff = lrSeries[reset][1] - maxDiff;							
				raffSeries[reset][1] = parseFloat(upperRaff); 
				raffSeries[reset][2] = parseFloat(lowerRaff); 
				}					
			} //end if  slope
						
			outputSeries[1] = raffSeries;
			if (errorCount > 0) errorReport(1,errorCount);
				
		} // endif channels
				
	} else errorReport(0); // endif enough data check
		
	return outputSeries;
	
} //end function dLinReg
	

function swapOpenClose(xSeries) {

	var len = xSeries.length;
		
	for (var i=0; i<len; i++) {
		
	var current_open = xSeries[i][1];
	var current_close = xSeries[i][4];
			
	//swap em
	xSeries[i][1] = current_close;
	xSeries[i][4] = current_open;
		
	}
}

