'use strict';

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var urls = [
  'https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_A-H',
  'https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_I-P',
  'https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_Q-Z'
];

function parseLngLat(lngLatText) {
  var match = lngLatText.lat.match(/(\d{1,3})°(\d{1,3})[′]([NS])/);
  if (!match) {
    return null;
  }
  var lat = Number(match[1]) + Number(match[2]) / 60;
  lat = lat * (match[3] === 'S' ? -1 : 1);
  match = lngLatText.lng.match(/(\d{1,3})°(\d{1,3})[′]([WE])/);
  if (!match) {
    return null;
  }
  var lng = Number(match[1]) + Number(match[2]) / 60;
  lng = lng * (match[3] === 'W' ? -1 : 1);
  return {lng: lng, lat: lat};
}

var cities = [];
function next() {
  request.get(urls.shift(), function requestResponse(error, response, body) {
    if (error) {
      throw error;
    }
    var $ = cheerio.load(body);
    $('table.wikitable tr').toArray().forEach(function each(el) {
      var country = $(el).find('td:nth-child(1) a');
      var city = $(el).find('td:nth-child(2) a');
      var lngLat = parseLngLat({
        lat: $(el).find('.latitude').text(),
        lng: $(el).find('.longitude').text()
      });
      if (!lngLat) {
        return;
      }
      cities.push({
        countryName: country.text(),
        countryWiki: country.attr('href'),
        name: city.text(),
        wiki: city.attr('href'),
        longitude: lngLat.lng,
        latitude: lngLat.lat
      });
    });
    var content;
    if (urls.length) {
      next();
    } else {
      content = JSON.stringify(cities, null, 2);
      fs.writeFileSync(__dirname + '/cities.json', content);
    }
  });
}

next();
