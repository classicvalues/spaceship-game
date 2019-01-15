/* global window */
import Pew from './js/Pew';

/**
 * Class which receives a ship node and
 * functions to control movement and shooting
 */

class Ship {
  // ship node
  constructor(ship, space) {
    this.step = 8;
    this.space = space;
    this.ship = ship;
    this.lives = 3;
    this.spaceHeight = space.offsetHeight;
    console.log('== spaceHeight', space.offsetHeight);
    this.height = ship.height;
    this.start = null;
    this.topHolder = this.getPosition();
  }

  getPosition() {
    const top = window.getComputedStyle(this.ship).getPropertyValue('top');

    return Number(top.substring(0, top.indexOf('px')));
  }

  // step(timestamp) {
  //   if (!this.start) this.start = timestamp;
  //   const progress = timestamp - this.start;
  //   this.ship.style.transform = `translateY(-${Math.min(progress / 10, this.topHolder - 5)}px)`;
  //   if (progress < 2000) {
  //     window.requestAnimationFrame(this.step);
  //   }
  // }

  moveUp() {
    const position = this.getPosition();

    // If it's at the top, don't move the ship
    if (position <= 0) return;

    // window.requestAnimationFrame(this.step);

    this.ship.style.top = `${position - this.step}px`;
  }

  moveDown() {
    const position = this.getPosition();

    if (position >= this.spaceHeight - this.height) return;

    this.ship.style.top = `${position + this.step}px`;
  }

  shoot() {
    const x = window.getComputedStyle(this.ship).getPropertyValue('left');
    const y = window.getComputedStyle(this.ship).getPropertyValue('top');
    const newPew = new Pew(x, y);

    this.space.appendChild(newPew.pew);
    newPew.move();
  }

  loseLife() {
    if (this.lives === 0) {
      console.log('You Lose');
      return;
    }

    this.lives -= 1;
  }
}

module.exports = Ship;
