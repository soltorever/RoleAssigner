var roles = [];
var members = [];
var unassignedMember = [];

function Role(name, num) {
    this.name = name;
    this.num = num;
    this.members = [];
}

function doAssign() {
    parseRoles();
    parseMembers();
    decideAssignment();
    var target = document.getElementById("assign-result");
    target.value=formatResult();
}

function parseRoles() {
    roles = [];

    var roleInfos = document.getElementById("role-setting");
    var rows = roleInfos.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
            var roleName = rows[i].getElementsByClassName("roleName")[0].value;
            var roleNum = rows[i].getElementsByClassName("roleNum")[0].value;
        if (roleName != "") {
            roles.push(new Role(roleName, roleNum));
        }
    }
}

function parseMembers() {
    members = [];

    var memberInfo = document.getElementById("member-setting").value;
    var arr = memberInfo.split(/\r\n|\r|\n/);
    for (i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            members.push(arr[i]);
        }
    }
}

function decideAssignment() {
    unassignedMembers = [];

    var roleRefs = [];
    for (i = 0; i < roles.length; i++) {
        for (j = 0; j < roles[i].num; j++) {
            roleRefs.push(roles[i]);
        }
    }
    var shuffledRoleRefs = shuffleArray(roleRefs);
    var shuffledMembers = shuffleArray(members);

    if(roleRefs.length < members.length) {
        unassignedMembers = shuffledMembers.slice(roleRefs.length, members.length);
    }

    for(i = 0; i < roleRefs.length && i < members.length; i++) {
        shuffledRoleRefs[i].members.push(shuffledMembers[i]);
    }
}


function formatResult() {
    var str = "";

    for (i = 0; i < roles.length; i++) {
        if (roles[i].num > roles[i].members.length) {
            str += "!";
        } else {
            str += " ";
        } 

        str += "[" + roles[i].name + "]\r\n";

        for (j = 0; j < roles[i].members.length; j++) {
           str += "   " + roles[i].members[j] + "\r\n";
        }
        str += "\r\n";
    }

    str += "\r\n### NOT ASSIGNED ###\r\n";
    for (i = 0; i < unassignedMembers.length; i++) {
        str += unassignedMembers[i] + "\r\n";
    }

    return str;
}

function addRole() {
    var roleInfos = document.getElementById("role-setting");
    var row = roleInfos.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = '<input type="text" class="roleName" value=""/>';
    var cell = row.insertCell(-1);
    cell.innerHTML = '<input type="number" class="roleNum" min="1" max="99" value="1"/>';
    var cell = row.insertCell(-1);
    cell.innerHTML = '<button onclick="deleteRole(this);">X</button>';
}

function deleteRole(deleteButton) {
    var row = deleteButton.parentNode.parentNode;
    row.parentNode.deleteRow(row.sectionRowIndex);
}

function shuffleArray(array) {
    target = array;
    for (i = target.length; i > 1; i--) {
        var r = Math.floor(Math.random() * i);
        var tmp = target[i - 1];
        target[i - 1] = target[r];
        target[r] = tmp;
    }

    return target;
}
