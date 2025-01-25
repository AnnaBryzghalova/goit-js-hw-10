class Timer {
  #daysElement;
  #hoursElement;
  #minutesElement;
  #secondsElement;
  #intervalMs;
  #onFinish;

  #targetMs;
  #intervalId;

  constructor({
    daysElement,
    hoursElement,
    minutesElement,
    secondsElement,
    interval = 1000,
    onFinish = () => {},
  }) {
    this.#daysElement = daysElement;
    this.#hoursElement = hoursElement;
    this.#minutesElement = minutesElement;
    this.#secondsElement = secondsElement;
    this.#intervalMs = interval;
    this.#onFinish = onFinish;
  }

  start(targetMs) {
    if (targetMs <= Date.now()) {
      throw new Error('Invalid target date');
    }

    this.#targetMs = targetMs;
    this.#intervalId = setInterval(() => {
      this.update();
    }, this.#intervalMs);
    this.update();
  }

  stop() {
    clearInterval(this.#intervalId);
  }

  update() {
    const timeLeft = new Date(Math.max(this.#targetMs - Date.now(), 0));

    if (this.#daysElement !== null) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      this.#daysElement.textContent = getString(days);
    }

    if (this.#hoursElement !== null) {
      this.#hoursElement.textContent = getString(timeLeft.getUTCHours());
    }

    if (this.#minutesElement !== null) {
      this.#minutesElement.textContent = getString(timeLeft.getUTCMinutes());
    }

    if (this.#secondsElement !== null) {
      this.#secondsElement.textContent = getString(timeLeft.getUTCSeconds());
    }

    if (timeLeft <= 0) {
      this.stop();
      this.#onFinish();
    }

    function getString(number) {
      return number.toString().padStart(2, '0');
    }
  }
}

export default Timer;
