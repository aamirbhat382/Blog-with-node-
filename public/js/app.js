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
        return `${customerId.name} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-patch-check-fll" viewBox="0 0 16 16">
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
        return ` <div class="container ">
        <div class="row ">
            <div class="col-md-4 ">
                <div class="card mb-4 box-shadow ">
                    <div class="card-body ">
                        <div class="card-title font-weight-bold">${offical(element.customerId)}</div>
                        <p class="card-text ">${element.comment}</p>
                        <div class="d-flex justify-content-between align-items-center ">
                            <div class="btn-group ">
                                <button type="button " class="btn btn-sm btn-outline-secondary ">View</button>
                                <button type="button " class="btn btn-sm btn-outline-secondary ">Edit</button>
                            </div>
                            <small class="text-muted ">${formet(element.createdAt)}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    })
}