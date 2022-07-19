let inputValueObj = {};
const getResponsesWithoutBody = async(link, methd, id) => {
    const response = await fetch((id ? `${link}${id}` : link ), {
        method: methd
    });
    const result = await response.json();
    render(result);
}
const getResponsesWithBody = async(link, methd, id) => {
    const response = await fetch((id ? `${link}${id}` : link ), {
        method: methd,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            shop: inputValueObj.shop,
            spend: inputValueObj.spend
        })
    });
    const result = await response.json();
    render(result);
}
const updateValue = ({target}) => {
    const {value, id} = target;
    id == 'inputShop' ? inputValueObj.shop = value :  inputValueObj.spend = value;
}
window.onload = function init () {
    const inputShop = document.getElementById('inputShop');
    const inputSpend = document.getElementById('inputSpend');
    inputShop.addEventListener('change', updateValue);
    inputSpend.addEventListener('change', updateValue);
    getResponsesWithoutBody("http://localhost:8000/api/expenses/", 'GET');
}
const addNewExpense = () => {
    getResponsesWithBody("http://localhost:8000/api/expenses/", 'POST');
    inputValueObj = {};
    inputShop.value = '';
    inputSpend.value = '';
}
const inputButtonElement = document.getElementById('button');
inputButtonElement.addEventListener('click', addNewExpense);
const edit = (item, blocks) => {
    const {id, shop, spend, createdAt} = item;
    const editShopInputDiv = document.createElement('div');
                 editShopInputDiv.className = 'editShopInputDiv';
 
                 const editShopInput = document.createElement('input');
                 editShopInput.type = 'text';
                 editShopInput.value = shop;

                 editShopInput.addEventListener('change', updateValue);
                 editShopInput.className = 'editShopInput';
                 editShopInputDiv.appendChild(editShopInput);
                 blocks.innerHTML = "";
                 blocks.appendChild(editShopInputDiv);
 
                 // Dates
                 const editRestOfDiv = document.createElement('div');
                 editRestOfDiv.className = 'editRestOfDiv';
 
                 const addedDate = document.createElement('div');
                 addedDate.className = 'addedDate';
                 const addDateInParag = document.createElement('p');
                 addDateInParag.className = 'addDateInParag';
                 const textNode2 = document.createTextNode(createdAt);
                 addDateInParag.appendChild(textNode2);
                 addedDate.appendChild(addDateInParag);
                 editRestOfDiv.appendChild(addedDate);
                
                //  // Edit Spent USD's
                 const editSpendInputDiv = document.createElement('div');
                 editSpendInputDiv.className = 'editSpendInputDiv';
 
                 const editSpendInput = document.createElement('input');
                 editSpendInput.type = 'text';
                 editSpendInput.size = '5';
                 editSpendInput.value = spend;
                 editSpendInput.addEventListener('change', updateValue);
                 editSpendInput.className = 'editSpendInput';
                 editSpendInputDiv.appendChild(editSpendInput);
                 editRestOfDiv.appendChild(editSpendInputDiv);
 
                 //Add Icon for Editing Info
                 const editWholeInfoIconDiv = document.createElement('div');
                 editWholeInfoIconDiv.className = 'editWholeInfoIconDiv';
 
                 const editWholeInfoIcon = document.createElement('img');
                 editWholeInfoIcon.src = "https://img.icons8.com/emoji/30/000000/check-mark-emoji.png";
                 editWholeInfoIcon.className = 'editWholeInfoIcon';
                 editWholeInfoIconDiv.appendChild(editWholeInfoIcon);
                 editRestOfDiv.appendChild(editWholeInfoIconDiv);
 
                 blocks.appendChild(editRestOfDiv);

                 editWholeInfoIcon.onclick = () => {
                    getResponsesWithBody("http://localhost:8000/api/expenses/", 'PATCH', id);
                 }
}
const render = (result) => {
    let totally = 0;
    const parentDivOfBlocks = document.getElementById('listOfAddedItems');
    parentDivOfBlocks.innerHTML = '';
    if (result) {
        result.map((item, index) => {
            const {id, shop, spend, createdAt} = item;
            const blocks = document.createElement('div')
            blocks.className = 'blocks';
            const shops = document.createElement('div');
            shops.className = 'shopNames';
            const shopNameParag = document.createElement('p');
            shopNameParag.className = 'shopNamesP';
            const textNode1 = document.createTextNode(`${index + 1}. Shop Called "${shop}"`);
            shopNameParag.appendChild(textNode1);
            shops.appendChild(shopNameParag);
            blocks.appendChild(shops);
            const divOfDtSpendIcons = document.createElement('div');
            divOfDtSpendIcons.className = 'divOfDtSpendIcons';
            const addedDate = document.createElement('div');
            addedDate.className = 'addedDate';
            const addDateInParag = document.createElement('p');
            addDateInParag.className = 'datesP';
            const textNode2 = document.createTextNode(createdAt);
            addDateInParag.appendChild(textNode2);
            addedDate.appendChild(addDateInParag);
            divOfDtSpendIcons.appendChild(addedDate);
            blocks.appendChild(divOfDtSpendIcons);
            const spendDiv = document.createElement('div');
            spendDiv.className = 'spend';
            const addSpendingInParag = document.createElement('p');
            addSpendingInParag.className = 'spendP';
            const textNode3 = document.createTextNode(`$ ${spend}`);
            addSpendingInParag.appendChild(textNode3);
            spendDiv.appendChild(addSpendingInParag);
            divOfDtSpendIcons.appendChild(spendDiv);
            blocks.appendChild(divOfDtSpendIcons);
            const iconDiv = document.createElement('div');
            iconDiv.className = 'iconDiv';
            const icon1 = document.createElement('img');
            const icon2 = document.createElement('img');
            icon1.src = "https://img.icons8.com/ios-glyphs/30/F25081/edit--v1.png";
            icon2.src = "https://img.icons8.com/ios-glyphs/30/F25081/filled-trash.png";
            iconDiv.appendChild(icon1);
            iconDiv.appendChild(icon2);
            blocks.appendChild(iconDiv);
            divOfDtSpendIcons.appendChild(iconDiv);
            blocks.appendChild(divOfDtSpendIcons);
            icon1.onclick = () => {
                edit(item, blocks)
            }
            icon2.onclick = () => {
                getResponsesWithoutBody("http://localhost:8000/api/expenses/", 'DELETE', id);
            }
            parentDivOfBlocks.appendChild(blocks);
            const totalSpend = document.getElementById('paramOfAmount');
            const totalSpendParag = document.createElement('p');
            totalSpendParag.className = 'totalMoneyP';

            totalSpend.innerHTML = '';
            totally += Number(spend);
            const textNode4 = document.createTextNode(`Total Spend: $${totally}`);
            totalSpendParag.appendChild(textNode4);
            totalSpend.appendChild(totalSpendParag);
        })
    }
}