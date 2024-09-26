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

function sqrt_complex() {
    
    // Сбор данных с сайта

    let precision = document.querySelector("#precision").value;
    let real_num = document.querySelector("#real_num").value;
    let imagine_num = document.querySelector("#imagine_num").value;

    // Замена запятой в числе на точку (если такая есть)

    real_num = toPoint(real_num);
    imagine_num = toPoint(imagine_num);

    // Точность по умолчанию - 0 (если ничего не введено).

    if (precision === "") {
        precision = 0;
    }

    // Проверка на нечисловой ввод

    if (isNaN(real_num) || isNaN(imagine_num) || isNaN(precision)) {
        document.querySelector(".name1").innerHTML = "Error de entrada. No se ha ingresado ningún número o varios números.";
        return;
    }
    
    // Проверка на пустой ввод

    if (real_num === "" || imagine_num === "") {
        document.querySelector(".name1").innerHTML = "No se ha ingresado nada. Intenta usar números";
        return;
    }
        
    // Если в мнимой части ноль просим перейти на страничку для действительных чисел

    if (imagine_num == 0) {
        document.querySelector(".name1").innerHTML = "Cero en la parte imaginaria.\nLe sugiero que ingrese lo mismo en la página para números reales.";
        return;
    }

    // Проверка на большое число

    if (Math.abs(real_num) > 1e308 || Math.abs(imagine_num) > 1e308) {
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

    if (Math.abs(real_num) < 1e-100 && Math.abs(real_num) != 0 || Math.abs(imagine_num) < 1e-100 && Math.abs(imagine_num) != 0) {
        document.querySelector(".name1").innerHTML = "Error. El módulo del número ingresado es menor que 1e-100. Ingrese un número cuyo módulo sea mayor que 1e-100 o 0.";
        return;
    }

    // Считаем корень из числа

    arg1 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2))) / 2 + real_num / 2);
    arg2 = Math.sqrt((Math.sqrt(Math.pow(real_num, 2) + Math.pow(imagine_num, 2)) - real_num) / 2) * (imagine_num / Math.abs(imagine_num));

    let s = ((arg1 == arg1.toFixed(precision)) ? arg1 : round(arg1.toFixed(precision))) + ((arg2 > 0) ? " + " : " - ") + ((Math.abs(arg2) == 1) ? "" : ((Math.abs(arg2) == Math.abs(arg2).toFixed(precision)) ? Math.abs(arg2) : round(Math.abs(arg2).toFixed(precision)))) + "i";

    s = "(" + s + ") e -(" + s + ")";

    // Итоговый вывод с кучей условий

    document.querySelector(".name1").innerHTML = "La raíz cuadrada del número (" + ((real_num != 0) ? real_num + ((imagine_num > 0) ? " + " : " - ") : ((imagine_num > 0) ? "" : "-")) + ((Math.abs(imagine_num) == 1) ? "" : Math.abs(imagine_num)) + "i) igual " + s + ".\nLa precisión de redondeo es " + precision + " decimales.";
}