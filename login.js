// Requires data.js to be loaded first

let selectedRole = 'student';
let currentAccount = null;
let teacherSelectedStudentId = null;

// ---------- Role tabs ----------
const roleTabs = document.querySelectorAll('.role-tab');
roleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    roleTabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    selectedRole = tab.dataset.role;
  });
});

// ---------- Login form ----------
const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');
const loginSection = document.getElementById('loginSection');
const studentDashboard = document.getElementById('studentDashboard');
const teacherDashboard = document.getElementById('teacherDashboard');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const account = ACCOUNTS.find(a => a.username === username && a.password === password);

  if (!account) {
    loginStatus.textContent = 'Username or password is incorrect.';
    loginStatus.style.color = '#7A3B3B';
    return;
  }
  if (account.role !== selectedRole) {
    loginStatus.textContent = `That account is a "${account.role}" login — switch tabs above and try again.`;
    loginStatus.style.color = '#7A3B3B';
    return;
  }

  loginStatus.textContent = '';
  currentAccount = account;
  loginForm.reset();
  loginSection.classList.add('hidden');

  if (account.role === 'teacher') {
    openTeacherDashboard(account);
  } else {
    openStudentDashboard(account);
  }
});

// ---------- Student / Parent dashboard ----------
function openStudentDashboard(account) {
  teacherDashboard.classList.add('hidden');
  studentDashboard.classList.remove('hidden');

  const student = findStudentById(account.refId);
  document.getElementById('dashboardRoleLabel').textContent = account.role === 'parent' ? "Parent view — your child's profile" : 'Student profile';
  document.getElementById('studentDashName').textContent = student.name;
  document.getElementById('detClass').textContent = student.class;
  document.getElementById('detRoll').textContent = student.rollNo;
  document.getElementById('detAttendance').textContent = student.academic.attendance;
  document.getElementById('detExam').textContent = student.academic.lastExamPercent;
  document.getElementById('detRemarks').textContent = student.academic.remarks;

  document.getElementById('editFather').value = student.fatherName;
  document.getElementById('editAddress').value = student.address;
  document.getElementById('editContact').value = student.contact;
  document.getElementById('editEmail').value = student.email;

  studentDashboard.scrollIntoView({ behavior: 'smooth' });
}

const studentEditForm = document.getElementById('studentEditForm');
const studentEditStatus = document.getElementById('studentEditStatus');

studentEditForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const student = findStudentById(currentAccount.refId);
  student.fatherName = document.getElementById('editFather').value;
  student.address = document.getElementById('editAddress').value;
  student.contact = document.getElementById('editContact').value;
  student.email = document.getElementById('editEmail').value;

  studentEditStatus.textContent = 'Saved — these details are updated for this session.';
  studentEditStatus.style.color = '#2F5233';
});

document.getElementById('logoutBtnStudent').addEventListener('click', logout);

// ---------- Teacher dashboard ----------
function openTeacherDashboard(account) {
  studentDashboard.classList.add('hidden');
  teacherDashboard.classList.remove('hidden');
  teacherSelectedStudentId = null;

  const teacher = findTeacherById(account.refId);
  document.getElementById('teacherDashName').textContent = teacher.name;
  document.getElementById('teacherClassLabel').textContent = teacher.classTeacherOf
    ? `Class teacher of Class ${teacher.classTeacherOf}`
    : 'Not currently assigned as a class teacher.';

  renderTeacherStudentList(teacher);
  document.getElementById('teacherEditForm').classList.add('hidden');
  document.getElementById('teacherEditHeading').textContent = 'Select a student to edit academic record';

  teacherDashboard.scrollIntoView({ behavior: 'smooth' });
}

function renderTeacherStudentList(teacher) {
  const list = document.getElementById('teacherStudentList');
  if (!teacher.classTeacherOf) {
    list.innerHTML = '<li>No class assigned.</li>';
    return;
  }
  const students = studentsInClass(teacher.classTeacherOf).sort((a, b) => a.rollNo - b.rollNo);
  list.innerHTML = students.map(s => `
    <li>
      <button type="button" class="teacher-student-btn" data-id="${s.id}">
        <span>${s.rollNo}. ${s.name}</span>
        <span class="teacher-student-meta">${s.academic.attendance} attendance</span>
      </button>
    </li>
  `).join('');

  list.querySelectorAll('.teacher-student-btn').forEach(btn => {
    btn.addEventListener('click', () => selectStudentForEdit(btn.dataset.id));
  });
}

function selectStudentForEdit(studentId) {
  teacherSelectedStudentId = studentId;
  const student = findStudentById(studentId);
  const form = document.getElementById('teacherEditForm');

  document.getElementById('teacherEditHeading').textContent = `Editing academic record — ${student.name} (Roll ${student.rollNo})`;
  document.getElementById('teacherAttendance').value = student.academic.attendance;
  document.getElementById('teacherExam').value = student.academic.lastExamPercent;
  document.getElementById('teacherRemarks').value = student.academic.remarks;
  form.classList.remove('hidden');
  document.getElementById('teacherEditStatus').textContent = '';

  document.querySelectorAll('.teacher-student-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.id === studentId);
  });
}

const teacherEditForm = document.getElementById('teacherEditForm');
const teacherEditStatus = document.getElementById('teacherEditStatus');

teacherEditForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!teacherSelectedStudentId) return;
  const student = findStudentById(teacherSelectedStudentId);
  student.academic.attendance = document.getElementById('teacherAttendance').value;
  student.academic.lastExamPercent = document.getElementById('teacherExam').value;
  student.academic.remarks = document.getElementById('teacherRemarks').value;

  teacherEditStatus.textContent = `Saved — ${student.name}'s academic record is updated for this session.`;
  teacherEditStatus.style.color = '#2F5233';

  const teacher = findTeacherById(currentAccount.refId);
  renderTeacherStudentList(teacher);
  selectStudentForEdit(teacherSelectedStudentId);
});

document.getElementById('logoutBtnTeacher').addEventListener('click', logout);

// ---------- Shared logout ----------
function logout() {
  currentAccount = null;
  teacherSelectedStudentId = null;
  studentDashboard.classList.add('hidden');
  teacherDashboard.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginSection.scrollIntoView({ behavior: 'smooth' });
}
