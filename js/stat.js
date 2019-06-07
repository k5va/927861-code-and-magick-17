'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_PADDING_TOP = 30;
var CLOUD_PADDING_LEFT = 30;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_OFFSET = 10;
var TEXT_STYLE = '16px PT Mono';
var TEXT_COLOR = '#000';
var TEXT_OFFSET = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var PLAYER_BAR_COLOR = 'rgba(0, 0, 255,'; //alfa will be added to color
var CURRENT_PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var CURRENT_PLAYER_NAME = 'Вы';

/**
 * Draws a cloud
 * @param {CanvasRenderingContext2D} ctx — canvas rendering context
 * @param {number} x - cloud's X coordinate
 * @param {number} y - cloud's Y coordinate
 * @param {string} color - cloud's fill color
 */
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Renders win message
 * @param {CanvasRenderingContext2D} ctx — canvas rendering context
 * @param {number} x - message's X coordinate
 * @param {number} y - message's Y coordinate
 * @param {string} font - message's font
 */
var renderMessage = function(ctx, x, y, font) {
  ctx.font = font;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + TEXT_OFFSET);
};

/**
 * Returns maximum value of an array
 * @param {object} values - array of values
 * @returns {} - array's maximum value
 */
var getMaxValue = function(values) {
  return Math.max.apply(Math, values);
}

/**
 * Returns fill color for given player
 * @param {string} name - player's name
 * @returns {string} - fill color
 */
var getFillColor = function(name) {
  return name === CURRENT_PLAYER_NAME ? CURRENT_PLAYER_BAR_COLOR : PLAYER_BAR_COLOR + Math.random() + ')';
}

/**
 * Renders a bar
 * @param {CanvasRenderingContext2D} ctx — canvas rendering context
 * @param {string} name - player's name
 * @param {number} time - player's time
 * @param {number} x - bar's x coordinate
 * @param {number} y - bar's y coordinate
 * @param {number} width - bar's width
 * @param {number} height - bar's height
 * @param {string} color - bar's color
 */
var renderBar = function(ctx, name, time, x, y, width, height, color) {
  ctx.fillStyle = color;
  //render the bar
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'bottom';
  //render player's name under the bar
  ctx.fillText(name, x, y + height + TEXT_OFFSET);
  //render player's time above the bar
  ctx.textBaseline = 'hanging';
  ctx.fillText(Math.floor(time), x, y - TEXT_OFFSET);
};


/**
 * Render resulting Bar chart
 * @param {CanvasRenderingContext2D} ctx — canvas rendering context
 * @param {object} names - players' names array
 * @param {object} times - players' times array
 */
var renderBarChart = function(ctx, names, times) {
  var maxTime = getMaxValue(times);

  for (var i = 0; i < names.length; i++) {
    var currentHeight = times[i] * BAR_HEIGHT / maxTime;
    renderBar(
      ctx,
      names[i],
      times[i],
      CLOUD_X + CLOUD_PADDING_LEFT + (BAR_WIDTH + BAR_GAP) * i,
      CLOUD_HEIGHT - currentHeight - TEXT_OFFSET,
      BAR_WIDTH,
      currentHeight,
      getFillColor(names[i])
    );
  }
};

/**
 * Renders statistics at the end of the game
 * @param {CanvasRenderingContext2D} ctx — canvas rendering context
 * @param {object} names - players' names array
 * @param {object} names - players' finish times (in ms) array. Should match the names array
 */
window.renderStatistics = function(ctx, names, times) {
  //draw cloud's shadow
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_OFFSET, CLOUD_Y + CLOUD_SHADOW_OFFSET, CLOUD_SHADOW_COLOR);
  //draw cloud
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  //render win message
  renderMessage(ctx, CLOUD_X + CLOUD_PADDING_LEFT, CLOUD_Y + CLOUD_PADDING_TOP, TEXT_STYLE);
  //render bar chart
  renderBarChart(ctx, names, times);
};
