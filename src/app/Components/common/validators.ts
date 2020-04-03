import {AbstractControl} from '@angular/forms';



//========namevalidator=========

export function nameValidator(control:AbstractControl)
{
    if(control && (control.value!==null || control.value!==undefined))
    {
               const regex = new RegExp('^[A-Z]+[a-z]{2,30}$');
               if(!regex.test(control.value))
               {
                   return {
                       isError:true
                   }
               }
    }
    return true;
}



//========phoneValidator=========


export function phoneValidator(control:AbstractControl)
{
   if(control && (control.value!==null || control.value!==undefined))
   {
       const regex =  new  RegExp('^[0-9]{10}$');

       if(!regex.test(control.value))
       {
       return{
           isError:true
       };
    }
   }
   return true;
}


//========matchpwd=========
export function matchpwd(control:AbstractControl)
{
    if(control && (control.value!==null || control.value!==undefined))
    {
        const cnfpwd = control.value;
        const pwd = control.root.get('password');

        if(pwd)
        {
            const conpval = pwd.value;

            if(conpval !== cnfpwd)
            {
                return{
                    isError:true
                }
            }
        }
    }
    return null;
}
