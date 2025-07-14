const setFromDate = () => {
  const date = new Date();
  const formatted = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;
  return formatted;
};

const setToDate = (days) => {
  const fromDate = new Date();
  const toDate = new Date(fromDate);
  toDate.setDate(toDate.getDate() + (parseInt(days) - 1));
  const formatted = `${toDate.getDate()} ${toDate.toLocaleString("default", {
    month: "long",
  })} ${toDate.getFullYear()}`;
  return formatted;
};

const structoredCustomers = (data) => {
  const customers = data.map((c) => {
    return {
      name: c.name,
      phone: c.phone,
      rentalDetails: c.CustomerCarRentals.map((r) => {
        return {
          car: r.Car.name,
          status: r.status,
          toDate: r.toDate,
        };
      }),
    };
  });
  return customers;
};

module.exports = { setFromDate, setToDate, structoredCustomers };
