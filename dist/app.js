"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const _ = require("lodash");
const locations = require('../data/locations').locations;
const player = {
    position: [25, 25],
    weapon: {
        name: "10mm Pistol",
        damage: 1
    },
    hp: 10,
    maxHP: 10
};
const world = [];
const worldSize = 50; // width and length of world
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};
const getRandomLocation = () => {
    return locations[getRandomInt(locations.length)].split("\n")[0];
};
const populateWorld = () => {
    console.log("Populating world...");
    for (let i = 0; i <= worldSize; i++) {
        for (let j = 0; j <= worldSize; j++) {
            let name = "Wasteland";
            if (getRandomInt(10) > 7)
                name = getRandomLocation();
            world.push({ x: i, y: j, name });
        }
    }
    console.log("World ready.");
};
populateWorld();
const generatePromptDisplay = () => {
    return `<${player.hp}/${player.maxHP}HP ${player.weapon.name} ${getRoomName().name}>:`;
};
const getRoomName = () => {
    return _.find(world, {
        x: player.position[0],
        y: player.position[1]
    }) || { name: "No Room Name" };
};
const question = [{
        type: 'input',
        name: 'direction',
        message: generatePromptDisplay(),
        prefix: ''
    }];
const handleInput = (answer) => {
    if (answer.direction === "n")
        player.position[0]++;
    else if (answer.direction === "s")
        player.position[0]--;
    else if (answer.direction === "e")
        player.position[1]++;
    else if (answer.direction === "w")
        player.position[1]--;
    question[0].message = generatePromptDisplay();
    console.log(answer);
    takeInput();
};
const takeInput = () => {
    inquirer
        .prompt(question)
        .then(handleInput)
        .catch(console.error);
};
takeInput();
