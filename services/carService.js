const structoredCarDetails = (carArray) => {
  const cars = carArray.map((c) => {
    return {
      car_id: c.id,
      name: c.name,
      model: c.CarModel.name,
      reg_no: c.reg_no,
      reg_year: c.reg_year,
      fuel_type: c.fuel_type,
      image: c.image,
      seating_capacity: c.seating_capacity,
      manufactorer: c.CarModel.Manufactorer.name,
      status: c.status,
    };
  });
  return cars;
};

const structuredModels = (modelArray) => {
  const models = modelArray.map((m) => {
    return { name: m.name };
  });
  return models;
};

module.exports = { structoredCarDetails, structuredModels };
