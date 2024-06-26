import inquirer from 'inquirer';
import questions from './lib/questions.json';

inquirer.prompt(questions).then((answers) => {
  // callback
}).catch((error) => {
  console.log(error)
});