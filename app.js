var numberOfSubjects =0;
var numberOfSubjectsArr=[];

var creditsArr=[];




const batchsubmit = document.getElementById("batchform");
const batchselect = document.getElementById("batchselect");
const h4 = document.createElement("h4");
const maininput = document.getElementById("maininput");
const selecte = document.getElementById("batchselect");

let warningflag = false;


batchsubmit.addEventListener("submit",(e)=>{
    e.preventDefault();
    var value = selecte.value;
    if(value == 0 ){
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


}


