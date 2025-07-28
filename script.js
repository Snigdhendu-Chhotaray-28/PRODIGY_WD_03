// =================== Starting txt and "Stop" var =================== //

let result_var_main = document.querySelector('.result');
result_var_main.innerText = "Is's O's tern.";

// =================== Var of all boxes =================== //
let box_vars = document.querySelectorAll('.box');

// "isStop" used for stop the process someone's win. 
let isStop = false;

// "count" is used for counting how much boxes wad complitted.
let count = 0;

let aiMove = 0;

// ================ Winning Patterns ===================== //
const winning_patterns = [
    [1, 4, 7],
    [0, 1, 2],
    [6, 7, 8],
    [2, 5, 8],
    [0, 3, 6],
    [2, 4, 6],
    [0, 4, 8],
    [3, 4, 5]
];


// =================== Print Symbol fn =================== //

function printSymbol(){
    

    // "isZero" is used for check the X or O turn in game.
    let isZero = true;

    box_vars.forEach((box_var)=>{
        box_var.addEventListener("click",()=>{
            if(box_var.innerText !="X" && box_var.innerText !="O" && (!isStop) && (!aiMove)){
                count++;
                console.log(count);
                if(isZero == true){
                    box_var.innerText = "O";
                    result_var_main.innerText = "Is's X's tern.";
                    checkWinner();
                    isZero = !isZero;
                }
                else{
                    box_var.innerText = "X";
                    result_var_main.innerText = "Is's O's tern.";
                    checkWinner();
                    isZero = !isZero;
                }
                if(count==9 && !isStop){
                    result_var_main.innerText = "Game ended in a draw!";
                    isStop = !isStop;
                }
            }
        });
    });
}
printSymbol();


// =================== Check Winner fn =================== //

function checkWinner(){
    winning_patterns.forEach((winning_pattern)=>{

        if((box_vars[winning_pattern[0]].innerText == box_vars[winning_pattern[1]].innerText) && 
        (box_vars[winning_pattern[0]].innerText == box_vars[winning_pattern[2]].innerText) && 
        ((box_vars[winning_pattern[0]].innerText == "O")|| (box_vars[winning_pattern[0]].innerText == "X"))){

            let result_var = document.querySelector('.result');
            result_var.innerText = '"'+box_vars[winning_pattern[0]].innerText+'"'+" is the winner";

            box_vars[winning_pattern[0]].style.backgroundColor = "yellow";
            box_vars[winning_pattern[1]].style.backgroundColor = "yellow";
            box_vars[winning_pattern[2]].style.backgroundColor = "yellow";

            isStop = !isStop;

        }
        if(count==9 && !isStop){
            result_var_main.innerText = "Game ended in a draw!";
            isStop = !isStop;
        }
    });
}


// =================== Reset Game fn =================== //

function resetGame(){
    let reset_btn = document.querySelector('.reset');
    reset_btn.addEventListener('click',()=>{
        isStop = false;
        count = 0;
        result_var_main.innerText = "Is's O's tern.";
        clear_item();
    });
}
resetGame();


function clear_item(){
    box_vars.forEach((box_var)=>{
        box_var.innerText = "";
        box_var.style.backgroundColor = 'rgb(237, 237, 237)';
    });
}

// =================== Hover Effect fn =================== //

function hoverEffect(){
        box_vars.forEach((box_var)=>{
            box_var.addEventListener('mouseenter',()=>{

                // =========== This condition used bcz after winning the hover effect also applied and it changes the winning position color (Yellow) =========== //

                if(isStop == false){
                    box_var.style.backgroundColor = 'rgb(226, 226, 226)';
                }
            });
            box_var.addEventListener('mouseleave',()=>{

                // =========== This condition used bcz after winning the hover effect also applied and it changes the winning position color (Yellow) =========== //

                if(isStop == false){
                    box_var.style.backgroundColor = 'rgb(237, 237, 237)';
                }
            });
        });
}
hoverEffect();


// =================== VS Player Active =================== //


function play_with_player_btn_click(){
    let vs_player_var = document.querySelector('.vs_player');
    vs_player_var.addEventListener('click',() => {
        isStop = false;
        aiMove = 0;
        result_var_main.innerText = "Is's O's tern.";
        clear_item();
        printSymbol();
    });
}


play_with_player_btn_click();




// ======================= Play with AI ======================= //

//  ================ Play with AI btn Click fn ================ //

function playAi_btn_click(){
    let vsAI_btn = document.querySelector('.vs_ai');
    vsAI_btn.addEventListener('click',() => {
        aiMove = 1;
        isStop = false;
        count = 0;
        
        result_var_main.innerText = "Is's Your tern.";
        clear_item();
        player_move();
    });
}
playAi_btn_click();


// ======================== Player move ======================== //

function player_move(){
    box_vars.forEach((box_var) =>{
        box_var.addEventListener('click', ()=>{

            if(box_var.innerText == "" && !isStop){
                box_var.innerText = "O";
                checkWinner();
                count++;
                if(count == 5 && !isStop){
                    result_var_main.innerText = "Draw";
                }
                if(!isStop){
                    find_best_move();
                }
            }
        })
    });
}


//  ===================== Play with AI fns ===================== //

// ======================= Attacking Move ======================= //
function attacking(){
    let pos = 99;
    winning_patterns.forEach((winning_pattern) =>{
        if((box_vars[winning_pattern[0]].innerText == "") &&  (box_vars[winning_pattern[1]].innerText == "")&&(box_vars[winning_pattern[2]].innerText =="X")){
            pos = winning_pattern[0];
        }
        else if((box_vars[winning_pattern[0]].innerText == "") &&  (box_vars[winning_pattern[2]].innerText == "")&&(box_vars[winning_pattern[1]].innerText =="X")){
            pos = winning_pattern[0];
        }
        else if((box_vars[winning_pattern[1]].innerText == "") && (box_vars[winning_pattern[2]].innerText == "") && (box_vars[winning_pattern[0]].innerText =="X")){
            pos = winning_pattern[2];
        }
    });
    return pos;
}

// =========== Deffencive also Attacking Move =========== //
function diffencive(){

    let permanent = 99;
    let pos = 99;
    winning_patterns.forEach((winning_pattern)=>{
        if((box_vars[winning_pattern[0]].innerText === box_vars[winning_pattern[1]].innerText) && (box_vars[winning_pattern[2]].innerText == "") && (box_vars[winning_pattern[0]].innerText === "O" || box_vars[winning_pattern[0]].innerText === "X")){
            if(box_vars[winning_pattern[0]].innerText === "X"){
                permanent = winning_pattern[2];
            }
            pos = winning_pattern[2];
        }

        else if((box_vars[winning_pattern[0]].innerText === box_vars[winning_pattern[2]].innerText) && (box_vars[winning_pattern[1]].innerText == "") && (box_vars[winning_pattern[0]].innerText === "O" || box_vars[winning_pattern[0]].innerText === "X")){
            if(box_vars[winning_pattern[0]].innerText === "X"){
                permanent = winning_pattern[1];
            }
            pos = winning_pattern[1];
        }

        else if((box_vars[winning_pattern[1]].innerText === box_vars[winning_pattern[2]].innerText) && (box_vars[winning_pattern[0]].innerText == "") && (box_vars[winning_pattern[1]].innerText === "O" || box_vars[winning_pattern[1]].innerText === "X")){
            if(box_vars[winning_pattern[1]].innerText === "X"){
                permanent = winning_pattern[0];
            }
            pos = winning_pattern[0];
        }
    });
    if(permanent < 99 ){
        return permanent;
    }
    else{
        return pos;
    }
}


// ================== Arbitary Move ================== //
function arbitary(){
     winning_patterns.forEach((winning_pattern) =>{
        if(box_vars[winning_pattern[0]].innerText == ""){
            return box_vars[winning_pattern[0]];
        }
        else if(box_vars[winning_pattern[2]].innerText == ""){
            return box_vars[winning_pattern[2]];
        }
        else if(box_vars[winning_pattern[1]].innerText == ""){
            return box_vars[winning_pattern[1]];
        }
        else{
            // alert("Not working");
        }
     });
}

function find_best_move(){
    if(box_vars[4].innerText ==""){
        enterX(4);
    }
    else if(box_vars[0].innerText =="" && box_vars[4].innerText =="O"){
        enterX(0);
    }
    else{
        let pos = diffencive();
        if(pos < 99){
            enterX(pos);
            
        }
        else if((box_vars[7].innerText =="O")&&(box_vars[0].innerText =="O")&&(box_vars[6].innerText =="")&&(box_vars[3].innerText =="")){
            enterX(6);
        }
        else if((box_vars[7].innerText =="O")&&(box_vars[2].innerText =="O")&&(box_vars[8].innerText =="")&&(box_vars[5].innerText =="")){
            enterX(8);
        }
        else{
            pos = attacking();
            if(pos < 99){
                enterX(pos);
            }else{
                pos = arbitary();
                enterX(pos);
            }
        }
    }
}

function enterX(pos){
    if(box_vars[pos].innerText == ""){
        box_vars[pos].innerText = "X";
    }
    checkWinner();
}