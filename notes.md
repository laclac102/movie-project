goBack():
https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history

## add favorite

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/account/20024063/favorite';
const options = {
method: 'POST',
headers: {
accept: 'application/json',
'content-type': 'application/json',
Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWU3MzBmZjQ5ZWEzNmU0MjcxYjA0NzkyZDg0M2IwYSIsInN1YiI6IjY0OGQ1NDYyNTU5ZDIyMDBhZDgxZDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QQEI7vSospxCzaxNtKVqm9CvyjKz_pzKmkatm1LZVAM'
},
body: JSON.stringify({media_type: 'movie', media_id: 550, favorite: true})
};

fetch(url, options)
.then(res => res.json())
.then(json => console.log(json))
.catch(err => console.error('error:' + err));
