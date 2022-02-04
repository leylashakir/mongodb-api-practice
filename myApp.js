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

var Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  janeFonda.save(function(err, data) {
    if(err) {
      console.log(err);
    }
    done(null, janeFonda);
  });
};

const arrayOfPeople = [
    {
      name: "Andre",
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

const findPeopleByName = function(personName, done) {
  Person.find({ name: personName }, function (err, data) {
    if (err) {
      return console.log(err);
    }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) {
      return console.log(err)
    } else {
      done(null, data);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if(err) {
      console.log(err)
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, person) {
    if(err) {
      console.log(err)
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if(err) {
        console.log(err)
      }
      done(null, data)
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if(err) {
      console.log(err)
    }
    done(null, updatedPerson);
  }) 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, function(err, person) {
    if(err) {
      console.log(err)
    }
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) {
      console.log(err)
    }
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: "burrito"}).sort({name: 'asc'}).limit(2).select('-age').exec(function (err, person) {
    if(err) {
      console.log(err)
    }
    done(null, person);
  }                                                                                  
)};

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
