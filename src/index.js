// Get references to form and table body
let form = document.getElementById("studentForm");
let tableBody = document.getElementById("tableBody");

// Retrieve students array from localStorage or initialize as empty
let students = JSON.parse(localStorage.getItem("students")) || [];

// Track if we are editing an existing student
let editIndex = null;

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page refresh on submit

  // Get form field values
  let name = document.getElementById("name").value.trim();
  let id = document.getElementById("id").value.trim();
  let email = document.getElementById("email").value.trim();
  let contact = document.getElementById("contact").value.trim();

  // Validate that no fields are empty
  if (!name || !id || !email || !contact) {
    alert("All fields are required.");
    return;
  }

  // Validate name (only letters and spaces)
  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Name must contain only letters.");
    return;
  }

  // Validate ID and Contact (numbers only)
  if (!/^\d+$/.test(id) || !/^\d+$/.test(contact)) {
    alert("ID and Contact must be numbers.");
    return;
  }

  // Validate basic email format
  if (!email.includes("@") || !email.includes(".")) {
    alert("Enter a valid email.");
    return;
  }

  // Create student object
  let student = { name, id, email, contact };

  // If editing, update existing record
  if (editIndex === null) {
    students.push(student); // Add new student
  } else {
    students[editIndex] = student; // Update existing student
    editIndex = null;
    form.querySelector("button").innerText = "Register Now"; // Reset button label
  }

  // Save updated list to localStorage
  localStorage.setItem("students", JSON.stringify(students));

  // Reset the form
  form.reset();

  // Refresh the displayed table
  showStudents();
});

// Function to display all students in the table
function showStudents() {
  tableBody.innerHTML = ""; // Clear previous table rows

  students.forEach((student, index) => {
    // Create table row with student data and action buttons
    let row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    // Append row to table body
    tableBody.innerHTML += row;
  });
}

// Function to load student data into form for editing
function editStudent(index) {
  let student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("id").value = student.id;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  // Set edit index and change button text
  editIndex = index;
  form.querySelector("button").innerText = "Update Student";
}

// Function to delete a student record
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1); // Remove student from array
    localStorage.setItem("students", JSON.stringify(students)); // Update localStorage
    showStudents(); // Refresh table
  }
}

// Load student data from localStorage when page loads
showStudents();
