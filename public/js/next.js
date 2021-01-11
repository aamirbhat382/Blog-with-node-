function createMarkup(newArr) {
    return {
        markup(newArr) {
            return newArr.map(element => {
                return ` <div class=" jumbotron p-3 p-md-5  bg-light  rounded  text-dark border">
<div class="col-md-6 px-0">
<h1 class="display-4 font-italic">
${element.title}
</h1>
<p class="lead my-3">
${element.description}
</p>
<p class="lead mb-0"><a href="/article/${element.slug}" class="text-info font-weight-bold">Continue reading...</a></p>
</div>
</div>
`
            })
        },
        Endpage() {
            return `
            <div class="jumbotron p-3 p-md-5 text-white rounded bg-danger">
            <div class="col-md-6 px-0">
                <h1 class="display-4 font-italic">No! More</h1>
             
                <p class="lead mb-0"><a href="/" class="text-white font-weight-bold btn btn-outline-light">Go Back...</a></p>
            </div>
        </div>
            `
        }
    }
}
// user Clicks on Next Button
let netxBtn = document.getElementById('next')
netxBtn.addEventListener('click', function(e) {
    e.preventDefault
        // get Data value
    ourArray = JSON.parse(netxBtn.dataset.articles)
    ist = parseInt(netxBtn.dataset.ist)
    second = parseInt(netxBtn.dataset.second)
        // console.log(ist, second)
        // Add  10 
    newIst = ist + 10
    newSecond = second + 10
        // console.log(newIst, newSecond)
        // console.log(ourArray)
        // Check 
    if (newIst <= ourArray.length) {
        // Slice
        newArr = ourArray.slice(newIst, newSecond)
            // Call a function
        createMarkup(newArr)
            //  Call inner function
        html = createMarkup(newArr).markup(newArr)
            // Get Element
        let markup = document.getElementById('markup')
        markup.innerHTML = html
            // Update Next Button With New Values
        UpdateNextBtn = document.getElementById('next')
        UpdateNextBtn.setAttribute('data-articles', `${JSON.stringify(ourArray)} `)
        UpdateNextBtn.setAttribute('data-ist', `${newIst} `)
        UpdateNextBtn.setAttribute('data-second', `${newSecond} `)
            // Check
    } else if (newIst > ourArray.length || newSecond > ourArray.length) {
        // Get Element
        let markup = document.getElementById('markup')
            // Call function
        endPage = createMarkup(newArr).Endpage()
        markup.innerHTML = endPage
        UpdateNextBtn = document.getElementById('lastbtn').style.display = "none"

    } else {
        console.log("Something went To Wrong")
    }
})