[slides for Intro to Aframe](https://docs.google.com/presentation/d/1TFNlNaAAq9XQAkSzMjsUq_neW1CVovD9rkFAik59HVI/edit?usp=sharing)

[slides for advanced Aframe / React integration](https://docs.google.com/presentation/d/1W_QRLqOEDKKe1yUQBKYuLdpWnmBLBhWVF7EabXXi56M/edit?usp=sharing)

## First Steps:

1. fork this repo to your github account
2. clone down the repo
3. ensure that you have Node installed on your machine
4. open a terminal in the project directory and run the following commands:

>npm install

>npm run

The bundle will be created and served. A browser window should open, if not open one and direct it to localhost:3000

Edit the source code files in your favorite text editor or IDE to complete as many of the following milestones as possible within the time-limit:

## Minimum Viable Product:
1. Implement the spawnEntities method of the App component
2. Implement event listeners in the App component
3. Complete the lock-on-source and lock-on-target components to allow the player to target and destroy enemy entities
4. Complete the fly-away component to cause entities  to fly out of the scene if they are not destroyed in time
5. Complete the missile-launcher component to give dangerous enemies the ability to shoot missiles at the player
6. Have the player lose a life when hit by a missile
7. End the game when the player runs out of lives


## Full Basic Functionality:

1. Display a meter showing the number of remaining lives
2. Change the view at the end of the game to display a "game over" message and a reset button
3. Keep track of the score and show a UI notification when it changes
4. Show an explosion when a missile hits the player and when the player destroys a target
5. Limit the number of targets that can be locked onto at once

## Advanced Content:
1. Load in 3D models for the player and targets instead simple sphere primitives
2. Add sound effects
3. Implement new enemy and friendly types - perhaps an armored enemy that needs to be hit more than once to be destroyed, or a rapid-fire enemy that launches missiles at a faster rate
4. Add powerups that enemies and friendlies drop -- they could be extra lives, or a bigger cursor, or a bomb that will destroy anything on screen. Enemies could drop powerups when they are destroyed and friendlies could drop them when they fly away 
5. Create different difficulty modes, or have the difficulty progressively increase with time
6. Create a "flight-path" component that causes entities to move along a designated path before flying away
7. Modify the spawnEntities() function in the utils directory to spawn groups of entities laid out in formation rather than one at a time
8. Build a back end to keep track of high-scores, user accounts, and leader boards

This workshop is a work in progress, so if you find an optimization or implement a cool new feature, feel free to send a pull request and maybe your code will make it into the next iteration!

## To play the game:

[deployed version of completed project](http://bubbleblaster.surge.sh)

1. You are the big blue bubble
2. click and drag (or look if playing in VR) to position the cursor over enemies
3. press space to lock onto targets
4. release space to fire at locked-on targets
5. light blue targets are your friends - don't shoot them
6. yellow targets are harmless enemies -- you can shoot them but they are not worth very many points
7. orange targets are dangerous - shoot them before they shoot missiles at you!
8. black target are missiles. If you don't shoot them down before they hit you, you will lose a life
9. lose three lives and its game over, buster!

#### This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

If you wish to change any of the configure files (webpack, etc), run the following command:
>npm run eject

Please note that this action cannot be undone and is not necessary to complete the basic steps of this assignment. 
