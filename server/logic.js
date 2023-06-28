function splitString(stringToSplit, separator) {

  let arrayOfStrings = stringToSplit.split(separator);

  // console.log('Оригинальная строка: "' + stringToSplit + '"');
  // console.log('Разделитель: "' + separator + '"');
  // console.log('Массив содержит ' + arrayOfStrings.length + ' элементов: ' + arrayOfStrings.join(' / '));
  // console.log(`выходной массив ${arrayOfStrings}`);

  return arrayOfStrings;
}

module.exports = splitString;
