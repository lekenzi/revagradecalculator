var numberOfSubjects =0;
var numberOfSubjectsArr=[];
var batchnumber =0;
var creditsArr=[];
var numberOfSubjectval = 0;
var numberofinternalsval = 0;
var Internalmarks =[];
var Assignmentmarks = [];

var totalInternalMarks =  0;

var semestermarks = [];

var totslsemestermarks = 0;

var buffer =[];

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
    document.getElementById("container").appendChild(numberofinternalsdiv);
    numberofinternalsdiv.id = "numberofinternalsdivid"

    const numberOfinternalsheading = document.createElement('h1');
    numberOfinternalsheading.classList.add("inputheadings");
    numberOfinternalsheading.innerText = 'Number of Internals'


    const numberofinternalsinput = document.createElement("input");
    numberofinternalsinput.type = "number";
    numberofinternalsinput.id = "numberofinternalsinputid"
    numberofinternalsinput.classList.add("input")
    numberofinternalsinput.placeholder = "Number of Internals "

    const h3 = document.createElement("h3");
    h3.innerText ="Invalid Input"
    h3.style.display = 'none'

    const numberofinternalsbtn = document.createElement("button")
    numberofinternalsbtn.type = "submit";
    numberofinternalsbtn.id = "numberofinternalsbtnid"
    numberofinternalsbtn.innerText = "Proceed"
    numberofinternalsbtn.classList.add("calfont");
    numberofinternalsbtn.classList.add("btn")

    numberofinternalsdiv.append(numberOfinternalsheading)
    numberofinternalsdiv.appendChild(numberofinternalsinput)
    numberofinternalsdiv.appendChild(brgen());
    numberofinternalsdiv.appendChild(numberofinternalsbtn)

    numberofinternalsinput.insertAdjacentElement('afterend',h3)

    document.getElementById("numberofinternalsinputid").addEventListener("input",(e)=>{
        e.preventDefault();
        console.log("change")
        if(numberofinternalsinput.value<2 || numberofinternalsinput.value>3){
            if(h3.classList.contains("warning")){
                // console.log(h3.classList.contains("warning"))
            }else{
                h3.classList.add("warning")
                numberofinternalsinput.classList.add("inputwarning")
            }
        }else{
            if(h3.classList.contains("warning")){
            h3.classList.remove('warning')
            numberofinternalsinput.classList.remove("inputwarning")
            }
        }
        
    })

    document.getElementById("numberofinternalsbtnid").addEventListener("click",(e)=>{
        e.preventDefault();
        numberofinternalsval = numberofinternalsinput.value;
        console.log(numberofinternalsval)
        if(numberofinternalsval <2 || numberofinternalsval >3){
            alert("WARNING !!! \n Invalid Input")
        }else{
            collectMarks();
        }    
    })  

}



// super function 


function collectMarks(){

    const getmarksdiv = document.createElement("div");
    document.getElementById("container").appendChild(getmarksdiv);
    getmarksdiv.id = "getmarksdivid"

    document.getElementById('mainheader').remove();
    numberofinternalsdivid.remove();

    markscollector(2,1,getmarksdiv);

    
    


}


function markscollector(internum,submun,div){
    

    const form = document.createElement("div");

    form.id = "internalsmarksformid";
    div.append(form);

    const h1 = document.createElement("h1");
    h1.classList.add("inputheadings")

    h1.innerText = `Subject - ${submun}`;

    form.append(h1);

    const limith2 = document.createElement("h2");
    limith2.innerText = "MAX IA Marks - 30 \n MAX Assignment marks - 10"
    form.appendChild(limith2);

    form.append(brgen());

    for(let i = 0;i<internum;i++){
        const iamarksinput = document.createElement("input");
        const assignmarksinput = document.createElement("input");

        iamarksinput.id = `iamarks${i}`;
        assignmarksinput.id = `assignmarks${i}`;

        iamarksinput.type ="number";
        assignmarksinput.type ="number";

        iamarksinput.classList.add("input")
        assignmarksinput.classList.add("input")

        iamarksinput.placeholder = `IA - ${i+1} Marks [MAX - 30]`;
        assignmarksinput.placeholder = `Assignment - ${i+1} Marks [MAX - 30]`;

        // warning
        const h3i = document.createElement("h3");
        h3i.innerText ="Max Marks 30";
        h3i.style.display = 'none';

        // warning
        const h3a = document.createElement("h3");
        h3a.innerText ="Max Marks 10 ";
        h3a.style.display = 'none';
        
        form.append(iamarksinput);
        form.append(h3i);
        form.append(brgen());
        form.append(assignmarksinput);
        form.append(h3a);
        form.append(brgen());

        document.getElementById(`iamarks${i}`).addEventListener("input",(e)=>{
            e.preventDefault();
            console.log("detected change")
            
            // warning event 

            if(document.getElementById(`iamarks${i}`).value<0 || document.getElementById(`iamarks${i}`).value>30){
                if(h3i.classList.contains("warning")){
                    // console.log(h3.classList.contains("warning"))
                }else{
                    h3i.classList.add("warning")
                    iamarksinput.classList.add("inputwarning")
                }
            }else{
                if(h3i.classList.contains("warning")){
                h3i.classList.remove('warning')
                iamarksinput.classList.remove("inputwarning")
                }
            }
            
            // warning event 
        })

        document.getElementById(`assignmarks${i}`).addEventListener("input",(e)=>{
            e.preventDefault();
            console.log("detected change")
            
            // warning event 

            if(document.getElementById(`assignmarks${i}`).value<0 || document.getElementById(`assignmarks${i}`).value>10){
                if(h3a.classList.contains("warning")){
                    // console.log(h3.classList.contains("warning"))
                }else{
                    h3a.classList.add("warning")
                    assignmarksinput.classList.add("inputwarning")
                }
            }else{
                if(h3a.classList.contains("warning")){
                    h3a.classList.remove('warning')
                    assignmarksinput.classList.remove("inputwarning")
                }
            }

            // warning event 
        })

    }

        const submitbutton = document.createElement("button");
        submitbutton.classList.add("btn","calfont")
        submitbutton.id = "nextbuttonid"
        submitbutton.type= "Submit";
        submitbutton.innerText = 'Next';

        form.append(submitbutton);

        document.getElementById("nextbuttonid").addEventListener("click",function () {
                let sum = 0;
                for (let i = 0; i < internum; i++) {
                    if(document.getElementById(`iamarks${i}`).value<0 || document.getElementById(`iamarks${i}`).value>30){
                        alert(`Warning\n IA-${i+1} Invalid Input`)
                    }else{
                        sum += Number(document.getElementById(`iamarks${i}`).value);
                        Internalmarks.push(sum);
                        console.log(sum);
                    }
                }
                sum = 0;
                for (let i = 0; i < internum; i++) {
                    if(document.getElementById(`assignmarks${i}`).value<0 || document.getElementById(`assignmarks${i}`).value>10){
                        alert(`Warning\n Assignment-${i+1} Invalid Input`)
                    }else{
                        sum += Number(document.getElementById(`assignmarks${i}`).value);
                        Assignmentmarks.push(sum);
                        console.log(sum);
                    }
                }
                
                flagflag = true;
                for (let i = 0; i < internum; i++){
                    if((document.getElementById(`iamarks${i}`).value<0 || document.getElementById(`iamarks${i}`).value>30)
                    &&
                    (document.getElementById(`assignmarks${i}`).value<0 || document.getElementById(`assignmarks${i}`).value>10)){
                        flagflag = false;        
                    }
                }

                if(flagflag){
                    alert("done with no errors");

                    form.remove();

                    markscollector(2, 2, div);
                }
        })

            
}