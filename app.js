var numberOfSubjects =0;
var numberOfSubjectsArr=[];
var batchnumber =0;
var creditsArr=[];
var numberOfSubjectval = 0;




const batchsubmit = document.getElementById("batchform");
const batchselect = document.getElementById("batchselect");
const h4 = document.createElement("h4");
const mainheader = document.getElementById("mainheader");
const maininput = document.getElementById("maininput");
const selecte = document.getElementById("batchselect");

let warningflag = false;



function brgen(){
    return document.createElement("br");
}


batchsubmit.addEventListener("submit",(e)=>{
    e.preventDefault();
    batchnumber = selecte.value;
    if(batchnumber == 0 ){
        h4.style.margin="10px";
        h4.classList.add("warning");
        warningflag=true;
        h4.innerText="Please Select Your Batch Before Proceeding ";
        batchselect.insertAdjacentElement('afterend',h4);
    }else{
        if(warningflag){
            h4.remove();
        }
        numberOfSubject(selecte.value);
    }
});

function numberOfSubject(value){
    console.log("next");
    console.log(value)
    maininput.remove();
    console.log("remove success");

    const div = document.createElement("div");
    div.id="numberofsubjects";

    mainheader.insertAdjacentElement("afterend",div);

    const numberofsubjectsform = document.createElement("form");
    numberofsubjectsform.id = "numberofsubjectsform";
    div.appendChild(numberofsubjectsform);

    const inputsubjects = document.createElement("input");
    numberofsubjectsform.method = "get";
    numberofsubjectsform.action ="";
    inputsubjects.type ="number"
    inputsubjects.id="inputsubjects";
    const inputsubjectssubbtn = document.createElement("button");
    inputsubjectssubbtn.classList.add("calfont");
    inputsubjectssubbtn.id = "inputsubjectssubbtn";
    inputsubjectssubbtn.type = "submit";
    inputsubjectssubbtn.classList.add("btn");
    inputsubjectssubbtn.innerText="Proceed";

    numberofsubjectsform.appendChild(inputsubjects);
    numberofsubjectsform.appendChild(brgen());
    numberofsubjectsform.appendChild(inputsubjectssubbtn);

    document.getElementById("inputsubjectssubbtn").addEventListener("click",(e)=>{
        e.preventDefault();
        numberofinternals();
    })

    
}



function numberofinternals(){
    numberofsubjectsform.remove();
    console.log("reached here ")
}


