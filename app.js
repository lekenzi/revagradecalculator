var numberOfSubjects =0;
var numberOfSubjectsArr=[];
var batchnumber =0;
var creditsArr=[];
var numberOfSubjectval = 0;
var numberofinternalsval = 0;
var Internalmarks =[];
var Assignmentmarks = [];
var Semendmarks = [];
var Credits = [];
var finaltotal = [];

var totalInternalMarks =  0;

var demmi = 1;

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
    inputsubjects.placeholder ="Number Of Subjects"
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
        
        if(numberOfSubjectval <2 || numberOfSubjectval >15){
            alert("WARNING !!! \n Enter the number of subjects greater than 1")
        }else{
            numberofinternals()
        }    
    })    
}

function numberofinternals(){
    numberofsubjectsform.remove();
    
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
    getmarksdiv.id = "getmarksdivid";

    document.getElementById('mainheader').remove();
    numberofinternalsdivid.remove();


    markscollector(numberofinternalsval,demmi,getmarksdiv);

}


function markscollector(internum,subnum,div){
    

    const form = document.createElement("div");

    form.id = "internalsmarksformid";
    div.append(form);

    const h1 = document.createElement("h1");
    h1.classList.add("inputheadings")

    h1.innerText = `Subject - ${subnum}`;

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
        assignmarksinput.placeholder = `Assignment - ${i+1} Marks [MAX - 10]`;

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
            
            
            // warning event 

            if(document.getElementById(`assignmarks${i}`).value<0 || document.getElementById(`assignmarks${i}`).value>10 ){
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
        if(demmi == numberOfSubjectval){
            submitbutton.innerText = 'Calculate';
        }

        form.append(submitbutton);

        document.getElementById("nextbuttonid").addEventListener("click",function () {
                let sum = 0;
                for (let i = 0; i < internum; i++) {
                    if(document.getElementById(`iamarks${i}`).value<0 || document.getElementById(`iamarks${i}`).value>30 || document.getElementById(`iamarks${i}`).value == ''){
                        alert(`Warning\n IA-${i+1} Invalid Input`)
                    }else{
                        for (let i = 0; i < internum; i++){
                            sum += Number(document.getElementById(`iamarks${i}`).value);
                            
                            
                        }
                        Internalmarks.push(sum);
                        break;
                    }
                }
                sum = 0;
                for (let i = 0; i < internum; i++) {
                    if(document.getElementById(`assignmarks${i}`).value<0 || document.getElementById(`assignmarks${i}`).value>10 || document.getElementById(`assignmarks${i}`).value ==''){
                        alert(`Warning\n Assignment-${i+1} Invalid Input`)
                    }else{
                        for (let i = 0; i < internum; i++){
                            sum += Number(document.getElementById(`assignmarks${i}`).value);
                            

                        }
                        Assignmentmarks.push(sum);
                        break;
                    }

                }
                
                flagflag = true;
                for (let i = 0; i < internum; i++){
                    if((document.getElementById(`iamarks${i}`).value<0 || document.getElementById(`iamarks${i}`).value>30 || document.getElementById(`iamarks${i}`).value =='')
                    &&
                    (document.getElementById(`assignmarks${i}`).value<0 || document.getElementById(`assignmarks${i}`).value>10 || document.getElementById(`assignmarks${i}`).value=='')){
                        flagflag = false;        
                    }
                }

                if(flagflag){

                    form.remove();
                    demmi++;
                    // dont touch this code 

                    if(demmi<=numberOfSubjectval){
                        markscollector(internum, demmi, div);
                    }else{
                        internalstablefun();
                    }
                        
                }
        })

            
}

function tdgen(text,limit){
    const td= document.createElement("td");
    if(limit==null){
        td.innerText=text.toString();
        return td;
    }else{
        let texti=`${text}/${limit}`;
        
        td.innerText = texti;
        return td;
    }
}

function internalstablefun(){
    const internalstablediv = document.createElement("div");
    internalstablediv.id = "internalstabledivid";

    document.getElementById("container").append(internalstablediv);

    document.getElementById("getmarksdivid").remove();

    const internalstable = document.createElement("table");
    internalstable.id = "internalstableid";

    internalstable.classList.add("table");

    internalstablediv.append(internalstable);

    const tableheadingrow = document.createElement("tr");
    tableheadingrow.id = "tableheadingrowid";
    internalstable.append(tableheadingrow);

    const subjectth = document.createElement("th");
    const internalsth = document.createElement("th");
    const assignmentth = document.createElement("th");
    const totalth = document.createElement("th");

    subjectth.innerText="Subject";
    internalsth.innerText="Internals";
    assignmentth.innerText="Assignment";
    totalth.innerText="Total";

    tableheadingrow.append(subjectth);
    tableheadingrow.append(internalsth);
    tableheadingrow.append(assignmentth);
    tableheadingrow.append(totalth);
    

    for(let i = 0;i<numberOfSubjectval;i++){
        const row = document.createElement("tr");
        internalstable.append(row);
        row.append(tdgen(`${i+1}`));
        row.append(tdgen(Internalmarks[i]/2,30));
        if(batchnumber == 1){
            row.append(tdgen(Assignmentmarks[i]/2,10));
            row.append(tdgen(Math.floor(Internalmarks[i]/2)+Assignmentmarks[i]/2,40))    
        }else{
            row.append(tdgen(Assignmentmarks[i]/2,20));
            row.append(tdgen(Math.floor(Internalmarks[i]/2)+Assignmentmarks[i],50))
        }
    }

    internalstablediv.append(brgen());

    const buttonnext = document.createElement("button");
    buttonnext.type = "submit";
    buttonnext.id = "buttonnextid";
    buttonnext.innerText = "+Semester and CGPA";
    buttonnext.classList.add("btn","calfont");
    internalstablediv.append(buttonnext);

    buttonnext.addEventListener("click",()=>{
        getsemendmarks();
    })

}

function getsemendmarks(){
    const div = document.getElementById("container");

    document.getElementById("internalstabledivid").remove();

    const form = document.createElement("div");

    form.id = "semendmarksform";
    div.append(form);

    const h1 = document.createElement("h1");
    h1.classList.add("inputheadings")

    h1.innerText = "Semester End";

    form.append(h1);

    const limith2 = document.createElement("h2");
    limith2.innerText = "MAX Semester Exam Marks - 100 \n MAX Course Credits - 4"
    form.appendChild(limith2);

    form.append(brgen());

    for(let i = 0;i<numberOfSubjectval;i++){
        const semendmarks = document.createElement("input");
        const credits = document.createElement("input");

        semendmarks.id = `semmarks${i}`;
        credits.id = `s${i}credits${i}`;

        semendmarks.type ="number";
        credits.type ="number";

        semendmarks.classList.add("input")
        credits.classList.add("input")

        semendmarks.placeholder = `Subject-${i+1} Marks`;
        credits.placeholder = `Subject-${i+1} Credits`;

        // warning
        const h3i = document.createElement("h3");
        h3i.innerText ="Max Marks 100";
        h3i.style.display = 'none';

        // warning
        const h3a = document.createElement("h3");
        h3a.innerText ="Max Credits 4 ";
        h3a.style.display = 'none';
        
        form.append(semendmarks);
        form.append(h3i);
        form.append(brgen());
        form.append(credits);
        form.append(h3a);
        form.append(brgen());

        document.getElementById(`semmarks${i}`).addEventListener("input",(e)=>{
            e.preventDefault();
           
            
            // warning event 

            if(document.getElementById(`semmarks${i}`).value<0 || document.getElementById(`semmarks${i}`).value>100){
                if(h3i.classList.contains("warning")){
                    // console.log(h3.classList.contains("warning"))
                }else{
                    h3i.classList.add("warning")
                    semendmarks.classList.add("inputwarning")
                }
            }else{
                if(h3i.classList.contains("warning")){
                h3i.classList.remove('warning')
                semendmarks.classList.remove("inputwarning")
                }
            }
            
            // warning event 
        })

        document.getElementById(`s${i}credits${i}`).addEventListener("input",(e)=>{
            e.preventDefault();
            
            
            // warning event 

            if(document.getElementById(`s${i}credits${i}`).value<0 || document.getElementById(`s${i}credits${i}`).value>4){
                if(h3a.classList.contains("warning")){
                    // console.log(h3.classList.contains("warning"))
                }else{
                    h3a.classList.add("warning")
                    credits.classList.add("inputwarning")
                }
            }else{
                if(h3a.classList.contains("warning")){
                    h3a.classList.remove('warning')
                    credits.classList.remove("inputwarning")
                }
            }

            // warning event 
        })

    }

        const submitbutton = document.createElement("button");
        submitbutton.classList.add("btn","calfont")
        submitbutton.id = "nextbuttonid"
        submitbutton.type= "Submit";
        submitbutton.innerText = 'Calculate';

        form.append(submitbutton);

        let internum = numberOfSubjectval;

        // correction from here 

        document.getElementById("nextbuttonid").addEventListener("click",function () {
                let sum = 0;
                for (let i = 0; i < internum; i++) {
                    if(document.getElementById(`semmarks${i}`).value<0 || document.getElementById(`semmarks${i}`).value>100 || document.getElementById(`semmarks${i}`).value ==''){
                        alert(`Warning\n Subject-${i+1} Invalid Input`)
                    }else{
                        Semendmarks.push(document.getElementById(`semmarks${i}`).value);
                    }
                }
                sum = 0;
                for (let i = 0; i < internum; i++) {
                    if(document.getElementById(`s${i}credits${i}`).value<0 || document.getElementById(`s${i}credits${i}`).value>4 || document.getElementById(`s${i}credits${i}`).value == ''){
                        alert(`Warning\n Subject-${i+1} Credits Invalid Input`)
                    }else{
                        Credits.push(document.getElementById(`s${i}credits${i}`).value);
                    }

                }
                
                flagflag = true;
                for (let i = 0; i < internum; i++){
                    if((document.getElementById(`semmarks${i}`).value<0 || document.getElementById(`semmarks${i}`).value>100 || document.getElementById(`semmarks${i}`).value=='')
                    &&
                    (document.getElementById(`s${i}credits${i}`).value<0 || document.getElementById(`s${i}credits${i}`).value>4 || document.getElementById(`s${i}credits${i}`).value == '')){
                        flagflag = false;        
                    }
                }

                if(flagflag){
                    
                    
                    semendtable();
                        
                }
        })

}

function semendtable(){

    console.log("Homies over here");
    const semendstablediv = document.createElement("div");
    semendstablediv.id = "semendstabledivid";

    document.getElementById("container").append(semendstablediv);

    document.getElementById("semendmarksform").remove();

    const semendtable = document.createElement("table");
    semendtable.id = "semendtableid";

    semendtable.classList.add("table");

    semendstablediv.append(semendtable);

    const tableheadingrow = document.createElement("tr");
    tableheadingrow.id = "tableheadingrowid";
    semendtable.append(tableheadingrow);

    const subjectth = document.createElement("th");
    const marksth = document.createElement("th");
    const gpth = document.createElement("th");
    const cpth = document.createElement("th");
    const Grade = document.createElement("th");
    
    subjectth.innerText="Subject";
    marksth.innerText="Marks";
    gpth.innerText="G.P";
    cpth.innerText="C.P";
    Grade.innerText="Grade Letter";

    tableheadingrow.append(subjectth);
    tableheadingrow.append(marksth);
    tableheadingrow.append(gpth);
    tableheadingrow.append(cpth);
    tableheadingrow.append(Grade);

    function gpcal(i){
        let temp = Number(finaltotal[i]);
        if(temp>=90 && temp<=100){
            return 10;
        }
        else if(temp>=80 && temp<90){
            return 9;
        }else if(temp>=70 && temp<80){
            return 8;
        }else if(temp>=60 && temp<70){
            return 7;
        }else if (temp>=55 && temp<60){
            return 6;
        }else if (temp>=50 && temp<55){
            return 5.5;
        }else if (temp>=40 && temp<50){
            return 5;
        }else{
            return 0;
        }
    }

    function gradecal(i){
        let temp = Number(finaltotal[i]);
        if(temp>=90 && temp<=100){
            return 'O';
        }
        else if(temp>=80 && temp<90){
            return 'A+';
        }else if(temp>=70 && temp<80){
            return 'A';
        }else if(temp>=60 && temp<70){
            return 'B+';
        }else if (temp>=55 && temp<60){
            return 'B';
        }else if (temp>=50 && temp<55){
            return 'C+';
        }else if (temp>=40 && temp<50){
            return 'C';
        }else{
            return 'F';
        }
    }
    
    for(let i = 0;i<numberOfSubjectval;i++){
        if(batchnumber == 1){
            finaltotal.push((Internalmarks[i]/2)+Assignmentmarks[i]/2+(0.6*Number(Semendmarks[i])));
        }
        else{
            finaltotal.push((Internalmarks[i]/2)+Assignmentmarks[i]+(0.5*Number(Semendmarks[i])));
        }
    }

    for(let i = 0;i<numberOfSubjectval;i++){
        const row = document.createElement("tr");
        semendtable.append(row);
        row.append(tdgen(`${i+1}`));
        row.append(tdgen(finaltotal[i]));
        row.append(tdgen(gradecal(i)));
        row.append(tdgen((Credits[i]*gpcal(i))));
        row.append(tdgen(gradecal(i)));
    }
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }

    function sgpacal(){
        let top = 0;
        for(let i = 0;i<numberOfSubjectval;i++){
            top+=(Credits[i]*gpcal(i));
        }
        let bottom = 0;
        for(let cr of Credits){
            bottom+=(Number(cr));
        }

        return (top/bottom)

    }

    const sgpa = document.createElement("h1");
    sgpa.id ="sgpaid";
    sgpa.innerText = "SGPA:" + sgpacal();

    semendstablediv.append(sgpa);


}