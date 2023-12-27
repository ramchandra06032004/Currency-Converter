const baseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropDowns=document.querySelectorAll(".heroContainer select")
const btn=document.querySelector(".submitButton");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


const updateExchangeRate=async()=>{
    let ammount=document.querySelector(".fromContainer input");
    let ammountValue=ammount.value;
    if (ammountValue===""||ammountValue<0) {
        ammount.value=1;
        ammountValue=1;
    }
    const url=`${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let responce=await fetch(url);
    let data=await responce.json();
    let rate=data[toCurr.value.toLowerCase()];
    

    let finalAmmount=rate*ammountValue;
    msg.innerText=`${ammountValue}  ${fromCurr.value} = ${finalAmmount}  ${toCurr.value}`;
}

for(let select of dropDowns){
    for(currCode in countryList){
        let newOption=document.createElement("Option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        
        
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
    
}



const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    
    let newScorce=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImg= element.parentElement.querySelector("img");
    flagImg.src=newScorce;
}


btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();

})  
window.addEventListener("load",()=>{
    updateExchangeRate();
})