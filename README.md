# Example Cities

An list of common cities around the world, their longitude/latitude and
wikipedia link. This module is indended to be used only for examples / demos.

Created from the following Wikipedia pages:

https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_A-H
https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_I-P
https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_Q-Z

### Example usage

````js
var cities = require('example-cities');

console.log(cities[0].latitude);
console.log(cities[0].longitude);
console.log(cities[0].name);

````

### Updating the cities

To update the list of cities, run, first install the dependencies

    npm install

Then

    npm run update

Which will update the `cities.json` file.