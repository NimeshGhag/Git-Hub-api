const form = document.querySelector('form');
const usernameInp = document.querySelector('form input')
let card = document.querySelector('.card')

const getProfileData = (userName)=>{
    return fetch(`https://api.github.com/users/${userName}`).then(raw=>{
        if(!raw.ok) throw new Error('user not found')
            return raw.json()
    })
}


const getReops = (userName)=>{
    return fetch(`https://api.github.com/users/${userName}/repos?sort=updated`).then(raw=>{
        if(!raw.ok) throw new Error('Failed to fetch...')
            return raw.json()
    })
}


function addInfo (details){
    let userCard = `  <div class="flex justify-center md:justify-start">
        <img
          src="${details.avatar_url}"
          alt="GitHub avatar"
          class="w-32 h-32 rounded-full object-cover shadow"
        />
      </div>

      <!-- Profile Info -->
      <div class="space-y-2">
        <h2 class="text-2xl font-bold text-gray-900">${details.login}</h2>
        <p class="text-gray-600">@${details.login}</p>
        <p class="text-gray-700">
          ${details.bio? details.bio : 'N/A'}
        </p>

        <div class="grid grid-cols-3 gap-4 text-center mt-4">
          <div>
            <p class="text-lg font-bold text-gray-900">${details.public_repos}</p>
            <p class="text-sm text-gray-500">Repos</p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">${details.followers}</p>
            <p class="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">${details.following}</p>
            <p class="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>`

      card.innerHTML= userCard
}


form.addEventListener('submit',(event)=>{
    event.preventDefault()
    card.classList.remove('hide')
    let username= usernameInp.value.trim();

    if(username.length >0){
        getProfileData(username).then(data=>
            addInfo(data))
            .catch(err =>{
              card.innerHTML="User Not Found"
            })
            usernameInp.value ="";
    }else{
        alert('Please Enter Username');
    }
})