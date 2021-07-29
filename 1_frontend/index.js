// create table form
const ctEl = document.querySelector('#inputForm');
const outputEl = document.querySelector('#output');
ctEl.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('http://localhost:5000/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: e.target.item.value }),
  });
  location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
  return fetch('http://localhost:5000/items').then((res) =>
    res.json().then((data) => {
      outputEl.innerHTML = data[0].reduce((total, item) => {
        total += `
        <ul>
          <li> id:<span>${item.id}</span> ${item.title}</li>
        </ul>
        `;
        return total;
      }, '');
    })
  );
});
