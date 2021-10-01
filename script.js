const apiurl="https://61518b634a5f22001701d293.mockapi.io/emp01"

const getData = async () => {
    try {
      const resp = await fetch(apiurl);
      const data = await resp.json();
      showTableData(data);
    } catch (error) {
      console.log(error);
    }
  };
  getData();
  
  const createuser = async () => {
    try {
      const name = document.getElementById("name").value;
      const emailid = document.getElementById("email").value;
      const designation=document.getElementById("des").value;
      const id = document.getElementById("hidden").value;
      if(name==""||emailid==""||designation==""){
        alert("Please enter the details")
      }
      else if (id !==""){
        const resp = await fetch(`${apiurl}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, emailid,designation}),
        });
        const result = await resp.json();
        location.reload();
        console.log(result)
        alert("User Update");
      } else {
        const resp = await fetch(apiurl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, emailid,designation}),
        });
        const result = await resp.json();
        console.log(result);
        alert("User created");
      }
      document.querySelector("form").reset();
      document.querySelector("#tbody").innerHTML = "";
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  
  const showTableData = (data) => {
    const tbody = document.getElementById("tbody");
    data.forEach((element) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerHTML = element.id;
      const td2 = document.createElement("td");
      td2.innerHTML = element.name;
      const td3 = document.createElement("td");
      td3.innerHTML = element.emailid;
      const td4 = document.createElement("td");
      td4.innerHTML=element.designation;
      const td5 = document.createElement("td");
      td5.innerHTML = `
      <button class="btn btn-warning" type="button" onclick="getUserById(${element.id})">Edit</button>
      <button class="btn btn-danger" type="button" onclick="deleteUser(${element.id})">Delete</button>
      `;
      tr.append(td1, td2, td3, td4,td5);
      tbody.append(tr);
    });
  };
  
  const deleteUser = async (id) => {
    try {
      await fetch(`${apiurl}/${id}`, {
        method: "DELETE",
      });
      alert("User Deleted");
      document.querySelector("#tbody").innerHTML = "";
      getData();
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };
  
  const getUserById = async (id) => {
    try {
      const resp = await fetch(`${apiurl}/${id}`);
      const data = await resp.json();
      document.getElementById("name").value = data.name;
      document.getElementById("email").value = data.emailid;
      document.getElementById("des").value=data.designation;
      document.getElementById("hidden").value = data.id;
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };