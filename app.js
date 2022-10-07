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

    maininput.remove();

    const div = document.createElement("div");
    div.id="container";

    mainheader.insertAdjacentElement("afterend",div);

    const numberofsubjectsform = document.createElement("form");
    numberofsubjectsform.id = "numberofsubjectsform";
    div.appendChild(numberofsubjectsform);


    const numberOfSubjectsheading = document.createElement('h1');

    numberOfSubjectsheading.classList.add("inputheadings");

    numberOfSubjectsheading.innerText = 'Number of Subjects'
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

    numberofsubjectsform.append(numberOfSubjectsheading)
    numberofsubjectsform.appendChild(inputsubjects);
    numberofsubjectsform.appendChild(brgen());
    numberofsubjectsform.appendChild(inputsubjectssubbtn);
    
    const h3 = document.createElement("h3");
    h3.innerText ="Enter the number of subjects greater than 1"
    h3.style.display = 'none'
    inputsubjects.insertAdjacentElement('afterend',h3)

    document.getElementById("inputsubjects").addEventListener("input",(e)=>{
        e.preventDefault();
        console.log("change")
        if(inputsubjects.value<2 || inputsubjects.value>15){
            if(h3.classList.contains("warning")){
                // console.log(h3.classList.contains("warning"))
            }else{
                h3.classList.add("warning")
            }
        }else{
            if(h3.classList.contains("warning"))
            h3.classList.remove('warning')
        }
        
    })

    document.getElementById("inputsubjectssubbtn").addEventListener("click",(e)=>{
        e.preventDefault();
        numberOfSubjectval = inputsubjects.value;
        console.log(numberOfSubjectval)
        if(numberOfSubjectval <2 || numberOfSubjectval >15){
            alert("WARNING !!! \n Enter the number of subjects greater than 1")
        }else{
            numberofinternals()
        }    
    })    
}

function numberofinternals(){
    numberofsubjectsform.remove();
    console.log("reached here ")
    console.log(numberOfSubjectval)

    const numberofinternalsdiv = document.createElement("div");
    document.getElementById("container").appendChild(numberofinternalsdiv)


    const numberofinternalsinput = document.createElement("input");
    numberofinternalsinput.type = "number";
    numberofinternalsinput.placeholder = "Number of Internals "


    const numberofinternalsbtn = document.createElement("button")
    numberofinternalsbtn.type = "submit";
    numberofinternalsbtn.innerText = "Proceed"
    numberofinternalsbtn.classList.add("calfont");

    numberofinternalsdiv.appendChild(numberofinternalsinput)
    numberofinternalsdiv.appendChild(brgen());
    numberofinternalsdiv.appendChild(numberofinternalsbtn)


}


