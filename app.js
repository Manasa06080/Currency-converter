const BASE_URL="https://api.frankfurter.app/latest?"


 const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
  const fromCurr=document.querySelector(".from select");
  const toCurr=document.querySelector(".to select");//selecting the from and to currency
   const msg=document.querySelector(".msg");
  

  for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
          newOption.selected="selected"
        }
        
        else if(select.name==="to" && currCode==="INR"){
          newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
    });
  }

  const updateFlag= (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
  }
 

  button.addEventListener("click", async(evt)=> {

    evt.preventDefault(); //prevents the default action of the button
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""|| amtVal<1){
      amtVal=1;
      amount.value="1";
    }

    //console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}`; // we send req on this url
    let response=await fetch(URL);
    let data=await response.json();
   let rate=data.rates[toCurr.value];


   let finalAmount=amtVal*rate;
   
   msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount.toFixed(2)} ${toCurr.value}`; //eg 1usd= 80inr  , tofixed(2) will round off to 2 decimal places
  


  });


