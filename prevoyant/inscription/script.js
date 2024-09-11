const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code qui permet de cacher le mdp et de le revoir
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })



  const createPw = document.querySelector("#create_pw"),
   confirmPw = document.querySelector("#confirm_pw"),
   pwShow = document.querySelector(".show"),
   alertIcon = document.querySelector(".error"),
   alertText= document.querySelector(".text"),
   submitBtn = document.querySelector("#button");

   pwShow.addEventListener("click", ()=>{
     if((createPw.type === "password") && (confirmPw.type === "password")){
       createPw.type = "text";
       confirmPw.type = "text";
       pwShow.classList.replace("fa-eye-slash","fa-eye");
     }else {
       createPw.type = "password";
       confirmPw.type = "password";
       pwShow.classList.replace("fa-eye","fa-eye-slash");
     }
   });

   createPw.addEventListener("input", ()=>{
     let val = createPw.value.trim()
     if(val.length >= 8){
       confirmPw.removeAttribute("disabled");
       submitBtn.removeAttribute("disabled");
       submitBtn.classList.add("active");
     }else {
       confirmPw.setAttribute("disabled", true);
       submitBtn.setAttribute("disabled", true);
       submitBtn.classList.remove("active");
       confirmPw.value = "";
       alertText.style.color = "#a6a6a6";
       alertText.innerText = "Enter at least 8 characters";
       alertIcon.style.display = "none";
     }
   });

  submitBtn.addEventListener("click", ()=>{
   if(createPw.value === confirmPw.value){
     alertText.innerText = "Password matched";
     alertIcon.style.display = "none";
     alertText.style.color = "#4070F4";
   }else {
     alertText.innerText = "Password didn't matched";
     alertIcon.style.display = "block";
     alertText.style.color = "#D93025";
   }
  });


