export function map() {
  if (document.getElementById("map")) {
    ymaps.ready(init);
  }

  function init() {
    ymaps.ready(function () {
      var myMap = new ymaps.Map(
          "map",
          {
            center: [54.737484, 55.946786],
            zoom: 17,
          },
          {
            searchControlProvider: "yandex#search",
          }
        ),
        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark(
          myMap.getCenter(),
          {
            hintContent: `
              +7 (917) 791-90-73
              info@tetacom.pro
              Уфа, ул. Карла Маркса, 44, офис 46
              `,
          },
          {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: "default#image",
            // Своё изображение иконки метки.
            iconImageHref: "img/placemark.svg",
            // Размеры метки.
            iconImageSize: [62, 64],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-31, -32],
          }
        );

      myMap.behaviors.disable("scrollZoom");
      myMap.geoObjects.add(myPlacemark);
      myMap.options.set("suppressMapOpenBlock", true);
    });
  }
}
