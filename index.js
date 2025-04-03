function loadData() {
    var request = new XMLHttpRequest();
    request.open("GET", "data.json", true);
    request.onload = function () {
        if (request.status === 200) {
            try {
                var data = JSON.parse(request.responseText);
                console.log("Загрузка выполнена успешно:", data);
                displayCars(data);
                simulateFalseError();
            }
            catch (error) {
                console.error("Парсинг не удался:", error);
            }
        }
        else {
            console.error("Ошибка загрузки данных:", request.statusText);
        }
    };
    request.onerror = function () {
        console.error("Ошибка сети");
    };
    request.send();
}
function displayCars(data) {
    data.forEach(function (car) {
        console.log("\u041C\u0430\u0440\u043A\u0430: ".concat(car.data.make, ", \u041C\u043E\u0434\u0435\u043B\u044C: ").concat(car.data.model, ", \u0413\u043E\u0434: ").concat(car.data.year, ", \u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043A\u0430\u0440: ").concat(car.data.is_electric ? "Да" : "Нет"));
        console.log("Особенности:");
        car.data.features.forEach(function (feature) {
            console.log("- ".concat(feature));
        });
        console.log();
    });
}
function simulateFalseError() {
    try {
        throw new Error("Это ложная ошибка");
    }
    catch (error) {
        console.error("Обработка ложной ошибки:", error.message);
    }
}
loadData();
