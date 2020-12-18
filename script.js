const login = 'ivanburovkin';

fetch(`https://api.github.com/users/${login}`)
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
  })

  .catch(error => document.body.innerHTML = `Пользователь не найден.<br> ${error}`);