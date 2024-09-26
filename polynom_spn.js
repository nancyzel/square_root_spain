
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

function sqrt_polynom() {
    
    // Сбор данных с сайта

    let arithm = document.querySelector("#flag").checked;
    let precision = document.querySelector("#precision").value;
    let arg_a = document.querySelector("#arg_a").value;
    let arg_b = document.querySelector("#arg_b").value;
    let arg_c = document.querySelector("#arg_c").value;

    // Замена запятой в числе на точку (если такая есть)

    arg_a = toPoint(arg_a);
    arg_b = toPoint(arg_b);
    arg_c = toPoint(arg_c);

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(arg_a) || isNaN(arg_b) || isNaN(arg_c) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Error de entrada. No se ha ingresado ningún número o varios números.";
        return;
    }
    
    // Проверка на пустой ввод

    if (arg_a === "" || arg_b === "" || arg_c === "") {
        document.querySelector(".name1").innerHTML = "No se ha ingresado nada. Intenta usar números";
        return;
    }

    // Если первый и последний коэффициент имеют разные знаки выводим ошибку

    if (arg_a * arg_c < 0) {
        document.querySelector(".name1").innerHTML = "Lo siento mucho. Tomar la raíz de este polinomio es imposible.";
        return;
    }

    // Проверка на большое число

    if (Math.abs(arg_a) > 1e308 || Math.abs(arg_b) > 1e308 || Math.abs(arg_c) > 1e308) {
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

    if (Math.abs(arg_a) < 1e-100 && Math.abs(arg_a) != 0 || Math.abs(arg_b) < 1e-100 && Math.abs(arg_b) != 0 || Math.abs(arg_c) < 1e-100 && Math.abs(arg_c) != 0) {
        document.querySelector(".name1").innerHTML = "Error. El módulo del número ingresado es menor que 1e-100. Ingrese un número cuyo módulo sea mayor que 1e-100 o 0.";
        return;
    }

    // Обрабатываем случай где только коэффициент при x не равен нулю

    if (arg_a == 0 && arg_c == 0 && arg_b != 0) {
        if (arg_b < 0) {
            s = ((-arg_b == 1) ? "" : Math.sqrt(-arg_b)) + "ix^0.5";
        }
        else {
            s = ((arg_b == 1) ? "" : Math.sqrt(arg_b)) + "x^0.5";
        }

        if (!arithm) {
            s = s + " и -" + s;
        }

        document.querySelector(".name1").innerHTML = ((arithm) ? "Aritmética " : "Algebraico ") + "la raíz cuadrada de un polinomio " + ((Math.abs(arg_b) == 1) ? ((arg_b < 0) ? "-" : "") : arg_b) + "x igual " + s + ".\nLa precisión de redondeo es " + precision + " decimales.";
        return;
    }

    // Проверка на комплекность итогового числа
    
    kompl = false;

    if (arg_a < 0) {
        if (arithm) {
            document.querySelector(".name1").innerHTML = "Lo siento mucho. Tomar la raíz de este polinomio es imposible.";
            return;
        }
        kompl = true;
        arg_a = -arg_a;
        arg_b = -arg_b;
        arg_c = -arg_c;
    }

    // Считаем итоговые коэффициенты
    
    k1 = Math.sqrt(arg_a);
    k2 = Math.sqrt(arg_c);

    

    // Проверка существования корня из многочлена

    if (4 * arg_a * arg_c != arg_b * arg_b) {
        document.querySelector(".name1").innerHTML = "Lo siento mucho. Tomar la raíz de este polinomio es imposible.";
        return;
    }

    // Если итоговое число - 0
    
    if (k1 == 0 && k2 == 0) {
        document.querySelector(".name1").innerHTML = ((arithm) ? "Aritmética " : "Algebraico ") + "la raíz cuadrada de un polinomio 0 es igual a 0" + "\nLa precisión de redondeo es " + precision + " decimales.";
        return;
    }

    // Проверка на минус между слагаемыми

    neg = false;

    if (arg_b < 0) {
        neg = true;
    }

    // Если некоторые коэффициенты равны нулю
    
    if (k2 == 0) {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x";
    }
    else if (k1 == 0) {
        s = ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)))
    }
    else {
        s = ((k1 == 1) ? "" : ((k1.toFixed(precision) == k1) ? k1 : round(k1.toFixed(precision)))) + "x " + ((neg) ? "- " : "+ ") + ((k2.toFixed(precision) == k2) ? k2 : round(k2.toFixed(precision)));
    }

    // Добавляем i для комплексного числа и +- если корень алгебраический

    if (kompl || !arithm) {
        s = "(" + s + ")";
        if (kompl) {
            s += "i";
        } 
        if (!arithm) {
            s = s + " e -" + s;
        }
    }

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = ((arithm) ? "Aritmética " : "Algebraico ") + "la raíz cuadrada de un polinomio " + ((kompl) ? "-" : "") +"(" + ((arg_a == 0) ? "" : ((arg_a == 1) ? "" : arg_a) + "x^2") + ((arg_b == 0) ? "" : ((arg_b > 0) ? " + " : " - ") + ((Math.abs(arg_b) == 1) ? "" : Math.abs(arg_b)) + "x") + ((arg_c == 0) ? "" : ((arg_a == 0 && arg_b == 0) ? "" : " + ") + arg_c) + ") igual " + s + ".\nLa precisión de redondeo es " + precision + " decimales.";
}