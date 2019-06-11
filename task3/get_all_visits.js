const MotorwayApi = require(`./motorway_api`);

module.exports = async () => {
  const client = new MotorwayApi(`https://motorway-challenge-api.herokuapp.com`);
  const visitors = {}; 
  let page = 1;
  let data = [1];

  await client.login();
  
  while(data.length) {
    data = (await client.getVisits(page++)).data
    addVisits(visitors, data);
  }

  const result = [];

  for(visitor in visitors) {
    result.push({
      name: visitor,
      visits: visitors[visitor]
    });
  }

  return result;
};

function addVisits(result, visits) {
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