interface Car {
  id: number;
  data: {
    make: string;
    model: string;
    year: number;
    is_electric: boolean;
    features: string[];
  };
}

function loadData(): void {
  const request = new XMLHttpRequest();
  request.open("GET", "data.json", true);
  request.onload = function () {
    if (request.status === 200) {
      try {
        const data: Car[] = JSON.parse(request.responseText);
        console.log("Загрузка выполнена успешно:", data);
        displayCars(data);
        simulateFalseError();
      } catch (error) {
        console.error("Парсинг не удался:", error);
      }
    } else {
      console.error("Ошибка загрузки данных:", request.statusText);
    }
  };
  request.onerror = function () {
    console.error("Ошибка сети");
  };
  request.send();
}

function displayCars(data: Car[]): void {
  data.forEach((car) => {
    console.log(`Марка: ${car.data.make}, Модель: ${car.data.model}, Год: ${car.data.year}, Электрокар: ${car.data.is_electric ? "Да" : "Нет"}`);
    console.log("Особенности:");
    car.data.features.forEach((feature) => {
      console.log(`- ${feature}`);
    });
    console.log();
  });
}

function simulateFalseError(): void {
  try {
    throw new Error("Это ложная ошибка");
  } catch (error) {
    console.error("Обработка ложной ошибки:", (error as Error).message);
  }
}

loadData();