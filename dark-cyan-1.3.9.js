/*
 Dark Theme 1.3.9 for Highcharts JS
 @author Daniel Berzanti 2013 <deebee2012@rocketmail.com>
*/


Highcharts.theme = {
	
	chart: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0.1, y2: 0.5},
			stops: [
				[0, 'rgb(15, 15, 15)'],
				[0.7, 'rgb(63, 64, 73)']
			]
		}
	},
	
	title : {
		style : { color : '#5E88F7', fontFamily : 'Roboto Thin,arial,helvetica', fontWeight: 'bold'}
	},
	
	xAxis : {
		labels : {
			style : { color : '#C0C0C0'}
		}
	},
	
	yAxis : {
		// price data pane
		gridLineColor : '#697787',
		labels : {
			style : {color : '#5E88F7'}
		}
	},
			
	legend: {
		itemStyle: {
			color: '#CCC'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#333'
		}
	},
	
	labels: {
		style: {
			color: '#5E88F7'
		}
	},
	
	tooltip : {
		borderColor : '#5E88F7',
		backgroundColor : '#111',
		style : {fontSize : '11px', color : '#C0C0C0', padding: '8px'}
	},


	plotOptions : {
				candlestick : {
					upColor : '#FFFFFF',
					color : '#5E88F7',
					lineColor : '#5E88F7'
				},
	},

	toolbar: {
		itemStyle: {
			color: '#FFF'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#222',
			hoverSymbolStroke: '#222',
			theme: {
				fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.3, '#677183'],
						[0.8, '#444']
					]
				},
				stroke: '#000000'
			}
		}
	},
	
	rangeSelector : {
				inputStyle : { color : '#b9bbc8', fontFamily : 'Ubuntu,arial,helvetica', backgroundColor: '#000000', borderWidth: '1', borderColor: '#000000' },
				labelStyle : { color : '#b9bbc8'},
				inputBoxBorderColor : '#000000',
				buttonTheme: {
					fill: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0.4, '#666'],
							[0.6, '#222']
						]
					},
					stroke : '#555',
					style : {color : '#b2b2b2'},
					states: {
						hover: {
							fill: {
								linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
								stops: [
									[0.4, '#BBB'],
									[0.6, '#888']
								]
							},
							stroke: '#000000',
							style: {
								color: 'white'
							}
						},
						select: {
							fill: {
								linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
								stops: [
									[0.1, '#222'],
									[0.8, '#444']
								]
							},
							stroke: '#333',
							style: {
								color: '#15ADFF',
								fontWeight: 'normal'
							}
						}
					}
				}
				
	},

	navigator : {
		handles: {backgroundColor: '#000000', borderColor: '#425277'},
		maskFill : 'rgba(1, 1, 1, 0.5)',
		series : {lineColor : '#A6C7ED'},
		xAxis : {labels : { style : { color : '#5E88F7'}
		}}
	},

	scrollbar: {
		barBackgroundColor : {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0.15, '#2c2e38'],
				[0.4, '#101010']
			]
		},
		buttonBackgroundColor : {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0.2, '#333'],
				[0.5, '#000']
			]
		},
		barBorderRadius: 4,
		barBorderWidth: 0,
		buttonBorderWidth: 0,
		buttonBorderRadius: 4,
		buttonArrowColor : '#425277',
		rifleColor : '#425277',
		trackBackgroundColor: 'none',
		trackBorderWidth: 1,
		trackBorderRadius: 4,
		trackBorderColor: '#333'
	}
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);


