const MotorwayApi = require(`./motorway_api`);

module.exports = async () => {
  const client = new MotorwayApi(`https://motorway-challenge-api.herokuapp.com`);
  await client.login();

  const visitors = {};
  let { total } = await client.getVisits(1);
  let oldTotal, pages, data;

  while(oldTotal != total) {
    oldTotal = total;
    pages = Math.ceil(total / 15);
    data = await getAllVisits(pages, client);
    total = data.total;
  }

  calculateVisits(visitors, data.visits)
  
  const result = [];

  for(visitor in visitors) {
    result.push({
      name: visitor,
      visits: visitors[visitor]
    });
  }

  return result;
};

async function getAllVisits(pages, client) {
  
  const promises = [];

  for(let i = 0; i < pages; i++) {
    promises.push(client.getVisits(i + 1));
  }

  const response = await Promise.all(promises);
  
  let total = 0;
  const visitsHash = {};
  visitsArray = [];
  
  response.forEach(visits => {
    if(visits.total > total) {
      total = visits.total;
    }

    visits.data.forEach(visit => {
      if(!visitsHash[visit.id]) {
        visitsArray.push(visit);
        visitsHash[visit.id] = true;
      }
    });
  });

  return { total, visits: visitsArray };
}

function calculateVisits(result, visits) {
  const today = new Date();

  for(const visit of visits) {
    let name = visit.name;
    let date = new Date(visit.date);
    let day = date.getDay();
    let isEqualsToday = date.toDateString() === today.toDateString();
    let isWeekend = day === 0 || day === 6;

    if(!isWeekend && !isEqualsToday) {
      if(!result[name]) {
        result[name] = 0;
      }

      result[name]++;
    }
  }

  return result;
}