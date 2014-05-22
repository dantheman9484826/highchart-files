/*
	Retro theme for Highcharts JS
	@author Daniel Berzanti <deebee2012@rocketmail.com>
	Optimised for Linux default fonts
*/

Highcharts.theme = {
	colors: ["#4c8af1", "#86f73a", "#ef2929", "#7798bf", "#59ebf4", "#ee3d1c", "#fc64e8",
		"#1bed12", "#f80606", "#4472ea", "#1ef6f3"],
	chart: {
		backgroundColor: '#000000',
		borderColor: '#2e3436',
		borderWidth: 2,
		className: 'dark-container',
		plotBackgroundColor: '#000000',
		plotBorderColor: '#888a85',
		plotBorderWidth: 1
	},
	title: {
		style: {
			color: '#babdb6',
			font: 'bold 16px "Droid Sans", "DejaVu Sans", "Roboto Thin", Arial, Verdana, sans-serif'
		}
	},
	subtitle: {
		style: {
			color: '#666666',
			font: 'bold 12px "Droid Sans", "DejaVu Sans", "Roboto Thin", Arial, Verdana, sans-serif'
		}
	},
	xAxis: {
		gridLineColor: '#1e1f26',
		gridLineWidth: 1,
		labels: {
			style: {
				color: '#888a85'
			}
		},
		lineColor: '#666666',
		tickColor: '#666666',
		title: {
			style: {
				color: '#babdb6',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: '"Droid Sans", "DejaVu Sans", "Roboto Thin", Arial, Verdana, sans-serif'

			}
		}
	},
	yAxis: {
		gridLineColor: '#1e1f26',
		labels: {
			style: {
				color: '#A0A0A0'
			}
		},
		lineColor: '#A0A0A0',
		minorTickInterval: null,
		tickColor: '#A0A0A0',
		tickWidth: 1,
		title: {
			style: {
				color: '#CCC',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: '"Droid Sans", "DejaVu Sans", "Roboto Thin", Verdana, sans-serif'
			}
		}
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		borderWidth: 4,
		borderColor: '#333',
		shadow: false,
		style: {
			color: '#666'
		}
	},
	toolbar: {
		itemStyle: {
			color: 'silver'
		}
	},
	plotOptions: {
		series : { animation : false },
		line: {
			dataLabels: {
				color: '#5E88F7'
			},
			marker: {
				lineColor: '#333'
			}
		},
		spline: {
			marker: {
				lineColor: '#5E88F7'
			}
		},
		scatter: {
			marker: {
				lineColor: '#333'
			}
		},
		candlestick: {
			upColor : '#73d216',
			upLineColor: '#73d216',
			color : '#ef2929',
			lineColor: '#ef2929',
			lineWidth: 1
		},
		ohlc : {
			upColor : '#73d216',
			upLineColor: '#73d216',
			color : '#ef2929',
			lineColor: '#ef2929',
			lineWidth: 1		
		}
	},
	legend: {
		itemStyle: {
			font: '9pt "Droid Sans", "DejaVu Sans", "Roboto Thin", Verdana, sans-serif',
			color: '#A0A0A0'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#444'
		}
	},
	credits: {
		style: {
			color: '#666'
		}
	},
	labels: {
		style: {
			color: '#CCC'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			hoverSymbolStroke: '#FFFFFF',
			theme: {
				fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#606060'],
						[0.6, '#333333']
					]
				},
				stroke: '#000000'
			}
		}
	},
	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: '#000000',
			stroke: '#000000',
			style: {
				color: '#666666'
			},
		 states: {
			hover: {
			   fill: '#666666',
			   stroke: '#000000',
			   style: {
				  color: '#c0c0c0'
			   }
			},
			select: {
			   fill: '#333333',
			   stroke: '#000000',
			   style: {
				  color: 'white'
			   }
			}
		 }
		},
		inputBoxBorderColor : '#333',
		inputStyle: {
			backgroundColor: '#111',
			color: '#666'
		},
		labelStyle: {
			color: '#666'
		}
	},
	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(16, 16, 16, 0.5)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		}
	},
	scrollbar: {
		barBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
		barBorderColor: '#CCC',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
		buttonBorderColor: '#CCC',
		rifleColor: '#FFF',
		trackBackgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0, '#000'],
				[1, '#333']
			]
		},
		trackBorderColor: '#666'
	},
	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	legendBackgroundColorSolid: 'rgb(35, 35, 70)',
	dataLabelsColor: '#444',
	textColor: '#C0C0C0',
	maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
