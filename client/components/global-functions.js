'use strict';

/* jshint ignore:start */

function Board(name, numberOfColumns) {
  return {
    name: name,
    numberOfColumns: numberOfColumns,
    columns: [],
    withoutStatusIssues: [],
    repositories: [],
    repositoriesAdded: [],
    issues: []
  };
}

function Column(name, status) {
  return {
    status: status,
    name: name
  };
}

var triggerRocketAnimation = function() {
  $('.panel-done img.plain').hide();
  $('.panel-done h3').css('opacity', 0);
  $('.panel-done .issues-count').css('opacity', 0);
  $('.panel-done img.colored').show().animate({
    top: '-650px'
  }, 2000, 'easeInBack', function() {
    $('.panel-done img.colored').hide().css('top', 0);

    $('.panel-done h3').text('Liftoff! We Have a Liftoff!');
    $('.panel-done h3').css('color', '#5dc66c');
    $('.panel-done h3').animate({
      opacity: 1
    }, 2000);

    $('.panel-done .check-done').fadeIn(2000, function() {
      $('.panel-done .check-done').hide();

      $('.panel-done h3').css('opacity', 0);
      $('.panel-done h3').text('Drop here to launch');
      $('.panel-done h3').css('color', '#aaa');

      $('.panel-done img.plain').fadeIn(600);
      $('.panel-done h3').animate({
        opacity: 1
      }, 600);
      $('.panel-done .issues-count').animate({
        opacity: 1
      }, 600);
    });
  });
};

/* jshint ignore:end */