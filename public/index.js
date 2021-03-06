'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

/*var price=0;
var bari;
for(var i=0; i<events.length;i++)
{
  bari=bars.find(bar => bar.id === events[i]["barId"] );
  price=events[i]["time"]*bari["pricePerHour"] + events[i]["persons"]*bari["pricePerPerson"];
  document.write(price + '<br/>');
}
events[0]["price"]=50;
document.write(events[0]["price"] + '<br/>');*/

function booking_price(bars, events)
{
  var price=0;
  var coeffDecreasingPricing;
  var bari;

  var priceDeductible;

  for(var i=0; i<events.length;i++)
  {
    coeffDecreasingPricing=1;
    bari=bars.find(bar => bar.id === events[i]["barId"] );

    if(events[i]["persons"]>60)
    {
      coeffDecreasingPricing=0.5;
    }
    else if(events[i]["persons"]>20)
    {
      coeffDecreasingPricing=0.3;
    }
    else if(events[i]["persons"]>10)
    {
      coeffDecreasingPricing=0.1;
    }

    if(events[i]["deductibleReduction"])
    {
      priceDeductible=bari["pricePerPerson"]+1;
    }
    else
    {
      priceDeductible=bari["pricePerPerson"];
    }
    price=events[i]["time"]*bari["pricePerHour"] + events[i]["persons"]*priceDeductible*coeffDecreasingPricing;
    events[i]["price"]=price;

  }

}

function commission(events, treasuryValue)
{
  var commission;

  for(var i=0; i<events.length;i++)
  {

    commission = events[i]["price"]*0.3;
    events[i]["treasury"]=treasuryValue;

    if(events[i]["deductibleReduction"])
    {
      events[i]["insurance"]=commission*0.5-1;
    }
    else
    {
      events[i]["insurance"]=commission*0.5;
    }

    events[i]["privateaser"]= commission - events[i]["treasury"] - events[i]["insurance"];

  }
}

booking_price(bars,events);
commission(events, 1);


//document.write(bars[indexbari]["pricePerHour"] + '<br/>');


function payActors(actors,events)
{

  var eventsi;

  for(var i=0;i<actors.length;i++)
  {
    eventsi=events.find(event => event.id === actors[i]["eventId"] );

    if(actors[i]["payment"][0]["who"]=='booker')
    {
      actors[i]["payment"][0]["amount"]=eventsi["price"];
    }

    else if(actors[i]["payment"][0]["who"]=='bar')
    {
      actors[i]["payment"][0]["amount"]=eventsi["price"]-eventsi["insurance"]-eventsi["treasury"]-eventsi["privateaser"];
    }

    else if(actors[i]["payment"][0]["who"]=='insurance')
    {
      actors[i]["payment"][0]["amount"]=eventsi["insurance"];
    }

    else if(actors[i]["payment"][0]["who"]=='treasury')
    {
      actors[i]["payment"][0]["amount"]=eventsi["treasury"];
    }
    else if(actors[i]["payment"][0]["who"]=='privateaser')
    {
     actors[i]["payment"][0]["amount"]=eventsi["privateaser"];
    }

  }
}

payActors(actors,events);




console.log(bars);
console.log(events);
console.log(actors);
