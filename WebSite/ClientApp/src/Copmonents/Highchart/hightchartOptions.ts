export const hightchartOptions = {
    title: {
      text: ''
    },

    chart:{
      height: 450
    },

    mapNavigation: {
      enabled: false,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    colorAxis: {
      min: 0
    },

    series: [{
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }]
  };