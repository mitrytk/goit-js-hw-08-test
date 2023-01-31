"use strict";
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
    id: 236203659,
    width: 640,
    loop: true,
});
populateTimeVideo();
player.on('timeupdate', throttle(onPlayVideo, 1000));

function onPlayVideo () {
    player.getCurrentTime().then(function(seconds) {
        localStorage.setItem("videoplayer-current-time", seconds)
    }).catch(function(error) {
        console.log(error);
    });
};

function populateTimeVideo() {
    const savedTime = localStorage.getItem("videoplayer-current-time");

    if (savedTime) {
        player.setCurrentTime(savedTime).then(function(seconds) {
        }).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    break;
        
                default:
                    break;
            }
        });
    }
}