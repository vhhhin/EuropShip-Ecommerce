// using built-in global fetch in Node v18+
(async()=>{
  try{
    const res=await fetch('http://localhost:4001/api/book-demo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:'Test',phone:'123',hearAboutUs:'google',experience:'3yrs',budgetRange:'10K',meetingTime:'10:00'})});
    const text=await res.text();
    console.log('status',res.status,'body',text);
  }catch(e){console.error('err',e)}
})();
