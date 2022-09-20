import moment from 'moment';

import Config from 'react-native-config';
import {ReqResponse} from '../interface/error.interface';

export const getUrl = () => {
  if (__DEV__) {
    // return 'https://mycredly.herokuapp.com/api/';
    return 'https://0714-102-89-45-151.eu.ngrok.io/api';
  } else {
    return 'https://mycredly.herokuapp.com/api/';
  }
};

export const assetUrl = () => {
  if (__DEV__) {
    return 'https://0714-102-89-45-151.eu.ngrok.io/storage/';
  } else {
    return 'https://mycredly.herokuapp.com/storage/';
  }
};

export function currencyFormat(num, code = '₦', dec = 2) {
  return (
    `${code} ` +
    Number(num)
      .toFixed(dec)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  );
}
export const performAsyncCalls = async (
  data = {},
  login: Function,
): Promise<ReqResponse> => {
  let response: ReqResponse;
  try {
    response = await login(data).unwrap();
  } catch (error: any) {
    response = error.data || {
      data: {},
      message: error.error,
      status: 'failed',
    };
    return response;
  }
  return response;
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

export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}
