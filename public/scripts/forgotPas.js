const mail = document.querySelector('strong.fmail')
    const form = document.querySelector('form.forgot')
    const but = document.querySelector('button.fpas')
    const header = document.querySelector('h4.f-header')
   
    form.addEventListener('submit',async(event)=>{
        event.preventDefault()
        mail.textContent=''
        but.disabled = true
        const email = form.email.value
        try{
            const res = await fetch('/forgot-password',{
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body:JSON.stringify({email})   
            })
        const data = await res.json();
        if(data.errs){
          mail.textContent = data.errs.email
          but.disabled = false
        }
        
        if(data.user)
        {
          but.textContent='Password reset link sent to your email'
          header.textContent='Password reset link sent to your email'
        }
      }
      catch(err){
        console.log(err)
      }
    })