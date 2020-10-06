const body = document.body;
const urlParam = window.location.search.substring(1);
const login = (urlParam.split(('='))[1]);
let url = 'https://api.github.com/users/ivanburovkin';
if (login) {
  url = `https://api.github.com/users/${login}`;
}

fetch(url)
  .then(response => {
    if (response.status !== 404) {
      return response.json();
    } else {
      let err = new Error(response.statusText + ' ' + response.status);
      err.response = response;
      throw err;
    }
  })

  .then(json => {
    let ava = new Image();
    ava.src = json.avatar_url;
    body.append(ava);

    let link = document.createElement('a');
    link.href = json.html_url;
    link.style.display = "block";
    if (json.name) {
      link.innerHTML = json.name;
    } else {
      link.innerHTML = 'Информация о пользователе недоступна';
    }
    body.appendChild(link);

    let bio = document.createElement('p');
    if (json.bio) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Пользователь не заполнил данное поле';
    }
    body.append(bio);
  })

  .catch(error => document.body.innerHTML = `Пользователь не найден.<br> ${error}`);
  