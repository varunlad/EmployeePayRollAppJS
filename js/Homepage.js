//UC4-->using template literals ES6 features
// window.addEventListener('DOMContentLoaded',(event)=>
// {
//     createInnerHtml();
// });
// const createInnerHtml=()=>
// {
//     const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
//     "<th>Salary</th><th>Start Date</th><th>Actions</th>";
//     const tableContent=` ${headerHtml}  
//     <tr>
//     <td><img class="profile" src="../asserts/Image1.png" alt="" width="60" height="60"></td>
//     <td>Dipti</td>
//     <td>Male</td>
//     <td><div class='dept-lable'>Marketing </div>
//     <div class='dept-lable'>Finance</div> </td>
//     <td>500000</td>
//     <td>21/10/2021</td>
//     <td>
//     <img id="1" onclick="remove(this)" alt="delete" src="../asserts/Delete.png" width="30" height="30">
//     <img id="1" onclick="edit(this)" alt="edit" src="../asserts/edit.png" width="30" height="30">
//     </td>
//     </tr>
//     `;
//     document.querySelector('#display').innerHTML=tableContent;
// }

//uc6
let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList=getEmployeePayrollFromLocalStorage();
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});
//UC6--getting the data from local storage
const getEmployeePayrollFromLocalStorage=()=>
{
    return localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}

//UC5-->employee details from json object
createInnerHtml = () => {
    let headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>"
    if (employeePayrollList.length==0) return;
    let innerHtml = `${headerHtml}`;
    for (let employeeData of employeePayrollList) 
    {
        innerHtml = `${innerHtml}
        <tr>
        <td>
        <img class="profile" alt="" src="${employeeData._profilePic}">
        </td>
        <td>${employeeData._name}</td>
        <td>${employeeData._gender}</td>
        <td>
        ${getDeptHtml(employeeData._department)}
        </td>
        <td>${employeeData._salary}</td>
        <td>${employeeData._startDate}</td>
        <td>
        <img id="${employeeData._id}" onclick="remove(this)" alt="delete" src="../asserts/Delete.png" width="30" height="30">
        <img id="${employeeData._id}" onclick="update(this)" alt="edit" src="../asserts/edit.png" width="30" height="30">
        </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}
//uc5
const createEmployeePayrollJSON = () => {
    let empPayrollList = [
        {
            _name: 'Sarika',
            _gender: 'Female',
            _department: ['HR'],
            _salary: 600000,
            _startDate: '21-Aug-2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/Profiles/Ellipse -1.png'
        },
        {
            _name: 'Debasmita',
            _gender: 'Female',
            _department: ['Engineering', 'Sales'],
            _salary: 65000,
            _startDate: '19-Aug-2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/Profiles/Ellipse -1.png'
        }
    ];
    return empPayrollList;
}

//Function is to display all dept, and does not forced for two dept and also does nt give undefined message
const getDeptHtml=(deptList) =>
{
    let deptHtml='';
    for(const dept of  deptList)
    {
        deptHtml=`${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
//Uc1 remove data 
//delete operation in home page based on name
const remove=(node)=>
{
    let employeePayrollData=employeePayrollList.find(empData=>empData._id==node.id)
    if(!employeePayrollData) return;
    const index=employeePayrollList.map(empData=>empData._id)
                               .indexOf(employeePayrollData._id);
    employeePayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
}
//uc2 
//update operation and store it in local
const update=(node)=>
{
    let employeePayrollData=employeePayrollList.find(empData=>empData._id==node.id)
    if(!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
    //editEmp is the new local storage created
    window.location.replace(site_Properties.add_emp_payroll_page); //this is for redirecting to the regoster page as add_emp variable holds that address
}