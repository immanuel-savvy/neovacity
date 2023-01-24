const DEV = false;

const hostname = DEV
  ? "http://localhost"
  : "https://neovacity.udaralinksapp.com";

const client_domain = DEV
  ? `${hostname}:3000`
  : `http://giitafrica.com/neovacity`;

const domain = DEV ? `${hostname}:1178` : `https://neovacity.udaralinksapp.com`;

const default_admin = "adminstrators~123neovacity~1234567890123";

const month_index = new Object({
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec",
});

const organisation_name = "Neovacity Africa";

export {
  domain,
  hostname,
  client_domain,
  month_index,
  default_admin,
  organisation_name,
  DEV,
};
