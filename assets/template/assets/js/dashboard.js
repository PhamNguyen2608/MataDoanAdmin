(function($) {
  'use strict';
  const socket = io('http://localhost:8000'); 
  socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });
  $.fn.andSelf = function() {
    return this.addBack.apply(this, arguments);
  }
  $(function() {
    if ($("#currentBalanceCircle").length) {
      var bar = new ProgressBar.Circle(currentBalanceCircle, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 12,
        trailWidth: 12,
        trailColor: '#0d0d0d',
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#d53f3a', width: 12 },
        to: { color: '#d53f3a', width: 12 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
      
          var value = Math.round(circle.value() * 100);
          circle.setText('');
      
        }
      });

      bar.text.style.fontSize = '1.5rem';
      bar.animate(0.4);  // Number from 0.0 to 1.0
    }
    const valuesObject = {
      "BZ": 75.00,
      "US": 56.25,
      "AU": 15.45,
      "GB": 25.00,
      "RO": 10.25,
      "GE": 33.25,
      // Add Vietnam's data value here
      "VN": 50.00,
      // Add more regions and values here
      "CA": 50.75,
      "IN": 20.15,
      "JP": 42.80,
    };
    function getCountryNameByCode(code) {
      // Implement your own logic to map region codes to country names
      // For example, you can create a lookup table or use an API to get the country name
      // In this example, we'll just return a placeholder name.
      const countryNames = {
        "BZ": "Belize",
        "US": "United States",
        "AU": "Australia",
        "GB": "United Kingdom",
        "RO": "Romania",
        "GE": "Georgia",
        "VN": "Vietnam",
      };
      return countryNames[code] || "Unknown";
    }
    function renderMap(countries ={},totalAccess =0){
      $('#audience-map').empty();
      $('#audience-map').vectorMap({
        map: 'world_mill_en',
        backgroundColor: 'transparent',
        panOnDrag: true,
        focusOn: {
          x: 0.5,
          y: 0.5,
          scale: 1,
          animate: true
        },
        series: {
          regions: [{
            scale: ['#3d3c3c', '#ff00f2'],
            values: countries,
          }]
        },
        onRegionTipShow: function (e, el, code) {
          // Get the country name based on the region code (code is the ISO2 country code)
          const countryName = getCountryNameByCode(code);
      
          // Customize the tooltip content to display the country name and its value (if available)
          let tooltipContent = `<b>${countryName}</b>`;
          const value = $('#audience-map').vectorMap('get', 'mapObject').series.regions[0].values[code];
          if (value !== undefined) {
            tooltipContent += `<br/>truy cập: ${totalAccess}`;
          }
          // Set the customized content to the tooltip
          el.html(tooltipContent);
        }
      });
    }
    if($('#audience-map').length) {
      renderMap();
      socket.on("receiveIPs",({ips,isActive})=>{
        const valuesObjectRoot = $('#audience-map').vectorMap('get', 'mapObject').series.regions[0].values;
        ips.map((ip)=>{
          const url =
            `https://geo.ipify.org/api/v2/country?apiKey=at_HZSu4YiWyrCy8BW7PzibJUtN5j5Ic&ipAddress=${ip}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if(isActive){
                valuesObjectRoot[data.location.country]=valuesObject[data.location.country];
                renderMap(valuesObjectRoot,ips.length);
              }
              else{
                // delete valuesObjectRoot[data.location.country]
                $('#audience-map').empty();
                $('#audience-map').vectorMap({
                  map: 'world_mill_en',
                  backgroundColor: 'transparent',
                  panOnDrag: true,
                  focusOn: {
                    x: 0.5,
                    y: 0.5,
                    scale: 1,
                    animate: true
                  },
                  series: {
                    regions: [{
                      scale: ['#3d3c3c', '#ff00f2'],
                      values: {
                      },
                    }]
                  },
                });
              }
            })
            .catch((error) => {
              console.error('Error fetching IP information:', error);
            });
        })
      })
    }
    if ($("#transaction-history").length) {
      var areaData = {
        labels: ["Paypal", "Stripe","Cash"],
        datasets: [{
            data: [55, 25, 20],
            backgroundColor: [
              "#111111","#00d25b","#ffab00"
            ]
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 70,
        elements: {
          arc: {
              borderWidth: 0
          }
        },      
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }
      var transactionhistoryChartPlugins = {
        beforeDraw: function(chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
      
          ctx.restore();
          var fontSize = 1;
          ctx.font = fontSize + "rem sans-serif";
          ctx.textAlign = 'left';
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
      
          var text = "$1200", 
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2.4;
      
          ctx.fillText(text, textX, textY);

          ctx.restore();
          var fontSize = 0.75;
          ctx.font = fontSize + "rem sans-serif";
          ctx.textAlign = 'left';
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffff";

          var texts = "Total", 
              textsX = Math.round((width - ctx.measureText(text).width) / 1.93),
              textsY = height / 1.7;
      
          ctx.fillText(texts, textsX, textsY);
          ctx.save();
        }
      }
      var transactionhistoryChartCanvas = $("#transaction-history").get(0).getContext("2d");
      var transactionhistoryChart = new Chart(transactionhistoryChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: transactionhistoryChartPlugins
      });
    }
    if ($("#transaction-history-arabic").length) {
      var areaData = {
        labels: ["Paypal", "Stripe","Cash"],
        datasets: [{
            data: [55, 25, 20],
            backgroundColor: [
              "#111111","#00d25b","#ffab00"
            ]
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 70,
        elements: {
          arc: {
              borderWidth: 0
          }
        },      
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }
      var transactionhistoryChartPlugins = {
        beforeDraw: function(chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
      
          ctx.restore();
          var fontSize = 1;
          ctx.font = fontSize + "rem sans-serif";
          ctx.textAlign = 'left';
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
      
          var text = "$1200", 
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2.4;
      
          ctx.fillText(text, textX, textY);

          ctx.restore();
          var fontSize = 0.75;
          ctx.font = fontSize + "rem sans-serif";
          ctx.textAlign = 'left';
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffff";

          var texts = "مجموع", 
              textsX = Math.round((width - ctx.measureText(text).width) / 1.93),
              textsY = height / 1.7;
      
          ctx.fillText(texts, textsX, textsY);
          ctx.save();
        }
      }
      var transactionhistoryChartCanvas = $("#transaction-history-arabic").get(0).getContext("2d");
      var transactionhistoryChart = new Chart(transactionhistoryChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: transactionhistoryChartPlugins
      });
    }
    if ($('#owl-carousel-basic').length) {
      $('#owl-carousel-basic').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayTimeout: 4500,
        navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
      });
    }
    var isrtl = $("body").hasClass("rtl");
    if ($('#owl-carousel-rtl').length) {
      $('#owl-carousel-rtl').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        rtl: isrtl,
        autoplay: true,
        autoplayTimeout: 4500,
        navText: ["<i class='mdi mdi-chevron-right'></i>", "<i class='mdi mdi-chevron-left'></i>"],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
      });
    }
    });
})(jQuery);