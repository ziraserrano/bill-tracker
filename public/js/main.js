const deleteInput = document.querySelectorAll('.fa-trash')

Array.from(deleteInput).forEach( element => {
    element.addEventListener('click', deleteBill)
})


async function deleteBill(){
    const bName = req.body.billName
    const bAmount = req.body.billAmount
    try {
        const response = await fetch ('deleteBill', {
            method: delete, 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'billName': bName,
                'billAmount': bAmount
              })
        })

        const data = await response.json()
        location.reload()
    } catch(err){
        console.log(err)
    }
}