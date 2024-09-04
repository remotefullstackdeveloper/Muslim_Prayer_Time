const prayerTimes = {
  fajr: "05:30 AM",
  zohr: "01:15 PM",
  asr: "04:45 PM",
  maghrib: "07:20 PM",
  isha: "08:50 PM",
  jumma: "01:30 PM",
};

function updateMainClock() {
  const timezone = document.getElementById("timezoneSelect").value;
  const now = new Date();

  const options = {
    timeZone: timezone === "local" ? undefined : timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const timeString = now.toLocaleTimeString("en-US", options);
  document.getElementById("mainClock").textContent = timeString;
  updateReminder(now, timezone);
}

function setPrayerTimes() {
  document.getElementById("fajrClock").textContent = prayerTimes.fajr;
  document.getElementById("zohrClock").textContent = prayerTimes.zohr;
  document.getElementById("asrClock").textContent = prayerTimes.asr;
  document.getElementById("maghribClock").textContent = prayerTimes.maghrib;
  document.getElementById("ishaClock").textContent = prayerTimes.isha;
  document.getElementById("jummaClock").textContent = prayerTimes.jumma;
}

function updateReminder(now, timezone) {
  const upcomingPrayer = getNextPrayerTime(now, timezone);
  const reminderElement = document.getElementById("reminder");

  if (upcomingPrayer) {
    const { name, timeRemaining } = upcomingPrayer;
    reminderElement.textContent = `Next prayer: ${name} in ${timeRemaining}`;
  } else {
    reminderElement.textContent = `No more prayers today`;
  }
}

function getNextPrayerTime(now, timezone) {
  const today = new Date(now).toLocaleDateString("en-US", {
    timeZone: timezone,
  });
  let nextPrayer = null;

  for (let [name, time] of Object.entries(prayerTimes)) {
    const prayerDate = new Date(`${today} ${time}`);
    const prayerTime = new Date(
      prayerDate.toLocaleString("en-US", { timeZone: timezone })
    );

    if (prayerTime > now) {
      const timeDiff = Math.floor((prayerTime - now) / 60000); // Difference in minutes
      const hours = Math.floor(timeDiff / 60);
      const minutes = timeDiff % 60;
      const timeRemaining = `${hours}h ${minutes}m`;

      nextPrayer = { name, timeRemaining };
      break;
    }
  }

  return nextPrayer;
}

setInterval(updateMainClock, 1000);
setPrayerTimes();
