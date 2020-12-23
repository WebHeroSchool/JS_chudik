const login = 'ivanburovkin';
const url = `https://api.github.com/users/${login}`;

let getDate = new Promise((resolve, reject) => {
  const currentDate = new Date().toLocaleDateString();
  setTimeout(() => currentDate ? resolve(currentDate) : reject('Не получилось определить дату'), 3000);
});

let getUser = new Promise((resolve, reject) => {
  setTimeout(() => url ? resolve(url) : reject('nope'), 3000);
});

Promise.all([getDate, getUser])
  .then(([currentDate, url]) => fetch(url)

  .then(res => {
    if (res.status !== 404) {
      return res.json();
    } else {
      let err = new Error(res.statusText + ' ' + res.status);
      err.res = res;
      throw err;
    }
  })

  .then(json => {
    let link = document.createElement('a');
    link.href = json.html_url;
    link.style.cssText = `
      display: block;
      font-size: 40px;
    `;
    if (json.name) {
      link.innerHTML = json.name;
    } else {
      link.innerHTML = 'Информация о пользователе недоступна';
    }
    document.body.append(link);

    let bio = document.createElement('p');
    if (json.bio) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Пользователь не заполнил данное поле';
    }
    document.body.append(bio);

    let ava = new Image();
    ava.src = json.avatar_url;
    document.body.append(ava);

    let date = document.createElement('p');
    date.innerHTML = `Текущая дата ${currentDate}`;
    document.body.append(date);
  })

  .catch(error => document.body.innerHTML = `Пользователь не найден.<br> ${error}`)
  );
