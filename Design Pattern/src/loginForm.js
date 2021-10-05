class LoginForm{
    constructor(){
        this.state = 'hide';
    }
    show(){
        if(this.state === 'show'){
            alert('Has Showed');
            return;
        }
        this.state = 'show';
        console.log('Success');
    }
    hide(){
        if(this.state === 'hide'){
            alert('Has hiden');
        }
        this.state = 'hide';
        console.log('Hide success');
    }
}

LoginForm.getInstance = (function(){
    let instance;
    if(!instance){
        instance = new LoginForm();
    }
    return instance;
})();

let login1 = LoginForm.getInstance();
login1.show();
let login2 = LoginForm.getInstance();
login2.hide();
login1.show();