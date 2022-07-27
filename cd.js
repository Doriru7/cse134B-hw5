let alert_btn = document.querySelector('#alert');
console.log('alert_btn');
let alert_prompt_text = 'Alert pressed!';

alert_btn.addEventListener('click', ()=>{
    let body = document.querySelector('body');
    let template = document.querySelector('#dialog_template');
    let clone = template.content.cloneNode(true);
    let alert_dialog = clone.querySelector('dialog');
        
    let para = clone.querySelector('p');
    para.textContent = alert_prompt_text;

    let alert_ok = document.createElement('button');
    alert_ok.id = 'ok-btn';
    alert_ok.value = 'true';
    alert_ok.textContent = 'Ok';

    alert_dialog.querySelector('form').appendChild(alert_ok);

    body.appendChild(clone); 

    alert_dialog.showModal();

    alert_dialog.addEventListener('close', ()=>{
        alert_dialog.remove();
    })
})


let confirm_btn = document.querySelector('#confirm');
let confirm_prompt_text = 'Do you confirm this?';

confirm_btn.addEventListener('click', ()=>{
    let body = document.querySelector('body');
    let template = document.querySelector('#dialog_template');
    let clone = template.content.cloneNode(true);
    let confirm_dialog = clone.querySelector('dialog');

    let para = clone.querySelector('p');
    para.textContent = confirm_prompt_text;

    let confirm_ok = document.createElement('button');
    confirm_ok.id = 'ok-btn';
    confirm_ok.value = 'true';
    confirm_ok.textContent = 'Ok';

    let confirm_cancel = document.createElement('button');
    confirm_cancel.id = 'cancel-btn';
    confirm_cancel.value = 'false';
    confirm_cancel.textContent = 'Cancel';

    confirm_dialog.querySelector('form').appendChild(confirm_ok);
    confirm_dialog.querySelector('form').appendChild(confirm_cancel);

    body.appendChild(clone); 

    confirm_dialog.showModal();

    confirm_dialog.addEventListener('close', ()=>{
        document.querySelector('output').textContent = `Result is: ${confirm_dialog.returnValue}`
        confirm_dialog.remove();
    
    })
    })
    

//-----------------------
let prompt_btn = document.querySelector('#prompt');
let prompt_prompt_text = 'What is your name?';

prompt_btn.addEventListener('click', ()=>{
    let body = document.querySelector('body');
    let template = document.querySelector('#dialog_template');
    let clone = template.content.cloneNode(true);
    let prompt_dialog = clone.querySelector('dialog');

    let para = clone.querySelector('p');
    para.textContent = prompt_prompt_text;

    let textfield = document.createElement('input');
    textfield.type = 'text';
    textfield.id = 'prompt_textfield';


    let prompt_ok = document.createElement('button');
    prompt_ok.id = 'ok-btn';
    //prompt_ok.value = 'true';
    prompt_ok.textContent = 'Ok';

    let prompt_cancel = document.createElement('button');
    prompt_cancel.id = 'cancel-btn';
    prompt_cancel.value = 'false';
    prompt_cancel.textContent = 'Cancel';

    prompt_dialog.querySelector('form').appendChild(textfield);
    prompt_dialog.querySelector('form').appendChild(prompt_ok);
    prompt_dialog.querySelector('form').appendChild(prompt_cancel);

    body.appendChild(clone); 

    prompt_dialog.showModal();

    textfield.addEventListener('change', ()=>{
        prompt_ok.value = textfield.value;
    })

    prompt_dialog.addEventListener('close', ()=>{
        
        if(prompt_dialog.returnValue != 'false')
            document.querySelector('output').textContent = `Your name is : ${prompt_dialog.returnValue}`;
        else
            document.querySelector('output').textContent = `User didn't enter anything`;
            prompt_dialog.remove();
    
    })
    })