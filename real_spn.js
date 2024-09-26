// Функция для удаления незначащих нулей

function round(str) {
    ind = str.length;
    while (str[ind - 1] == '0') ind--;
    if (str[ind - 1] == '.') return str.substring(0, ind - 1);
    return str.substring(0, ind);
}

// Функция для замены запятой в записи числа на точку (если такая есть)

function toPoint(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ",") {
            return str.substring(0, i) + "." + str.substring(i + 1);
        }
    }
    return str;
}

// Главная функция

function sqrt_real() {
    
    // Сбор данных с сайта

    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let num = document.querySelector("#data").value;

    // Замена запятой в числе на точку (если такая есть)

    num = toPoint(num);

    // Обработка числа пи

    if (String(num).slice(-2) === "pi") {
        num = String(num).slice(0, -2);
        if (num == "") {
            num = Math.PI;
        }
        else if (num == "-") {
            num = -Math.PI;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "Error de entrada. No se ha ingresado ningún número o varios números.";
            return;
        }
        else {
            num = num * Math.PI;
        }
    }
    
    // Обработка чиса e

    if (String(num).slice(-1) === "e") {
        num = String(num).slice(0, -1);
        if (num == "") {
            num = Math.E;
        }
        else if (num == "-") {
            num = -Math.E;
        }
        else if (isNaN(num)) {
            document.querySelector(".name1").innerHTML = "Error de entrada. No se ha ingresado ningún número o varios números.";
            return;
        }
        else {
            num = num * Math.E;
        }
    }

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Error de entrada. No se ha ingresado ningún número o varios números.";
        return;
    }
    
    // Проверка на пустой ввод

    if (num === "") {
        document.querySelector(".name1").innerHTML = "No se ha ingresado nada. Intenta usar números";
        return;
    }
    
    // Обработка корня из нуля

    if (num == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "Aritmética " : "Algebraico ") + "la raíz cuadrada del número 0 es 0.\nLa precisión de redondeo es " + precision + " decimales.";
        return;
    }

    
    // Проверка на большое число

    if (Math.abs(num) > 1e308) {
        document.querySelector(".name1").innerHTML = "El número ingresado es demasiado grande. Ingrese un número cuyo módulo sea menor que 1e308.";
        return;
    }

    // Проверка на нецелую точность

    if (precision != Math.floor(precision)) {
        document.querySelector(".name1").innerHTML = "Se ha ingresado una precisión no entera. Por favor, introduzca un número entero.";
        return;
    }

    // Проверка на отрицательную точность

    if (precision < 0) {
        document.querySelector(".name1").innerHTML = "Se ha introducido precisión negativa. Ingrese un número del 0 al 16.";
        return;
    }

    // Проверка на слишком большую точность

    if (precision > 16) {
        document.querySelector(".name1").innerHTML = "Se ha introducido demasiada precisión. Ingrese un número del 0 al 16.";
        return;
    }

    // Проверка на слишком маленький модуль числа

    if (Math.abs(num) < 1e-100 && Math.abs(num) != 0) {
        document.querySelector(".name1").innerHTML = "Error. El módulo del número ingresado es menor que 1e-100. Ingrese un número cuyo módulo sea mayor que 1e-100 o 0.";
        return;
    }
    
    // Проверка на отрицательное число

    let neg = false;

    if (num < 0) {
        
        // Если корень арифметический - выводим ошибку

        if (arithm) {
            document.querySelector(".name1").innerHTML = "No hay soluciones en números reales";
            return;
        }
        neg = true;
        num = - num;
    }

    // Считаем корень из числа

    sqr = Math.sqrt(num);
    let s = (sqr == sqr.toFixed(precision)) ? sqr : round(sqr.toFixed(precision));

    // Если num отрицательный - добавляем к записи числа i

    if (neg) {
        if (sqr == 1) s = "i";
        else s += "i";
    }

    // Если корень алгебраический - выводим два корня

    if (!arithm) {
        s = s + " e -" + s;
    }

    s += "."

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = ((arithm) ? "Aritmética " : "Algebraico ") + "la raíz cuadrada del número " + ((neg) ? "-" : "") + num + " igual " + s + "\nLa precisión de redondeo es " + precision + " decimales.";
    
}