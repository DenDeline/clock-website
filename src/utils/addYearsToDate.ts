function addYearsToDate(date: Date, yearsOffset: number): Date {
  const newDate = new Date(date)
  newDate.setFullYear(date.getFullYear() + yearsOffset)
  return newDate
}

export default addYearsToDate
