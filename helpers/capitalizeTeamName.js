const capitalize = (n) => {
  const newName = n.split(" ");
  let a = [];

  for (let i = 0; i < newName.length; i++) {
    let s = newName[i].charAt(0).toUpperCase() + newName[i].slice(1);
    a.push(s);
  }
  a = a.join(' ');
  return a;
}

module.exports = capitalize;