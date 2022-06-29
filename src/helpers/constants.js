import moment from 'moment';

import Config from 'react-native-config';

export const getUrl = () => {
  // return 'http://192.168.79.159:3000/api/';
};

export function currencyFormat(num) {
  return (
    '\u20A6' +
    Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
}
export const performAsyncCalls = async (data, action) => {
  try {
    const response = await action(data).unwrap();
    return response;
  } catch (error) {
    console.log(error);
    return error.data;
  }
};

export function abbrNum(number, decPlaces) {
  var orig = number;
  var dec = decPlaces;
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  var abbrev = ['k', 'm', 'b', 't'];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      var number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // console.log(number);
      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  // console.log('abbrNum(' + orig + ', ' + dec + ') = ' + number);
  return number;
}

