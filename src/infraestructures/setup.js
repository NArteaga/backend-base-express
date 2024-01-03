'use strict';

const minimist = require('minimist');
const inquirer = require('inquirer');
const { join } = require('path')

const args = minimist(process.argv);
const prompt = inquirer.createPromptModule();

const { injectDependecies, loadDependecies } = require('../common/load.js')
const associtions = require('./associations.js')
const { sequelize, dataTypes } = require('../common/db.js');

const { config } = require('dotenv')

config()

const configLoad = [
  {
    container: 'models',
    name: '.model',
    dependecies: { sequelize, dataTypes }
  },
  {
    container: 'repositories',
    name: '.repository',
    inject: ['estructures'],
    dependecies: { sequelize }
  }
]

async function setup() {
  if (!args.yes) {
    const answers = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: '¿Esta seguro de continuar debido que eliminara la información de la base de datos de la aplicación?'
      }
    ]);

    if (!answers.setup) return console.log('No se realizo ninguna tarea');
  }
  const dependecies = {}
  for (const inject of configLoad) {
    dependecies[inject.container]
      = loadDependecies(
        join(__dirname, inject.container),
        { ...inject, type: 'js', dependecies: { ...inject.dependecies } },
        injectDependecies(dependecies, inject.inject)
      )
    if (inject.container === 'models')
      dependecies.estructures = associtions(dependecies.models)
  }
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
}

setup();