const random = (listItems)=>{
    str=''
    listItems.map((item)=>{
        str+=`<tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.amount}</td>
            <td class="alignright">${item.total}</td>
        </tr>`})
    return str
}

module.exports = random