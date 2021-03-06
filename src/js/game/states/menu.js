var Ent = require('../ent.js');
var CollisionaManager = require("../collisionManager.js");




module.exports = function (game) {
    var ent = new Ent();

    var curShowTweens = [];
    var curTimeouts = [];

    function _showText(textArea, delay){
        if(typeof(delay) !== 'number')
            delay = 0
        
        curShowTween = game.add.tween(textArea).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None).delay(delay);
        curShowTweens.push(curShowTween);
        curShowTween.start();
    }
    function _hideText(textArea){
         var tween = game.add.tween(textArea).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
         tween.start();
    }

    function showScreen(Obj1Text, Obj2Text, delay){
            if(typeof(delay) !== 'number')
                delay = 0

            Obj1Text.y =  game.world.centerY/2 - 50;

            _showText(Obj1Text, delay + 0);

            if(typeof(Obj2Text) !== 'undefined' ){
                Obj2Text.y =  game.world.centerY/2 + 50;           
                _showText(Obj2Text, delay + 1000);
            } else
                Obj1Text.y = game.world.centerY/2;

        }
    function centerIt(field){
        field.x = (game.width/2) - field.width/2;  
    }

    var gameState = {};

    gameState.preload = function(){
        game.load.image('intro1', 'images/intro2.png#grunt-cache-bust');
        game.load.image('intro2', 'images/intro1.png#grunt-cache-bust');
    }

    gameState.create = function () {
        
        var styleTitle = { font: "34px Arial", fill: "#ffffff", align: "center"};
        var style = { font: "32px Arial", fill: "#ffffff", align: "center"};
        var styleSmall = { font: "26px Arial", fill: "#ffffff", align: "center"};

        var startGameText = "[ Play ]";
        var creditsText = "Developed By:";
        var text1 = 'Sometimes you dream\n of falling...';
        var text2 = '...then you wake up\n  in your bed';
        var text3 = 'Sometimes you dream\n of being in your bed...';
        var text4 = '...then you wake up...';

        var initYOffset = -5000;
        var centeredTextX = game.width/2
        var titleArea = game.add.text(centeredTextX, initYOffset, "CADOO", styleTitle);
        centerIt(titleArea);
        var text1Area = game.add.text(centeredTextX, initYOffset, text1, style);
        var text2Area = game.add.text(centeredTextX, initYOffset, text2, style);
        var startGameButton = game.add.text(centeredTextX, initYOffset, startGameText, style);
        var scoreboardButton = game.add.text(centeredTextX, initYOffset, "[ Scoreboard ]", style);
        var goPullRequestsButton = game.add.text(centeredTextX, initYOffset, "[ Ask New Feautures ]", style);
        var creditsButton = game.add.text(centeredTextX, initYOffset, creditsText, style);
        var text3Area = game.add.text(centeredTextX, initYOffset, text3, style);
        var text4Area = game.add.text(centeredTextX, initYOffset, text4, style);
        var creditsArea = game.add.text(centeredTextX, initYOffset, 'Paolo Burelli (Lead Artist)\nJurgo Boemo(Lead Geologist)\nPaolo Turello(Lead Obstacles Maker)\nFrancesco Zanitti (Lead Relationships Manager)', styleSmall);
        var returnInitArea = game.add.text(centeredTextX, initYOffset, '<Return To Intro', style);

        var intro1Img = game.add.sprite(centeredTextX, initYOffset, 'intro1');
        var intro2Img = game.add.sprite(centeredTextX, initYOffset, 'intro2');

        text1Area.inputEnabled = true;
        text2Area.inputEnabled = true;
        text3Area.inputEnabled = true;
        text4Area.inputEnabled = true;
        startGameButton.inputEnabled = true;
        scoreboardButton.inputEnabled = true;
        goPullRequestsButton.inputEnabled = true; 
        creditsButton.inputEnabled = true;
        returnInitArea.inputEnabled = true;
        
        var bodyElements = [
            text1Area,
            text2Area,
            text3Area,
            text4Area,
            startGameButton,
            scoreboardButton,
            goPullRequestsButton,
            creditsButton,
            creditsArea,
            returnInitArea,
            intro1Img,
            intro2Img
        ];

        bodyElements.forEach(function(el){
            centerIt(el);
        });

        var hideAll = function hideAll(){
            bodyElements.forEach(function(el){
                el.alpha = 0;
                el.y = -5000;
            });
        }
        
        var hideCurScreen = function hideCurScreen(){
            curShowTweens.forEach(function(tween){
                tween.stop()
            });
            curTimeouts.forEach(function(timeoutIdx){
                clearTimeout(timeoutIdx)
            });
            hideAll();
        }

        var startGame = function(){
            hideCurScreen();
            game.state.start('preloader');
        }

        var goScoreboard = function(){
            hideCurScreen();
            game.state.start('scoreboard');
        }

        var goPullRequests = function(){
            window.open("https://github.com/digitalapesjam/Cadoo/pulls");
        }
        
        var goIntro2 = function(){
            hideCurScreen();

            text3Area.y = 150;
            _showText(text3Area); 

            intro2Img.y = 250;
            _showText(intro2Img, 500); 

            text4Area.y = 550;
            _showText(text4Area, 1000);

            curTimeouts.push(setTimeout(startGame,3000));
        } 

        var goIntro1 = function(){
            hideCurScreen();
            
            text1Area.y = 100;
            _showText(text1Area); 

            intro1Img.y = 200;
            _showText(intro1Img, 500); 

            text2Area.y = 400;
            _showText(text2Area, 1000);

            intro2Img.y = 500
            _showText(intro2Img, 1500); 

            curTimeouts.push(setTimeout(goIntro2,4000));
        } 

        var showInitialScreen = function(){
            hideCurScreen();

            titleArea.y = 50
            _showText(titleArea); 

            startGameButton.y = 150;
            _showText(startGameButton); 
            
            scoreboardButton.y = 200;
            _showText(scoreboardButton); 
            goPullRequestsButton.y = 250;
            _showText(goPullRequestsButton); 


            creditsButton.y = 350;
            _showText(creditsButton);

            creditsArea.y = 400;
            _showText(creditsArea);            

        }

        var showCredits = function(){

            hideAll();
            
            creditsArea.alpha = 1;
            creditsArea.y =  game.world.centerY/2 - 200;

            returnInitArea.alpha = 1;
            returnInitArea.y =  game.world.centerY/2 + 100;

        }

        startGameButton.events.onInputUp.add(goIntro1);
        scoreboardButton.events.onInputUp.add(goScoreboard);
        goPullRequestsButton.events.onInputUp.add(goPullRequests);
        text1Area.events.onInputUp.add(goIntro2);
        text2Area.events.onInputUp.add(goIntro2);
        
        text3Area.events.onInputUp.add(startGame);
        text4Area.events.onInputUp.add(startGame);
        
        creditsButton.events.onInputUp.add(showCredits);
        returnInitArea.events.onInputUp.add(showInitialScreen);

        showInitialScreen();
    };

    gameState.update = function (game) {}

    return gameState;
};
