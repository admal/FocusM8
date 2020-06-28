class TimeData {
  /**
   * Time data constructor
   * @param {number} hour 
   * @param {number} minute 
   */
  constructor(hour, minute) {
    this.hour = hour;
    this.minute = minute;
  }

  /**
   * Is this time later than provided
   * @param {number} hour 
   * @param {number} minute 
   */
  isLaterThan(hour, minute) {
    if (this.hour > hour) {
      return true;
    }

    if (this.hour < hour) {
      return false;
    }

    //this.hour == hour
    return this.minute > minute;
  }

  /**
   * Is this time later than or equal to provided
   * @param {number} hour 
   * @param {number} minute 
   */
  isLaterThanOrEqual(hour, minute) {
    if (this.hour == hour && this.minute == minute) {
      return true;
    }

    if (this.hour > hour) {
      return true;
    }

    if (this.hour < hour) {
      return false;
    }

    //this.hour == hour
    return this.minute >= minute;
  }
}

class BlockTimeData {
  /**
   * 
   * @param {TimeData} startTime 
   * @param {TimeData} endTime 
   * @param {number} weekDay sunday == 0
   */
  constructor(startTime, endTime, weekDay) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.weekDay = weekDay;
  }

  /**
   * Returns if current time should be blocked
   * @param {Date} time time to check
   */
  shouldBeBlocked(time) {
    if (this.weekDay && time.getDay() != this.weekDay) {
      //Weekday is not set or weekday is not in time, do not block
      return false;
    }

    let currentHour = time.getHours();
    let currentMinute = time.getMinutes();

    let isLaterThanStartTime = true;
    if (this.startTime) {
      isLaterThanStartTime = this.startTime.isLaterThan(currentHour, currentMinute) == false;
    }

    let isEarlierThanEndTime = true;
    if (this.endTime) {
      isEarlierThanEndTime = this.endTime.isLaterThanOrEqual(currentHour, currentMinute);
    }

    return isLaterThanStartTime && isEarlierThanEndTime;
  }
}

class BlockedPage {
  /**
   * 
   * @param {string} pageUrl 
   * @param {BlockTimeData} blockTime optional
   */
  constructor(pageUrl, blockTime) {
    this.pageUrl = pageUrl;
    this.blockTime = blockTime;
    //Will be added more configuration here like time, patterns categories etc...
  }
}

//TODO: load from config
let blockedPages = [
  new BlockedPage("https://www.facebook.com", new BlockTimeData(new TimeData(18, 0))),
  new BlockedPage("https://www.twitch.tv", new BlockTimeData(new TimeData(10, 0), new TimeData(18, 0), 1)),
  new BlockedPage("https://www.youtube.com")
];

var currentUrl = window.location.href;
let now = new Date();

for (const blockedPage of blockedPages) {
  if (currentUrl.startsWith(blockedPage.pageUrl) && (!blockedPage.blockTime ||  blockedPage.blockTime.shouldBeBlocked(now))) {
    blockPage();
  }
}

function blockPage() {
  //TODO: load nice template
  document.documentElement.innerHTML = '';
  document.documentElement.innerHTML = 'Domain is blocked';
  document.documentElement.scrollTop = 0;
}