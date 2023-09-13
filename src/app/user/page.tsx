import axios from "axios"

async function userList(){
    let data = await axios.get('https://dummyjson.com/users');
    return data.data.users
}

export default async function User() {
    let users = await userList();
    console.log(users)
  return (
    <div style={{width:"100vw",height:"95vh",display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h1 style={{margin:'20px'}}>User name list</h1>
       <div style={{width:"80%",height:'80%',overflow:"auto",border:"2px solid white",padding:"40px"}}>
        {
            users.map((user:any)=>{
                return(
                    <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",flexDirection:"row",margin:"10px 0px"}}>
                          <p style={{width:"100px"}}>{user.firstName+" "}{user.lastname}</p>
                          <p style={{width:"320px",textAlign:'center'}}>{user.age}</p>
                          <p style={{width:"200px"}}>{user.email}</p>
                    </div>
                )
            })
        }
       </div>
    </div>
  )
}
