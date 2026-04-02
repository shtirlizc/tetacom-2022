# Инструкция по переносу сайта из `old_site` в Astro

## Цель

Эта инструкция описывает практический процесс переноса существующего фронтенд-проекта из папки `old_site` в Astro-приложение с сохранением внешнего вида `1:1`.

Документ основан на реальном переносе текущего сайта `tetacom` и фиксирует не только шаги, но и соглашения, которые оказались рабочими.

## Базовый принцип

Перенос делается не как "переписать сайт заново", а как "воспроизвести существующий DOM, стили, ассеты и поведение в Astro, сохранив структуру и внешний вид".

Главное правило:

- сначала анализ исходника
- потом перенос по блокам
- затем возврат интерактива
- затем чистка и унификация

## Что анализировать в `old_site` до начала работ

Перед переносом нужно отдельно разобрать:

- HTML-структуру страниц
- SCSS-структуру
- деление на `components` и `blocks`
- JS-поведение
- шрифты
- изображения
- PDF и прочие статические файлы
- различия между языковыми версиями
- все абсолютные и root-relative пути

На практике в этом проекте было важно найти:

- две страницы: `index.html` и `index-en.html`
- общий SCSS entrypoint
- набор BEM-блоков
- JS-модули: `slider`, `pageYOffset`, `mobileMenu`, `gumshoe`, `dropdown`, `map`, `fslightbox`

## Целевая структура Astro

Использовать такую структуру:

```text
src/
  blocks/
  components/
  layouts/
  pages/
  styles/
  utils/
  vendors/
public/
```

Распределение файлов:

- `src/blocks` — крупные BEM-блоки страницы
- `src/components` — мелкие переиспользуемые BEM-компоненты
- `src/layouts` — layout и head
- `src/styles` — только действительно глобальные слои
- `src/utils` — утилиты вроде `with-base`
- `src/vendors` — сторонние локально перенесённые vendor-файлы
- `public` — изображения, шрифты, PDF, favicon, apple-touch-icon

## Именование компонентов

Использовать только lowercase и kebab-case:

- `header.astro`
- `tech-stack.astro`
- `text-content.astro`

Не использовать PascalCase в именах файлов.

## Как трактовать старый BEM при переносе

Если в старом проекте блок был подключён из `scss/components`, новый Astro-компонент создавать в `src/components`.

Если блок был подключён из `scss/blocks`, новый Astro-компонент создавать в `src/blocks`.

При этом:

- префикс `_block-` в новых именах не нужен
- новый смысловой блок должен называться короче и чище

Примеры:

- `_block-head` -> `hero.astro`
- `_block-services` -> `services.astro`
- `_block-about` -> `about.astro`
- `_block-products` -> `products.astro`
- `_block-tech-stack` -> `tech-stack.astro`
- `_block-reviews` -> `reviews.astro`

Классы блока тоже переименовываются соответственно:

- `._block-head__title` -> `._hero__title`

## Что должно остаться глобальным

Глобально хранить только действительно общие слои:

- `vendors.css`
- `fonts.css`
- `variables.css`
- `body.css`

Не подключать block/component CSS через глобальный `@import`, если это стили конкретного BEM-блока.

## Правило по стилям внутри Astro

По умолчанию использовать обычный scoped `<style>`.

Не писать `<style is:global>` "на всякий случай".

Разрешённые исключения:

- `:global(...)` для селекторов, которые бьют в корень дочернего Astro-компонента
- `:global(...)` для стороннего DOM
- полный `is:global` только там, где стилизуется содержимое `slot` или внешний DOM целиком

В этом проекте полный `is:global` остался только в `text-content.astro`, потому что он оформляет вложенный HTML внутри `slot`.

### Когда нужен `:global(...)`

Например, если блок передаёт класс в дочерний Astro-компонент:

- `Title class="_services__title"`
- `Btn class="_hero__callback"`
- `Container class="_contacts__content"`
- `TextContent class="_tech-stack__body"`

Тогда в родительском блоке писать так:

```css
:global(._services__title) {
  margin-top: 19px;
}
```

А не обычный `. _services__title`, потому что scoped CSS родителя не достаёт до DOM дочернего компонента.

## Правило по media queries

Если используется media query, формат брать из `src/styles/media-exmple.css` и оставлять комментарий над блоком.

Пример:

```css
/* mobile */
@media (width < 560px) {
}
```

Не смешивать произвольные форматы.

## Базовый набор глобальных файлов

### `src/styles/fonts.css`

Использовать для пакетных шрифтов.

В этом проекте:

- `Open Sans` подключён через `@fontsource-variable/open-sans`

### `src/components/yandex-fonts.astro`

Использовать для локальных `@font-face`, если пути должны быть base-aware.

В этом проекте:

- `YandexSans` вынесен в отдельный Astro-компонент

Это позволило убрать warnings от Vite и не дублировать `@font-face` в CSS.

### `src/styles/variables.css`

Сюда переносить:

- цвета
- фон
- размеры
- токены
- breakpoints
- шрифтовые переменные

### `src/styles/body.css`

Сюда переносить:

- reset
- html/body rules
- utility visibility classes
- global modal scroll lock

## Как работать с base URL

Если у Astro-проекта задан `base`, все ссылки на `public`-файлы должны быть base-aware.

Для этого использовать один util:

```ts
src/utils/with-base.ts
```

Пример:

```ts
withBase("img/slide-1.png")
withBase("files/Оферта.pdf")
```

Не дублировать локальную `withBase` по разным компонентам.

### Типичная ошибка

Нельзя склеивать путь как:

```ts
BASE_URL + "img/..."
```

Это даёт сломанные адреса вида:

```text
/tetacomimg/slide-1.png
```

Нужен именно нормализующий helper.

## Как переносить ассеты

Все ассеты из `old_site/public` переносить в `public` Astro-проекта, сохраняя смысловую структуру.

В этом проекте были перенесены:

- `public/img/*`
- `public/img/icons/*`
- `public/img/partners/*`
- `public/img/team/*`
- `public/img/products/*`
- `public/img/reviews/*`
- `public/img/iconified/*`
- `public/img/poster.jpg`
- `public/img/placemark.svg`
- `public/fonts/YandexSans/*`
- `public/files/*`

## Как переносить layout и head

Head нужно выносить в `src/layouts/Layout.astro`.

В layout должны жить:

- `title`
- `description`
- `theme-color`
- `canonical`
- `og:*`
- `twitter:*`
- favicon
- apple-touch-icons

В этом проекте head был сделан locale-aware.

То есть в `Layout.astro` есть словарь:

- `ru`
- `en`

А страницы передают `locale`.

### Что не нужно переносить в общий head

Если какой-то внешний script можно грузить лениво внутри конкретного блока, не нужно держать его в layout.

Пример:

- Yandex Maps script не оставлен глобально в `<head>`
- карта грузится внутри `contacts.astro`

## Как организовать страницы

Страницы должны быть тонкими композициями блоков.

Пример:

```astro
---
const locale = "ru" as const;
---

<Layout locale={locale}>
  <Hero locale={locale} />
  <Services locale={locale} />
  <About locale={locale} />
  <Products locale={locale} />
  <TechStack locale={locale} />
  <Reviews locale={locale} />
  <Contacts locale={locale} />
</Layout>
```

Не передавать один и тот же literal `locale="ru"` много раз. Вынести его в переменную frontmatter.

## Порядок переноса

Ниже порядок, который отработал хорошо на этом проекте.

### Шаг 1. Разобрать архив

Нужно определить:

- набор страниц
- повторяющиеся блоки
- расхождения между языками
- активный JS
- неиспользуемый JS

### Шаг 2. Перенести базовые стили и шрифты

Сделать:

- `fonts.css`
- `variables.css`
- `body.css`
- `vendors.css`
- `yandex-fonts.astro`

После этого добиться, чтобы проект собирался без проблем по шрифтам и путям.

### Шаг 3. Перенести header

Сначала только разметку и стили.

Разбить на компоненты:

- `header.astro`
- `nav.astro`
- `btn.astro`
- `dropdown.astro`
- `lang.astro`
- `list.astro`

После этого добавить JS шапки:

- `pageYOffset`
- `mobileMenu`
- `gumshoe`

Все они в этом проекте живут внутри `header.astro`.

### Шаг 4. Перенести hero

Сначала статическая разметка и стили.

Потом вернуть slider:

- инициализация Swiper внутри `hero.astro`
- привязка по `id`
- кастомная пагинация

### Шаг 5. Переносить блоки последовательно

В этом проекте порядок был такой:

- `services`
- `about`
- `achievements`
- `team`
- `products`
- `tech-stack`
- `reviews`
- `contacts`

### Шаг 6. Возвращать JS точечно

JS переносить внутрь того блока, к которому он относится.

Примеры:

- `hero.astro` -> slider
- `header.astro` -> sticky header, mobile menu, gumshoe
- `reviews.astro` -> `fslightbox`
- `contacts.astro` -> карта и current year

## Как переносить отдельные блоки

Для каждого блока порядок такой:

1. взять HTML из `old_site`
2. взять соответствующий SCSS
3. определить, какие дочерние BEM-компоненты надо вынести отдельно
4. сохранить DOM максимально близким к исходному
5. перенести тексты в словарь `ru/en`
6. привязать ассеты через `withBase`
7. только потом вернуть JS

## Что было вынесено в `src/components`

В текущем проекте как component-блоки были сделаны:

- `btn.astro`
- `container.astro`
- `dropdown.astro`
- `header.astro`
- `lang.astro`
- `list.astro`
- `nav.astro`
- `subtitle.astro`
- `text-content.astro`
- `title.astro`
- `yandex-fonts.astro`

## Что было вынесено в `src/blocks`

- `hero.astro`
- `services.astro`
- `about.astro`
- `achievements.astro`
- `team.astro`
- `products.astro`
- `tech-stack.astro`
- `reviews.astro`
- `contacts.astro`

## Как переносить внешние библиотеки

Если библиотека не требует глубокой интеграции и уже есть в архиве как vendor-файл, её можно перенести локально.

Пример:

- `old_site/src/js/fslightbox-pro-3.3.2/fslightbox.js`
- перенесён в `src/vendors/fslightbox.js`

Затем импортируется из нужного блока:

- `reviews.astro`

## Как переносить карту

Если карта есть только в одном блоке, не нужно тащить глобальный script в layout.

Лучше:

- лениво загрузить внешний script внутри блока
- проверить, не был ли он уже загружен
- инициализировать карту только один раз

В текущем проекте так сделано в `contacts.astro`.

## Как переносить current year

Если в старом проекте год вставлялся JS-кодом, не нужно оставлять это в отдельном глобальном скрипте.

Лучше встроить эту логику в соответствующий блок.

В текущем проекте:

- `footer-copyright` обновляется внутри `contacts.astro`

## Что нужно проверять после каждого шага

После каждого заметного переноса обязательно:

- запускать `npm run build`
- проверять, не сломались ли пути к `public`
- проверять scoped/global CSS
- проверять, не развалился ли layout из-за границ Astro-компонентов

## Типовые ошибки, которые уже были найдены

### 1. Сломанные пути при `base`

Проблема:

- изображения работали в dev
- ломались на GitHub Pages

Причина:

- неправильная склейка путей

Решение:

- единый `withBase`

### 2. Scoped CSS не доходит до дочернего Astro-компонента

Проблема:

- блок задаёт класс через prop в дочерний компонент
- стиль из родителя не применяется

Решение:

- использовать `:global(...)` только на этом селекторе

### 3. Избыточный `is:global`

Проблема:

- соблазн быстро поставить `is:global` на весь блок

Решение:

- scoped `<style>` по умолчанию
- `:global(...)` только точечно

### 4. Дублирование locale на странице

Проблема:

- слишком много `locale="ru"` / `locale="en"`

Решение:

- вынести `const locale = "ru" as const` или `const locale = "en" as const`

### 5. Локальные шрифты и warnings сборки

Проблема:

- локальные `@font-face` внутри CSS могут давать лишние предупреждения и неудобные пути

Решение:

- вынести локальные шрифты в Astro-компонент

## Рекомендуемый алгоритм для следующего проекта

Использовать такой чеклист:

1. Разобрать `old_site` и составить карту блоков.
2. Определить, что является `components`, а что `blocks`.
3. Настроить глобальные слои: `fonts`, `variables`, `body`, `vendors`.
4. Настроить `withBase`.
5. Перенести локальные шрифты и статические ассеты.
6. Перенести `Layout.astro` и `head`.
7. Перенести `header`.
8. Перенести первый экран.
9. Переносить блоки сверху вниз по странице.
10. После каждого блока запускать `npm run build`.
11. После статической верстки вернуть JS по месту использования.
12. После завершения пройтись по стилям и убрать лишний global.
13. В конце проверить прод-пути и метаданные.

## Финальное правило качества

Перенос считается завершённым, если:

- внешний вид совпадает с `old_site`
- DOM-структура близка к исходной
- все картинки и файлы открываются и в dev, и в build
- интерактивность восстановлена
- блоки разделены по смыслу на `components` и `blocks`
- нет лишнего глобального CSS
- `head` корректно заполнен
- страницы используют единый `locale`

## Что было сделано в текущем проекте

В итоге в этом проекте были перенесены:

- базовые стили
- шрифты
- head и metadata
- header
- hero
- services
- about
- achievements
- team
- products
- tech-stack
- reviews
- contacts
- slider
- sticky header
- mobile menu
- gumshoe
- reviews lightbox
- contacts map
- footer current year

Эту инструкцию можно использовать как шаблон для следующего аналогичного переноса сайта из legacy/static frontend в Astro.
