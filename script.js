function getPersonality(choice,question){
    let personality;
    if(question==='one')
        choice1=choice;
    else if(question==='two')
            choice2=choice;
        else choice3=choice;
    if(choice1!== undefined && choice2!== undefined && choice3!== undefined){
    for (const box of boxes)
        box.removeEventListener("click",select);
    if(choice2===choice3)
        personality=choice2;
        else personality=choice1;
    displayPersonality(personality);
    }
}

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
} 
function scrollToDown() {
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
} 

function restart(){
    const result=document.querySelector("#results");
    result.classList.add("hidden");
    for(const box of boxes){
        box.classList.remove("selected");
        box.classList.remove("opacity");
        box.querySelector('.checkbox').src="images/unchecked.png";
        box.addEventListener('click', select);
    }
    choice1=choice2=choice3=undefined;
    scrollToTop();
}

function displayPersonality(personality){
    const result=document.querySelector("#results");
    result.classList.remove("hidden");

    const h1=document.querySelector("#results h1")
    h1.textContent=RESULTS_MAP[personality].title;
    const p=document.querySelector("#results p");
    p.textContent=RESULTS_MAP[personality].contents;
    scrollToDown();
    const button=document.querySelector('.button')
    button.addEventListener('click',restart);
}

function select(event){
    const selectedList=[];
    const boxSelected = event.currentTarget;
    selectedList.push(boxSelected);

    const unselectedList=[];
    const boxUnselected = boxes;
    for(const box of boxUnselected){
        unselectedList.push(box);
    }

    const indexToRemove= unselectedList.indexOf(boxSelected);
    unselectedList.splice(indexToRemove,1);

    for(const box of selectedList){
        boxSelected.classList.add("selected");  
        boxSelected.querySelector('.checkbox').src="images/checked.png"; 
        box.classList.remove("opacity");
    }
    for (const box of unselectedList){
        if(box.dataset.questionId===boxSelected.dataset.questionId){
        box.classList.add("opacity");
        box.querySelector('.checkbox').src="images/unchecked.png";
        box.classList.remove("selected");
        }
    }
    getPersonality(boxSelected.dataset.choiceId,boxSelected.dataset.questionId);
}

let choice1,choice2,choice3;
const boxes = document.querySelectorAll(".boxes");
for (const box of boxes){
    box.addEventListener("click",select);
}