const URL = window.location.pathname
let comments = []
let markup
fetch(URL, {
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
}).then((response) => {
    return response.json()
}).then(async(result) => {
    // console.log(result)
    comments = result
    markup = await generateMarkup(comments)
        // console.log(markup)
    let xomments = document.querySelector('#Comments');
    xomments.innerHTML = markup

}).catch((err) => {
    return console.log(err)
})

function offical(customerId) {
    if (customerId.role === 'admin') {
        return `${customerId.name} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-patch-check-fll" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
</svg>`
    } else {
        return `${customerId.name}`
    }
}

function formet(createdAt) {
    let _Miliseonds = Date.parse(createdAt)
    let _Date = new Date(_Miliseonds)
        // let timeString = _Date.toLocaleTimeString()
    let dateString = _Date.toLocaleDateString()
    return dateString
}
// it takes me 2 hours

function generateMarkup(comments) {
    return comments.map(element => {
        return `<ul>
        <li class="d-flex">
            <div class="pr-3"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
              </svg></div>
            <div class=" mb-4 w-50">
                <div class="card   ">
                    <div class="card ">
                        <div class="card-body bg-light  border border-dark rounded">
                            <h5 class="card-title "> <span class="badge badge-dark">${offical(element.customerId)}</span> </h5>
                            <p class="card-text pl-4">${element.comment}</p>
                            <p class="text-muted pl-2">${formet(element.createdAt)}</p>
                        </div>
                    </div>
                </div>
        </li>
    </ul>`
    })
}