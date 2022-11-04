export function map() {
  if (document.getElementById("map")) {
    ymaps.ready(init);
  }

  function init() {
    ymaps.ready(function () {
      var myMap = new ymaps.Map(
          "map",
          {
            center: [54.736984, 55.946816],
            zoom: 17,
          },
          {
            searchControlProvider: "yandex#search",
          },
        ),
        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
        ),
        myPlacemark = new ymaps.Placemark(
          myMap.getCenter(),
          {
            hintContent: "Тетаком: облачные сервисы для нефтегазовой отрасли",
          },
          {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: "default#image",
            // Своё изображение иконки метки.
            iconImageHref: "img/placemark.svg",
            // Размеры метки.
            iconImageSize: [50, 60],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-25, -60],
          },
        );

      myMap.behaviors.disable("scrollZoom");
      myMap.geoObjects.add(myPlacemark);
      myMap.options.set("suppressMapOpenBlock", true);
    });
  }
}
