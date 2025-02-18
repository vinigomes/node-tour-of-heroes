var express = require('express');
var router = express.Router();

const heroes = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

router.get('/', function(req, res, next) {
  const heroName = req.query.name;
  if (heroName) {
    const hero = heroes.filter(hero => new RegExp(heroName, 'i').test(hero.name));
    if (hero.length === 0) { 
      res.status(404).send('Hero not found');
    } else {
      res.send(hero);
    }
  } else {
    res.send(heroes);
  }
});

router.get('/:id', function(req, res, next) {
  const heroId = parseInt(req.params.id);
  const hero = heroes.find(hero => hero.id === heroId);
  if(!hero) {
    res.status(404).send('Hero not found');
    return;
  }
  res.send(hero);
});

router.put('/:id', function(req, res, next) {
  const heroId = parseInt(req.params.id);
  const hero = heroes.find(hero => hero.id === heroId);
  if(!hero) {
    res.status(404).send('Hero not found');
    return;
  }
  hero.name = req.body.name;
  res.send(hero);
});

router.post('/', function(req, res, next) {
  const idMaximo = Math.max(...heroes.map(hero => hero.id));
  const newHero = {
    id: idMaximo + 1,
    name: req.body.name
  };
  heroes.push(newHero);
  res.send(newHero);
});

router.delete('/:id', function(req, res, next) {
  const heroId = parseInt(req.params.id);
  const heroIndex = heroes.findIndex(hero => hero.id === heroId);
  if(heroIndex === -1) {
    res.status(404).send('Hero not found');
    return;
  }
  heroes.splice(heroIndex, 1);
  res.send();
});

module.exports = router;
