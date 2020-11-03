const log = document.querySelector('form.log')
const sign = document.querySelector('form.sign')
const smail = document.querySelector('strong.s-mail')
const spass = document.querySelector('strong.s-pass')
const lmail = document.querySelector('strong.l-mail')
const lpass = document.querySelector('strong.l-pass')
const sb = document.querySelector('button.sign-button')
const lb = document.querySelector('button.log-btn')
const head = document.querySelector('h4.s-header')
//sign-in handler
sign.addEventListener('submit', async (event)=>{
  event.preventDefault();
  //errs
  smail.textContent = ''
  spass.textContent = ''
  sb.disabled=true
  //consts
  const fname = sign.fname.value
  const lname = sign.lname.value
  const email = sign.email.value
  const password = sign.password.value
  const desigination = sign.desigination.value

  try{
    const res = await fetch('/sign-in',{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({fname ,lname , email , password, desigination})
    });
    const data = await res.json();
    if(data.errs){
      smail.textContent = data.errs.email
      spass.textContent = data.errs.password
      sb.disabled=false
    }
    
    if(data.user)
    {
      sb.textContent='Verification link sent to your email'
      head.textContent='Verification link sent to your email'

    }
  }
  catch(err){
    console.log(err)
  }
})

//log-in handler
log.addEventListener('submit', async(event)=>{
  event.preventDefault()
  //errs
  lmail.textContent = ''
  lpass.textContent = ''
  lb.disabled=true
  //consts
  const email = log.email.value
  const password = log.password.value

  try{
    const res = await fetch('/log-in',{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({ email , password})
    })
    const data = await res.json();
    if(data.errs){
      lmail.textContent = data.errs.email
      lpass.textContent = data.errs.password
      lb.disabled=false
    }
    if(data.user){
      location.assign('/');
    }
  }
  catch{

  }
})
