export const convertDate = (date: string) => {
  const upDate = new Date(date)
  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() -1);

  let options: {[name: string]: string} = {
    hour: 'numeric',
    minute: 'numeric',
  };

  let day;

  if (today.toDateString() === upDate.toDateString()) {                                                                
      day='Сегодня,'
  } else if (yesterday.toDateString() === upDate.toDateString()) {                                                     
      day='Вчера,'                                                                                  
  } else {   
    if (((upDate.getDate() - today.getDate()) * -1) < 5) { 
      day = `${(upDate.getDate() - today.getDate()) * -1} дня назад`;
    } else {
      day = `${(upDate.getDate() - today.getDate()) * -1} дней назад`;
    }                                                                
  }
  let dateString = `${day} ${upDate.toLocaleString("ru", options)} i-${upDate.toLocaleDateString('en-US', {day: '2-digit',timeZoneName: 'short',}).slice(4)}`
  return dateString;
}
