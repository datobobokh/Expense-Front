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
const sendRequest = () => {
    getResponsesWithBody("http://localhost:8000/api/expenses/", 'POST');
    inputValueObj = {};
    inputShop.value = '';
    inputSpend.value = '';
}
const render = (result) => {
    let totally = 0;
    const parentDivOfBlocks = document.getElementById('listOfAddedItems');
    parentDivOfBlocks.innerHTML = '';
    if (result) {
        result.map((item, index) => {
            const {id, shop, spend, createdAt} = item;
            // Whole Block For Getting INFO
            const blocks = document.createElement('div')
            blocks.className = 'blocks';

             //Lists
             const shops = document.createElement('div');
             shops.className = 'shopNames';
             const shopNameParag = document.createElement('p');
             shopNameParag.className = 'shopNamesP';

             const textNode1 = document.createTextNode(`${index + 1}. Shop Called "${shop}"`);
             
             shopNameParag.appendChild(textNode1);
             shops.appendChild(shopNameParag);
             blocks.appendChild(shops);
             // parentDivOfBlocks.appendChild(blocks);
     
             // Rest of the Data in Div
             const divOfDtSpendIcons = document.createElement('div');
             divOfDtSpendIcons.className = 'divOfDtSpendIcons';

             // dates
             const addedDate = document.createElement('div');
             addedDate.className = 'addedDate';
             const addDateInParag = document.createElement('p');
             addDateInParag.className = 'datesP';
             const textNode2 = document.createTextNode(createdAt);
             addDateInParag.appendChild(textNode2);
             addedDate.appendChild(addDateInParag);
             divOfDtSpendIcons.appendChild(addedDate);
             blocks.appendChild(divOfDtSpendIcons);
     
             // Spent USD's
             const spendDiv = document.createElement('div');
             spendDiv.className = 'spend';
             const addSpendingInParag = document.createElement('p');
             addSpendingInParag.className = 'spendP';
             const textNode3 = document.createTextNode(`$ ${spend}`);
             addSpendingInParag.appendChild(textNode3);
             spendDiv.appendChild(addSpendingInParag);
             divOfDtSpendIcons.appendChild(spendDiv);
             blocks.appendChild(divOfDtSpendIcons);
             
             // add icons 
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
             parentDivOfBlocks.appendChild(blocks);

             // Total Spend
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