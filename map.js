// Each row: [city, state, co2 (MT/cap), poc_gap (pts), ozone (ppb), lat, lon]; generated with AI
const RAW = [
  ["Abilene, TX", "TX", 10.8, 5.1, 41.9, 32.4487, -99.7331, 248.9],
  ["Abington Township, PA", "PA", 4.0, 1.5, 39.3, 40.1204, -75.1171, 150.9],
  ["Ada, OK", "OK", 6.8, 0.7, 42.4, 34.7743, -96.6783, null],
  ["Akron, OH", "OH", 6.7, 3.1, 39.3, 41.0814, -81.519, 248.9],
  ["Alafaya, FL", "FL", 2.6, 2.6, 41.0, 28.54, -81.19, null],
  ["Alameda, CA", "CA", 2.8, 4.3, 28.3, 37.7652, -122.2416, 156.7],
  ["Albany, GA", "GA", 5.2, 5.8, 38.6, 31.5785, -84.1557, 240.6],
  ["Albany, NY", "NY", 8.6, 6.5, 36.0, 42.6526, -73.7562, 241.9],
  ["Albany, OR", "OR", 3.4, 2.4, 32.7, 44.6365, -123.1059, 256.4],
  ["Albuquerque, NM", "NM", 9.4, 5.8, 47.3, 35.0844, -106.6504, 219.6],
  ["Alexandria, VA", "VA", 7.4, 5.8, 39.5, 38.8048, -77.0469, 129.7],
  ["Alhambra, CA", "CA", 4.8, 13.8, 48.5, 34.0953, -118.127, 155.3],
  ["Aliso Viejo, CA", "CA", 3.9, 2.0, 45.5, 33.5769, -117.7256, 137.4],
  ["Allen, TX", "TX", 6.3, 2.3, 42.9, 33.1032, -96.6706, 202.8],
  ["Allentown, PA", "PA", 3.6, 9.5, 37.4, 40.6084, -75.4902, 171.6],
  ["Amarillo, TX", "TX", 6.9, 7.8, 45.4, 35.222, -101.8313, 271.9],
  ["Amherst, NY", "NY", 6.7, 1.1, 38.2, 42.9787, -78.7873, 134.8],
  ["Anaheim, CA", "CA", 8.3, 16.1, 41.9, 33.8366, -117.9143, 201.4],
  ["Ann Arbor, MI", "MI", 9.8, 1.1, 38.2, 42.2808, -83.743, 162.5],
  ["Antioch, CA", "CA", 15.1, 8.0, 38.2, 38.0049, -121.8058, 230.1],
  ["Apopka, FL", "FL", 4.9, 4.9, 42.1, 28.6936, -81.5323, 281.3],
  ["Apple Valley, CA", "CA", 3.9, 5.6, 53.0, 34.5008, -117.1858, 344.4],
  ["Apple Valley, MN", "MN", 5.4, 2.5, 34.6, 44.7319, -93.2177, 137.0],
  ["Arlington, TX", "TX", 6.1, 8.9, 42.9, 32.7357, -97.1081, 210.5],
  ["Arlington, VA", "VA", 8.3, 3.7, 39.1, 38.8816, -77.091, null],
  ["Arvada, CO", "CO", 4.4, 1.6, 48.5, 39.8028, -105.0875, 168.2],
  ["Athens, GA", "GA", 6.1, 8.0, 40.9, 33.9519, -83.3576, 201.6],
  ["Atlanta, GA", "GA", 7.3, 5.9, 40.4, 33.749, -84.388, 240.3],
  ["Aurora, CO", "CO", 6.2, 9.5, 47.9, 39.7294, -104.8319, 151.0],
  ["Aurora, IL", "IL", 6.5, 14.6, 37.0, 41.7606, -88.3201, 186.4],
  ["Austin, TX", "TX", 9.8, 6.7, 40.8, 30.2672, -97.7431, 175.5],
  ["Babylon, NY", "NY", 6.5, 5.5, 39.3, 40.699, -73.3249, 196.6],
  ["Bakersfield, CA", "CA", 3.9, 12.1, 47.9, 35.3733, -119.0187, 373.1],
  ["Baldwin Park, CA", "CA", 5.1, 25.5, 48.6, 34.0853, -117.9606, 208.5],
  ["Baltimore, MD", "MD", 7.3, 6.0, 39.8, 39.2904, -76.6122, 264.2],
  ["Baton Rouge, LA", "LA", 17.0, 9.3, 40.3, 30.4515, -91.1871, 422.3],
  ["Beaumont, TX", "TX", 9.8, 8.9, 38.4, 30.086, -94.1019, 275.3],
  ["Bellevue, WA", "WA", 7.1, 2.5, 31.5, 47.6101, -122.2015, 95.8],
  ["Berkeley, CA", "CA", 5.0, 2.7, 31.4, 37.8716, -122.2727, 147.5],
  ["Billings, MT", "MT", 8.9, 0.9, 40.3, 45.7833, -108.5007, 210.6],
  ["Birmingham, AL", "AL", 15.2, 5.9, 40.3, 33.5186, -86.8104, 369.2],
  ["Boca Raton, FL", "FL", 6.7, 1.2, 38.6, 26.3683, -80.1289, 252.5],
  ["Boston, MA", "MA", 8.0, 8.7, 36.0, 42.3601, -71.0589, 134.8],
  ["Bridgeport, CT", "CT", 25.0, 10.5, 39.4, 41.1865, -73.1952, 175.1],
  ["Broken Arrow, OK", "OK", 6.7, 2.1, 41.9, 36.0609, -95.7975, 302.7],
  ["Brookhaven, NY", "NY", 8.2, 3.2, 39.6, 40.7721, -72.9182, 200.0],
  ["Buffalo, NY", "NY", 4.8, 4.9, 38.5, 42.8864, -78.8784, 228.3],
  ["Burbank, CA", "CA", 15.0, 1.0, 48.6, 34.1808, -118.309, 215.8],
  ["Cambridge, MA", "MA", 13.4, 2.6, 35.2, 42.3736, -71.1097, 100.3],
  ["Cape Coral, FL", "FL", 2.8, 2.5, 38.7, 26.5629, -81.9495, 142.0],
  ["Carrollton, TX", "TX", 8.9, 9.0, 42.7, 32.9537, -96.8903, 157.7],
  ["Cary, NC", "NC", 4.0, 2.2, 39.9, 35.7915, -78.7811, 152.1],
  ["Cedar Rapids, IA", "IA", 48.4, 1.6, 36.4, 41.9779, -91.6656, 193.8],
  ["Chandler, AZ", "AZ", 4.9, 3.3, 47.9, 33.3062, -111.8413, 197.1],
  ["Charlotte, NC", "NC", 7.9, 7.7, 42.0, 35.2271, -80.8431, 162.5],
  ["Chattanooga, TN", "TN", 16.7, 4.1, 41.1, 35.0456, -85.3097, 279.4],
  ["Chesapeake, VA", "VA", 7.2, 1.8, 38.9, 36.7682, -76.2875, 216.7],
  ["Chicago, IL", "IL", 6.2, 9.6, 36.9, 41.8781, -87.6298, 203.5],
  ["Chula Vista, CA", "CA", 3.0, 10.2, 40.4, 32.6401, -117.0842, 180.3],
  ["Cincinnati, OH", "OH", 7.3, 5.1, 40.2, 39.1031, -84.512, 249.4],
  ["Clarksville, TN", "TN", 4.6, 1.8, 39.5, 36.5298, -87.3595, 283.2],
  ["Clearwater, FL", "FL", 3.7, 3.6, 41.0, 27.9659, -82.8001, 267.0],
  ["Cleveland, OH", "OH", 22.8, 4.8, 38.4, 41.4993, -81.6944, 274.1],
  ["Clovis, CA", "CA", 3.2, 3.1, 45.3, 36.8252, -119.7029, 256.4],
  ["Colorado Springs, CO", "CO", 6.9, 2.4, 48.1, 38.8339, -104.8214, 197.1],
  ["Columbia, MO", "MO", 8.9, 1.1, 38.3, 38.9517, -92.3341, 160.1],
  ["Columbia, SC", "SC", 7.4, 5.3, 39.2, 34.0007, -81.0348, 349.1],
  ["Columbus, GA", "GA", 4.8, 3.2, 40.1, 32.461, -84.9877, 304.2],
  ["Columbus, OH", "OH", 6.1, 4.2, 39.1, 39.9612, -82.9988, 200.7],
  ["Concord, CA", "CA", 5.1, 7.5, 36.5, 37.978, -122.0311, 171.1],
  ["Concord, NC", "NC", 9.1, 3.4, 42.2, 35.4088, -80.5795, 180.4],
  ["Corona, CA", "CA", 7.3, 8.9, 53.3, 33.8753, -117.5664, 340.7],
  ["Corpus Christi, TX", "TX", 17.4, 9.3, 37.9, 27.8006, -97.3964, 227.8],
  ["Costa Mesa, CA", "CA", 8.3, 9.0, 39.9, 33.6411, -117.9187, 181.1],
  ["Dallas, TX", "TX", 9.4, 16.0, 42.0, 32.7767, -96.797, 223.2],
  ["Daly City, CA", "CA", 3.0, 6.9, 33.4, 37.6879, -122.4702, 149.8],
  ["Dayton, OH", "OH", 7.9, 1.4, 40.4, 39.7589, -84.1916, 340.0],
  ["Denver, CO", "CO", 10.5, 6.9, 46.4, 39.7392, -104.9903, 162.2],
  ["Des Moines, IA", "IA", 7.5, 7.6, 37.7, 41.5868, -93.625, 256.4],
  ["Detroit, MI", "MI", 10.0, 2.5, 37.6, 42.3314, -83.0458, 370.9],
  ["Downey, CA", "CA", 5.3, 11.3, 41.3, 33.9401, -118.1332, 209.4],
  ["Durham, NC", "NC", 5.5, 6.7, 40.1, 35.994, -78.8986, 143.8],
  ["East Los Angeles, CA", "CA", 4.4, 34.8, 40.5, 34.0239, -118.1717, null],
  ["El Cajon, CA", "CA", 3.6, 3.7, 46.2, 32.7948, -116.9625, 409.2],
  ["El Monte, CA", "CA", 4.2, 28.4, 47.4, 34.0686, -118.0276, 171.8],
  ["El Paso, TX", "TX", 9.9, 13.0, 45.3, 31.7619, -106.485, 197.3],
  ["Elizabeth, NJ", "NJ", 5.6, 3.1, 35.9, 40.664, -74.2107, 178.7],
  ["Elk Grove, CA", "CA", 3.2, 5.5, 36.4, 38.4088, -121.3716, 181.6],
  ["Erie, PA", "PA", 4.0, 3.0, 38.8, 42.1292, -80.0851, 214.3],
  ["Escondido, CA", "CA", 6.2, 14.9, 44.8, 33.1192, -117.0864, 235.8],
  ["Eugene, OR", "OR", 4.2, 1.1, 33.1, 44.0521, -123.0868, 180.8],
  ["Evansville, IN", "IN", 8.1, 1.4, 39.7, 37.9716, -87.5711, 260.9],
  ["Fairfield, CA", "CA", 5.8, 8.3, 37.3, 38.2494, -122.04, 193.4],
  ["Fayetteville, AR", "AR", 8.4, 1.6, 40.6, 36.0626, -94.1574, 429.3],
  ["Fayetteville, NC", "NC", 4.9, 1.6, 41.6, 35.0527, -78.8784, 245.6],
  ["Fontana, CA", "CA", 4.4, 13.0, 54.0, 34.0922, -117.435, 230.6],
  ["Fort Collins, CO", "CO", 6.8, 1.0, 46.7, 40.5853, -105.0844, 166.7],
  ["Fort Lauderdale, FL", "FL", 4.9, 6.6, 38.6, 26.1224, -80.1373, 269.7],
  ["Fort Wayne, IN", "IN", 7.4, 5.8, 38.8, 41.1306, -85.1289, 241.0],
  ["Fort Worth, TX", "TX", 9.0, 11.3, 42.9, 32.7555, -97.3308, 223.4],
  ["Fremont, CA", "CA", 6.3, 3.1, 36.4, 37.5485, -121.9886, 123.9],
  ["Fresno, CA", "CA", 4.3, 14.0, 45.0, 36.7378, -119.7871, 297.5],
  ["Frisco, TX", "TX", 6.4, 2.1, 43.7, 33.1507, -96.8236, 169.0],
  ["Fullerton, CA", "CA", 6.0, 8.5, 44.8, 33.8704, -117.9242, 182.0],
  ["Garden Grove, CA", "CA", 5.0, 17.7, 40.7, 33.7743, -117.9379, 191.6],
  ["Garland, TX", "TX", 7.4, 16.3, 41.4, 32.9126, -96.6389, 191.6],
  ["Gilbert, AZ", "AZ", 14.1, 1.4, 49.2, 33.3528, -111.789, 180.3],
  ["Glendale, AZ", "AZ", 4.0, 9.1, 47.5, 33.5387, -112.186, 278.1],
  ["Glendale, CA", "CA", 4.9, 0.5, 48.2, 34.1425, -118.2551, 190.0],
  ["Grand Prairie, TX", "TX", 8.7, 12.2, 42.7, 32.746, -96.9978, 170.2],
  ["Grand Rapids, MI", "MI", 7.4, 6.5, 38.9, 42.9634, -85.6681, 284.8],
  ["Greensboro, NC", "NC", 6.4, 5.9, 41.2, 36.0726, -79.792, 189.0],
  ["Gresham, OR", "OR", 4.5, 6.2, 33.6, 45.4996, -122.4302, 136.8],
  ["Hampton, VA", "VA", 6.9, 1.0, 40.3, 37.0299, -76.3452, 230.9],
  ["Hartford, CT", "CT", 7.2, 6.8, 38.1, 41.7658, -72.6851, 186.0],
  ["Henderson, NV", "NV", 5.4, 1.8, 46.7, 36.0395, -114.9817, 168.7],
  ["Hialeah, FL", "FL", 3.0, 14.1, 38.1, 25.8576, -80.2781, 242.3],
  ["High Point, NC", "NC", 5.4, 7.0, 41.8, 35.9557, -80.0053, 188.5],
  ["Hollywood, FL", "FL", 17.8, 3.5, 38.0, 26.0112, -80.1495, 239.4],
  ["Houston, TX", "TX", 24.3, 16.7, 40.5, 29.7604, -95.3698, 233.6],
  ["Huntington Beach, CA", "CA", 9.6, 3.1, 38.7, 33.6595, -117.9988, 164.9],
  ["Huntington, WV", "WV", 9.7, -0.2, 39.0, 38.4193, -82.4452, null],
  ["Huntsville, AL", "AL", 10.9, 3.6, 39.8, 34.7304, -86.5861, 194.8],
  ["Independence, MO", "MO", 5.8, 1.2, 39.2, 39.0911, -94.4155, 209.1],
  ["Indianapolis, IN", "IN", 13.9, 4.8, 38.5, 39.7684, -86.1581, 209.0],
  ["Inglewood, CA", "CA", 4.0, 11.5, 37.5, 33.9617, -118.3531, 286.9],
  ["Irvine, CA", "CA", 8.5, 1.2, 44.4, 33.6846, -117.8265, 122.2],
  ["Irving, TX", "TX", 9.0, 14.7, 42.4, 32.814, -96.9489, 208.9],
  ["Jackson, MS", "MS", 17.3, 9.8, 40.7, 32.2988, -90.1848, 348.2],
  ["Jacksonville, FL", "FL", 11.5, 2.6, 40.6, 30.3322, -81.6557, 225.5],
  ["Jersey City, NJ", "NJ", 3.9, 5.6, 35.0, 40.7178, -74.0431, 148.9],
  ["Kansas City, KS", "KS", 13.9, 10.2, 39.3, 39.1155, -94.6268, 246.3],
  ["Kansas City, MO", "MO", 14.6, 3.9, 39.4, 39.0997, -94.5786, 197.6],
  ["Killeen, TX", "TX", 3.2, 2.8, 42.6, 31.1171, -97.7278, 289.0],
  ["Knoxville, TN", "TN", 16.0, 2.4, 40.0, 35.9606, -83.9207, 299.0],
  ["Lakewood, CA", "CA", 3.2, 5.5, 41.5, 33.8536, -118.1351, 211.5],
  ["Lakewood, CO", "CO", 5.5, 3.0, 47.8, 39.7047, -105.0814, 164.3],
  ["Lancaster, CA", "CA", 5.8, 9.9, 52.4, 34.6868, -118.1542, 381.2],
  ["Lansing, MI", "MI", 8.5, 3.7, 36.6, 42.7325, -84.5555, 271.9],
  ["Laredo, TX", "TX", 7.0, 21.4, 42.0, 27.5306, -99.4803, 202.0],
  ["Las Cruces, NM", "NM", 5.4, 8.0, 47.3, 32.3199, -106.7637, 252.5],
  ["Las Vegas, NV", "NV", 5.3, 8.8, 47.2, 36.1699, -115.1398, 370.1],
  ["Lexington, KY", "KY", 7.4, 3.4, 40.0, 38.0406, -84.5037, 171.7],
  ["Lincoln, NE", "NE", 6.9, 3.0, 38.1, 40.8136, -96.7026, 177.5],
  ["Little Rock, AR", "AR", 10.0, 5.0, 38.2, 34.7465, -92.2896, 211.8],
  ["Long Beach, CA", "CA", 10.5, 14.2, 39.5, 33.7701, -118.1937, 247.9],
  ["Lorain, OH", "OH", 13.3, 5.1, 38.9, 41.4523, -82.1824, 212.8],
  ["Los Angeles, CA", "CA", 7.5, 16.7, 44.7, 34.0522, -118.2437, 215.0],
  ["Louisville, KY", "KY", 21.2, 2.6, 40.5, 38.2527, -85.7585, 196.0],
  ["Lubbock, TX", "TX", 13.0, 6.8, 44.9, 33.5779, -101.8552, 257.3],
  ["Madison, WI", "WI", 9.4, 2.3, 35.6, 43.0731, -89.4012, 138.0],
  ["Manchester, NH", "NH", 6.5, 3.5, 36.6, 42.9956, -71.4548, 172.1],
  ["McAllen, TX", "TX", 5.3, 17.4, 33.6, 26.2034, -98.23, 239.9],
  ["Memphis, TN", "TN", 14.8, 8.1, 40.6, 35.1495, -90.049, 314.7],
  ["Mesa, AZ", "AZ", 4.9, 4.5, 49.7, 33.4152, -111.8315, 215.4],
  ["Mesquite, TX", "TX", 7.6, 11.9, 41.3, 32.7668, -96.5992, 214.9],
  ["Miami, FL", "FL", 3.6, 15.9, 38.1, 25.7617, -80.1918, 445.4],
  ["Milwaukee, WI", "WI", 7.8, 9.4, 36.5, 43.0389, -87.9065, 262.3],
  ["Minneapolis, MN", "MN", 10.8, 6.6, 32.3, 44.9778, -93.265, 147.3],
  ["Miramar, FL", "FL", 4.1, 2.2, 38.5, 25.9876, -80.2322, 148.3],
  ["Mobile, AL", "AL", 16.5, 3.9, 41.0, 30.6954, -88.0399, 337.9],
  ["Modesto, CA", "CA", 5.5, 8.6, 42.6, 37.6391, -120.9969, 296.6],
  ["Montgomery, AL", "AL", 9.3, 7.1, 39.3, 32.3668, -86.3, 224.9],
  ["Moreno Valley, CA", "CA", 2.7, 12.8, 56.8, 33.9425, -117.2297, 291.2],
  ["Murfreesboro, TN", "TN", 6.9, 1.9, 40.2, 35.8456, -86.3903, 266.2],
  ["Murrieta, CA", "CA", 5.2, 3.1, 48.8, 33.5539, -117.2139, 268.6],
  ["Nashville, TN", "TN", 10.4, 5.4, 40.8, 36.1627, -86.7816, 222.5],
  ["New Haven, CT", "CT", 6.3, 6.2, 39.2, 41.3082, -72.9282, 177.7],
  ["New Orleans, LA", "LA", 9.0, 8.2, 41.1, 29.9511, -90.0715, 200.1],
  ["New York, NY", "NY", 5.5, 10.8, 35.9, 40.7128, -74.006, 217.0],
  ["Newark, NJ", "NJ", 16.9, -3.8, 35.9, 40.7357, -74.1724, 187.9],
  ["Newport News, VA", "VA", 7.4, 3.2, 40.0, 37.0871, -76.473, 240.0],
  ["Norfolk, VA", "VA", 7.7, 5.4, 39.2, 36.8508, -76.2859, 258.5],
  ["North Las Vegas, NV", "NV", 7.6, 11.1, 47.0, 36.1989, -115.1175, 194.9],
  ["Oakland, CA", "CA", 5.6, 12.7, 30.7, 37.8044, -122.2712, 182.7],
  ["Oceanside, CA", "CA", 3.7, 9.9, 40.0, 33.1959, -117.3795, 195.5],
  ["Oklahoma City, OK", "OK", 11.2, 6.6, 43.5, 35.4676, -97.5164, 231.9],
  ["Omaha, NE", "NE", 10.3, 5.9, 37.5, 41.2565, -95.9345, 177.5],
  ["Ontario, CA", "CA", 12.4, 14.4, 51.9, 34.0633, -117.6509, 220.3],
  ["Orange, CA", "CA", 8.2, 7.6, 42.6, 33.7879, -117.8531, 211.2],
  ["Orlando, FL", "FL", 10.3, 4.8, 41.6, 28.5383, -81.3792, 486.7],
  ["Overland Park, KS", "KS", 6.5, 1.2, 39.6, 38.9822, -94.6708, 142.8],
  ["Oxnard, CA", "CA", 6.7, 25.2, 36.5, 34.1975, -119.1771, 195.6],
  ["Palm Bay, FL", "FL", 2.5, 2.3, 39.1, 28.0345, -80.5887, 185.8],
  ["Palmdale, CA", "CA", 6.5, 14.5, 53.6, 34.5794, -118.1165, 285.6],
  ["Pasadena, CA", "CA", 8.5, 6.3, 50.0, 34.1478, -118.1445, 222.8],
  ["Pasadena, TX", "TX", 16.8, 19.4, 38.9, 29.6911, -95.2091, 257.3],
  ["Paterson, NJ", "NJ", 3.5, 5.1, 37.5, 40.9176, -74.1719, 162.4],
  ["Pembroke Pines, FL", "FL", 2.8, 3.2, 38.6, 26.0076, -80.2963, 152.7],
  ["Peoria, AZ", "AZ", 4.8, 2.5, 47.9, 33.5806, -112.2374, 209.8],
  ["Peoria, IL", "IL", 8.0, 2.6, 38.0, 40.6936, -89.589, 209.9],
  ["Philadelphia, PA", "PA", 4.9, 6.7, 38.9, 39.9526, -75.1652, 238.5],
  ["Phoenix, AZ", "AZ", 7.0, 11.2, 47.6, 33.4484, -112.074, 179.7],
  ["Pittsburgh, PA", "PA", 6.5, 1.5, 39.6, 40.4406, -79.9959, 243.0],
  ["Plano, TX", "TX", 6.7, 3.3, 42.8, 33.0198, -96.6989, 161.0],
  ["Pomona, CA", "CA", 6.9, 17.5, 50.9, 34.0553, -117.75, 230.3],
  ["Portland, OR", "OR", 7.2, 3.3, 31.0, 45.5051, -122.675, 192.6],
  ["Providence, RI", "RI", 8.3, 10.3, 37.8, 41.824, -71.4128, 159.6],
  ["Provo, UT", "UT", 5.7, 5.0, 44.8, 40.2338, -111.6585, 198.3],
  ["Pueblo, CO", "CO", 60.0, 4.8, 48.1, 38.2544, -104.6091, 193.7],
  ["Raleigh, NC", "NC", 5.7, 5.1, 40.4, 35.7796, -78.6382, 181.0],
  ["Rancho Cucamonga, CA", "CA", 6.2, 4.4, 53.5, 34.1064, -117.5931, 155.9],
  ["Reno, NV", "NV", 6.4, 6.6, 45.4, 39.5296, -119.8138, 279.7],
  ["Richmond, CA", "CA", 50.3, 16.3, 32.7, 37.9358, -122.3478, 179.5],
  ["Richmond, VA", "VA", 9.2, 8.1, 39.0, 37.5407, -77.436, 208.2],
  ["Riverside, CA", "CA", 5.7, 11.1, 55.6, 33.9806, -117.3755, 359.4],
  ["Rochester, MN", "MN", 8.6, 3.6, 36.8, 44.0121, -92.4802, 165.4],
  ["Rochester, NY", "NY", 9.9, 7.8, 35.8, 43.1566, -77.6088, 374.7],
  ["Rockford, IL", "IL", 7.7, 5.7, 37.2, 42.2711, -89.094, 255.7],
  ["Roseville, CA", "CA", 6.1, 1.6, 41.9, 38.7521, -121.288, 177.8],
  ["Sacramento, CA", "CA", 5.9, 7.8, 39.4, 38.5816, -121.4944, 327.3],
  ["Salem, OR", "OR", 5.5, 5.9, 32.6, 44.9429, -123.0351, 194.7],
  ["Salinas, CA", "CA", 2.7, 31.0, 35.2, 36.6777, -121.6555, 183.2],
  ["Salt Lake City, UT", "UT", 17.8, 5.1, 42.2, 40.7608, -111.891, 266.4],
  ["San Antonio, TX", "TX", 10.1, 11.9, 41.6, 29.4241, -98.4936, 247.2],
  ["San Bernardino, CA", "CA", 5.2, 13.6, 55.6, 34.1083, -117.2898, 302.9],
  ["San Diego, CA", "CA", 6.2, 7.7, 40.8, 32.7157, -117.1611, 175.7],
  ["San Francisco, CA", "CA", 4.6, 9.4, 32.4, 37.7749, -122.4194, 147.3],
  ["San Jose, CA", "CA", 6.6, 10.5, 38.4, 37.3382, -121.8863, 152.3],
  ["San Mateo, CA", "CA", 5.1, 6.5, 31.5, 37.563, -122.3255, 134.6],
  ["Santa Ana, CA", "CA", 5.0, 28.7, 41.8, 33.7455, -117.8677, 199.4],
  ["Santa Clara, CA", "CA", 8.2, 2.6, 37.3, 37.3541, -121.9552, 148.2],
  ["Santa Clarita, CA", "CA", 6.6, 5.4, 53.3, 34.3917, -118.5426, 205.2],
  ["Santa Rosa, CA", "CA", 3.3, 10.6, 34.1, 38.4404, -122.7141, 170.5],
  ["Savannah, GA", "GA", 7.1, 5.8, 39.1, 32.0835, -81.0998, 309.2],
  ["Scottsdale, AZ", "AZ", 5.6, 0.9, 49.6, 33.4942, -111.9261, 149.8],
  ["Seattle, WA", "WA", 5.8, 2.7, 29.5, 47.6062, -122.3321, 150.4],
  ["Shreveport, LA", "LA", 20.4, 5.4, 39.2, 32.5252, -93.7502, 258.9],
  ["Simi Valley, CA", "CA", 3.8, 4.6, 48.7, 34.2694, -118.7815, 190.7],
  ["Sioux Falls, SD", "SD", 6.9, 2.8, 33.4, 43.5473, -96.7283, 204.5],
  ["South Bend, IN", "IN", 8.5, 5.0, 38.1, 41.6764, -86.252, 237.2],
  ["Spokane, WA", "WA", 5.6, 1.0, 33.7, 47.6588, -117.426, 188.3],
  ["Springfield, IL", "IL", 12.0, 2.0, 37.6, 39.7817, -89.6501, 242.4],
  ["Springfield, MA", "MA", 6.8, 11.0, 37.4, 42.1015, -72.5898, 175.1],
  ["Springfield, MO", "MO", 23.0, 0.8, 39.1, 37.209, -93.2923, 270.3],
  ["St. Louis, MO", "MO", 7.8, 4.7, 38.8, 38.627, -90.1994, 269.7],
  ["St. Paul, MN", "MN", 10.4, 8.5, 33.6, 44.9537, -93.09, 172.1],
  ["St. Petersburg, FL", "FL", 4.4, 2.3, 41.1, 27.7676, -82.6403, 224.6],
  ["Stockton, CA", "CA", 6.2, 12.9, 38.4, 37.9577, -121.2908, 284.9],
  ["Sunnyvale, CA", "CA", 4.6, 3.5, 36.8, 37.3688, -122.0363, 135.8],
  ["Syracuse, NY", "NY", 5.0, 6.0, 35.4, 43.0481, -76.1474, 258.3],
  ["Tacoma, WA", "WA", 9.4, 3.7, 31.8, 47.2529, -122.4443, 238.7],
  ["Tallahassee, FL", "FL", 3.6, 3.7, 38.1, 30.4518, -84.2807, 238.1],
  ["Tampa, FL", "FL", 8.2, 6.2, 41.4, 27.9506, -82.4572, 318.1],
  ["Tempe, AZ", "AZ", 12.2, 3.2, 47.9, 33.4255, -111.94, 181.2],
  ["Thousand Oaks, CA", "CA", 7.6, 3.4, 45.7, 34.1706, -118.8376, 174.7],
  ["Toledo, OH", "OH", 8.7, 2.4, 38.3, 41.6639, -83.5552, 282.9],
  ["Torrance, CA", "CA", 17.4, 1.8, 40.1, 33.8358, -118.3406, 216.6],
  ["Tucson, AZ", "AZ", 6.5, 7.8, 48.1, 32.2226, -110.9747, 275.0],
  ["Tulsa, OK", "OK", 11.0, 6.5, 42.2, 36.154, -95.9928, 338.0],
  ["Vancouver, WA", "WA", 8.6, 3.7, 31.3, 45.6387, -122.6615, 203.2],
  ["Virginia Beach, VA", "VA", 4.7, 1.8, 40.0, 36.8529, -75.978, 183.9],
  ["Visalia, CA", "CA", 4.2, 8.4, 48.5, 36.3302, -119.2921, 237.4],
  ["Waco, TX", "TX", 7.2, 10.4, 42.4, 31.5493, -97.1467, 275.5],
  ["Warren, MI", "MI", 7.5, 0.6, 37.9, 42.4775, -83.0277, 263.5],
  ["Washington, DC", "DC", 4.0, 6.8, 39.0, 38.9072, -77.0369, 232.0],
  ["Waterbury, CT", "CT", 4.5, 7.3, 39.0, 41.5582, -73.0515, 191.2],
  ["West Jordan, UT", "UT", 3.9, 4.0, 43.6, 40.6097, -111.9391, 197.5],
  ["West Valley City, UT", "UT", 8.4, 11.8, 43.3, 40.6916, -112.0011, 186.6],
  ["Westminster, CA", "CA", 6.0, 16.3, 39.7, 33.7514, -117.9939, 197.1],
  ["Westminster, CO", "CO", 6.7, 3.9, 48.1, 39.8366, -105.0372, 139.0],
  ["Wichita Falls, TX", "TX", 15.4, 7.1, 42.9, 33.9137, -98.4934, 270.9],
  ["Wichita, KS", "KS", 6.6, 5.9, 40.1, 37.6872, -97.3301, 230.9],
  ["Winston-Salem, NC", "NC", 6.5, 5.7, 41.8, 36.0999, -80.2442, 177.9],
  ["Worcester, MA", "MA", 4.9, 7.3, 37.0, 42.2626, -71.8023, 146.2],
  ["Yonkers, NY", "NY", 4.4, 7.4, 37.9, 40.9312, -73.8988, 157.2],
];

const cities = RAW.map(r => ({
  city: r[0], state: r[1], co2: r[2], poc_gap: r[3], ozone: r[4], lat: r[5], lon: r[6], cardio: r[7]
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
const projection = d3.geoAlbersUsa().scale(950).translate([450, 250]);
const path       = d3.geoPath(projection);


// Hover functions
const hovering = document.getElementById('info-block');
 
function showInfo(event, d) {
  hovering.style.display = 'block';
  hovering.style.left = (event.clientX + 10) + 'px';
  hovering.style.top  = (event.clientY - 0) + 'px';
  document.getElementById('city-label').textContent  = d.city;
  document.getElementById('co2-label').textContent  = d.co2  + ' MT/cap';
  document.getElementById('poc-label').textContent  = d.poc_gap + ' pts';
  document.getElementById('ozone-label').textContent = d.ozone   + ' ppb';
  document.getElementById('cardio-label').textContent = d.cardio   + ' per 100k';
}
 
function hideInfo() {
  hovering.style.display = 'none';
}

// Click functions
function updateRadar(event, d) {
  console.log("Clicked " + d.city);
}

function createMap() {
  d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(us => {
  // State outlines
  svg.append('g')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .join('path')
    .attr('d', path)
    .attr('fill', '#b0b0b0')
    .attr('stroke', 'rgba(0, 0, 0, 0.08)')
    .attr('stroke-width', 2);

  // Get city locations 
  const mapped = cities
    .map(c => {
      const proj = projection([c.lon, c.lat]);
      return proj ? { ...c, px: proj[0], py: proj[1] } : null;
    });

  // City dots
  dotSelection = svg.append('g')
    .selectAll('circle')
    .data(mapped)
    .join('circle')
    .attr('cx', d => d.px)
    .attr('cy', d => d.py)
    .attr('r',  d => radiusScale(d.co2))
    .attr('fill', d => colorScale(d.poc_gap))
    .attr('stroke', 'rgba(0,0,0,0.4)')
    .attr('stroke-width', 1)
    .attr('opacity', 0.5)
    .on('mousemove', showInfo)
    .on('mouseleave', hideInfo)
    .on('mousedown', updateRadar)
  });


}

function buildColorLegend() {
  const bar    = document.getElementById('color-bar');
  const minv = document.getElementById('color-min');
  const maxv = document.getElementById('color-max');
  const STEPS  = 8;
  minv.innerHTML = `<span>${pocExtent[0].toFixed(1)}</span><span>${pocExtent[1].toFixed(1)}</span>`
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
  const stops  = [co2Extent[0], (co2Extent[0] + co2Extent[1]) / 2, co2Extent[1]];
  const radii  = stops.map(v => radiusScale(v));
  const totalW = 200;
  const spacing = totalW / stops.length;
  const cy = 30;


  stops.forEach((val, i) => {
    const cx = spacing * i + spacing / 2;
    svg.append('circle')
      .attr('cx', cx).attr('cy', cy)
      .attr('r',  radii[i])
      .attr('fill', 'rgba(55, 46, 46, 0.15)')
      .attr('stroke', 'rgba(27, 27, 27, 0.35)')
      .attr('stroke-width', 2.5);
  });
  minv.innerHTML = `<span>${stops[0].toFixed(1)}</span><span>${stops[2].toFixed(1)}</span>`;

}



export async function initialiseMap()
{
  console.log("run");
  createMap();
  buildColorLegend();
  buildSizeLegend();
}

