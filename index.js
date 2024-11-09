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

  this._birthday = birthday
  this._timerNode = timerNode
  this._lifeMeanAge = lifeMeanAge
  this._maybeMaxBirthday = null
  this._lifeDelta = null
}

LifeClock.prototype.getAge = function () {
  const ageDifMs = Date.now() - this._birthday
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

LifeClock.prototype.getBirthday = function () {
  return this._birthday
}

LifeClock.prototype.getMaybeMaxBirthday = function() {
  if (!this._maybeMaxBirthday) {
    this._maybeMaxBirthday = addYearsToBirthday(this.getBirthday(), this._lifeMeanAge)
  }
  return this._maybeMaxBirthday
}

LifeClock.prototype.calculateLifeDelta = function (fraction = 1) {
  return fraction * (this.getMaybeMaxBirthday() - this.getBirthday())
}

LifeClock.prototype.getLifeDelta = function() {
  if(!this._lifeDelta) {
    this._lifeDelta = this.calculateLifeDelta()
  }
  return this._lifeDelta
}

LifeClock.prototype.getLifePercentage = function() {
  return (Date.now() - this.getBirthday()) / this.getLifeDelta()
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
  const minutesFractional = minutesRaw - minutes

  return {
    lifePercentage,
    daysRaw,
    days,
    hoursRaw,
    hours,
    hoursFractional,
    minutesRaw,
    minutes,
    minutesFractional
  }
}


LifeClock.prototype.watchAnimation = function(displayDots = true) {
  const { hours, minutes, hoursFractional} = this.getCurrentLifeValues()


  this._timerNode.innerText = getClockValue(hours) + (displayDots ? ":" : " ") + getClockValue(minutes)

  setTimeout(() => this.watchAnimation(!displayDots), 1000)
}


function main() {
  const timerNode = document.getElementById('timer')

  const lifeClock = new LifeClock({ timerNode })
  lifeClock.watchAnimation()
}

main()
