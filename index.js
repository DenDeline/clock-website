function addYearsToBirthday(birthday, years) {
  const newBirthday = new Date(birthday)
  newBirthday.setFullYear(birthday.getFullYear() + years)
  return newBirthday
}

function getElapsedTimeInPercentage(birthday, maybeMaxBirthday) {
  return (Date.now() - birthday) / (maybeMaxBirthday - birthday)
}

function getClockValue(num) {
  return ('0' + num).slice(-2)
}

function LifeClock(options) {
  const {
    birthday = new Date('2002-08-20T00:00:00.000'),
    timerNode,
    lifeMeanAge = 76
  } = options

  this.birthday = birthday
  this._timerNode = timerNode
  this._lifeMeanAge = lifeMeanAge
  this._maybeMaxBirthday = null
}

LifeClock.prototype.getAge = function () {
  const ageDifMs = Date.now() - this.birthday
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

LifeClock.prototype.getMaybeMaxBirthday = function() {
  if (!this._maybeMaxBirthday) {
    this._maybeMaxBirthday = addYearsToBirthday(this.birthday, this._lifeMeanAge)
  }
  return this._maybeMaxBirthday
}

LifeClock.prototype.getLifePercentage = function() {
  return getElapsedTimeInPercentage(this.birthday, this.getMaybeMaxBirthday())
}

LifeClock.prototype.getCurrentLifeValues = function(){
  const lifePercentage = this.getLifePercentage()

  const daysRaw = lifePercentage
  const days = Math.trunc(daysRaw)
  const daysFractional = daysRaw - days

  const hoursInDay = 24
  const hoursRaw = daysFractional * hoursInDay
  const hours = Math.trunc(hoursRaw)
  const hoursFractional = hoursRaw - hours

  const minutesInHour = 60
  const minutesRaw = hoursFractional * minutesInHour
  const minutes = Math.trunc(minutesRaw)

  return {
    lifePercentage,
    daysRaw,
    days,
    hoursRaw,
    hours,
    minutesRaw,
    minutes
  }
}


LifeClock.prototype.watchAnimation = function(displayDots = true) {
  const { hours, minutes} = this.getCurrentLifeValues()
  this._timerNode.innerText = getClockValue(hours) + (displayDots ? ":" : " ") + getClockValue(minutes)
  setTimeout(() => this.watchAnimation(!displayDots), 1000)
}


function main() {
  const timerNode = document.getElementById('timer')

  const lifeClock = new LifeClock({ timerNode })
  lifeClock.watchAnimation()
}

main()
