
export class DateUtil {
  static formatDay(date) {
    date = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('fr-CA', options);
  }

  static formatTime(date) {
    date = new Date(date);
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString('fr-CA', options);
  }

  static completeDate(date) {
    const formatedDate = new Date(date);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric' };

    return formatedDate.toLocaleDateString('fr', options) + ' ' +
      ('0' + formatedDate.getHours()).slice(-2) + ':' +
      ('0' + formatedDate.getMinutes()).slice(-2);
  }
}
