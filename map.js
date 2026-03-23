// Each row: [city, state, co2 (MT/cap), poc_gap (pts), ozone (ppb), lat, lon]

const RAW = [
  ["Abilene, TX","TX",10.9,5.8,39.6,32.4487,-99.7331],
  ["Abington Township, PA","PA",4.0,1.7,38.4,40.1204,-75.1171],
  ["Ada, OK","OK",6.6,1.4,42.8,34.7743,-96.6783],
  ["Akron, OH","OH",6.8,2.9,39.3,41.0814,-81.519],
  ["Alafaya, FL","FL",2.5,2.9,37.4,28.54,-81.19],
  ["Alameda, CA","CA",2.8,4.4,25.9,37.7652,-122.2416],
  ["Albany, GA","GA",5.4,7.9,38.1,31.5785,-84.1557],
  ["Albany, NY","NY",8.7,6.4,36.2,42.6526,-73.7562],
  ["Albany, OR","OR",3.4,2.0,30.3,44.6365,-123.1059],
  ["Albuquerque, NM","NM",5.6,7.9,48.1,35.0844,-106.6504],
  ["Alexandria, LA","LA",19.3,7.7,37.2,31.3113,-92.4451],
  ["Alexandria, VA","VA",3.6,2.9,37.1,38.8048,-77.0469],
  ["Alhambra, CA","CA",2.4,9.6,36.6,34.0953,-118.127],
  ["Allen, TX","TX",5.6,5.1,41.2,33.1032,-96.6706],
  ["Allentown, PA","PA",5.9,7.4,40.0,40.6084,-75.4902],
  ["Aliso Viejo, CA","CA",3.5,3.1,36.6,33.5769,-117.7256],
  ["Amarillo, TX","TX",12.5,5.9,41.6,35.222,-101.8313],
  ["Amherst, NY","NY",4.7,1.8,37.1,42.9787,-78.7873],
  ["Anaheim, CA","CA",2.7,11.2,36.5,33.8366,-117.9143],
  ["Anchorage, AK","AK",7.4,1.0,32.1,61.2181,-149.9003],
  ["Ann Arbor, MI","MI",5.3,1.3,37.4,42.2808,-83.743],
  ["Antioch, CA","CA",3.0,8.1,37.6,38.0049,-121.8058],
  ["Antioch, IL","IL",7.3,0.8,38.0,42.4772,-88.0959],
  ["Apopka, FL","FL",3.3,2.7,37.9,28.6936,-81.5323],
  ["Apple Valley, CA","CA",6.0,5.0,47.0,34.5008,-117.1858],
  ["Apple Valley, MN","MN",8.8,1.5,35.9,44.7319,-93.2177],
  ["Arlington, TX","TX",7.4,7.9,40.3,32.7357,-97.1081],
  ["Arlington, VA","VA",3.0,3.8,38.1,38.8816,-77.091],
  ["Arvada, CO","CO",5.9,3.6,47.0,39.8028,-105.0875],
  ["Athens, GA","GA",5.7,5.1,39.8,33.9519,-83.3576],
  ["Atlanta, GA","GA",6.2,7.8,40.7,33.749,-84.388],
  ["Aurora, CO","CO",5.5,9.4,47.8,39.7294,-104.8319],
  ["Aurora, IL","IL",5.6,12.6,36.5,41.7606,-88.3201],
  ["Aurora, OH","OH",8.0,0.0,38.7,41.3145,-81.3457],
  ["Austin, TX","TX",5.4,10.3,39.6,30.2672,-97.7431],
  ["Babylon, NY","NY",4.4,2.3,38.5,40.699,-73.3249],
  ["Bakersfield, CA","CA",7.1,13.0,55.3,35.3733,-119.0187],
  ["Baldwin Park, CA","CA",2.9,14.0,36.8,34.0853,-117.9606],
  ["Baltimore, MD","MD",5.9,8.3,40.9,39.2904,-76.6122],
  ["Baton Rouge, LA","LA",24.7,6.8,38.6,30.4515,-91.1871],
  ["Beaumont, TX","TX",19.3,7.2,38.2,30.086,-94.1019],
  ["Bellevue, WA","WA",4.2,5.4,26.7,47.6101,-122.2015],
  ["Berkeley, CA","CA",2.6,5.3,33.6,37.8716,-122.2727],
  ["Billings, MT","MT",9.6,0.6,39.8,45.7833,-108.5007],
  ["Birmingham, AL","AL",10.5,6.6,38.6,33.5186,-86.8104],
  ["Boca Raton, FL","FL",3.4,3.8,34.7,26.3683,-80.1289],
  ["Boise, ID","ID",4.5,1.9,39.9,43.615,-116.2023],
  ["Boston, MA","MA",5.5,4.7,36.7,42.3601,-71.0589],
  ["Bridgeport, CT","CT",7.2,14.7,40.2,41.1865,-73.1952],
  ["Broken Arrow, OK","OK",9.4,2.2,42.1,36.0609,-95.7975],
  ["Brookhaven, NY","NY",5.3,2.7,38.9,40.7721,-72.9182],
  ["Buffalo, NY","NY",7.3,4.5,37.5,42.8864,-78.8784],
  ["Burbank, CA","CA",2.4,8.5,36.8,34.1808,-118.309],
  ["Cambridge, MA","MA",5.0,3.9,37.3,42.3736,-71.1097],
  ["Cape Coral, FL","FL",3.7,2.4,36.7,26.5629,-81.9495],
  ["Carrollton, TX","TX",5.8,10.7,40.9,32.9537,-96.8903],
  ["Cary, NC","NC",4.5,3.6,38.9,35.7915,-78.7811],
  ["Cedar Rapids, IA","IA",15.1,0.9,36.7,41.9779,-91.6656],
  ["Chandler, AZ","AZ",4.9,5.7,44.0,33.3062,-111.8413],
  ["Charlotte, NC","NC",5.4,7.1,39.1,35.2271,-80.8431],
  ["Chattanooga, TN","TN",8.7,3.6,39.9,35.0456,-85.3097],
  ["Chesapeake, VA","VA",7.6,4.0,38.0,36.7682,-76.2875],
  ["Chicago, IL","IL",7.6,8.7,36.5,41.8781,-87.6298],
  ["Chula Vista, CA","CA",2.9,9.8,38.3,32.6401,-117.0842],
  ["Cincinnati, OH","OH",7.8,2.8,37.8,39.1031,-84.512],
  ["Clarksville, TN","TN",9.2,3.5,38.4,36.5298,-87.3595],
  ["Clearwater, FL","FL",4.2,2.4,36.2,27.9659,-82.8001],
  ["Cleveland, OH","OH",9.2,4.1,38.1,41.4993,-81.6944],
  ["Clovis, CA","CA",5.2,6.8,50.5,36.8252,-119.7029],
  ["Colorado Springs, CO","CO",8.5,3.3,47.6,38.8339,-104.8214],
  ["Columbia, MO","MO",8.1,1.8,39.1,38.9517,-92.3341],
  ["Columbia, SC","SC",8.2,5.9,38.9,34.0007,-81.0348],
  ["Columbus, GA","GA",6.6,8.3,38.7,32.461,-84.9877],
  ["Columbus, OH","OH",6.7,3.9,37.7,39.9612,-82.9988],
  ["Concord, CA","CA",3.2,5.4,38.2,37.978,-122.0311],
  ["Concord, NC","NC",5.9,4.6,38.4,35.4088,-80.5795],
  ["Corona, CA","CA",4.5,8.2,44.1,33.8753,-117.5664],
  ["Corpus Christi, TX","TX",16.9,7.1,41.0,27.8006,-97.3964],
  ["Costa Mesa, CA","CA",3.0,5.6,36.7,33.6411,-117.9187],
  ["Dallas, TX","TX",6.6,9.4,40.5,32.7767,-96.797],
  ["Daly City, CA","CA",2.6,11.5,34.9,37.6879,-122.4702],
  ["Dayton, OH","OH",8.1,2.8,37.3,39.7589,-84.1916],
  ["Denver, CO","CO",5.8,6.4,47.7,39.7392,-104.9903],
  ["Des Moines, IA","IA",16.2,4.0,36.6,41.5868,-93.625],
  ["Detroit, MI","MI",10.9,6.2,36.5,42.3314,-83.0458],
  ["Downey, CA","CA",2.9,10.9,37.1,33.9401,-118.1332],
  ["Durham, NC","NC",4.7,5.2,38.6,35.994,-78.8986],
  ["East Los Angeles, CA","CA",2.6,13.8,37.2,34.0239,-118.1717],
  ["El Cajon, CA","CA",3.0,8.9,38.4,32.7948,-116.9625],
  ["El Monte, CA","CA",2.6,14.3,37.0,34.0686,-118.0276],
  ["El Paso, TX","TX",6.4,5.0,40.9,31.7619,-106.485],
  ["Elizabeth, NJ","NJ",5.2,15.5,38.2,40.664,-74.2107],
  ["Elk Grove, CA","CA",4.0,6.9,42.9,38.4088,-121.3716],
  ["Erie, PA","PA",7.4,2.4,37.2,42.1292,-80.0851],
  ["Escondido, CA","CA",3.2,9.2,38.7,33.1192,-117.0864],
  ["Eugene, OR","OR",4.6,2.0,29.3,44.0521,-123.0868],
  ["Evansville, IN","IN",11.3,0.9,37.6,37.9716,-87.5711],
  ["Fairfield, CA","CA",3.8,5.8,41.7,38.2494,-122.04],
  ["Fayetteville, AR","AR",8.7,2.3,38.6,36.0626,-94.1574],
  ["Fayetteville, NC","NC",5.9,7.5,38.8,35.0527,-78.8784],
  ["Fontana, CA","CA",4.9,11.4,44.9,34.0922,-117.435],
  ["Fort Collins, CO","CO",7.5,2.5,47.0,40.5853,-105.0844],
  ["Fort Lauderdale, FL","FL",3.5,7.3,34.6,26.1224,-80.1373],
  ["Fort Wayne, IN","IN",11.5,2.7,38.8,41.1306,-85.1289],
  ["Fort Worth, TX","TX",7.1,8.2,40.6,32.7555,-97.3308],
  ["Fremont, CA","CA",3.4,8.2,36.5,37.5485,-121.9886],
  ["Fresno, CA","CA",5.7,16.4,50.8,36.7378,-119.7871],
  ["Frisco, TX","TX",5.0,4.3,40.5,33.1507,-96.8236],
  ["Fullerton, CA","CA",3.0,7.9,36.5,33.8704,-117.9242],
  ["Garden Grove, CA","CA",2.8,12.3,36.5,33.7743,-117.9379],
  ["Garland, TX","TX",6.4,9.4,40.8,32.9126,-96.6389],
  ["Gilbert, AZ","AZ",4.8,3.9,44.1,33.3528,-111.789],
  ["Glendale, AZ","AZ",5.2,8.2,44.4,33.5387,-112.186],
  ["Glendale, CA","CA",2.5,8.1,37.0,34.1425,-118.2551],
  ["Grand Prairie, TX","TX",6.5,11.3,40.4,32.746,-96.9978],
  ["Grand Rapids, MI","MI",9.7,3.1,37.3,42.9634,-85.6681],
  ["Greensboro, NC","NC",6.1,5.3,38.8,36.0726,-79.792],
  ["Gresham, OR","OR",4.9,5.1,29.6,45.4996,-122.4302],
  ["Hampton, VA","VA",7.4,4.0,38.0,37.0299,-76.3452],
  ["Hartford, CT","CT",9.1,14.3,39.3,41.7658,-72.6851],
  ["Henderson, NV","NV",6.4,5.7,43.9,36.0395,-114.9817],
  ["Hialeah, FL","FL",2.9,17.9,34.0,25.8576,-80.2781],
  ["High Point, NC","NC",6.4,5.3,39.3,35.9557,-80.0053],
  ["Hollywood, FL","FL",3.2,8.2,34.9,26.0112,-80.1495],
  ["Houston, TX","TX",13.5,10.1,40.6,29.7604,-95.3698],
  ["Huntington Beach, CA","CA",3.2,5.8,36.5,33.6595,-117.9988],
  ["Huntington, WV","WV",9.6,0.4,37.5,38.4193,-82.4452],
  ["Huntsville, AL","AL",12.0,2.1,38.3,34.7304,-86.5861],
  ["Independence, MO","MO",9.7,0.5,39.1,39.0911,-94.4155],
  ["Indianapolis, IN","IN",9.4,3.9,36.8,39.7684,-86.1581],
  ["Inglewood, CA","CA",2.9,11.9,36.8,33.9617,-118.3531],
  ["Irvine, CA","CA",3.2,6.7,36.5,33.6846,-117.8265],
  ["Irving, TX","TX",5.9,11.0,40.3,32.814,-96.9489],
  ["Jackson, MS","MS",19.8,9.3,38.1,32.2988,-90.1848],
  ["Jacksonville, FL","FL",6.6,5.6,37.9,30.3322,-81.6557],
  ["Jersey City, NJ","NJ",5.3,12.8,37.5,40.7178,-74.0431],
  ["Kansas City, KS","KS",8.4,5.2,39.4,39.1155,-94.6268],
  ["Kansas City, MO","MO",9.6,3.5,39.3,39.0997,-94.5786],
  ["Killeen, TX","TX",8.5,6.7,40.1,31.1171,-97.7278],
  ["Knoxville, TN","TN",9.0,2.1,39.1,35.9606,-83.9207],
  ["Lakewood, CA","CA",3.0,7.7,37.1,33.8536,-118.1351],
  ["Lakewood, CO","CO",5.8,3.4,47.2,39.7047,-105.0814],
  ["Lancaster, CA","CA",6.8,9.1,47.1,34.6868,-118.1542],
  ["Lansing, MI","MI",9.4,3.5,36.9,42.7325,-84.5555],
  ["Laredo, TX","TX",9.2,3.2,41.8,27.5306,-99.4803],
  ["Las Cruces, NM","NM",6.3,8.3,45.1,32.3199,-106.7637],
  ["Las Vegas, NV","NV",6.6,8.2,43.8,36.1699,-115.1398],
  ["Lexington, KY","KY",9.3,3.6,39.1,38.0406,-84.5037],
  ["Lincoln, NE","NE",9.3,2.7,37.2,40.8136,-96.7026],
  ["Little Rock, AR","AR",10.2,5.9,37.6,34.7465,-92.2896],
  ["Long Beach, CA","CA",3.1,12.1,36.5,33.7701,-118.1937],
  ["Lorain, OH","OH",10.5,5.6,38.4,41.4523,-82.1824],
  ["Los Angeles, CA","CA",2.8,11.5,40.2,34.0522,-118.2437],
  ["Louisville, KY","KY",10.5,4.0,37.6,38.2527,-85.7585],
  ["Lubbock, TX","TX",11.3,6.5,41.6,33.5779,-101.8552],
  ["Madison, WI","WI",7.8,1.9,37.1,43.0731,-89.4012],
  ["Manchester, NH","NH",6.6,3.2,37.0,42.9956,-71.4548],
  ["McAllen, TX","TX",5.0,5.7,42.3,26.2034,-98.23],
  ["Memphis, TN","TN",8.5,5.6,39.3,35.1495,-90.049],
  ["Mesa, AZ","AZ",5.0,5.6,44.0,33.4152,-111.8315],
  ["Mesquite, TX","TX",6.7,8.1,40.5,32.7668,-96.5992],
  ["Miami, FL","FL",3.8,9.0,35.3,25.7617,-80.1918],
  ["Milwaukee, WI","WI",8.4,7.2,37.0,43.0389,-87.9065],
  ["Minneapolis, MN","MN",7.7,4.8,35.0,44.9778,-93.265],
  ["Miramar, FL","FL",3.5,11.3,34.6,25.9876,-80.2322],
  ["Mobile, AL","AL",11.9,4.9,37.9,30.6954,-88.0399],
  ["Modesto, CA","CA",5.5,10.1,43.7,37.6391,-120.9969],
  ["Montgomery, AL","AL",10.2,7.1,38.2,32.3668,-86.3],
  ["Moreno Valley, CA","CA",5.4,12.4,44.6,33.9425,-117.2297],
  ["Murfreesboro, TN","TN",9.0,2.5,39.1,35.8456,-86.3903],
  ["Murrieta, CA","CA",4.8,5.5,41.7,33.5539,-117.2139],
  ["Nashville, TN","TN",8.4,3.5,39.3,36.1627,-86.7816],
  ["New Haven, CT","CT",9.2,11.2,39.9,41.3082,-72.9282],
  ["New Orleans, LA","LA",11.5,8.3,37.0,29.9511,-90.0715],
  ["New York, NY","NY",4.4,7.9,38.7,40.7128,-74.006],
  ["Newark, NJ","NJ",5.7,14.2,38.6,40.7357,-74.1724],
  ["Newport News, VA","VA",6.8,5.7,37.9,37.0871,-76.473],
  ["Norfolk, VA","VA",8.5,5.0,37.9,36.8508,-76.2859],
  ["North Las Vegas, NV","NV",7.0,8.5,44.1,36.1989,-115.1175],
  ["Oakland, CA","CA",3.5,9.4,32.5,37.8044,-122.2712],
  ["Oceanside, CA","CA",3.0,7.5,38.7,33.1959,-117.3795],
  ["Oklahoma City, OK","OK",12.3,4.0,41.5,35.4676,-97.5164],
  ["Omaha, NE","NE",9.3,5.1,37.2,41.2565,-95.9345],
  ["Ontario, CA","CA",4.2,11.8,44.3,34.0633,-117.6509],
  ["Orange, CA","CA",3.1,6.7,36.5,33.7879,-117.8531],
  ["Orlando, FL","FL",4.4,7.9,38.2,28.5383,-81.3792],
  ["Overland Park, KS","KS",7.9,2.5,39.4,38.9822,-94.6708],
  ["Oxnard, CA","CA",3.5,13.1,38.0,34.1975,-119.1771],
  ["Palm Bay, FL","FL",4.2,3.4,36.4,28.0345,-80.5887],
  ["Palmdale, CA","CA",6.8,10.3,46.5,34.5794,-118.1165],
  ["Pasadena, CA","CA",2.9,8.1,37.0,34.1478,-118.1445],
  ["Pasadena, TX","TX",14.4,9.0,38.6,29.6911,-95.2091],
  ["Paterson, NJ","NJ",5.1,19.4,37.1,40.9176,-74.1719],
  ["Pembroke Pines, FL","FL",3.7,8.2,34.7,26.0076,-80.2963],
  ["Peoria, AZ","AZ",5.0,3.7,44.2,33.5806,-112.2374],
  ["Peoria, IL","IL",8.7,4.2,36.7,40.6936,-89.589],
  ["Philadelphia, PA","PA",7.3,7.0,38.2,39.9526,-75.1652],
  ["Phoenix, AZ","AZ",5.6,7.0,44.6,33.4484,-112.074],
  ["Pittsburgh, PA","PA",7.8,2.7,36.7,40.4406,-79.9959],
  ["Plano, TX","TX",5.9,6.0,40.2,33.0198,-96.6989],
  ["Pomona, CA","CA",3.6,13.0,37.4,34.0553,-117.75],
  ["Portland, OR","OR",4.5,3.9,28.3,45.5051,-122.675],
  ["Providence, RI","RI",6.5,14.6,38.7,41.824,-71.4128],
  ["Provo, UT","UT",5.7,5.1,43.5,40.2338,-111.6585],
  ["Pueblo, CO","CO",11.0,5.2,46.7,38.2544,-104.6091],
  ["Raleigh, NC","NC",4.8,4.4,38.8,35.7796,-78.6382],
  ["Rancho Cucamonga, CA","CA",4.6,8.4,44.0,34.1064,-117.5931],
  ["Reno, NV","NV",7.3,4.7,43.7,39.5296,-119.8138],
  ["Richmond, CA","CA",3.7,11.5,33.0,37.9358,-122.3478],
  ["Richmond, VA","VA",6.5,5.5,38.6,37.5407,-77.436],
  ["Riverside, CA","CA",4.7,11.2,46.3,33.9806,-117.3755],
  ["Rochester, MN","MN",9.8,1.7,35.7,44.0121,-92.4802],
  ["Rochester, NY","NY",7.5,5.3,37.9,43.1566,-77.6088],
  ["Rockford, IL","IL",8.3,5.7,37.1,42.2711,-89.094],
  ["Roseville, CA","CA",5.0,2.8,42.4,38.7521,-121.288],
  ["Sacramento, CA","CA",4.0,9.4,42.6,38.5816,-121.4944],
  ["Salem, OR","OR",5.2,5.0,31.0,44.9429,-123.0351],
  ["Salinas, CA","CA",4.2,18.6,37.8,36.6777,-121.6555],
  ["Salt Lake City, UT","UT",6.6,5.5,43.9,40.7608,-111.891],
  ["San Antonio, TX","TX",8.2,8.5,40.8,29.4241,-98.4936],
  ["San Bernardino, CA","CA",5.3,13.4,45.7,34.1083,-117.2898],
  ["San Diego, CA","CA",3.0,8.8,38.9,32.7157,-117.1611],
  ["San Francisco, CA","CA",2.2,6.2,33.0,37.7749,-122.4194],
  ["San Jose, CA","CA",3.0,9.0,40.0,37.3382,-121.8863],
  ["San Mateo, CA","CA",2.8,7.2,33.6,37.563,-122.3255],
  ["Santa Ana, CA","CA",2.7,19.4,36.5,33.7455,-117.8677],
  ["Santa Clara, CA","CA",2.9,8.2,39.7,37.3541,-121.9552],
  ["Santa Clarita, CA","CA",4.4,6.0,43.3,34.3917,-118.5426],
  ["Santa Rosa, CA","CA",4.6,8.1,38.2,38.4404,-122.7141],
  ["Savannah, GA","GA",7.1,7.7,39.2,32.0835,-81.0998],
  ["Scottsdale, AZ","AZ",5.0,3.2,44.1,33.4942,-111.9261],
  ["Seattle, WA","WA",4.5,4.8,28.3,47.6062,-122.3321],
  ["Shreveport, LA","LA",14.1,8.0,36.4,32.5252,-93.7502],
  ["Simi Valley, CA","CA",4.4,3.4,41.1,34.2694,-118.7815],
  ["Sioux Falls, SD","SD",13.2,2.0,38.8,43.5473,-96.7283],
  ["South Bend, IN","IN",10.1,4.0,38.1,41.6764,-86.252],
  ["Spokane, WA","WA",7.1,0.7,31.8,47.6588,-117.426],
  ["Springfield, IL","IL",8.7,2.7,36.8,39.7817,-89.6501],
  ["Springfield, MA","MA",8.6,12.7,37.6,42.1015,-72.5898],
  ["Springfield, MO","MO",10.2,1.4,39.5,37.209,-93.2923],
  ["St. Louis, MO","MO",10.5,4.5,39.5,38.627,-90.1994],
  ["St. Paul, MN","MN",8.8,5.9,35.2,44.9537,-93.09],
  ["St. Petersburg, FL","FL",4.4,4.5,36.1,27.7676,-82.6403],
  ["Stockton, CA","CA",5.5,14.7,43.7,37.9577,-121.2908],
  ["Sunnyvale, CA","CA",2.9,8.4,39.4,37.3688,-122.0363],
  ["Syracuse, NY","NY",8.0,6.0,37.7,43.0481,-76.1474],
  ["Tacoma, WA","WA",5.0,5.3,30.3,47.2529,-122.4443],
  ["Tallahassee, FL","FL",5.8,5.6,37.1,30.4518,-84.2807],
  ["Tampa, FL","FL",5.3,5.5,36.8,27.9506,-82.4572],
  ["Tempe, AZ","AZ",4.7,7.7,44.0,33.4255,-111.94],
  ["Thousand Oaks, CA","CA",4.0,4.2,40.7,34.1706,-118.8376],
  ["Toledo, OH","OH",9.4,4.2,37.5,41.6639,-83.5552],
  ["Torrance, CA","CA",3.1,7.2,36.6,33.8358,-118.3406],
  ["Tucson, AZ","AZ",4.6,7.8,44.7,32.2226,-110.9747],
  ["Tulsa, OK","OK",13.2,4.4,42.9,36.154,-95.9928],
  ["Vancouver, WA","WA",5.6,2.8,29.2,45.6387,-122.6615],
  ["Ventura, CA","CA",3.8,9.3,37.5,34.2746,-119.229],
  ["Virginia Beach, VA","VA",7.3,3.7,38.2,36.8529,-75.978],
  ["Visalia, CA","CA",6.0,15.3,52.6,36.3302,-119.2921],
  ["Waco, TX","TX",10.5,7.1,40.1,31.5493,-97.1467],
  ["Warren, MI","MI",8.8,2.8,37.1,42.4775,-83.0277],
  ["Washington, DC","DC",4.0,6.8,38.2,38.9072,-77.0369],
  ["Waterbury, CT","CT",10.4,14.7,39.0,41.5582,-73.0515],
  ["West Jordan, UT","UT",7.0,3.7,43.3,40.6097,-111.9391],
  ["West Valley City, UT","UT",7.5,6.6,43.9,40.6916,-112.0011],
  ["Westminster, CA","CA",3.0,13.4,36.5,33.7514,-117.9939],
  ["Westminster, CO","CO",5.7,3.6,47.4,39.8366,-105.0372],
  ["Wichita, KS","KS",8.4,5.2,40.0,37.6872,-97.3301],
  ["Wichita Falls, TX","TX",15.8,4.2,40.6,33.9137,-98.4934],
  ["Winston-Salem, NC","NC",6.6,4.1,38.3,36.0999,-80.2442],
  ["Worcester, MA","MA",8.7,9.3,37.5,42.2626,-71.8023],
  ["Yonkers, NY","NY",5.0,8.8,38.3,40.9312,-73.8988],
];

const cities = RAW.map(r => ({
  city: r[0], state: r[1], co2: r[2], poc_gap: r[3], ozone: r[4], lat: r[5], lon: r[6],
}));

const co2Extent = d3.extent(cities, d => d.co2);   // [min, max] for radius
const pocExtent = d3.extent(cities, d => d.poc_gap); 

const pocColor = {
    label: 'POC gap index (percentage points)',
    min: 0, max: 20,
    scale: d3.scaleSequential(d3.interpolateOrRd),
  };



const radiusScale = d3.scaleSqrt()
  .domain(co2Extent)
  .range([1, 20]);
const colorScale = d3.scaleSequential(d3.interpolateOrRd)
  .domain(pocExtent);

let currentMode  = 'poc';
let dotSelection = null;

// Map help from Claude AI
const svg        = d3.select('#map-svg');
const projection = d3.geoAlbersUsa().scale(1100).translate([480, 280]);
const path       = d3.geoPath(projection);

d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(us => {
  // State outlines
  svg.append('g')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .join('path')
    .attr('d', path)
    .attr('fill', '#141418')
    .attr('stroke', 'rgba(255,255,255,0.08)')
    .attr('stroke-width', 0.5);

  // Project cities that fall within the AlbersUSA bounds
  const mapped = cities
    .map(c => {
      const proj = projection([c.lon, c.lat]);
      return proj ? { ...c, px: proj[0], py: proj[1] } : null;
    })
    .filter(Boolean);

  // City dots
  dotSelection = svg.append('g')
    .selectAll('circle')
    .data(mapped)
    .join('circle')
    .attr('cx', d => d.px)
    .attr('cy', d => d.py)
    .attr('r',  d => radiusScale(d.co2))
    .attr('fill',         d => colorScale(d.poc_gap))
    .attr('stroke',       'rgba(0,0,0,0.4)')
    .attr('stroke-width', 0.5)
    .attr('opacity',      0.85)
    
});

function buildColorLegend() {
  const bar    = document.getElementById('color-bar');
  const minv = document.getElementById('color-min');
  const maxv = document.getElementById('color-max');
  const STEPS  = 8;
  minv.innerHTML = `<span>${pocExtent[0].toFixed(1)}</span><span class="space">&emsp&emsp&emsp&emsp</span><span>${pocExtent[1].toFixed(1)}</span>`
  for (let i = 0; i < STEPS; i++) {
    const t  = i / (STEPS - 1);
    const sw = document.createElement('div');
    sw.className = 'legend-swatch';
    sw.style.background = colorScale(pocExtent[0] + t * (pocExtent[1] - pocExtent[0]));
    bar.appendChild(sw);
  }
  const barWidth = STEPS * 28;
  bar.style.width = barWidth + 'px';
}

function buildSizeLegend() {
  const svg    = d3.select('#size-legend-svg');
  const minv = document.getElementById('size-min');
  const maxv = document.getElementById('size-max');
  const stops  = [co2Extent[0], (co2Extent[0] + co2Extent[1]) / 2, co2Extent[1]];
  const radii  = stops.map(v => radiusScale(v));
  const totalW = 200;
  const spacing = totalW / stops.length;
  const cy = 18;
  stops.forEach((val, i) => {
    const cx = spacing * i + spacing / 2;
    svg.append('circle')
      .attr('cx', cx).attr('cy', cy)
      .attr('r',  radii[i])
      .attr('fill', 'rgba(255,255,255,0.15)')
      .attr('stroke', 'rgba(255,255,255,0.35)')
      .attr('stroke-width', 0.8);
  });
  minv.innerHTML = `<span>${stops[0].toFixed(1)}</span><span class="space">&emsp&emsp&emsp</span><span>${stops[2].toFixed(1)}</span>`;
}

buildColorLegend();
buildSizeLegend();
