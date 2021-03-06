document.getElementById("calculate").addEventListener("click", function () {
  var x0,
    a,
    m,
    n,
    b = 1,
    i = 1,
    j,
    repeatingNumIndex,
    k,
    lengthOfArrayToIgnore = 1,
    X,
    currx,
    subArray = [],
    minSubArray = [];
  X = [];
  POM = [];
  n = parseInt(document.getElementById("n").value);
  m = parseInt(document.getElementById("m").value);
  a = parseInt(document.getElementById("a").value);
  x0 = parseInt(document.getElementById("x0").value);
  if (!n || !m || !a || !x0) {
    document.getElementById("error").textContent = "Unesi ispravno vrednosti!";
  } else {
    b = document.getElementById("b").value
      ? parseInt(document.getElementById("b").value)
      : 1;
    //   lengthOfArrayToIgnore = document.getElementById("toIgnore").value ? parseInt(document.getElementById("toIgnore").value) : 2;
    X.push(x0);

    document.getElementById("error").textContent = "";

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
      currx = (b * X[i - 1] + k * a) % m;
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
            repeatingNumIndex =
              repeatingNumIndex < lengthOfArray / 3
                ? lengthOfArray / 3
                : repeatingNumIndex;
            subArray = subArray.length < arr1.length ? arr1 : subArray;
            minSubArray = minSubArray.length === 0 ? arr1 : minSubArray;
          }
          lengthOfArray -= 3;
          j++;
        }
      }
    }

    var repeatingStartedAt;
    for(var l=0; l<(X.length - subArray.length); l++){
        if(JSON.stringify(X.slice(l, l+subArray.length)) === JSON.stringify(subArray)){
            repeatingStartedAt = repeatingStartedAt ? repeatingStartedAt : l;
            repeatingStartedAt = repeatingStartedAt > l ? l : repeatingStartedAt;
        }
    }

    document.getElementById(
      "array"
    ).innerHTML = `Dobijeni niz: <p>${JSON.stringify(X).replace(/,/g, ", ")}</p>`;
    document.getElementById("repeatingArray").innerHTML =
      subArray.length > 0
        ? `Najduži podniz koji se ponavlja: <p>${JSON.stringify(subArray).replace(
            /,/g,
            ", "
          )}</p>`
        : "";
    document.getElementById("minRepeatingArray").innerHTML =
      minSubArray.length > 0
        ? `Najmanji podniz koji se ponavlja: <p>${JSON.stringify(minSubArray).replace(
            /,/g,
            ", "
          )}</p>`
        : "";
    document.getElementById(
      "repeatingStartedAt"
    ).textContent = `Ponavljanje počinje od člana u nizu s indeksom ${
      repeatingStartedAt ? repeatingStartedAt + minSubArray.length : ""
    }`;
    document.getElementById(
      "response"
    ).textContent = `Da li postoji podniz koji se ponavlja: ${
      doNumbersRepeating ? "Da" : "Ne"
    }`;
    document.getElementById("repeatingLength").textContent = `${
      doNumbersRepeating
        ? `Dužina najdužeg podniza koji se ponavlja: ${subArray.length}`
        : ""
    }`;
    document.getElementById("repeatingMinLength").textContent = `${
      doNumbersRepeating
        ? `Dužina najkraćeg podniza koji se ponavlja: ${minSubArray.length}`
        : ""
    }`;
  }
});
