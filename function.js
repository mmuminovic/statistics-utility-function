document.getElementById("calculate").addEventListener("click", function () {
  var x1,
    a,
    m,
    n,
    repeats,
    i = 1,
    j,
    repeatingNumIndex,
    k,
    lengthOfArrayToIgnore = 2,
    X,
    currx;
  X = [];
  POM = [];
  n = parseInt(document.getElementById("n").value);
  m = parseInt(document.getElementById("m").value);
  a = parseInt(document.getElementById("a").value);
  x1 = parseInt(document.getElementById("x1").value);
  lengthOfArrayToIgnore = parseInt(document.getElementById("toIgnore").value);
  X.push(x1);

  repeats = 0;
  repeatingNumIndex = 0;
  var doNumbersRepeating = false;
  while (i < n) {
    k = 0;
    X.forEach((number) => {
      if (number === X[i - 1]) {
        k++;
      }
    });
    currx = (X[i - 1] + k * a) % m;
    X.push(currx);
    i++;
    if (i % 3 === 0 && i >= 6) {
      var lengthOfArray = i;
      j = 0;
      while (lengthOfArray / 3 !== lengthOfArrayToIgnore) {
        var arr1, arr2, arr3;
        arr1 = X.slice(j * 3, j * 3 + lengthOfArray / 3);
        arr2 = X.slice(
          j * 3 + lengthOfArray / 3,
          j * 3 + 2 * (lengthOfArray / 3)
        );
        arr3 = X.slice(j * 3 + 2 * (lengthOfArray / 3), i);
        if (
          JSON.stringify(arr1) === JSON.stringify(arr2) &&
          JSON.stringify(arr2) === JSON.stringify(arr3)
        ) {
          doNumbersRepeating = true;
          repeatingNumIndex = repeatingNumIndex < lengthOfArray / 3 ? lengthOfArray / 3 : repeatingNumIndex;
        }
        lengthOfArray -= 3;
        j++;
      }
    }
  }
  document.getElementById('array').textContent = JSON.stringify(X).replace(/,/g, ", ");
  document.getElementById('response').textContent = `Da li postoji podniz koji se ponavlja: ${doNumbersRepeating ? "Da" : "Ne"}`;
  document.getElementById('repeatingLength').textContent = `${doNumbersRepeating ? `Dužina podniza koji se ponavlja: ${repeatingNumIndex}` : ""}`;
});
