require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;
const personSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  age: {
    type: Number,
  },
  favoriteFoods: [{
    type: String
  }]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var Leyla = new Person({
    name: 'Leyla',
    age: 28,
    favoriteFoods: ["mexican", "mac and cheese"]
  });
  Leyla.save(function(err, data) {
    if(err) {
      console.log(err);
    }
    return done(null, Leyla);
  });
};

const arrayOfPeople = [
    {name: "Andre",
     age: 28,
     favoriteFoods: ["mangoes"]
    },
      {
        name: "Lissete",
        age: 28,
        favoriteFoods: ["lobster mac and cheese", "pasta", "italian"]
      }
    ]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      console.log(err);
    }
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return console.log(err);
    }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
