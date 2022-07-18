class ExceptionConfig{
    constructor(){
        this.ClassName = 'ExceptionConfig';
    }
    NumToTicked(length){
        var len=length;
        if(len>1||len==0)
        {
            return false;
        }
    }
}