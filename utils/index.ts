export const getNowTime = () => {
  const date = new Date()

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
