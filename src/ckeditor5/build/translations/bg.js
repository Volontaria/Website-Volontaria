!(function (n) {
  const e = (n.bg = n.bg || {});
  (e.dictionary = Object.assign(e.dictionary || {}, {
    'Block quote': 'Цитат',
    Bold: 'Удебелен',
    Cancel: 'Отказ',
    'Choose heading': '',
    Heading: '',
    'Heading 1': '',
    'Heading 2': '',
    'Heading 3': '',
    'Heading 4': '',
    'Heading 5': '',
    'Heading 6': '',
    Italic: 'Курсив',
    Paragraph: 'Параграф',
    'Remove color': '',
    Save: 'Запазване',
    Underline: '',
  })),
    (e.getPluralForm = function (n) {
      return 1 != n;
    });
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
